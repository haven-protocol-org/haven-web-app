import {Havend} from "./daemons/Havend";
import {RPCWallet} from "./daemons/RPCWallet";



/**
 * responsible to wire everything together
 */
class HavenWallet {


    private readonly netConfig:NetConfig = process.env.HAVEN_NET === NET_TYPES.Mainnet ? MainnetConfig : TestNetConfig;



    private havend:Havend = new Havend();
    private rpcWallet:RPCWallet = new RPCWallet();











}




enum NET_TYPES {

    Mainnet='Mainnet',
    Testnet='Testnet'

}


interface NetConfig {

    havendPort:number,
    walletPort:number

}

const TestNetConfig:NetConfig = {

    havendPort:12345,
    walletPort:233232

};


const MainnetConfig:NetConfig = {

    havendPort:12345,
    walletPort:12345

};
