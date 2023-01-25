import React, {FC, useEffect, useState} from "react";
import stats from './stats.module.css';
import { ethers } from "ethers";
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useAddress } from "@thirdweb-dev/react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Alchemy, Network, TokenBalance, TokenBalancesResponseErc20, TokenBalanceType } from "alchemy-sdk";
import abi from '../context/polygonabi.json';
import nftAbi from '../context/polygonnftabi.json';;

declare let window: any;
async function connect(){
if (!window.ethereum){
    return;
}else{

}
}
const config = {
    apiKey: ALCHEMY_API,
    network: Network.ETH_MAINNET,
}
const configP = {
    apiKey: POLYGON_API,
    network: Network.MATIC_MAINNET,
}
const alchemyP = new Alchemy(configP);
const alchemy = new Alchemy(config);
export const Stats = (props:any) =>{
    const provider = ethers.getDefaultProvider();
    const [balanceofSol, setBalanceofSol]= useState(0);
    const [balanceL, setBalanceL] = useState('');
    const [balanceG, setBalanceG] = useState<BigInt>();
    const address = useAddress();
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const ethAddress = useAddress();
    const [polygonNFTimage, setPolygonNFTImage] = useState('');
    const [ethNFTimage, setEthNFTimage] = useState('');
    useEffect(() => {
        if (!connection || !publicKey) { return }
    
        connection.getAccountInfo(publicKey).then(info => {
            setBalanceofSol(info!.lamports)
        })
    }, [connection, publicKey])
    const getNFTs = async () => {
        if(!address){
            return;
        }
        const PNFTs = await alchemyP.nft.getNftsForOwner(address);
        if(PNFTs.ownedNfts.length > 0){
        const listP = PNFTs.ownedNfts[0].rawMetadata?.image!.replace("ipfs://", "https://gateway.ipfscdn.io/ipfs/");
        setPolygonNFTImage(listP!);
        }else{
            setPolygonNFTImage("https://themiracle.love/nopolygon.png");
        }
        const NFTs = await alchemy.nft.getNftsForOwner(address);
        if(NFTs.ownedNfts.length > 0){
            const listE = NFTs.ownedNfts[0].rawMetadata?.image!.replace("ipfs://","https://gateway.ipfscdn.io/ipfs/" );
        console.log(NFTs, PNFTs);
        }else{
            setEthNFTimage("https://themiracle.love/noeth.png");
        }
    }
    return(
        <div className={stats.userProfile}>
        <h1>your stats</h1>
        <hr/>
        <p>your balances:</p>
        
        </div>
    )
}