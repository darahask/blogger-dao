import { Contract } from "ethers";
import { NFT_ABI, NFT_ADDRESS } from "../constants";
import { approve } from "./Coins";
import getSignerOrProvider from "./Provider";

async function getTotalSupply() {
    try {
        const provider = await getSignerOrProvider(true);
        const nftContract = new Contract(NFT_ADDRESS, NFT_ABI, provider);
        let supply = await nftContract.totalSupply();
        return supply;
    } catch (e) {
        console.log(e);
    }
}

async function getBalance() {
    try {
        const signer = await getSignerOrProvider(true);
        const nftContract = new Contract(NFT_ADDRESS, NFT_ABI, signer);
        const address = await signer.getAddress();
        let balance = await nftContract.balanceOf(address);
        return balance;
    } catch (e) {
        console.log(e);
    }
}

async function buyNFT() {
    try {
        const signer = await getSignerOrProvider(true);
        const nftContract = new Contract(NFT_ADDRESS, NFT_ABI, signer);
        await approve(10);
        const tx = await nftContract.mint();
        await tx.wait();
    } catch (e) {
        console.log(e);
    }
}

async function sellNFT() {
    try {
        const signer = await getSignerOrProvider(true);
        const nftContract = new Contract(NFT_ADDRESS, NFT_ABI, signer);
        const tx = await nftContract.sell();
        await tx.wait()
    } catch (e) {
        console.log(e);
    }
}

export { getTotalSupply, getBalance, buyNFT, sellNFT };
