import { useEffect, useState } from "react";
import { sellNFT, getBalance, getTotalSupply, buyNFT } from "../scripts/NFT";

export default function Coins() {
    let [total, setTotal] = useState(0);
    let [balance, setBalance] = useState(0);

    const handleSell = (e) => {
        sellNFT().then(() => {
            loadData();
        });
    };

    const handleBuy = (e) => {
        buyNFT().then(() => {
            loadData();
        });
    };

    const loadData = () => {
        getTotalSupply().then((val) => {
            setTotal(val);
        });
        getBalance().then((val) => {
            setBalance(val);
        });
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="centerscreen">
            <div className="card text-center" style={{ width: "20rem" }}>
                <div className="card-body">
                    <h5 className="card-title mb-3">
                        BloggerNFT(BNFT) Exchange
                    </h5>
                    <p className="card-text">
                        Total Supply: {total.toString()}
                    </p>
                    <p className="card-text">
                        Your Balance: {balance.toString()} BNFT
                    </p>
                    <p className="card-text">Price: 10BLC</p>
                    <button
                        className="btn btn-primary m-1 mt-3"
                        onClick={handleBuy}
                    >
                        Buy NFT
                    </button>
                    <button
                        className="btn btn-primary m-1 mt-3"
                        onClick={handleSell}
                    >
                        Sell NFT
                    </button>
                </div>
            </div>
        </div>
    );
}
