import type { NextPage } from "next";
import styles from "../styles/Theme.module.css";
import Link from "next/link";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useContext, useEffect, useState } from "react";
import { Stats } from "../components/Stats";
import { ethers } from "ethers";
import { useAddress } from "@thirdweb-dev/react";
import { Alchemy, Network, TokenBalance, TokenBalancesResponseErc20, TokenBalanceType } from "alchemy-sdk";
import { Footer } from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import abi from '../context/polygonabi.json';
import UserContext from "../context/User";
import dotenv from 'dotenv';

declare let window: any;
async function connect(){
if (!window.ethereum){
    return;
}else{

}
}

const config = {
    apiKey:ALCHEMY_API,
    network: Network.ETH_MAINNET,
}
const configP = {
    apiKey: POLYGON_API,
    network: Network.MATIC_MAINNET,
}
const alchemyP = new Alchemy(configP);
const alchemy = new Alchemy(config);
//const abi2 = require("../context/polygonabi.json");

const Dashboard: NextPage = () => {  
    
    const person = useContext(UserContext)
    const quicknode = QUICKNODE_URL;
    const address = useAddress();
    const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>();
    const [isConnectedtoFB, setIsConnectedtoFB]= useState(false);
    const polygonprovider = new ethers.providers.JsonRpcProvider(quicknode);
    const provider = new ethers.providers.AlchemyProvider('mainnet', ALCHEMY_API);
    const contractAddress = "0x882a1613FCf832f0c1BCE5C61C3869B28E84F8B5";
    const contract = new ethers.Contract(contractAddress, abi, polygonprovider);
    const [checkStatus, setCheckStatus] = useState(false);
    const [polygonNFTimage, setPolygonNFTImage] = useState('');
    const [ethNFTimage, setEthNFTimage] = useState('');
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
    const getBlockNumber = async () =>{
        if(!address){
            return;
        }
        const balances = await alchemy.core.getTokenBalances(address!)
        setTokenBalances(balances.tokenBalances);
       
       
       console.log(balances.tokenBalances);
       const block =  await provider.getBlockNumber();
        const boflove = await contract.balanceOf(address!.toString());
       const polygonblock = await polygonprovider.getBlockNumber();
        const balance = await polygonprovider.getBalance(address!);
        const balanceLove = ethers.utils.formatEther(boflove.toBigInt());
        console.log(block, polygonblock, balance.toBigInt(), balanceLove, balances);
    }
    const userAddress = useAddress();
    const [userProfilePic,setUserProfilePic]= useState('');
    const [balance, setBalance] = useState(0)
    const { connection } = useConnection()
    const { publicKey } = useWallet()
    useEffect(()=>{
    
        if(window.FB === undefined){
          return;
        }
        window.FB.getLoginStatus(function(response:any) {
          if (response.status === 'connected') {
            setIsConnectedtoFB(true);
            setCheckStatus(false);
            person.setUser(response.authResponse.accessToken);
           window.FB.api('/me/picture?width=200&height=200',{access_token:person.user},{redirect:false}, function(r:any){console.log(r.data.url);setUserProfilePic(r.data.url)});
          } else {
            
            setIsConnectedtoFB(false);
            console.log("not signed in")
          }
        });
      },[isConnectedtoFB, person])
     
    
    useEffect(() => {
        if (!connection || !publicKey) { return }
    
        connection.getAccountInfo(publicKey).then(info => {
            setBalance(info!.lamports)
        })
    }, [connection, publicKey])
    const handleLogin = async () => {
        const hty = await window.FB.login(function(response:any){
            console.log(response, "hello");
            setCheckStatus(true);
            setIsConnectedtoFB(true);
            if(response.authResponse == null){
                return;
            }
            if(response.authResponse.status == "connected"){
             person.setUser(response.authResponse.accessToken)
                setIsConnectedtoFB(true);
                window.FB.api('/me/picture?width=200&height=200',{access_token:person.user},{redirect:false}, function(r:any){console.log(r.data.url);setUserProfilePic(r.data.url)});

       
               
            }else if(response.authResponse.status ==="unknown"){
                setCheckStatus(true);
            }
            
        },{scope: "public_profile,email,instagram_basic", auth_type:"rerequest"})
        setCheckStatus(true);
    }
    const handleLogout = async () =>{
        await window.FB.logout(function(response:any){console.log(response)});
        setIsConnectedtoFB(false);
        person.setUser('nouser')
    }
    const handleShare = async () =>{
        await window.FB.ui({
            display:"popup",
            method: "share",
            href: "https://themiracle.love"
        },function(response:any){console.log(response)});
    }
    const getPic = async () => {
        await window.FB.api('/me',{access_token:person.user},{redirect:false},
            function(response:any){
                console.log(response)
                return response;
            }
        );
    }
  
useEffect(()=>{
   
})
   useEffect(()=>{
    if(!isConnectedtoFB){
        return;
    }else{
        const hey = getPic();
        console.log(hey)
    }
   })
   useEffect(()=>{
    if(tokenBalances){
        return;
    }
    if(address){
        getNFTs();
        getBlockNumber();
       if(document.getElementById('connectWallet')){
        document.getElementById('connectWallet')!.style.visibility = "hidden";
              
        document.getElementById('connectWallet')!.style.display = "none";
       }
    }
    
   })
    return (
        <>
        <div className={styles.container}>
        
        {isConnectedtoFB? (<picture><img id={styles.fbpropic}src={userProfilePic} alt='propic'></img></picture>):(<picture><img id={styles.fbpropic} src="/emptyProfilepic.JPG" alt="propic"/></picture>)}
        
            <Stats/>
            <picture> <img style={{width: "150px", height:"150px"}}src={polygonNFTimage} alt="nft"/> </picture>
            <div>{tokenBalances ? ( <p>{tokenBalances.map((index)=>{if(tokenBalances !== undefined){return(<p key={index.tokenBalance}>contract address:{index.contractAddress}<br/>balance:{ethers.utils.formatUnits(index.tokenBalance!)}</p>)}})}</p>):(<p>connect wallet</p>)}</div>
            <div id={styles.memodal} className={styles.memodal}>
            <p>you are awesome from themiracle.love</p>
            </div>
            <p>{publicKey ? `Balance: ${balance / LAMPORTS_PER_SOL} SOL` : ''}</p>
            {isConnectedtoFB ? (<><button id={styles.fblogout} onClick={()=>{handleLogout()}}>logout of FB</button><button id={styles.fbshare} onClick={()=>{handleShare()}}>share to <FontAwesomeIcon icon={faFacebook}/></button></>):(<button id={styles.fblogin}onClick={()=>{handleLogin()}}><FontAwesomeIcon icon={faFacebook}/> login to FB</button>)}
            
        </div>
        <div id="connectWallet"className={styles.connectWallet}><p>connect website to wallets to see balances</p></div>
        </>
   
    );
};
export default Dashboard;