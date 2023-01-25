import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider, useChainId } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { useEffect, useMemo } from "react";
import { useState } from "react";

import Head from "next/head";
import { config, dom } from "@fortawesome/fontawesome-svg-core";
import styles from "../styles/Theme.module.css"

import ChainContext from "../context/Chain";
import UserContext from "../context/User";
import {TopNav} from "../components/TopNav";
import dotenv from "dotenv";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import WalletContextProvider from "../components/WalletContextProvider";
import {
  GlowWalletAdapter,
  PhantomWalletAdapter
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

config.autoAddCss = false;
declare let window: any;


function MyApp({Component, pageProps}:AppProps) {
  const chainNum = useChainId();
 
  const [selectedChain, setSelectedChain] = useState(ChainId.Polygon);
  const [user, setUser] = useState('asdf');
  const network = WalletAdapterNetwork.Devnet;

  // You can provide a custom RPC endpoint here
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter()
    ],
    []
  );
  useEffect(()=>{
  window.fbAsyncInit = function() {
    window.FB.init({
      appId      : '683091743530359',
      cookie     : true,
      xfbml      : true,
      version    : 'v15.0'
    });
      
    window.FB.AppEvents.logPageView();   
      console.log(window.FB);
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     (js as HTMLScriptElement).src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode!.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
  });
  
  return (
    
   <UserContext.Provider value={{user, setUser}}>
    <WalletContextProvider>
     <ChainContext.Provider value={{ selectedChain, setSelectedChain }}>
       
       
    <ThirdwebProvider desiredChainId={selectedChain}>
    
    
      <Head>
        <style>{dom.css()}</style>
        <title>themiracle.love</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="themiracle art-gallery and social platform connect and inspire"
        />
        <meta prefix="og: http://ogp.me/ns#"/>
        <meta
          name="keywords"
          content="mint nfts cryptocurrency art life fun money profit trade social-platform"
        />
        <link href="https://themiracle.love"rel="canonical"/>
        <link href="https://www.google-analytics.com"rel="preconnect"/>
        <meta content="themiracle.love art gallery"property="og:title"/>
        <meta content="en_US"property="og:locale"/>
        <meta content="themiracle.love"property="og:site_name"/>
        <meta content="themiracle.love"name="author"/>
        <meta name="url" content="https://themiracle.love"/>
        <meta name="robots" content="follow, index"/>
        <meta name="googlebot" content="follow, index"/>
        <meta name="twitter:image"content="https://themiracle.love/144.png"/>
        <meta name="twitter:title"content="themiracle.love | art gallery and social" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@themiracle1love"/>
        <meta name="twitter:url" content="https://themiracle.love"/>
        <meta name="twitter:description" content="exclusive art gallery and social platform.Share your artwork, compete in contests, and win prizes"/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://themiracle.love"/>
        <meta property="og:image" content="https://themiracle.love/144.png"/>
        <meta property="og:description" content="themiracle nft art gallery and social network "/>
      
      </Head>
     
     
   



<picture><img className={styles.backgroundImage}src="/image322.png" alt="background"></img></picture>
<TopNav/>

<Component {...pageProps} />


    


      </ThirdwebProvider>
    </ChainContext.Provider>
    </WalletContextProvider>
    </UserContext.Provider>
   
  );
}

export default MyApp;
