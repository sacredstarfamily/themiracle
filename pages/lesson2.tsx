import React, {useEffect, useState} from "react";
import { NextPage } from "next";
import { LessonNav } from "../components/lessonnav";
import styles from '../styles/Theme.module.css';
import { SignUp } from "../components/signup";
import { Login } from "../components/login";



const Lesson2: NextPage = () => {
    const [signUp, setSignUp] = useState(true);
    const [loggedIn, setIsLoggedIn] = useState(false);
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
            console.log(localStorage.getItem('token'));
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
            <button className={styles.logoutBtn}onClick={logout}>logout</button>
            <LessonNav />
            <div className={styles.lesson}>
                
           
            <div className={styles.lessondiv}>
            <h1>Lesson 2</h1>
            <h2>The World of Web3</h2>
            <h3>DAOs, Exchanges, and DAPPs oh my!!!!</h3>
            <p>themiracle.love is aspiring to be what you might call a DAPP. A Decentralized Application. Soon to be a DAO. A Decentralized Automated Organization. And maybe an exchange and AMM later. AMM is Automated Market Maker.</p>
            <h2> What are these things? </h2>
            <p>In the world of cryptocurrencies there are tons of applications and websites implementing the technology. From games to marketplaces and trading platforms.
                what could be called the &quot;metaverse&quot; is emmence! so where does one step into all of this. Since you&apos;ve made it this far you have an ethereum wallet connected to this site. Pretty sweet! This allows use to read your address and balances.
                On the home page we check to see if you own a certain NFT to get in. SWEET! Go to this site to get some free testnet Ethereum on the goerli chain come back to mint an NFT to see whats going here! </p>
                <a style={{color:"yellow"}}href="https://Goerlifaucet.com"> alchemy goerli testnet faucet</a>
            
            <h2>Task two: Challenge</h2>
            <ol>
            <li>get some Goerli testnet tokens</li>
            <li>Mint themiracle.love Membership on Goerli</li>
            </ol>
            
            </div>
            </div>
            </>
        )
    }
    return (
       <>
       <LessonNav />
        <div className={styles.lesson}>
            
            <h1>Lesson 2</h1>
            <div className={styles.lessondiv}>
            <h2>Sign Up or Login to get access to Lessons</h2>
            <button className={styles.loginsignupBtn}onClick={()=>{toggle()}}>{signUp ? ("login"):("signup")}</button>
            {signUp ? <SignUp /> : <Login />} 
            <p>hello</p>
            </div>
        </div>
        </>
    );
}
export default Lesson2;