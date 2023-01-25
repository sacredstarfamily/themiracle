import React from "react";
import { useStorageUpload } from "@thirdweb-dev/react";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { useDropzone } from "react-dropzone";
import { Accept } from "./Drop";
export const FileUpload = () => {
    const storage = new ThirdwebStorage();


return(
    <div>
        <p>upload your art to ipfs</p>
        <Accept />
    </div>
);
}