import { Contract } from "ethers";
import { DAO_ABI, DAO_ADDRESS } from "../constants";
import getSignerOrProvider from "./Provider";

async function getBlogs() {
    try {
        const provider = await getSignerOrProvider(true);
        const blogContract = new Contract(DAO_ADDRESS, DAO_ABI, provider);
        let supply = await blogContract.getBlogs();
        return supply;
    } catch (e) {
        console.log(e);
    }
}

async function postBlog(text) {
    try {
        const signer = await getSignerOrProvider(true);
        const blogContract = new Contract(DAO_ADDRESS, DAO_ABI, signer);
        const tx = await blogContract.postBlog(text);
        await tx.wait();
        return tx;
    } catch (e) {
        console.log(e);
    }
}

async function updateBlog(index, text) {
    try {
        const signer = await getSignerOrProvider(true);
        const blogContract = new Contract(DAO_ADDRESS, DAO_ABI, signer);
        let res = await blogContract.updateBlog(index, text);
        await res.wait();
        return res;
    } catch (e) {
        console.log(e);
    }
}

async function deleteBlog(index) {
    try {
        const signer = await getSignerOrProvider(true);
        const blogContract = new Contract(DAO_ADDRESS, DAO_ABI, signer);
        const tx = await blogContract.deleteBlog(index);
        await tx.wait();
        return tx;
    } catch (e) {
        console.log(e);
    }
}

export { getBlogs, postBlog, updateBlog, deleteBlog };
