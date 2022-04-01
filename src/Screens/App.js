import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../Components/Navbar";
import getSignerOrProvider from "../scripts/Provider";
import Blogs from "./Blogs";
import Coins from "./Coins";
import NFT from "./NFT";

function App() {
    useEffect(()=>{
        getSignerOrProvider();
    },[])

    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
              <Route path="/" element={<Blogs/>}/>
              <Route path="/nft" element={<NFT/>}/>
              <Route path="/coins" element={<Coins/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
