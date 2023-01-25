import { NextPage } from 'next';
import React from 'react';
import Link from 'next/link';
import styles from "../styles/Theme.module.css";
import { GetStaticProps } from 'next';
import { InferGetStaticPropsType } from 'next';

const Causes: NextPage = () => {
    const addMeta = async ()=> {
        
    }
   
    return (
        <>
        
        <div className={styles.container}>
            <div className={styles.centerDiv}>
            <h1>Contribute to World Causes</h1>
            <p></p>
            </div>
        </div>
        </>
    )
}
export default Causes;