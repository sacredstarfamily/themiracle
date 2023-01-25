import { FC } from "react";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { ChainId, TokenHolderBalance } from "@thirdweb-dev/sdk";
import ChainContext from "../context/Chain";
import { useChainId, useContract } from "@thirdweb-dev/react";


export const MembersList:FC = () => {
 
     
      const { selectedChain, setSelectedChain } = useContext(ChainContext);
      const [contractAddy, setContractAddy] = useState("");
      const [tokenAddy, setTokenAddy]= useState("");
      const [goerliMembers, setGoerliMembers] = useState<string[] | undefined>();
      const [polygonMembers, setPolygonMembers] = useState<string[] | undefined>();
      const [ethereumMembers, setEthereumMembers] = useState<string[] | undefined>();
      const [ethereumTokenHolders, setEthereumTokenHolders] = useState<TokenHolderBalance[] | undefined>();
      const [polygonTokenHolders, setPolygonTokenHolders] = useState<TokenHolderBalance[] | undefined>();
      const [goerliTokenHolders, setGoerliTokenHolders] = useState<TokenHolderBalance[] | undefined>();

      const chainNum = useChainId();
    
  

      useEffect(()=>{
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
        if(chainNum === 5){
            setContractAddy(addresses[String(ChainId.Goerli)]);
            setTokenAddy(tokenAddress[String(ChainId.Goerli)]);
        } else if(chainNum === 137){
            setContractAddy(addresses[String(ChainId.Polygon)]);
            setTokenAddy(tokenAddress[String(ChainId.Polygon)]);

        } else if(chainNum === 1){
            setContractAddy(addresses[String(ChainId.Mainnet)]);
            setTokenAddy(tokenAddress[String(ChainId.Mainnet)]);

        } else {
            return;
        }
      },[chainNum])
      var { contract: token } = useContract(tokenAddy,'token-drop');
      var { contract: editionDrop } = useContract(contractAddy,"edition-drop");
      useEffect(()=>{
        if(selectedChain === 5 && chainNum === 5){
        const getGoerliMembers = async () =>{
            try{
            let gmemberAddresses = await editionDrop?.history.getAllClaimerAddresses(0);
            setGoerliMembers(gmemberAddresses);
            console.log(goerliMembers);
            }catch(error){
                console.log(error);
                return;
            }
        }
        getGoerliMembers();
    } else if(selectedChain === 137 && chainNum === 137){
        const getPolygonMembers = async () => {
            try{
                let pmemberAddresses = await editionDrop?.history.getAllClaimerAddresses(0);
                setPolygonMembers(pmemberAddresses);
                console.log(polygonMembers);
            }catch(error){
                console.log(error);
                return;
            }
        }
        getPolygonMembers();
    } else if (selectedChain === 1 && chainNum === 1){
        const getEthereumMembers = async () => {
            try{
                let ememberAddresses = await editionDrop?.history.getAllClaimerAddresses(0);
                setEthereumMembers(ememberAddresses);
                console.log(ethereumMembers);
            }catch(error){
                console.log(error);
                return;
            }
        }
        getEthereumMembers();
    } else {
        return;
    }
      },[tokenAddy, contractAddy, chainNum, editionDrop, polygonMembers, ethereumMembers,  goerliMembers, selectedChain])
      return (
    <div className="mList">
        <p>{ethereumMembers} {polygonMembers} {goerliMembers} {chainNum}</p>
    </div>
 );
}