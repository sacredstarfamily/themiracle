import React, {FC} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";

export const Footer:FC = () => {
    return (
        <div className="footer"style={{
            position: "relative",
            bottom: "30px",
            width: "100%",
            zIndex:"0",
            textAlign: "center"
        }}>
           
            <p>&#x1F496; Made With Love &#x1F496;</p>
          <div style={{
            fontSize: "30px"
          }}>
            <a style={{padding:"15px", color: "white",zIndex:"5"}}href="https://www.instagram.com/themiracle_love/"><FontAwesomeIcon icon={faInstagram} /></a>
            <a style={{padding:"15px", color: "white"}}href="https://twitter.com/themiracle1love"><FontAwesomeIcon icon={faTwitter} /></a>
            <a style={{padding:"15px", color: "white"}}href="https://github.com/sacredstarfamily"><FontAwesomeIcon icon={faGithub} /></a> 
            </div>  
        </div>
    )
}