import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import {v4 as uuidv4}from 'uuid';
import styles from "../styles/Theme.module.css";
import { useAddress, useChainId } from "@thirdweb-dev/react";
export const ImageCards = (props: any) => {
  const address = useAddress();
  const querystring = require('querystring');
  const chainnum = useChainId();
  const [currentChain, setCurrentChain]= useState<number |undefined>();
  useEffect(()=>{
    if(chainnum != undefined){
      setCurrentChain(chainnum);
    }else{
      return;
    }
  },[currentChain, chainnum]);
  
const vote = async (uAddress: string) => {
      console.log(uAddress, address);
      const sendVote = await axios.post("https://themiracle.love/api/vote.php",  querystring.stringify({
        paddress: address,
        vaddress: uAddress,
        chain: chainnum
      }), {
  headers: { 
    "Content-Type": "application/x-www-form-urlencoded"
  }
}).then(response=>{
    if(response.data.message === "user voted")
    {
     console.log(response);
     setHasVoted(true);
    
    }else{
        console.log(response);
      
        return;
    }
}).catch(error => {

    console.error('There was an error!', error);
});
};
const DetailList = (props:any) => {
  if(currentChain === 5){
    console.log(props.details);
    const details = props.details?.map((detail:any) => {

      return <div key={uuidv4()} className={styles.imageCard}><picture key={uuidv4()}> <img key={uuidv4()} src={detail.images.replace("ipfs://", "https://gateway.ipfscdn.io/ipfs/")} alt="imagenotfound" width="100px"></img></picture><p key={uuidv4()}>submited by: {shortenAddress(detail.userAddress)}<br/> has this many votes: {detail.votes}</p>{hasVoted ? (<p key={uuidv4()}>youve voted</p>):(<p key={uuidv4()}>vote for image <button key={uuidv4()} className={styles.voteBtn} onClick={(e:any)=>{vote(detail.userAddress)}}>vote</button></p>)}</div>;
  });
  
    return <div key={uuidv4()}>{details}</div>;
}else if(currentChain === 137){
  console.log(props.details);
  const details = props.details?.map((detail:any) => {

    return <div key={uuidv4()} className={styles.imageCard}><picture key={uuidv4()}> <img key={uuidv4()} src={detail.polygonImage.replace("ipfs://", "https://gateway.ipfscdn.io/ipfs/")} alt="imagenotfound" width="100px"></img></picture><p key={uuidv4()}>submited by: {shortenAddress(detail.userAddress)}<br/> has this many votes: {detail.votesP}</p>{hasVoted ? (<p key={uuidv4()}>youve voted</p>):(<p key={uuidv4()}>vote for image <button key={uuidv4()} className={styles.voteBtn} onClick={(e:any)=>{vote(detail.userAddress)}}>vote</button></p>)}</div>;
});

  return <div key={uuidv4()}>{details}</div>;
}else if(currentChain === 1){
  console.log(props.details);
  const details = props.details?.map((detail:any) => {

    return <div key={uuidv4()} className={styles.imageCard}><picture key={uuidv4()}> <img key={uuidv4()} src={detail.ethereumImage.replace("ipfs://", "https://gateway.ipfscdn.io/ipfs/")} alt="imagenotfound" width="100px"></img></picture><p key={uuidv4()}>submited by: {shortenAddress(detail.userAddress)}<br/> has this many votes: {detail.votesE}</p>{hasVoted ? (<p key={uuidv4()}>youve voted</p>):(<p key={uuidv4()}>vote for image <button key={uuidv4()} className={styles.voteBtn} onClick={(e:any)=>{vote(detail.userAddress)}}>vote</button></p>)}</div>;
});

  return <div key={uuidv4()}>{details}</div>;

}
return<div key={uuidv4()}>connected to the wrong chain</div>
  };
  const shortenAddress = (str: string) => {
    return str.substring(0, 6) + '...' + str.substring(str.length - 4);
  };
const [hasVoted, setHasVoted] = useState(false);
const [numImages, setNumImages] = useState(0);
const [imageDetails, setImageDetails] = useState<object[] | undefined>();
const [imagelist, setImageList] = useState<string[] | undefined>()
useEffect(()=>{
   axios.post("https://themiracle.love/api/checkPerson.php",  querystring.stringify({
                    paddress: address, //gave the values directly for testing
                    chain: chainnum
                    
            }), {
              headers: { 
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }).then(response=>{
                if(response.data.hasVoted === "1")
                {
                  console.log(response);
                 setHasVoted(true);
                 return;
                }else{
                    console.log(response);
                    setHasVoted(false);
                    return;
                }
            }).catch(error => {
            
                console.error('There was an error!', error);
            });
        
}, [address, querystring, chainnum]);
useEffect( () => {
       
  axios.post('https://themiracle.love/api/getImages.php', querystring.stringify({
    chain: chainnum}),{
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(response =>{
     
        let iarray: string[] = [];
        let parray: object[] = [];
        console.log(response.data.images);
        for(var i = 0;i < response.data.images.length; i++){
          if(chainnum === 137){
          parray.push(response.data.images[i]);
          iarray.push(response.data.images[i].polygonImage.replace("ipfs://", "https://gateway.ipfscdn.io/ipfs/"))
          console.log(response.data.images[i].polygonImage.replace("ipfs://", "https://gateway.ipfscdn.io/ipfs/"));
          }else if(chainnum === 5){
            parray.push(response.data.images[i]);
            iarray.push(response.data.images[i].images.replace("ipfs://", "https://gateway.ipfscdn.io/ipfs/"))
            console.log(response.data.images[i].images.replace("ipfs://", "https://gateway.ipfscdn.io/ipfs/"));
          }else if(chainnum === 1){
            parray.push(response.data.images[i]);
            iarray.push(response.data.images[i].images.replace("ipfs://", "https://gateway.ipfscdn.io/ipfs/"))
            console.log(response.data.images[i].images.replace("ipfs://", "https://gateway.ipfscdn.io/ipfs/"));
          }
        }

        console.log(parray);
        console.log(iarray);
        setImageDetails(parray);
        setImageList(iarray);
        setNumImages(iarray.length);
         console.log(response.data.images[0].userAddress)
     
        });
     
// empty dependency array means this effect will only run once (like componentDidMount in classes)
}, [chainnum, querystring]);
return (
<>
<h1>vote on your favorite art</h1>
<p>each member can submit one piece of art and vote on one piece per voting time period of 1 month.
  At the end of the voting sessions the piece with the most votes get minted as a single edition NFT and their address will be set as the royalty address at 10% of 
  the sales of that NFT. Also they win 100 themiracle tokens!!!
</p>
<DetailList details = {imageDetails} />

</>
);
}