import React from 'react';
import {useDropzone} from 'react-dropzone';
import { useChainId, useStorageUpload } from '@thirdweb-dev/react';
import { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import { ImageCards } from './ImageCards';
import { useAddress } from '@thirdweb-dev/react';
export function Accept(props: any) {
  const ImageList = (props:any) => {
    console.log(props.images);
  const images = props.images?.map((image:any) => {
    return <picture key={image}> <img key={image} src={image} alt="imagenotfound" width="100px"></img></picture>;
  });

  return <div>{images}</div>;
};
const chainNum = useChainId();
    const querystring = require('querystring');
    const uAddress = useAddress();
    const [imgUrl, setImgUrl] = useState<string[] | undefined>();
    const [articleId, setArticleId] = useState<string[] | undefined>();
    const [hasPostedImg, setHasPostedImage] = useState(false);
    const [img, setImg] = useState("");
    const [numImages, setNumImages] = useState(0);
    const [imageDetails, setImageDetails] = useState<string[] | undefined>();
    useEffect(() => {
       
        axios.post('https://themiracle.love/api/getImages.php',  querystring.stringify({
          chain: chainNum
        }), {
    headers: { 
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).then(response =>{
     
              let iarray: string[] = [];
              for(var i = 0;i < response.data.images.length; i++){
                if(chainNum ===5){
                iarray.push(response.data.images[i].images.replace("ipfs://", "https://gateway.ipfscdn.io/ipfs/"))
                console.log(response.data.images[i].images.replace("ipfs://", "https://gateway.ipfscdn.io/ipfs/"));
                }else if(chainNum === 137){
                  iarray.push(response.data.images[i].polygonImage.replace("ipfs://", "https://gateway.ipfscdn.io/ipfs/"));
                  
                }else if(chainNum === 1){
                  iarray.push(response.data.images[i].ethereumImage.replace("ipfs://", "https://gateway.ipfscdn.io/ipfs/"));
                }
              }
            
              console.log(iarray);
              setImageDetails(iarray);
              setNumImages(iarray.length);
               console.log(response.data.images[0].userAddress)
           
              });
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [imgUrl, chainNum, querystring]);
    useEffect( () => {
        if(hasPostedImg){
            return;
        } else {

              axios.post("https://themiracle.love/api/checkPerson.php",  querystring.stringify({
                    paddress: uAddress, //gave the values directly for testing
                    chain: chainNum
                    
            }), {
              headers: { 
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }).then(response=>{
                if(response.data.message === "user has image")
                {var ipfsStr = response.data.image;
                 var urlStr = ipfsStr.replace("ipfs://", "https://gateway.ipfscdn.io/ipfs/");
                 console.log(response);
                 setImg(urlStr);
                 setHasPostedImage(true);
                 
                }else{
                    console.log(response);
                    setHasPostedImage(false);
                    return;
                }
            }).catch(error => {
            
                console.error('There was an error!', error);
            });
            
        }

    },[hasPostedImg, querystring, uAddress, chainNum]);
    
    const { mutateAsync: upload } = useStorageUpload();
    const onDrop = useCallback(
      async (acceptedFiles: File[]) => {
        const uris = await upload({ data: acceptedFiles });
        setImgUrl(uris);
        const post = {paddress: uAddress, pimage: uris[0]}
        const request = await axios.post('https://themiracle.love/api/log.php', querystring.stringify({
            paddress: uAddress, //gave the values directly for testing
            pimage: uris[0],
            chain: chainNum
    }), {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(response =>{var mystr = response.data.image;var newstr = mystr.replace("ipfs://", "https://gateway.ipfscdn.io/ipfs/");setHasPostedImage(true);setImg(newstr);console.log(newstr)})
        .catch(error => {
            
            console.error('There was an error!', error);
        });
        console.log(uris[0]);
        setArticleId(uris);
      },
      [upload, uAddress, querystring, chainNum],
    );
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': []
    }, onDrop,
  });

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  if(hasPostedImg){
   
    return(
        <div>
            <p>youve already posted image</p>
            <picture>
                <img src={img}alt="yournft"width="100px">
                </img>
            </picture>
        
        <ImageCards></ImageCards>
       
          </div>
          
    );
   
  }

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
        <em>(Only *.jpeg and *.png images will be accepted)</em>
      </div>
      <aside>
        <h4>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
        <p>{articleId}</p>
      </aside>
    </section>
  );
  
}

