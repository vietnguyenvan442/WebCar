import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from 'js-cookie';

function Partner() {
    const params = useParams();
    const id = params.id;

    const [partners, setListPartner] = useState([]);
    const [state, setState] = useState(id > 0 ? 1 : 0);

    const [partner, setPartner] = useState({});

    const [checkCCCD, setCheckCCCD] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const listPartner = Cookies.get("searchListPartner");
        if (listPartner) {
            setListPartner(JSON.parse(listPartner));
        }
    }, []);

    useEffect(()=>{
        const findPartner = partners.find(p => p.id == id);
        if(findPartner){
            setPartner(findPartner);
        }else{
            console.log("Not Found");
        }
    }, [id, partners]);

    const onEditClick = async () => {
        setState(0);
    }

    const onSaveClick = async () => {
        if (window.confirm("Xác nhận lưu?")) {
            const response = await fetch(`http://localhost:8080/partner/save/${id}`, {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(partner),
                headers: {
                    "Content-Type": "application/json; charset=ISO-8859-1",
                },
            });
            const data = await response.text();
            console.log(data);
            if (data === 'Fail') {
                setCheckCCCD(true);
            } else {
                setCheckCCCD(false);
                navigate(`/listpartner`);
            }

        }
    };
        

    // useEffect(() => {
    //     fetch(`http://localhost:8080/partner/${id}`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setPartner(data)
    //             console.log(data)
    //         })
    //         .catch((err) => console.log(err));
    // }, []);

    return (
        <div className="partner row">
            <p className="header">Partner</p>
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
                        disabled={state === 1}
                    />
                    <br /><br />
                    <input
                        type="date"
                        value={partner.dob || ""}
                        onChange={(e) => {
                            setPartner({ ...partner, dob: e.target.value });
                        }}
                        disabled={state === 1}
                    />
                    <br /><br />
                    <input
                        type="text"
                        value={partner.sdt || ""}
                        onChange={(e) => {
                            setPartner({ ...partner, sdt: e.target.value });
                        }}
                        disabled={state === 1}
                    />
                    <br /><br />
                    <input
                        type="text"
                        value={partner.cccd || ""}
                        onChange={(e) => {
                            setPartner({ ...partner, cccd: e.target.value });
                            setCheckCCCD(false);
                        }}
                        disabled={state === 1}
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
                        disabled={state === 1}
                    />
                    <br /><br />
                    <input
                        type="text"
                        value={partner.addr || ""}
                        onChange={(e) => {
                            setPartner({ ...partner, addr: e.target.value });
                        }}
                        disabled={state === 1}
                    />
                    <br /><br />
                    <input
                        type="text"
                        value={partner.bank || ""}
                        onChange={(e) => {
                            setPartner({ ...partner, bank: e.target.value });
                        }}
                        disabled={state === 1}
                    />
                    <br /><br />
                    <input
                        type="text"
                        value={partner.bankID || ""}
                        onChange={(e) => {
                            setPartner({ ...partner, bankID: e.target.value });
                        }}
                        disabled={state === 1}
                    />
                </div>
            </div>
            <div className="partner-bottom">
                {id < 0 && checkCCCD && <span style={{ color: "red" }}>Đối tác đã tồn tại</span>} <br/>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={() => onSaveClick()}
                    style={state === 1 ? { display: "none" } : {}}
                >Save</button>
                <button
                    type="submit"
                    className="btn btn-warning"
                    onClick={() => onEditClick()}
                    style={state === 0 ? { display: "none" } : {}}
                >Edit</button>
            </div>
        </div>
    )
}
export default Partner;