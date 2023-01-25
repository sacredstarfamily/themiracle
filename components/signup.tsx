import React, {FC, useState, useEffect} from "react";
import axios from "axios";
import styles from "../styles/Theme.module.css";
import { useAddress } from "@thirdweb-dev/react";
import { URLSearchParams } from "url";

export const SignUp: FC = () => {
   const qs = require('qs');
    const address = useAddress();
    const querystring = require('querystring');
    const [pname, setPname] = useState('');
    const [pemail, setPemail] = useState('');
    const [rpwd, setRpwd] = useState('');
    const [ppwd, setPpwd] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [matching, setIsMatching] = useState(false);
    const [isWorking, setIsWorking] = useState(false);
    const checkValid = () => {
        if(pname === '' || pemail === '' || rpwd === '' || ppwd === ''){
            setIsValid(false);
        } else if (rpwd !== ppwd){
            setIsValid(false);
        } else {
            setIsMatching(true);
            setIsValid(true);
        }
    }
    function refreshPage() {
        window.location.reload();
      }
    useEffect(()=>{
        if(pemail != '' && pname != '' && ppwd !="" && rpwd !=""){
            setIsValid(true);
            console.log("fill")
            console.log(isValid)
        }
    }, [pname, pemail, ppwd, rpwd, isValid])
    useEffect(()=>{
        if(ppwd === rpwd && ppwd != ""){
            setIsMatching(true);
            console.log(matching);
        }else{
            setIsMatching(false);

        }
    },[ppwd, rpwd, matching])
    const handlesubmit = async () => {
     
        if(isValid == false){alert("invalid sign up make sure all fields filled in and password matches repeat"+ isValid);return}
        setIsWorking(true);
        await axios.post("https://themiracle.love/api/signup.php",  querystring.stringify({
            paddress: address,
            pname: pname,
            pemail: pemail,
            ppwd: ppwd
          }), {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(response=>{
        if(response.data.message === "user signed up")
        {
          const data = localStorage.setItem("token", JSON.stringify({"site":"themiracle", "userEmail":pemail}));
          refreshPage();
         console.log(response);
        
        
        }else if(response.data.message === "user already signed up"){
            console.log(response);
            alert("you've already signed up try login");
            setIsWorking(false);
            return;
        }else{
            console.log(response);
        }
    }).catch(error => {
    
        console.error('There was an error!', error);
    });
    };
    if(isWorking){
        return (
            <>
           <div> <p>thanks for signing up <span className={styles.loader}></span></p></div>
            </>
        )
    }
    return (
        <div id="signup"className={styles.signup}style={{zIndex:10}}>
            <div className={styles.signupdiv}>
            <h1>sign up</h1>
            <form>
                <input style={{width:"50%"}} type="text" name="pname" id="pname" placeholder="enter your name" onChange={e => setPname(e.target.value)}/><br/>
                <input style={{width:"50%"}} type="text" name="pemail" id="pemail" placeholder="enter your email" onChange={e => setPemail(e.target.value)}/><br/>
                <input style={{width:"50%"}} type="password" name="ppwd" id="ppwd"placeholder="choose a password" onChange={e => setPpwd(e.target.value)} /><br/>
                <input style={{width:"50%"}} type="password" name="rpwd" id="rpwd"placeholder="repeat your password" onChange={e => setRpwd(e.target.value)}/><br/>
                <p>{!matching ? "not matching password repeat" : "click submit"}</p>
            </form>
            <button onClick={()=>{handlesubmit()}}>submit</button>
            </div>
        </div>
    )
}