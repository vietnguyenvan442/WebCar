import Cookies from "js-cookie";
import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";

function ContractTerms(){
    const [terms, setTerms] = useState("");
    const navigate = useNavigate();

    const onNextClick=()=>{
        Cookies.set("terms", terms);
        navigate('/contractconfirm');
    }
    return(
        <div className="terms">
            <h1>Terms</h1>
            <br/><br/>
            <textarea 
                type="text"
                onChange={(e)=>{setTerms(e.target.value)}}
            />
            <br/><br/>
            <button className="btn btn-success" onClick={onNextClick}>Next</button>
        </div>
    )
}
export default ContractTerms;