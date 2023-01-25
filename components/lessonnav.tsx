import Link from "next/link";
import React, {FC, useState, useEffect, useContext} from "react";
import ChainContext from "../context/Chain";
import styles from '../styles/Theme.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faLock, faLockOpen} from "@fortawesome/free-solid-svg-icons";
import { useAddress, ChainId, useContract,useContractMetadata } from "@thirdweb-dev/react";


export const LessonNav: FC = () => {

    const userAddress = useAddress();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [hasCompleted, setHasCompleted] = useState(false);
    const [hasClaimedNFTG, setHasClaimedNFTG] = useState(false);
    const [hasClaimedNFTP, setHasClaimedNFTP] = useState(false);
    const [hasClaimedNFTE, setHasClaimedNFTE] = useState(false);
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
      const { selectedChain, setSelectedChain } = useContext(ChainContext);
      const contractAddy = addresses[String(selectedChain)];
      let { contract: editionDrop } = useContract(contractAddy, "edition-drop")!;
      let { data: contractMetadata } = useContractMetadata(editionDrop!);

    const toggle = () => {
        if(isOpen===true){
            document.getElementById("lessonTab")!.style.width="40px";
            }else{
                document.getElementById("lessonTab")!.style.width="150px";
            }
        setIsOpen(!isOpen);
    }
    function closeTab(){
        if(isOpen===true){
        document.getElementById("lessonTab")!.style.width="50px";
        }
    }
    function openTab(){
        if(isOpen===false){
            document.getElementById("lessonTab")!.style.width="150px";
        }
    }
    useEffect(()=>{
        let obj = localStorage.getItem('token');
        let keys = JSON.parse(obj || "{}");

        if(keys.site == "themiracle"){
            setIsLoggedIn(true);
            console.log(localStorage.getItem('token'));
        }else{

           setIsLoggedIn(false);
           console.log(localStorage.getItem('token'));
        }
    }, [])
    useEffect(()=>{
        if(userAddress){
            setHasCompleted(true);
        }
    },[userAddress]);
    useEffect(() => {
        // If they don't have an connected wallet, exit!
        if (!userAddress) {
          return;
        }
        if (!editionDrop || !contractMetadata){
          return;
        }
        const checkBalance = async () => {
          if(!editionDrop){
            return;
          }
          if(selectedChain === 5){
          try {
            const balance = await editionDrop.erc1155.balanceOf(userAddress, 0);
            if (balance.gt(0)) {
              setHasClaimedNFTG(true);
              console.log("🌟 this user has a membership NFT!");
            } else {
              setHasClaimedNFTG(false);
              console.log("😭 this user doesn't have a membership NFT.");
            }
          } catch (error) {
            setHasClaimedNFTG(false);
            console.error("Failed to get balance", error);
          }
          console.log("goerli chain");
        }else
        if (selectedChain === 137){
          try {
            
            const balance = await editionDrop.erc1155.balanceOf(userAddress, 0);
            if (balance.gt(0)) {
              setHasClaimedNFTP(true);
              console.log("🌟 this user has a membership NFT!");
            } else {
              setHasClaimedNFTP(false);
              console.log("😭 this user doesn't have a membership NFT.");
            }
          } catch (error) {
            setHasClaimedNFTP(false);
            console.error("Failed to get balance", error);
          }
          console.log("Matic chain");
        }else
        if(selectedChain === 1){
          try {
            
            const balance = await editionDrop.erc1155.balanceOf(userAddress, 0);
            if (balance.gt(0)) {
              setHasClaimedNFTE(true);
              console.log("🌟 this user has a membership NFT!");
            } else {
              setHasClaimedNFTE(false);
              console.log("😭 this user doesn't have a membership NFT.");
            }
          } catch (error) {
            setHasClaimedNFTE(false);
            console.error("Failed to get balance", error);
          }
          console.log("Mainnet chain");
        } else {
          return;
        }
        };
        checkBalance();
      }, [userAddress, editionDrop, contractMetadata, selectedChain, hasClaimedNFTE, hasClaimedNFTG, hasClaimedNFTP]);
    return (
        <>
       
        <div id = "lessonTab"className={styles.lessonNav}>
            <button onClick={() => toggle()}>{isOpen ? ('-> close'):("<- open")}</button>
            <br/>
            <Link id="lessonLink" href="./lesson1"><a><FontAwesomeIcon className={styles.icon} icon ={!isLoggedIn ? faLock : faLockOpen} color="black"/> lesson1</a></Link><br/>
            {hasCompleted ? (<Link href="./lesson2"><a><FontAwesomeIcon className={styles.icon}icon = {faLockOpen } color = "black"/> lesson2</a></Link>) : (<p><FontAwesomeIcon className={styles.icon}icon= {faLock}color="black"/>complete lesson</p>)}
            <br/>
            {hasClaimedNFTG ? (<Link href="./lesson3"><a><FontAwesomeIcon className={styles.icon}icon={faLockOpen}color="black"/> lesson3</a></Link>):(<p><FontAwesomeIcon className={styles.icon} icon = {faLock}color="black"/>get testnet NFT</p>)}
        </div>
        </>
    );
}