import { NextPage } from 'next';
import React, {useState,useEffect} from 'react';
import { useAddress } from '@thirdweb-dev/react';
import Link from 'next/link';
import styles from "../styles/Theme.module.css";
import { LessonNav } from '../components/lessonnav';
import { SignUp } from "../components/signup";
import { Login } from "../components/login";
const Journey: NextPage = () => {
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
             <button id="logoutbtn"className={styles.logoutBtn}onClick={logout}>logout</button>
             <LessonNav />
            <div className={styles.lesson}>
               
            
            <div className={styles.lessondiv}>
            <h1>Begin your Jouney into Web3</h1>
            <p>You may have no idea what we&apos;re talking about.... What the heck is Web3? What is an NFT? 
                What is Metamask or Trust wallet? Whats a crypto? lolz... That&apos;s ok. This Journey is exciting,
                We are going to change that today! Starting Now....
            </p>
            <p>Maybe you are a crypto wizard? In that case the first few projects will be a breeze to get through as they are designed for the complete newbie, but it still 
                an oportunity to gain some free goodies. Complete lessons get Swag!!!
            </p>
            
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
            <h1>Begin your Jouney into Web3</h1>
            <p>You may have no idea what we&apos;re talking about.... What the heck is Web3? What is an NFT? 
                What is Metamask or Trust wallet? Whats a crypto? lolz... That&apos;s ok. This Journey is exciting,
                We are going to change that today! Starting Now....
            </p>
            <p>Maybe you are a crypto wizard? In that case the first few projects will be a breeze to get through as they are designed for the complete newbie, but it still 
                an oportunity to gain some free goodies. Complete lessons get Swag!!!
            </p>
            <h2>Sign Up or Login to get access to Lessons</h2>
            <button className={styles.loginsignupBtn}onClick={()=>{toggle()}}>{signUp ? ("login"):("signup")}</button>
            {signUp ? <SignUp /> : <Login />}
            </div>
           
        </div>
        
        </>
    )
}
export default Journey;