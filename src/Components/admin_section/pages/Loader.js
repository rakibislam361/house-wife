import React, { useState } from 'react'
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import {Link} from 'react-router-dom'


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const Loader = () => {

    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    
    
    return (    
         <div className="sweet-loading">
            <ClipLoader color={color} loading={loading} css={override} size={150} />
        </div>   
    
    )
}

export default Loader
