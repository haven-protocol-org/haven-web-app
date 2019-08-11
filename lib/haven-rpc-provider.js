
const cq = require('concurrent-queue');
const crypto = require('crypto');
const fs = require('fs')
const request = require('request-promise-native');
const Monero = require('monerojs');
const havenNetwork = process.env.NETWORK || 'mainnet';
const havenWalletRpcHost = process.env.BACK_WALLET_RPC_HOST || '127.0.0.1';
const havenWalletRpcPort = process.env.BACK_WALLET_RPC_PORT || '12345';


const allowedMethods = [ 'refresh', 'get_height', 'get_address',  'get_balance', 'restore_deterministic_wallet', 'query_key', 'transfer', 'get_transfers', 'create_wallet'];


function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};
async function sleep(fn, ...args) {
  await timeout(3000);
  return fn(...args);
}

class HavenRPCProvider {
  
  constructor() {

    // Load the config file, which should tell us how many RPC daemons to connect to, etc
    this.config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
    if (!Object.hasOwnProperty.call(this.config, havenNetwork) || !Object.hasOwnProperty.call(this.config[havenNetwork], "daemons") || !this.config[havenNetwork].daemons.length) {
      console.error(havenNetwork);
      console.error(this.config[havenNetwork]);
      console.error(this.config[havenNetwork].daemons);
      console.error(this.config[havenNetwork].daemons.length);
      throw new Error("HavenRPCProvider::HavenRPCProvider() : error - no daemons configured");
    }

    // Create our pool of MoneroJS instances, associated with the specified RPC daemons
    this.arrDaemonPool = [];
    for (var daemon of this.config[havenNetwork].daemons) {
      this.arrDaemonPool.push(daemon);
    }
    
    // Maintain a singleton queue instance for serialisation
    this.queue = cq().limit({concurrency:1});

    // Tell the queue what function to call to process items
    this.queue.process(function(item) {
      console.log("calling _processRequest()");
      console.log(havenWalletRpcHost);
      console.log(havenWalletRpcPort);
      console.log(havenNetwork);
      console.log(item);

      // Get the pool daemon to use
      var daemon = this.arrDaemonPool.shift();
      if (!daemon) {
        console.error("ERROR - daemon pool is empty");
        return new Promise().reject("daemon pool is empty");
      }

      console.log("using daemon '" + daemon.name + "' (port:" + daemon.port + ")");
      
      // Call the handler with our selected daemon
      return this._processRequest(item, daemon);
      
    }.bind(this));

    // Maintain an array of the session data in memory
    this.sessions = {};
  }


  async _queueRequest(objRequest) {

    // Push an item into the queue
    return this.queue(objRequest);
  }


  async _processRequest(objRequest, daemon) {

    // Declare a variable to hold the MoneroJS handler
    var walletRPC;

    // Validate that we have a suitable request defined

    // Check if method is allowed
    if (!allowedMethods.some(method => method === objRequest.method)) {

      // Push the daemon back into the queue
      this.arrDaemonPool.push(daemon);

      throw {message:"method not allowed", code: -500};
    }

    // Check to see if we have a session defined already
    if (objRequest.sessionID) {

      // Look up the session id in our array
      if (!this.sessions.hasOwnProperty(objRequest.sessionID)) {

        // Push the daemon back into the queue
        this.arrDaemonPool.push(daemon);

        // Invalid session - bail out with a suitable error message
        throw {message: "invalid session ID provided", code: -500};
      }

      // Got a valid session - invoke the MoneroJS code accordingly to open the wallet
      let result, resultPrivate;
      try {
        // Create a new connection to the RPC server
        //walletRPC = await new Monero.walletRPC({ hostname: havenWalletRpcHost, port: havenWalletRpcPort, protocol: 'http', user:'dwb', pass:'dwb', autoconnect:false, network:havenNetwork });
        walletRPC = await new Monero.walletRPC(daemon);

        // Issue the open_wallet() call
        resultPrivate = await walletRPC.open_wallet(this.sessions[objRequest.sessionID].filename,
                                                    this.sessions[objRequest.sessionID].password);

        // HERE BE DRAGONS!!!
        // NEAC - this *might* need to be a use of ".call()" or ".apply()" to supply the params separately, rather than as an object
        // Issue the desired query
        if ((objRequest.method == "get_balance") || (objRequest.method == "get_transfers")) {

          // NEAC - Refresh wallet to get balance working
          resultPrivate = await walletRPC._run("refresh");
        }
        result = await walletRPC._run(objRequest.method, objRequest.params);
        // LAND AHOY!!!

        // Close the wallet
        resultPrivate = await walletRPC._run("close_wallet");

        // Push the daemon back into the queue
        this.arrDaemonPool.push(daemon);
        
        // Resolve the promise with the result
        return result;

      } catch(e) {

        // Push the daemon back into the queue
        this.arrDaemonPool.push(daemon);

        // Return error
        return e;
      }

    } else if (objRequest.method == "generate_from_keys") {

      // Attempting to log in - create high-entropy filename, password and session token
      while(1) {
        var strSessionID = crypto.randomBytes(32).toString('hex');
        if (this.sessions.hasOwnProperty(strSessionID)) {
          continue;
        }
        this.sessions[strSessionID] = {
          filename: crypto.randomBytes(32).toString('hex') + new Date().getTime(),
          password: crypto.randomBytes(32).toString('hex')
        };
        break;
      }

      // Add the filename and password to the parameters we send to the server
      var objParams = {
        filename:this.sessions[strSessionID].filename,
        address:objRequest.params.address,
        spendkey:objRequest.params.spendkey,
        viewkey:objRequest.params.viewkey,
        password:this.sessions[strSessionID].password,
        language:objRequest.params.language
      };

      let result, resultPrivate;
      try {
        // Create a new connection to the RPC server
        //walletRPC = await new Monero.walletRPC({ hostname: havenWalletRpcHost, port: havenWalletRpcPort, protocol: 'http', user:'dwb', pass:'dwb', autoconnect:false, network:havenNetwork });
        walletRPC = await new Monero.walletRPC(daemon);

        // Generate a wallet from the keys
        result = await walletRPC._run("generate_from_keys", objParams);

        // NEAC - Refresh wallet to get balance working
        //resultPrivate = await walletRPC._run("refresh");

        // Close the wallet for now
        resultPrivate = await walletRPC._run("close_wallet");

        // Append the session id to the result
        result.sessionid = strSessionID;
        
        return result;

      } catch (e) {

        // Push the daemon back into the queue
        this.arrDaemonPool.push(daemon);

      }

    } else if (objRequest.method == "restore_deterministic_wallet") {

      // Attempting to log in - create high-entropy filename, password and session token
      while(1) {
        var strSessionID = crypto.randomBytes(32).toString('hex');
        if (this.sessions.hasOwnProperty(strSessionID)) {
          continue;
        }
        this.sessions[strSessionID] = {
          filename: crypto.randomBytes(32).toString('hex') + new Date().getTime(),
          password: crypto.randomBytes(32).toString('hex')
        };
        break;
      }

      // Add the filename and password to the parameters we send to the server
      var objParams = {
        filename:this.sessions[strSessionID].filename,
        seed:objRequest.params.seed,
        seed_offset:objRequest.params.seed_offset,
        password:this.sessions[strSessionID].password,
        language:objRequest.params.language
      };

      console.log("walletRPC called with params:");
      console.log(objParams);

      let result, resultPrivate;
      try {

        // Create a new connection to the RPC server
        //walletRPC = await new Monero.walletRPC({ hostname: havenWalletRpcHost, port: havenWalletRpcPort, protocol: 'http', user:'dwb', pass:'dwb', autoconnect:false, network:havenNetwork });
        walletRPC = await new Monero.walletRPC(daemon);

        // Generate a wallet from the keys
        result = await walletRPC._run("restore_deterministic_wallet", objParams);

        // NEAC - Refresh wallet to get balance working
        //resultPrivate = await walletRPC._run("refresh");

        // Close the wallet for now
        resultPrivate = await walletRPC._run("close_wallet");

        //if error is given back we can throw away objParams

        // Push the daemon back into the queue
        this.arrDaemonPool.push(daemon);

        // Append the session id to the result if no error answer
        if (!result.error)
          result.sessionid = strSessionID;
        return result;

      } catch (e) {

      }

    }
    else if (objRequest.method == "create_wallet") {

      // Attempting to log in - create high-entropy filename, password and session token
      while(1) {
        var strSessionID = crypto.randomBytes(32).toString('hex');
        if (this.sessions.hasOwnProperty(strSessionID)) {
          continue;
        }
        this.sessions[strSessionID] = {
          filename: crypto.randomBytes(32).toString('hex') + new Date().getTime(),
          password: crypto.randomBytes(32).toString('hex')
        };
        break;
      }

      // Add the filename and password to the parameters we send to the server
      var objParams = {
        filename:this.sessions[strSessionID].filename,
        password:this.sessions[strSessionID].password,
        language:objRequest.params.language
      };

      console.log("walletRPC called with params:");
      console.log(objParams);

      let result, resultPrivate;
      try {

        // Create a new connection to the RPC server
        walletRPC = await new Monero.walletRPC({ hostname: havenWalletRpcHost, port: havenWalletRpcPort, protocol: 'http', user:'dwb', pass:'dwb', autoconnect:false, network:havenNetwork });

        // Generate a wallet from the keys
        result = await walletRPC._run("create_wallet", objParams);

        // NEAC - Refresh wallet to get balance working
        //resultPrivate = await walletRPC._run("refresh");

        // Close the wallet for now
        resultPrivate = await walletRPC._run("close_wallet");

        // Push the daemon back into the queue
        this.arrDaemonPool.push(daemon);

        // Append the session id to the result
        result.sessionid = strSessionID;
        return result;

      } catch (e) {

        // Push the daemon back into the queue
        this.arrDaemonPool.push(daemon);

      }

    }
    else {

      // Push the daemon back into the queue
      this.arrDaemonPool.push(daemon);

      // No session provided - bail out with a suitable error message
      return {message:"missing session ID", code:-500};
    }
  }

/*
  async _run(objRequest) {

    let walletRPC;

    // Validate that we have a suitable request defined

    // Check to see if we have a session defined already
    if (objRequest.sessionID) {

      // Look up the session id in our array
      if (!this.sessions.hasOwnProperty(objRequest.sessionID)) {

        // Invalid session - bail out with a suitable error message
        return {message:"invalid session ID provided", code: -500};
      }

      // Got a valid session - invoke the MoneroJS code accordingly to open the wallet
      let result, resultPrivate;
      try {
        // Create a new connection to the RPC server
        walletRPC = await new Monero.walletRPC({ hostname: havenWalletRpcHost, port: havenWalletRpcPort, protocol: 'http', user:'dwb', pass:'dwb', autoconnect:false, network:havenNetwork });

        // Issue the open_wallet() call
        resultPrivate = await walletRPC.open_wallet(this.sessions[objRequest.sessionID].filename,
                                                    this.sessions[objRequest.sessionID].password);

        // HERE BE DRAGONS!!!
        // NEAC - this *might* need to be a use of ".call()" or ".apply()" to supply the params separately, rather than as an object
        // Issue the desired query
        if (objRequest.method == "get_balance") {

          // NEAC - Refresh wallet to get balance working
          resultPrivate = await walletRPC._run("refresh");

          //await timeout(5000);
        }
        result = await walletRPC._run(objRequest.method, objRequest.params);
        // LAND AHOY!!!

        // Close the wallet
        resultPrivate = await walletRPC._run("close_wallet");

        // Resolve the promise with the result
        return result;

      } catch(e) {

        // Return error
        return e;
      }

    } else if (objRequest.method == "generate_from_keys") {

      // Attempting to log in - create high-entropy filename, password and session token
      while(1) {
        var strSessionID = crypto.randomBytes(32).toString('hex');
        if (this.sessions.hasOwnProperty(strSessionID)) {
          continue;
        }
        this.sessions[strSessionID] = {
          filename: crypto.randomBytes(32).toString('hex') + new Date().getTime(),
          password: crypto.randomBytes(32).toString('hex')
        };
        break;
      }

      // Add the filename and password to the parameters we send to the server
      var objParams = {
        filename:this.sessions[strSessionID].filename,
        address:objRequest.params.address,
        spendkey:objRequest.params.spendkey,
        viewkey:objRequest.params.viewkey,
        password:this.sessions[strSessionID].password,
        language:objRequest.params.language
      };

      let result, resultPrivate;
      try {
        // Create a new connection to the RPC server
        walletRPC = await new Monero.walletRPC({ hostname: havenWalletRpcHost, port: havenWalletRpcPort, protocol: 'http', user:'dwb', pass:'dwb', autoconnect:false, network:havenNetwork });

        // Generate a wallet from the keys
        result = await walletRPC._run("generate_from_keys", objParams);

        // NEAC - Refresh wallet to get balance working
        //resultPrivate = await walletRPC._run("refresh");

        // Close the wallet for now
        resultPrivate = await walletRPC._run("close_wallet");

        // Append the session id to the result
        result.sessionid = strSessionID;
        return result;

      } catch (e) {

      }

    } else if (objRequest.method == "restore_deterministic_wallet") {

      // Attempting to log in - create high-entropy filename, password and session token
      while(1) {
        var strSessionID = crypto.randomBytes(32).toString('hex');
        if (this.sessions.hasOwnProperty(strSessionID)) {
          continue;
        }
        this.sessions[strSessionID] = {
          filename: crypto.randomBytes(32).toString('hex') + new Date().getTime(),
          password: crypto.randomBytes(32).toString('hex')
        };
        break;
      }

      // Add the filename and password to the parameters we send to the server
      var objParams = {
        filename:this.sessions[strSessionID].filename,
        seed:objRequest.params.seed,
        seed_offset:objRequest.params.seed_offset,
        password:this.sessions[strSessionID].password,
        language:objRequest.params.language
      };

      let result, resultPrivate;
      try {

        // Create a new connection to the RPC server
        walletRPC = await new Monero.walletRPC({ hostname: havenWalletRpcHost, port: havenWalletRpcPort, protocol: 'http', user:'dwb', pass:'dwb', autoconnect:false, network:havenNetwork });

        // Generate a wallet from the keys
        result = await walletRPC._run("restore_deterministic_wallet", objParams);

        // NEAC - Refresh wallet to get balance working
        //resultPrivate = await walletRPC._run("refresh");

        // Close the wallet for now
        resultPrivate = await walletRPC._run("close_wallet");

        // Append the session id to the result
        result.sessionid = strSessionID;
        return result;

      } catch (e) {

      }

    } else {

      // No session provided - bail out with a suitable error message
      return {message:"missing session ID", code: -500};
    }
  }      
*/
};

module.exports = HavenRPCProvider;
