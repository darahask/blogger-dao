import { Contract, utils } from "ethers";
import { BLC_ABI, BLC_ADDRESS, NFT_ADDRESS } from "../constants";
import getSignerOrProvider from "./Provider";

async function getTotalSupply() {
    try {
        const provider = await getSignerOrProvider(true);
        const coinContract = new Contract(BLC_ADDRESS, BLC_ABI, provider);
        return await coinContract.totalSupply();
    } catch (e) {
        console.log(e);
    }
}

async function getBalance() {
    try {
        const signer = await getSignerOrProvider(true);
        const coinContract = new Contract(BLC_ADDRESS, BLC_ABI, signer);
        const address = await signer.getAddress();
        return await coinContract.balanceOf(address);
    } catch (e) {
        console.log(e);
    }
}

async function buyCoins(amount) {
    try {
        const signer = await getSignerOrProvider(true);
        const coinContract = new Contract(BLC_ADDRESS, BLC_ABI, signer);
        const value = 0.001 * amount;
        const tx = await coinContract.mint(amount, {
            value: utils.parseEther(value.toString()),
        });
        await tx.wait();
    } catch (e) {
        console.log(e);
    }
}

async function sellCoins(amount) {
    try {
        const provider = await getSignerOrProvider(true);
        const coinContract = new Contract(BLC_ADDRESS, BLC_ABI, provider);
        const tx = await coinContract.sell(amount);
        await tx.wait();
    } catch (e) {
        console.log(e);
    }
}

async function approve(amount) {
    try {
        const signer = await getSignerOrProvider(true);
        const coinContract = new Contract(BLC_ADDRESS, BLC_ABI, signer);
        let tx = await coinContract.approve(
            NFT_ADDRESS,
            utils.parseEther(amount.toString())
        );
        await tx.wait()
    } catch (e) {
        console.log(e);
    }
}

export { getTotalSupply, getBalance, buyCoins, sellCoins, approve };
