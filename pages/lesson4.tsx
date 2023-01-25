import { NextPage } from "next";
import React from "react";
import styles from '../styles/Theme.module.css';
import { LessonNav } from "../components/lessonnav";
const Lesson4: NextPage = () => {
    return(
        <>
        <LessonNav/>
        <div className={styles.lesson}>
            
            <h1>lesson 3</h1>
            <div className={styles.lessondiv}>
            <p>in order to access lesson 3 you must have a goerli tesnet membership</p>
            </div>
        </div>
        </>
    );
}
export default Lesson4;



