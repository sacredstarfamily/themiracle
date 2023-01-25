import React,{useEffect} from "react";
import { FC } from "react";
import { useContext } from "react";
import ChainContext from "../context/Chain";
import Link from "next/link";
import st2 from '../styles/theme2.module.scss';
import styles from "../styles/Theme.module.css";
import st from "./topnav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ConnectWallet, ChainId, useChainId } from "@thirdweb-dev/react";
import { faTwitter, faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import Image from 'next/image'

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

export const TopNav:FC = ()  => {
  const chainNum = useChainId();
  function openNav(){
  document.getElementById("mySidenav")!.style.width = "250px";
  }
  function closeNav() {
    document.getElementById("mySidenav")!.style.width = "0";
  }
    const addresses = {
        [String(ChainId.Mainnet)]: "0x1b523F0F5A4f3262f4BAb17ab713ECd84db4949E",
        [String(ChainId.Polygon)]: "0x0F0ad403112c82d787AA59314851190C0C30fD78",
        [String(ChainId.Goerli)]: "0x69cf97D221a909BeF9657Ac4a38F899D95c3f073",
      };
      const tokenAddress = {
        [String(ChainId.Mainnet)]: "0x02123191302107b729E1D932d04A009125bA98C6",
        [String(ChainId.Polygon)]: "0x882a1613FCf832f0c1BCE5C61C3869B28E84F8B5",
        [String(ChainId.Goerli)]: "0x038F22E86ED35736d2204cBFFb2fbE094E9DEfB3",
      };
      const tokenId = 0;
  const { selectedChain, setSelectedChain } = useContext(ChainContext);
  const contractAddy = addresses[String(selectedChain)];
  const tokenAddy = tokenAddress[String(selectedChain)];
  useEffect(()=>{
   switch(chainNum){
    case 1:
      setSelectedChain(ChainId.Mainnet);
      break;
    case 5:
      setSelectedChain(ChainId.Goerli);
      break;
    case 137:
      setSelectedChain(ChainId.Polygon);
      break;
    default:
      break;
   }
   },[chainNum, setSelectedChain]);
    return (
    
   <>
   <div id="mySidenav" className={st.sidenav}>
  <button className={st.closebtn} onClick={()=>{closeNav()}}>&times;</button>
  <Link href="/"><a onClick={()=>{closeNav()}}>Home</a></Link>
  <Link href="./dashboard"><a onClick={()=>{closeNav()}}>Dashboard</a></Link>
  <Link href="./journey"><a onClick={()=>{closeNav()}}>Journey</a></Link>
  <Link href="./swag"><a onClick={()=>{closeNav()}}>Swag</a></Link>
  
  <Link href="./contact"><a onClick={()=>{closeNav()}}>Contact</a></Link>
  <div className={st.walletBtn}>
        <WalletMultiButton />
        <p style={{marginTop:"-5px"}}>solana wallet</p>
        </div>
        <div className={st.chainSelect}>
       <select
       style={{borderRadius:"10px"}}
        value={String(selectedChain)}
        onChange={(e) => setSelectedChain(parseInt(e.target.value))}
      >
        <option value={String(ChainId.Goerli)}>Goerli</option>
        <option value={String(ChainId.Mainnet)}>Ethereum Mainnet</option>
        <option value={String(ChainId.Polygon)}>Polygon</option>
        
      </select>
      <div className={st.walletconnect} style={{float:"left", paddingRight:"5px"}}>
      <ConnectWallet 
      colorMode="light"
      accentColor="purple"></ConnectWallet>
      </div>
    </div>
</div>
<span className={st.openBtn}onClick={()=>{openNav()}}>Menu</span>
    <div className="topnav"style={{
        position: "fixed",
       zIndex:"1",
        textShadow:"2px 2px #ffb330",
        color:"#d900ff",
        
        fontFamily:"'Times New Roman', Times, serif",
        fontStyle: "italic",
        top: "0px",
        width: "100%"
    }}>
 


     
<picture><img style={{marginTop:"50px", position:'static'}} src={'wordlogo.png'} alt="logo" width="50%"/></picture>	
<div id = "animation"style={{width:"100%"}}className={st2.animationwrapper}>
  <div className={st2.circle}></div>
  <div className={st2.circle}></div>
  <div className={st2.circle}></div>
  <div className={st2.circle}></div>
  <div className={st2.circle}></div>
  <div className={st2.circle}></div>
  <div className={st2.circle}></div>
  <div className={st2.circle}></div>
  </div>
    </div>
   
    </>
    
    );
}