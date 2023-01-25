import type { NextPage } from "next";
import styles from "../styles/Theme.module.css";
import Link from "next/link";
const WhitePaper: NextPage = () => {  
    return (
        <div className={styles.container}>
            <h1>themiracle coin whitepaper</h1>
            <div className={styles.centerDiv}>
            <p>This is the clarity for the use and dynamics for
                themiracle coin.
            </p>
            <p>Official token for participation in themiracle DAO</p>
            <h2>presale</h2><p>initial mint to dev wallet of 100000 tokens for use in batch transfer to 
                membership nft holders
            </p>
            <h2>initial public sale</h2>
            <p>initial public sale starts at 0.001 ether per token.
                80% of token sales will be deposited into liquidity pools.
                10% of token sales will be donated to non-profit of the DAOs choice.
                10% of token sales used for development of the application
            </p>
            <h2>full term public sale</h2>
            <p>max supply of 10,000,000,000</p>
            <p>price goes up to 0.005 until max supply depending on how the DAO votes</p>
            
            <p>same distribution of token sales as initial public sales</p>
            
            <Link href="/">
                <a>home</a>
            </Link>
            </div>
        </div>
    );
};
export default WhitePaper;