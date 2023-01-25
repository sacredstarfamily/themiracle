import React, {FC, useState, useEffect} from "react";
import axios from "axios";
import styles from "../styles/Theme.module.css";
import { useAddress } from "@thirdweb-dev/react";
import { URLSearchParams } from "url";
export const Login: FC = () => {
   const qs = require('qs');
    const address = useAddress();
    const querystring = require('querystring');
   
    const [pemail, setPemail] = useState('');
    const [isWorking, setIsWorking]= useState(false);
    const [ppwd, setPpwd] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [matching, setIsMatching] = useState(false);
    const checkValid = () => {
        if(pemail === '' ||  ppwd === ''){
            setIsValid(false);
        }  else {
            setIsMatching(true);
            setIsValid(true);
        }
    }
    function refreshPage() {
        window.location.reload();
      }
    useEffect(()=>{
        if(pemail !== "" && ppwd !== ""){
            setIsValid(true);
            console.log("fill")
            console.log(isValid)
        }
    }, [pemail, ppwd, isValid])
    useEffect(()=>{
        if(ppwd !== ""){
            setIsMatching(true);
            console.log(matching);
        }else{
            setIsMatching(false);

        }
    },[ppwd, matching])
    const handlesubmit = async () => {
     
        if(isValid == false){alert("invalid sign up make sure all fields filled in and password matches repeat"+ isValid);return}
        setIsWorking(true);
        await axios.post("https://themiracle.love/api/login.php",  querystring.stringify({
            pemail: pemail,
            ppwd: ppwd
          }), {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(response=>{
        if(response.data.message === "logged in")
        {
          const data = localStorage.setItem("token", JSON.stringify({"site":"themiracle", "userEmail":pemail}));
         refreshPage();
         console.log(response);
        
        
        }else{
            console.log(response);
          
            return;
        }
    }).catch(error => {
    
        console.error('There was an error!', error);
    });
    };
    if(isWorking){
        return(
            <>
            <div><p>Loging you in now<span className={styles.loader}></span></p></div>
            </>
        )
    }
    return (
        <div id ='login'className={styles.signup}>
            <h1>Login</h1>
            <form>
     
                <input style={{width:"50%"}} type="text" name="pemail" id="pemail" placeholder="enter your email" onChange={e => setPemail(e.target.value)}/><br/>
                <input style={{width:"50%"}} type="password" name="ppwd" id="ppwd"placeholder="enter your password" onChange={e => setPpwd(e.target.value)} /><br/>

                <p>{!matching ? "login with email and password" : "press submit"}</p>
           </form>
            <button onClick={()=>{handlesubmit()}}>submit</button>
        </div>
    )
}