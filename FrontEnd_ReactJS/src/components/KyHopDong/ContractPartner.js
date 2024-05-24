import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ContractPartner(){
    const [partner, setPartner] = useState({id: -1});
    const navigate = useNavigate();

    const [error, setError] = useState(false);

    const onNextClick = async () => {
        if(partner.name!=null && partner.dob!=null && partner.sdt!=null && partner.cccd!=null
            && partner.email!=null && partner.addr!=null && partner.bank!=null && partner.bankID!=null){
                setError(false);
                Cookies.set("partner", JSON.stringify(partner));
                console.log(JSON.parse(Cookies.get("partner")));
                navigate("/contractcar");
        }
        else setError(true);
        
    };

    const onOldClick = async () => {
        navigate('/contractpartner/selectpartner')
    }

    return(
        <div className="partner row">
            <p className="header">Contract Partner new</p>
            <button className="btn btn-info" onClick={()=>{onOldClick()}}>Partner old</button>
            <div className="partner-left row">
                <div className="partner-left-left">
                    <span>Tên:</span>
                    <br /><br />
                    <span>Ngày sinh</span>
                    <br /><br />
                    <span>Số điện thoại:</span>
                    <br /><br />
                    <span>CCCD:</span>
                </div>
                <div className="partner-left-right">
                <input 
                        type="text"
                        value={partner.name || ""}
                        onChange={(e) => {
                            setPartner({ ...partner, name: e.target.value });
                        }}
                    />
                    <br /><br />
                    <input 
                        type="date"
                        value={partner.dob || ""}
                        onChange={(e) => {
                            setPartner({ ...partner, dob: e.target.value });
                        }}
                    />
                    <br /><br />
                    <input 
                        type="text"
                        value={partner.sdt || ""}
                        onChange={(e) => {
                            setPartner({ ...partner, sdt: e.target.value });
                        }}
                    />
                    <br /><br />
                    <input 
                        type="text"
                        value={partner.cccd || ""}
                        onChange={(e) => {
                            setPartner({ ...partner, cccd: e.target.value });
                        }}
                    />
                </div>
            </div>
            <div className="partner-right row">
                <div className="partner-right-left">
                    <span>Email:</span>
                    <br /><br />
                    <span>Địa chỉ</span>
                    <br /><br />
                    <span>Ngân hàng: </span>
                    <br /><br />
                    <span>Số thẻ:</span>
                </div>
                <div className="partner-right-right">
                <input 
                        type="text"
                        value={partner.email || ""}
                        onChange={(e) => {
                            setPartner({ ...partner, email: e.target.value });
                        }}
                    />
                    <br /><br />
                    <input 
                        type="text"
                        value={partner.addr || ""}
                        onChange={(e) => {
                            setPartner({ ...partner, addr: e.target.value });
                        }}
                    />
                    <br /><br />
                    <input 
                        type="text"
                        value={partner.bank || ""}
                        onChange={(e) => {
                            setPartner({ ...partner, bank: e.target.value });
                        }}
                    />
                    <br /><br />
                    <input 
                        type="text"
                        value={partner.bankID || ""}
                        onChange={(e) => {
                            setPartner({ ...partner, bankID: e.target.value });
                        }}
                    />
                </div>
            </div>
            <div className="partner-bottom">
                {error && <span style={{ color: "red" }}>Hãy điền đầy đủ các thông tin!</span>} <br/>
                <button className="btn btn-success" onClick={() => {onNextClick()}}>Next</button>
            </div>
        </div>
    )
}

export default ContractPartner;