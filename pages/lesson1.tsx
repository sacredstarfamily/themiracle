import React, {useEffect, useState} from "react";
import { NextPage } from "next";
import { LessonNav } from "../components/lessonnav";
import styles from '../styles/Theme.module.css';
import { SignUp } from "../components/signup";
import { Login } from "../components/login";
import { useAddress } from "@thirdweb-dev/react";



const Lesson1: NextPage = () => {
    const [signUp, setSignUp] = useState(true);
    const [loggedIn, setIsLoggedIn] = useState(false);
    const userAddress = useAddress();
    const toggle = () => {
        if(signUp === true){
            setSignUp(false);
        }else{
            setSignUp(true);
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
          console.log('window.scrollY', window.scrollY);
        };
      
        window.addEventListener('scroll', handleScroll);
      
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    useEffect(()=>{
        let obj = localStorage.getItem('token');
        let keys = JSON.parse(obj || "{}");
        if(keys.site == "themiracle"){
            setIsLoggedIn(true);
            console.log(keys.email);
        }else{

           setIsLoggedIn(false);
           console.log(localStorage.getItem('token'));
        }
    }, [])
    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    }
    if(loggedIn){
        return(
            <>
            <LessonNav />
            <button className={styles.logoutBtn}onClick={logout}>logout</button>
            <div className={styles.lesson}>
                
            
            <div className={styles.lessondiv}>
            <h1>Lesson 1</h1>
            <h2>intro to crypto</h2>
            <p>Welcome to themiracle.love crypto lessons where you will learn the ABC&apos;s and 123&apos;s of cryptocurrencies and Web3. </p>
            <p>Lesson 1 is for the total newbie.</p><h2> What is cryptocurency? </h2><p>pretty simple really. Its electronic internet money. lol! More specifically Its a cyptographic program to keep track of ledgers, numbers and 
                accounts. Examples are Bitcoin, Ethereum, Solana, and The US debit/credit system.</p><h2> Whats a blockchain?</h2><p> Its an open ledger tracking transaction in a given timeperiod called a block, achieved by various consensus models, linked together in a sort of &quot;chain&quot;. Hence called a &quot;blockchain&quot;</p>
            <h2>How do you get this magic internet money?</h2><p>Theres a bunch of exchanges and platforms available to purchase various crypto-currencies. Use this link to sign up to <a id={styles.coinbase} className={styles.coinbase} href="https://coinbase.com/join/swenso_xn?src=ios-link">Coinbase</a> and get free bitcoin! I suggest buying Solana, Polygon, or Ethereum to use this website with and buy NFTs with! I think now is a good time to buy but we&apos;re not financial advisors.</p>
            <h2>Whats an NFT?</h2>
            <p>NFT stands for Non-Fungible Token. Which basically means its programmatically unique internet money. Unlike Fungible Tokens which means one can be exchanged for another. Think of fungible like pennies each has the same value. Think of non-fungible like a super rare 1957 D wheat penny.</p>
            <p>NFT&apos;s are often times programed to be associated with a special file pointing to specific data about the token like an image, a name, an id, and various other traits, and can be used as a game piece or for validation like a membership (this site uses an NFT as a membership)</p>
            <h2>How do I get an NFT?</h2><p>Use a special app called a web3 wallet. I suggest <a href="https://metamask.io">Metamask</a> because you can use test-networks and other chains on the EVM. We&apos;ll talk about EVM latter. Alternatively you can use Trust Wallet. And for Solana Blockchain I suggest Phantom Wallet. There are many others. Then you send the crypto you buy on Coinbase or other exchanges to your wallet and use that currency to buy your NFT. 
            Check out https://opensea.io its an NFT trading site you can buy/trade all kinds of super special jpegs, pngs, and gifs for tons of money!!! lolz</p>
            <h2>Task one: Challenge</h2>
            <ol>
            <li>Download Metamask <span className={styles.important}>Very Important Note...When you first open Metamask it will ask you whether you want to create a new wallet or import an exsiting wallet with private key or passphrase. Assuming you are going to be creating a new wallet. REMEMBER TO WRITE DOWN YOUR 12 WORD PASSPHRASE AND PRIVATE KEY IN A SECURE LOCATION!!!!!!!</span>It really sucks to lose that especially if your investing in cool and really expensive pngs LOL.</li>
            <li> Connect to this site by clicking Connect Wallet button on the menu tab</li>
            </ol>
            
           <p>Great Job you are Now in the world of Web3 here is your Address: <span className={styles.useraddress}>{userAddress}</span></p>
            
           
            </div>
            </div>
            </>
        )
    }
    return (
       <>
       <LessonNav />
        <div className={styles.lesson}>
            <div className={styles.lessondiv}>
            
            <h1 className={styles.flyinh1}>Lesson 1</h1>
            <h2 className={styles.flyinh2}>Sign Up or Login to get access to Lessons</h2>
            <button className={styles.loginsignupBtn} onClick={()=>{toggle()}}>{signUp ? ("login"):("signup")}</button>
            {signUp ? <SignUp /> : <Login />} 
            <p>Also connection to wallet unlocks lesson 2</p>
            </div>
        </div>
        </>
    );
}
export default Lesson1;