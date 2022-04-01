import { utils } from "ethers";
import { useEffect, useState } from "react";
import {
    buyCoins,
    getBalance,
    getTotalSupply,
    sellCoins,
} from "../scripts/Coins";
import "../styles/coins.css";

export default function Coins() {
    let [total, setTotal] = useState(0);
    let [balance, setBalance] = useState(0);
    let [amount, setAmount] = useState(0);
    let [reload, setReload] = useState(false);

    const handleAmount = (e) => {
        setAmount(e.target.value);
    };

    const handleSell = async (e) => {
        await sellCoins(amount);
        setAmount(0);
        setReload(!reload);
    };

    const handleBuy = async (e) => {
        await buyCoins(amount);
        setAmount(0);
        setReload(!reload);
    };

    useEffect(() => {
        getTotalSupply().then((val) => {
            setTotal(val);
        });
        getBalance().then((val) => {
            setBalance(val);
        });
    }, [reload]);

    return (
        <div className="centerscreen">
            <div className="card text-center" style={{ width: "20rem" }}>
                <div className="card-body">
                    <h5 className="card-title mb-3">
                        BloggerCoin(BLC) Exchange
                    </h5>
                    <p className="card-text">BLC coin cost: 0.001 ether</p>
                    <p className="card-text">
                        Total Supply: {utils.formatEther(total)}
                    </p>
                    <p className="card-text">
                        Your Balance: {utils.formatEther(balance)}
                    </p>
                    <input
                        type="number"
                        className="form-control"
                        value={amount}
                        onChange={handleAmount}
                    ></input>
                    <button
                        className="btn btn-primary m-1 mt-3"
                        onClick={handleBuy}
                    >
                        Buy Coins
                    </button>
                    <button
                        className="btn btn-primary m-1 mt-3"
                        onClick={handleSell}
                    >
                        Sell Coins
                    </button>
                </div>
            </div>
        </div>
    );
}
