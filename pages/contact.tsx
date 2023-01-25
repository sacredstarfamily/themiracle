import { NextPage } from 'next';
import React from 'react';
import Link from 'next/link';
import styles from "../styles/Theme.module.css";
import { GetStaticProps } from 'next';
import { InferGetStaticPropsType } from 'next';

const Contact: NextPage = () => {
    const addMeta = async ()=> {
        
    }
   
    return (
        <>
        
        <div className={styles.container}>
            <p>email: info@themiracle.love</p>
        </div>
        </>
    )
}
export default Contact;