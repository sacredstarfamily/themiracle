import {
  useContractMetadata,
  useActiveClaimCondition,
  useNFT,
  useAddress,
  Web3Button,
  useContract,
  ChainId,
  useChainId,
} from "@thirdweb-dev/react";
import WhitePaper from "./whitepaper";
import { useShare } from "react-facebook";
import { Footer } from "../components/Footer";
import { BigNumber } from "ethers";
import { Login } from "../components/login";
import { SignUp } from "../components/signup";
import { MembersList } from "../components/memberslist";
import Image from "next/image";
import React, { useEffect, useState, useContext, useMemo } from "react";
import type { NextPage } from "next";
import styles from "../styles/Theme.module.css";
import Link from 'next/link';
import ChainContext from "../context/Chain";
import { TokenHolderBalance } from "@thirdweb-dev/sdk";
import { AmountSchema } from "@thirdweb-dev/sdk/dist/declarations/src/core/schema/shared";
import { parseEther, formatUnits } from "ethers/lib/utils";
import { channel } from "diagnostics_channel";
import { FileUpload } from "../components/FileUpload";
import axios from "axios";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import UserContext from "../context/User";
import Head from "next/head";

const Home = () => {

  const querystring = require("querystring");
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
// Put your token ID here
const tokenId = 0;
  const { selectedChain, setSelectedChain } = useContext(ChainContext);
  const contractAddy = addresses[String(selectedChain)];
  const tokenAddy = tokenAddress[String(selectedChain)];
  let { contract: editionDrop } = useContract(contractAddy, "edition-drop")!;
  const person = useContext(UserContext);
  const [quantity, setQuantity] = useState<number>(1); 
  const [quantityT, setQuantityT]= useState<number>(1);
  const [uemail, setUEmail] = useState('');
  let { data: contractMetadata } = useContractMetadata(editionDrop!);


  // Load the NFT metadata
 let { data: nftMetadata } = useNFT(editionDrop!, tokenId);
 
  // Load the active claim condition
  let { data: activeClaimCondition } = useActiveClaimCondition(
    editionDrop,
    BigNumber.from(tokenId)
  );
  
  const address = useAddress();
  const addUser = async (address:string) =>{
    const add = await axios.post("https://themiracle.love/api/addPerson.php",  querystring.stringify({
      paddress: address, 
      chain: chainNum,
      pemail: uemail,
      pimage: "newuser",
}), {
headers: { 
  "Content-Type": "application/x-www-form-urlencoded"
}
}).then(response=>{
  if(response.data.message === "user added")
  {
   
   console.log(response);
  }else{
      console.log(response);
    
      return;
  }
}).catch(error => {

  console.error('There was an error!', error);
});
  }
  function refreshPage() {
    window.location.reload();
  }
  const tokenContractAddress = "0x038F22E86ED35736d2204cBFFb2fbE094E9DEfB3";
  const { contract: token } = useContract(tokenAddy, 'token-drop');
 const { data: tokenClaimCondition } = useActiveClaimCondition(token!);
 const { data: tokenMetadata } = useContractMetadata(token!);
 const [ isConnectedtoFB, setIsConnectedtoFB ] = useState(false);
const [memberTokenAmountsV, setMemberTokenAmountsV] = useState<TokenHolderBalance[] | undefined>();
const [memberTokenAmountsP, setMemberTokenAmountsP] = useState<TokenHolderBalance[] | undefined>();
const [memberTokenAmountsE, setMemberTokenAmountsE] = useState<TokenHolderBalance[] | undefined>();
const [memberAddresses, setMemberAddresses] = useState<string[] | undefined>();
const [memberAddressesP, setMemberAddressesP] = useState<string[] | undefined>();
const [memberAddressesE, setMemberAddressesE] = useState<string[] | undefined>();
const [isLoggedIn, setIsLoggedIn] = useState(false);
const shortenAddress = (str: string) => {
  return str.substring(0, 6) + '...' + str.substring(str.length - 4);
};
  const [currentChain, setCurrentChain] = useState<number | undefined>();
  const [hasClaimedNFTG, setHasClaimedNFTG] = useState(false);
  const [hasClaimedNFTE, setHasClaimedNFTE] = useState(false);
  const [hasClaimedNFTP, setHasClaimedNFTP] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const chainNum = useChainId();
  useEffect(()=>{
    if(chainNum !== undefined){
      setCurrentChain(chainNum);
    }else{
      return;
    }
  },[chainNum]);
  useEffect(()=>{
    if(currentChain != undefined){
      if(chainNum != currentChain){
        refreshPage();
      }
    }
  },[currentChain, chainNum])
  useEffect(()=>{
    let obj = localStorage.getItem('token');
        let keys = JSON.parse(obj || "{}");

        if(keys.site == "themiracle"){
        setIsLoggedIn(true);
        setUEmail(keys.userEmail);
       
        console.log(keys.userEmail);
        console.log(localStorage.getItem('token'));
    }else{

       setIsLoggedIn(false);
       console.log(localStorage.getItem('token'));
    }
}, [])
const logout = () => {
    localStorage.removeItem('token');
    refreshPage();
}
  useEffect(() => {
 
    const getAllAddresses = async () => {
      if(!editionDrop){
        return;
      }
      if(chainNum === 5){
      try {
        const memberAddresses = await editionDrop.history.getAllClaimerAddresses (
          0,
        );
        setMemberAddresses(memberAddresses);
        console.log('🚀 Members addresses', memberAddresses);
      } catch (error) {
        console.error('failed to get member list', error);
      }
    }else 
    if(chainNum == 137){
      try {
        const memberAddresses = await editionDrop.history.getAllClaimerAddresses (
          0,
        );
        setMemberAddressesP(memberAddresses);
        console.log('🚀 Members addresses', memberAddresses);
      } catch (error) {
        console.error('failed to get member list', error);
      }
    }else
    if(chainNum === 1){
      try {
        const memberAddresses = await editionDrop.history.getAllClaimerAddresses (
          0,
        );
        setMemberAddressesE(memberAddresses);
        console.log('🚀 Members addresses', memberAddresses);
      } catch (error) {
        console.error('failed to get member list', error);
      }
    }else{
      return;
    }
    };
    getAllAddresses();
  }, [editionDrop, chainNum]);
  
const amounts = useMemo( async () => {
  
  if(chainNum === ChainId.Goerli && selectedChain === ChainId.Goerli){
    if(!memberAddresses){
      return;
    }
    try{
      let peeps: TokenHolderBalance[] = [];
        for(let i =0; i < memberAddresses.length; i++) {
          let x = await token?.balanceOf(memberAddresses![i]);
          let ya: TokenHolderBalance = {holder:memberAddresses![i],balance: x!};
          peeps.push(ya);
        } 
        return peeps;
      }  catch (error){
      console.error("poop", error)
    }
    return;
  }else
  if (selectedChain === ChainId.Polygon){
    if(!memberAddressesP){
      return;
    }
  try{
    let peeps: TokenHolderBalance[] = [];
      for(let i =0; i < memberAddressesP.length; i++) {
        let x = await token?.balanceOf(memberAddressesP[i]);
        let ya: TokenHolderBalance = {holder:memberAddressesP[i],balance: x!};
        peeps.push(ya);
      } 
      return peeps;
    }  catch (error){
    console.error("poop", error)
  };
}else
  if(chainNum === ChainId.Mainnet && selectedChain === ChainId.Mainnet){
  if (!memberAddressesE){
    return;
  }
  try{
    let peeps: TokenHolderBalance[] = [];
      for(let i =0; i < memberAddressesE.length; i++) {
        let x = await token?.balanceOf(memberAddresses![i]);
        let ya: TokenHolderBalance = {holder:memberAddresses![i],balance: x!};
        peeps.push(ya);
      } 
      return peeps;
    }  catch (error){
    console.error("poop", error)
  };
}else {
  return;
}
}, [memberAddresses,memberAddressesP,memberAddressesE,chainNum, token,selectedChain]);
if(selectedChain === ChainId.Goerli && chainNum === 5){
amounts.then((result)=>{
  if(result === undefined){
    return;
  }
setMemberTokenAmountsV(result);
});
};
if(selectedChain === ChainId.Polygon){
 
amounts.then((result)=>{
  if(result === undefined){
    return;
  }
setMemberTokenAmountsP(result);
console.log(memberTokenAmountsP)
});
};
if(selectedChain === ChainId.Mainnet){
  amounts.then((result)=>{
    if(result === undefined){
      return;
    }
  setMemberTokenAmountsE(result);
  });
  };
const memberListG = useMemo(() => {
   
  if(memberAddresses === undefined){
    return;
  }
  if(memberTokenAmountsV !== undefined){
    return memberAddresses.map((address) => {
   
      let memberP = memberTokenAmountsV.find(({ holder }) => holder === address);
     if(memberP === undefined){
      return;
     }else{
      return {
        address,
        tokenAmount: memberP?.balance?.displayValue || '0',
      };
    }
    });
  }
}, [memberAddresses, memberTokenAmountsV]);
const memberList = useMemo(() => {
   
    if(!memberAddressesP){
      return;
      
    }
    if(memberTokenAmountsP !== undefined){
      return memberAddressesP.map((address) => {
     
        let memberP = memberTokenAmountsP.find(({ holder }) => holder === address);
       if(memberP === undefined){
        return;
       }
        return {
          address,
          tokenAmount: memberP?.balance?.displayValue || '0',
        };
      });
    }
  }, [memberAddressesP, memberTokenAmountsP]);
  const memberListE = useMemo(() => {
   
    if(!memberAddresses ){
      return;
    }
    if(memberTokenAmountsE !== undefined){
      return memberAddresses.map((address) => {
     
        let memberP = memberTokenAmountsE.find(({ holder }) => holder === address);
       if(memberP === undefined){
        return;
       }
        return {
          address,
          tokenAmount: memberP?.balance?.displayValue || '0',
        };
      });
    }
  }, [memberAddresses, memberTokenAmountsE]);
 const minusToken = () => {
  let v = parseInt((document.getElementById("tokenNum")as HTMLInputElement).value);
  if(v > 1){
  (document.getElementById("tokenNum")as HTMLInputElement).value = (v - 1).toString();
  }
 }
 useEffect(() => {
  const handleScroll = (event: any) => {
    if(window.scrollY > 10){
     document.getElementById("animation")!.style.display ="none";
     if(document.getElementById("signup") != null){
      document.getElementById("signup")!.classList.add(styles.fun)
      }
      if(document.getElementById("login") != null){
          document.getElementById("login")!.classList.add(styles.fun)
      }
    }else if(window.scrollY < 10){
      document.getElementById("animation")!.style.display ="block";
      if(document.getElementById("signup") != null){
          document.getElementById("signup")!.classList.remove(styles.fun)
          }
    }
    if(window.scrollY > 130){
      if(document.getElementById('title')){
      document.getElementById('title')!.style.visibility ="hidden";
      }
    }else if(window.scrollY < 130){
      if(document.getElementById('title')){
      document.getElementById('title')!.style.visibility = "visible";
      }
    }
    var aboutDiv = document.getElementById('about')!;
    if(aboutDiv){
    var dTop = aboutDiv.getBoundingClientRect();
    console.log(dTop);
    }
    console.log('window.scrollY', window.scrollY);
  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);
  useEffect(() => {
    // If they don't have an connected wallet, exit!
    if (!address) {
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
        const balance = await editionDrop.erc1155.balanceOf(address, 0);
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
        
        const balance = await editionDrop.erc1155.balanceOf(address, 0);
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
        
        const balance = await editionDrop.erc1155.balanceOf(address, 0);
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
  }, [address, editionDrop, contractMetadata, selectedChain, hasClaimedNFTE, hasClaimedNFTG, hasClaimedNFTP]);

  if(chainNum === undefined){
    return(
      <>
      
      
      <div className={styles.container}>
        
        <div className={styles.centerDiv}>
          
        <h1 id="title"className={styles.title}>Welcome<br/>to<br/> themiracle.love</h1>

        <div id='about' className={styles.about}>
         
        
          <p>Share your art to help save the World!!! Come together and rally behind causes. Start a campaign to support a good cause or donate to an existing campaign.
              This social network allows you to connect with like-minded individuals....<br/> let&apos;s create miracles together!</p>

        </div>
        <div className={styles.web3info}>
          
        
        <p>This site uses a web3 wallet connection. WalletConnect buttons are in the Menu Tab. Be sure
          to have the gold drop down on the same chain you have connected your wallet to.  Connect to your <a href="https:www.trustwallet.com">trust wallet</a> or <a href="https://www.metamask.io">metamask</a>.
           Available as chrome extensions or mobile apps.</p><p>This site is compatable with Goerli, Polygon, and Ethereum Mainet Chains.</p><p>Solana soon to come</p>
        <p>This site uses an NFT to gain access to submit art and vote!</p>
        <p>Learn more about web3 and cryptocurrency on the Journey link in the Menu tab.</p>
        </div>
        </div>
      </div>
      {isLoggedIn ? (<button className={styles.logoutBtn} onClick={()=>{logout()}}>logout</button>):(<p className={styles.logindesc}>login or signup on the <Link href="./journey"><a>journey</a></Link> tab in the menu</p>)}
      <Footer/>
      </>
    );
  };
  if (!editionDrop || !contractMetadata) {
    return <div className={styles.container}><div className={styles.centerDiv}><p>Loading....</p></div></div>;
  }
  if (hasClaimedNFTP && selectedChain === ChainId.Polygon){
  if (!memberList){
    return(
    <div className={styles.container}><div className={styles.centerDiv}><p>loading... Make sure you have the correct chain selected your currently connected to {chainNum}. We support Polygon, Goerli, and Ethereum Mainnet Chains for now, but we may add more latter. Feel free to 
    drop us an email if you would like to see us implement a specific chain<span className={styles.loader}></span></p></div></div>);
  }
    if(!token){
      return(
        <div className={styles.container}>
          <p>Loading...</p>
        </div>
      );
    };
    return(
      <>
       {isLoggedIn ? (<button style={{position:'fixed',marginTop:'10px',zIndex:6}}className={styles.logoutBtn} onClick={()=>{logout()}}>logout</button>):(<p>login or signup</p>)}
      <div className={styles.lesson}>
       
       <div className={styles.lessondiv}>
      <p id = {styles.congrats}className={styles.congrats}>You have a Polygon NFT! You&apos;re awesome!!! Here is a list of all the other awesome member addresses and how much tokens they hold. You can view the token whitepaper <Link href="./whitepaper"><a>here</a></Link></p>
        <div className={styles.centerDiv}>
          <h2>Member List</h2>

          <table className={styles.card} cellPadding={0} cellSpacing={0}>
            <thead>
              <tr>
                <th>Address</th>
                <th>Token Amount</th>
              </tr>
            </thead>
            <tbody>
              
              {memberList!.map((member) => {
                if(member===undefined){
                  return;
                }
                return (
                  <tr key={member?.address}>
                    <td>{shortenAddress(member.address)}</td>
                    <td>{member?.tokenAmount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
       <div>
        <h1>{tokenMetadata?.name}</h1>
        <p>Claim themiracle Gorvernance token</p>
        <p>total minted</p>
        {tokenClaimCondition ? (
                <p>
                  {/* Claimed supply so far */}
                  <b>{formatUnits(tokenClaimCondition.price)}</b>
                  <b></b>
                  {" / "}
                  {tokenClaimCondition.maxClaimablePerWallet}
                </p>
              ) : (
                // Show loading state if we're still loading the supply
                <p>Loading....</p>
              )}
        <p>{tokenMetadata?.description}</p>
        
        <p>Quantity</p>
            <div className={styles.quantityContainer}>
            <button onClick={minusToken}>-</button>
              <input id="tokenNum"className={styles.tokenNum}type="number" min="1" defaultValue="1"onInput={()=>{if(parseInt((document.getElementById("tokenNum")as HTMLInputElement).value)<1){(document.getElementById("tokenNum")as HTMLInputElement).value = "1"}}}></input>
              <button onClick={()=>{var i = parseInt(((document.getElementById("tokenNum")as HTMLInputElement).value)); var i =  parseInt(((document.getElementById("tokenNum")as HTMLInputElement).value))+1; (document.getElementById("tokenNum") as HTMLInputElement).value = i.toString()}}>+</button>
            </div>
            <div className={styles.mintContainer}>
        <Web3Button
        contractAddress={tokenAddy}
        action={async (contract) =>
          
          await contract.erc20.claimTo(address!, (document.getElementById("tokenNum")as HTMLInputElement).value)
        }
        onSuccess={(result) => alert("Claimed!")}
                // If the function fails, we can do something here.
        onError={(error) => alert(error?.message)}
        accentColor="#ffac2a"
        colorMode="dark"
        >claim token</Web3Button>
        </div>
        {isLoggedIn ? <FileUpload/> : (<Link href="./journey">signup or login to post art</Link>) }

       </div>
       </div>
       <Footer/>
      </div>
      
      </>
    );
  };
 
  if (hasClaimedNFTG && selectedChain === ChainId.Goerli){
    if(!memberListG){
      return (
        <div className={styles.container}><div className={styles.centerDiv}><p>Loading.....make sure your wallet is connected to goerli network. We support Polygon, Goerli testnet, and Ethereum Mainnet for now, but we may add more latter. Feel free to email us
          if you would like to see a specific chain implemented<span className={styles.loader}></span></p></div></div>
      );
    };
    if(!token){
      return (
        <div className={styles.container}><p>loading<span className={styles.loader}></span> token</p></div>
      );
    };
    return (
      <>
       {isLoggedIn ? (<button className={styles.logoutBtn} onClick={()=>{logout()}}>logout</button>):(<p className={styles.logindesc}>login or signup</p>)}
      <div className={styles.container}>
      
      <div className={styles.centerDiv}>
        <p id={styles.congrats}className={styles.congrats}>Thanks for participating in the testing now yourself a real Mainnet NFT</p>
        
        <div>
          <h2>Member List</h2>
          <table className="card">
            <thead>
              <tr>
                <th>Address</th>
                <th>Token Amount</th>
              </tr>
            </thead>
            <tbody>
              
              {memberListG!.map((member) => {
                if(member===undefined){
                  return;
                }
                return (
                  <tr key={member?.address}>
                    <td>{shortenAddress(member.address)}</td>
                    <td>{member?.tokenAmount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
       <div>
        <h1>{tokenMetadata?.name}</h1>
        <p>Claim themiracle Gorvernance token</p>
        <p>total minted</p>
        {tokenClaimCondition ? (
                <p>
                  {/* Claimed supply so far */}
                  <b>{formatUnits(tokenClaimCondition.price)}</b>
                  <b></b>
                  {" / "}
                  {tokenClaimCondition.maxClaimablePerWallet}
                </p>
              ) : (
                // Show loading state if we're still loading the supply
                <p>Loading....</p>
              )}
        <p>{tokenMetadata?.description}</p>
        
        <p>Quantity</p>
            <div className={styles.quantityContainer}>
            <button onClick={minusToken}>-</button>
              <input className={styles.tokenNum} id="tokenNum"type="number" min="1" defaultValue="1"onInput={()=>{if(parseInt((document.getElementById("tokenNum") as HTMLInputElement).value)<1){(document.getElementById("tokenNum")as HTMLInputElement).value = "1"}}}></input>
              <button onClick={()=>{var i = parseInt(((document.getElementById("tokenNum")as HTMLInputElement).value)); var i =  parseInt(((document.getElementById("tokenNum")as HTMLInputElement).value))+1; (document.getElementById("tokenNum") as HTMLInputElement).value = i.toString()}}>+</button>
            </div>
            <div className={styles.mintContainer}>
        <Web3Button
        contractAddress={tokenContractAddress}
        action={async (contract) =>
          
          await contract.erc20.claimTo(address!, parseInt((document.getElementById("tokenNum")as HTMLInputElement).value))
        }
        onSuccess={(result) => alert("Claimed!")}
                // If the function fails, we can do something here.
        onError={(error) => alert(error?.message)}
        accentColor="#ffac2a"
        colorMode="dark"
        >claim token</Web3Button>
        </div>
        
        {isLoggedIn ? <FileUpload/> : (<Link href="./journey">signup or login to post art</Link>) }
       </div>
       
       
      
      {/* Powered by thirdweb */}{" "}
      <picture>
      <img
        src={`/logo.png`}
        alt="Thirdweb Logo"
        width={135}
        className={styles.buttonGapTop}
      ></img>
      </picture>
      </div>
    </div>
    <Footer/>
    </>
    );
  };
  if(!hasClaimedNFTG && selectedChain == ChainId.Goerli){
    return(
      <>
       {isLoggedIn ? (<button className={styles.logoutBtn} onClick={()=>{logout()}}>logout</button>):(<p>login or signup</p>)}
      <div className={styles.container}>
       
      <div className={styles.centerDiv}>
      <div className={styles.mintInfoContainer}>
        <div className={styles.infoSide}>
          {/* Title of your NFT Collection */}
          
          <h1>{contractMetadata?.name}</h1>
          <Link href="/whitepaper"><a>link</a></Link>
          {/* Description of your NFT Collection */}
          <p className={styles.description}>{contractMetadata?.description}</p>
        </div>

        <div className={styles.imageSide}>
         <picture>
         <img
            className={styles.image}
            src={nftMetadata?.metadata?.image || ""}
            
            alt={`${nftMetadata?.metadata?.name} preview image`}
          ></img>
          </picture>
          {/* Amount claimed so far */}
          <div className={styles.mintCompletionArea}>
            <div className={styles.mintAreaLeft}>
              <p>Total Minted</p>
            </div>
            <div className={styles.mintAreaRight}>
              <p></p>
              {activeClaimCondition ? (
                <p>
                 
                  <b>{activeClaimCondition.currentMintSupply}</b>
                  {" / "}
                  <b>{activeClaimCondition.availableSupply}</b>
                </p>
              ) : (
                // Show loading state if we're still loading the supply
                <p>Loading....<span className={styles.loader}></span></p>
              )}
            </div>
          </div>

          {/* Show claim button or connect wallet button */}
          <>
            <p>Quantity</p>
            <div className={styles.quantityContainer}>
              <button
                className={`${styles.quantityControlButton}`}
                onClick={() => setQuantity(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </button>

              <h4>{quantity}</h4>

              <button
                className={`${styles.quantityControlButton}`}
                onClick={() => setQuantity(quantity + 1)}
                disabled={
                  quantity >=
                  parseInt(
                    activeClaimCondition?.maxClaimablePerWallet || "0"
                  )
                }
              >
                +
              </button>
            </div>
            <div className={styles.mintContainer}>
              <Web3Button
                contractAddress={contractAddy}
                action={async (contract) =>
                  await contract.erc1155.claim(tokenId, quantity)
                }
                // If the function is successful, we can do something here.
                onSuccess={(result) => {alert("Claimed!"); addUser(address!);setHasClaimedNFTG(true)}}
                // If the function fails, we can do something here.
                onError={(error) => alert(error?.message)}
                accentColor="#ffac2a"
                colorMode="light"
              >
                Mint {quantity} NFT{quantity > 1 ? "s" : ""}
              </Web3Button>
            </div>
          </>
        </div>
      </div>
      {/* Powered by thirdweb */}{" "}
      <picture>
      <img
      
        src={`/logo.png`}
        alt="Thirdweb Logo"
        width={135}
        className={styles.buttonGapTop}
      ></img>
      </picture>
      </div>
    </div>
    <Footer/>
    </>
    );
  }
  if(!hasClaimedNFTP && selectedChain == ChainId.Polygon){
  return (
   <>
    {isLoggedIn ? (<button className={styles.logoutBtn} onClick={()=>{logout()}}>logout</button>):(<p>login or signup</p>)}
    <div className={styles.container}>
      
       <div className={styles.centerDiv}>
      <div className={styles.mintInfoContainer}>
        <div className={styles.infoSide}>
          {/* Title of your NFT Collection */}
          
          <h1>{contractMetadata?.name}</h1>
          <Link href="/whitepaper"><a>link</a></Link>
          {/* Description of your NFT Collection */}
          <p className={styles.description}>{contractMetadata?.description}</p>
        </div>

        <div className={styles.imageSide}>
         <picture>
         <img
            className={styles.image}
            src={nftMetadata?.metadata?.image || ""}
            
            alt={`${nftMetadata?.metadata?.name} preview image`}
          ></img>
          </picture>
          {/* Amount claimed so far */}
          <div className={styles.mintCompletionArea}>
            <div className={styles.mintAreaLeft}>
              <p>Total Minted</p>
            </div>
            <div className={styles.mintAreaRight}>
              <p></p>
              {activeClaimCondition ? (
                <p>
                 
                  <b>{activeClaimCondition.currentMintSupply}</b>
                  {" / "}
                  <b>{activeClaimCondition.availableSupply}</b>
                </p>
              ) : (
                // Show loading state if we're still loading the supply
                <p>Loading....<span className={styles.loader}></span></p>
              )}
            </div>
          </div>

          {/* Show claim button or connect wallet button */}
          <>
            <p>Quantity</p>
            <div className={styles.quantityContainer}>
              <button
                className={`${styles.quantityControlButton}`}
                onClick={() => setQuantity(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </button>

              <h4>{quantity}</h4>

              <button
                className={`${styles.quantityControlButton}`}
                onClick={() => setQuantity(quantity + 1)}
                disabled={
                  quantity >=
                  parseInt(
                    activeClaimCondition?.maxClaimablePerWallet || "0"
                  )
                }
              >
                +
              </button>
            </div>
            <div className={styles.mintContainer}>
              <Web3Button
                contractAddress={contractAddy}
                action={async (contract) =>
                  await contract.erc1155.claim(tokenId, quantity)
                }
                // If the function is successful, we can do something here.
                onSuccess={(result) => {alert("Claimed!"); addUser(address!); setHasClaimedNFTP(true)}}
                // If the function fails, we can do something here.
                onError={(error) => alert(error?.message)}
                accentColor="#ffac2a"
                colorMode="light"
              >
                Mint {quantity} NFT{quantity > 1 ? "s" : ""}
              </Web3Button>
            </div>
          </>
        </div>
      </div>
      {/* Powered by thirdweb */}{" "}
      <picture>
      <img
      
        src={`/logo.png`}
        alt="Thirdweb Logo"
        width={135}
        className={styles.buttonGapTop}
      ></img>
      </picture>
      </div>
    </div>
    <Footer/>
    </>
  );
};
if(selectedChain === ChainId.Mainnet && !hasClaimedNFTE){
  return (
    <>
    <div className={styles.container}>
      <div className={styles.mintInfoContainer}>
        <div className={styles.infoSide}>
          {/* Title of your NFT Collection */}
         
          <h1>{contractMetadata?.name}</h1>
          {/* Description of your NFT Collection */}
          <p className={styles.description}>{contractMetadata?.description}</p>
        </div>

        <div className={styles.imageSide}>
         <picture>
         <img
            className={styles.image}
            src={nftMetadata?.metadata?.image || ""}
            
            alt={`${nftMetadata?.metadata?.name} preview image`}
          ></img>
          </picture>
          {/* Amount claimed so far */}
          <div className={styles.mintCompletionArea}>
            <div className={styles.mintAreaLeft}>
              <p>Total Minted</p>
            </div>
            <div className={styles.mintAreaRight}>
              {activeClaimCondition ? (
                <p>
                  {/* Claimed supply so far */}
                  <b>{activeClaimCondition.currentMintSupply}</b>
                  {" / "}
                  {activeClaimCondition.availableSupply}
                </p>
              ) : (
                // Show loading state if we're still loading the supply
                <p>Loading.....<span className={styles.loader}></span></p>
              )}
            </div>
          </div>

          {/* Show claim button or connect wallet button */}
          <>
            <p>Quantity</p>
            <div className={styles.quantityContainer}>
              <button
                className={`${styles.quantityControlButton}`}
                onClick={() => setQuantity(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </button>

              <h4>{quantity}</h4>

              <button
                className={`${styles.quantityControlButton}`}
                onClick={() => setQuantity(quantity + 1)}
                disabled={
                  quantity >=
                  parseInt(
                    activeClaimCondition?.maxClaimablePerWallet || "0"
                  )
                }
              >
                +
              </button>
            </div>
            <div className={styles.mintContainer}>
              <Web3Button
                contractAddress={contractAddy}
                action={async (contract) =>
                  await contract.erc1155.claim(tokenId, quantity)
                }
                // If the function is successful, we can do something here.
                onSuccess={(result) => 
                  {alert("Claimed!"); addUser(address!); setHasClaimedNFTE(true)}}
                // If the function fails, we can do something here.
                onError={(error) => alert(error?.message)}
                accentColor="#ffac2a"
                colorMode="dark"
              >
                Mint {quantity} NFT{quantity > 1 ? "s" : ""}
              </Web3Button>
            </div>
          </>
        </div>
      </div>
      {/* Powered by thirdweb */}{" "}
      <picture>
      <img
        src={`/logo.png`}
        alt="Thirdweb Logo"
        width={135}
        className={styles.buttonGapTop}
      ></img>
      </picture>
    </div>
    <Footer/>
    </>
  );
};
if (hasClaimedNFTE && selectedChain === ChainId.Mainnet){
  if(!memberListE){
    return;
  }
  return (
    <>
     {isLoggedIn ? (<button style={{position:'fixed',marginTop:'10px',zIndex:6}}className={styles.logoutBtn} onClick={()=>{logout()}}>logout</button>):(<p>login or signup</p>)}
    <div className={styles.container}>
      <div className={styles.centerDiv}>
        <p id={styles.congrats} className={styles.congrats}>Thanks for participating in themiracle.love there will be special perks to having a Mainnet NFT</p>
        <div>
          <h2>Member List</h2>
          <table className="card">
            <thead>
              <tr>
                <th>Address</th>
                <th>Token Amount</th>
              </tr>
            </thead>
            <tbody>
              
              {memberListE!.map((member) => {
                if(member===undefined){
                  return;
                }
                return (
                  <tr key={member?.address}>
                    <td>{shortenAddress(member.address)}</td>
                    <td>{member?.tokenAmount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
       <div>
        <h1>{tokenMetadata?.name}</h1>
        <p>Claim themiracle Gorvernance token</p>
        <p>total minted</p>
        {tokenClaimCondition ? (
                <p>
                  {/* Claimed supply so far */}
                  <b>{formatUnits(tokenClaimCondition.price)}</b>
                  <b></b>
                  {" / "}
                  {tokenClaimCondition.maxClaimablePerWallet}
                </p>
              ) : (
                // Show loading state if we're still loading the supply
                <p>Loading....<span className={styles.loader}></span></p>
              )}
        <p>{tokenMetadata?.description}</p>
        
        <p>Quantity</p>
            <div className={styles.quantityContainer}>
            <button onClick={minusToken}>-</button>
              <input id="tokenNum"type="number" min="1" defaultValue="1"onInput={()=>{if(parseInt((document.getElementById("tokenNum") as HTMLInputElement).value)<1){(document.getElementById("tokenNum")as HTMLInputElement).value = "1"}}}></input>
              <button onClick={()=>{var i = parseInt(((document.getElementById("tokenNum")as HTMLInputElement).value)); var i =  parseInt(((document.getElementById("tokenNum")as HTMLInputElement).value))+1; (document.getElementById("tokenNum") as HTMLInputElement).value = i.toString()}}>+</button>
            </div>
            <div className={styles.mintContainer}>
        <Web3Button
        contractAddress={tokenContractAddress}
        action={async (contract) =>
          
          await contract.erc20.claimTo(address!, parseInt((document.getElementById("tokenNum")as HTMLInputElement).value))
        }
        onSuccess={(result) => alert("Claimed!")}
                // If the function fails, we can do something here.
        onError={(error) => alert(error?.message)}
        accentColor="#ffac2a"
        colorMode="dark"
        >claim token</Web3Button>
        </div>
       </div>
       {isLoggedIn ? <FileUpload/> : (<Link href="./journey">signup or login to post art</Link>) }
      
      {/* Powered by thirdweb */}{" "}
      <picture>
      <img
        src={`/logo.png`}
        alt="Thirdweb Logo"
        width={135}
        className={styles.buttonGapTop}
      ></img>
      </picture>
      </div>
    </div>
    </>
  );
};
return(
<div className={styles.container}>

  <p>loading ...</p><span className={styles.loader}></span>
</div>
);
}

export default Home;
