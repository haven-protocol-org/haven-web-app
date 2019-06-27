
var cq = require('concurrent-queue');
var crypto = require('crypto');
const request = require('request-promise-native');
const Monero = require('monerojs');
const havenNetwork = process.env.NETWORK || 'mainnet';
const havenWalletRpcHost = process.env.BACK_WALLET_RPC_HOST || '127.0.0.1';
const havenWalletRpcPort = process.env.BACK_WALLET_RPC_PORT || '12345';

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function sleep(fn, ...args) {
  await timeout(3000);
  return fn(...args);
}

class HavenRPCProvider {

    constructor() {

        // Maintain a singleton queue instance for serialisation
        this.queue = cq();

        // Tell the queue what function to call to process items
        this.queue.process(function(item) {
            console.log("calling _processRequest()");
            console.log(havenWalletRpcHost);
            console.log(havenWalletRpcPort);
            console.log(havenNetwork);
            console.log(item);
            return this._processRequest(item);
        }.bind(this));

        // Maintain an array of the session data in memory
        this.sessions = {};
    }


    async _queueRequest(objRequest) {

        // Push an item into the queue
        return this.queue(objRequest);
    }


    async _processRequest(objRequest, cb) {

        // Declare a variable to hold the MoneroJS handler
        var walletRPC;

        // Validate that we have a suitable request defined

        // Check to see if we have a session defined already
        if (objRequest.sessionID) {

            // Look up the session id in our array
            if (!this.sessions.hasOwnProperty(objRequest.sessionID)) {

                // Invalid session - bail out with a suitable error message
                throw {status:"error", error:"invalid session ID provided"};
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

            console.log("walletRPC called with params:");
            console.log(objParams);

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
            return {status:"error", error:"missing session ID"};
        }
        this.sessions[strSessionID] = {
          filename:
            crypto.randomBytes(32).toString("hex") + new Date().getTime(),
          password: crypto.randomBytes(32).toString("hex")
        };
        break;
      }

      // Add the filename and password to the parameters we send to the server
      var objParams = {
        filename: this.sessions[strSessionID].filename,
        address: objRequest.params.address,
        spendkey: objRequest.params.spendkey,
        viewkey: objRequest.params.viewkey,
        password: this.sessions[strSessionID].password,
        language: objRequest.params.language
      };

      let result, resultPrivate;
      try {
        // Create a new connection to the RPC server
        walletRPC = await new Monero.walletRPC({
          hostname: "127.0.0.1",
          port: 12345,
          protocol: "http",
          user: "dwb",
          pass: "dwb",
          autoconnect: false,
          network: "testnet"
        });

        // Generate a wallet from the keys
        result = await walletRPC._run("generate_from_keys", objParams);

        // NEAC - Refresh wallet to get balance working
        //resultPrivate = await walletRPC._run("refresh");

        // Close the wallet for now
        resultPrivate = await walletRPC._run("close_wallet");

        // Append the session id to the result
        result.sessionid = strSessionID;
        return result;
      } catch (e) {}
    } else if (objRequest.method == "restore_deterministic_wallet") {
      // Attempting to log in - create high-entropy filename, password and session token
      while (1) {
        var strSessionID = crypto.randomBytes(32).toString("hex");
        if (this.sessions.hasOwnProperty(strSessionID)) {
          continue;
        }
        this.sessions[strSessionID] = {
          filename:
            crypto.randomBytes(32).toString("hex") + new Date().getTime(),
          password: crypto.randomBytes(32).toString("hex")
        };
        break;
      }

      // Add the filename and password to the parameters we send to the server
      var objParams = {
        filename: this.sessions[strSessionID].filename,
        seed: objRequest.params.seed,
        seed_offset: objRequest.params.seed_offset,
        password: this.sessions[strSessionID].password,
        language: objRequest.params.language
      };

      console.log("walletRPC called with params:");
      console.log(objParams);

      let result, resultPrivate;
      try {
        // Create a new connection to the RPC server
        walletRPC = await new Monero.walletRPC({
          hostname: "127.0.0.1",
          port: 12345,
          protocol: "http",
          user: "dwb",
          pass: "dwb",
          autoconnect: false,
          network: "testnet"
        });

        // Generate a wallet from the keys
        result = await walletRPC._run(
          "restore_deterministic_wallet",
          objParams
        );

        // NEAC - Refresh wallet to get balance working
        //resultPrivate = await walletRPC._run("refresh");

        // Close the wallet for now
        resultPrivate = await walletRPC._run("close_wallet");

        // Append the session id to the result
        result.sessionid = strSessionID;
        return result;
      } catch (e) {}
    } else {
      // No session provided - bail out with a suitable error message
      return { status: "error", error: "missing session ID" };
    }


    async _run(objRequest) {

        var walletRPC;

        // Validate that we have a suitable request defined

        // Check to see if we have a session defined already
        if (objRequest.sessionID) {

            // Look up the session id in our array
            if (!this.sessions.hasOwnProperty(objRequest.sessionID)) {

                // Invalid session - bail out with a suitable error message
                return {status:"error", error:"invalid session ID provided"};
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
            return {status:"error", error:"missing session ID"};
        }
        result = await walletRPC._run(objRequest.method, objRequest.params);
        // LAND AHOY!!!

        // Close the wallet
        resultPrivate = await walletRPC._run("close_wallet");

        // Resolve the promise with the result
        return result;
      } catch (e) {
        // Return error
        return e;
      }
    } else if (objRequest.method == "generate_from_keys") {
      // Attempting to log in - create high-entropy filename, password and session token
      while (1) {
        var strSessionID = crypto.randomBytes(32).toString("hex");
        if (this.sessions.hasOwnProperty(strSessionID)) {
          continue;
        }
        this.sessions[strSessionID] = {
          filename:
            crypto.randomBytes(32).toString("hex") + new Date().getTime(),
          password: crypto.randomBytes(32).toString("hex")
        };
        break;
      }

      // Add the filename and password to the parameters we send to the server
      var objParams = {
        filename: this.sessions[strSessionID].filename,
        address: objRequest.params.address,
        spendkey: objRequest.params.spendkey,
        viewkey: objRequest.params.viewkey,
        password: this.sessions[strSessionID].password,
        language: objRequest.params.language
      };

      let result, resultPrivate;
      try {
        // Create a new connection to the RPC server
        walletRPC = await new Monero.walletRPC({
          hostname: "127.0.0.1",
          port: 12345,
          protocol: "http",
          user: "dwb",
          pass: "dwb",
          autoconnect: false,
          network: "testnet"
        });

        // Generate a wallet from the keys
        result = await walletRPC._run("generate_from_keys", objParams);

        // NEAC - Refresh wallet to get balance working
        //resultPrivate = await walletRPC._run("refresh");

        // Close the wallet for now
        resultPrivate = await walletRPC._run("close_wallet");

        // Append the session id to the result
        result.sessionid = strSessionID;
        return result;
      } catch (e) {}
    } else if (objRequest.method == "restore_deterministic_wallet") {
      // Attempting to log in - create high-entropy filename, password and session token
      while (1) {
        var strSessionID = crypto.randomBytes(32).toString("hex");
        if (this.sessions.hasOwnProperty(strSessionID)) {
          continue;
        }
        this.sessions[strSessionID] = {
          filename:
            crypto.randomBytes(32).toString("hex") + new Date().getTime(),
          password: crypto.randomBytes(32).toString("hex")
        };
        break;
      }

      // Add the filename and password to the parameters we send to the server
      var objParams = {
        filename: this.sessions[strSessionID].filename,
        seed: objRequest.params.seed,
        seed_offset: objRequest.params.seed_offset,
        password: this.sessions[strSessionID].password,
        language: objRequest.params.language
      };

      let result, resultPrivate;
      try {
        // Create a new connection to the RPC server
        walletRPC = await new Monero.walletRPC({
          hostname: "127.0.0.1",
          port: 12345,
          protocol: "http",
          user: "dwb",
          pass: "dwb",
          autoconnect: false,
          network: "testnet"
        });

        // Generate a wallet from the keys
        result = await walletRPC._run(
          "restore_deterministic_wallet",
          objParams
        );

        // NEAC - Refresh wallet to get balance working
        //resultPrivate = await walletRPC._run("refresh");

        // Close the wallet for now
        resultPrivate = await walletRPC._run("close_wallet");

        // Append the session id to the result
        result.sessionid = strSessionID;
        return result;
      } catch (e) {}
    } else {
      // No session provided - bail out with a suitable error message
      return { status: "error", error: "missing session ID" };
    }
  }
}

module.exports = HavenRPCProvider;
