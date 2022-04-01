import { providers } from "ethers";
import Web3Modal from "web3modal";

const getSignerOrProvider = async (getSigner = false) => {
    const modalRef = new Web3Modal();
    const provider = await modalRef.connect();
    const web3provider = new providers.Web3Provider(provider);

    const { chainId } = await web3provider.getNetwork();
    if (chainId !== 4) {
        window.alert("Change the network to rinkeby");
        throw new Error("Change network to rinkeby");
    }

    if (getSigner) {
        const signer = web3provider.getSigner();
        return signer;
    }
    return web3provider;
};

export default getSignerOrProvider;
