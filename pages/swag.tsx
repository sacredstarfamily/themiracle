import React, {useEffect} from "react";
import { NextPage } from "next";
import { LessonNav } from "../components/lessonnav";
import styles from '../styles/Theme.module.css';
import { SignUp } from "../components/signup";
const Swag: NextPage = () => {
    useEffect(() => {
        const handleScroll = (event: any) => {
          if(window.scrollY > 10){
           document.getElementById("animation")!.style.display ="none";
           
          }else if(window.scrollY < 10){
            document.getElementById("animation")!.style.display ="block";
          }
          console.log('window.scrollY', window.scrollY);
        };
      
        window.addEventListener('scroll', handleScroll);
      
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    return (
        <div className={styles.container}>
            
            <h1>Get some themiracle.love Swag</h1>
            <h2>Clothing</h2>
            <div className={styles.gear}>
            <p>&quot;not your kitty&quot; Hoodie</p>
            <a href="https://square.link/u/M4gxfB2O"><picture><img src={'hoodiefront.png'}width={200} alt="hoodiefront"/><img src={'hoodieback.png'}alt="hoodieback"width={200}/><br/><p>order here</p></picture></a>
            </div>
            <div className={styles.gear}>
            <p>&quot;themiracle&quot; embroidered tiedye</p>
            <a href="https://square.link/u/uw0cWH00?src=sheet"><picture><img src={'tiedie.png'}width={200} alt="tiedye"/><br/><p>order here</p></picture></a>
            <p>available in more colors</p>
            </div>
            <div className={styles.gear}>
            <p>&quot;not your kitty&quot; teeshirt</p>
            <a href="https://square.link/u/BGDpYFln?src=sheet"><picture><img src={'tshirtfront.png'}width={200} alt="tshirtfront"/><img src={'tshirtback.png'}alt="tshirtback"width={200}/><br/><p>order here</p></picture></a>
            </div>
        </div>
    );
}
export default Swag;