import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function EditStatCus() {
    const [detailBill, setDetailBill] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const db = Cookies.get("detailBill");
        if (db) setDetailBill(JSON.parse(db));
    }, [])

    const onErrorClick=()=>{
        Cookies.set("detailBill", JSON.stringify(detailBill));
        Cookies.set("listCarError", JSON.stringify(detailBill.listCarError));
        navigate("/paymentmonth/errorcus");
    }

    const onSaveClick = ()=>{
        if (window.confirm("Xác nhận lưu?")) {
            fetch(`http://localhost:8080/detailbill/save`, {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(detailBill),
                headers: {
                    "Content-Type": "application/json; charset=ISO-8859-1",
                },
            });
            
        }
    }

    console.log(detailBill);
    return (
        <div className="partner row">
            <p className="header">Edit Statistic Customer</p>
            <div className="partner-left row">
                <div className="partner-left-left">
                    <span>Tên:</span>
                    <br /><br />
                    <span>CCCD</span>
                    <br /><br />
                    <span>Thời gian thuê:</span>
                </div>
                <div className="partner-left-right">
                    <input
                        type="text"
                        value={detailBill?.customer?.name || ""}
                        onChange={(e) => {
                            setDetailBill({ ...detailBill, customer:{...detailBill.customer, name: e.target.value }});
                        }}
                        disabled
                    />
                    <br /><br />
                    <input
                        type="text"
                        value={detailBill?.customer?.cccd || ""}
                        onChange={(e) => {
                            setDetailBill({ ...detailBill, customer:{...detailBill.customer, cccd: e.target.value }});
                        }}
                        disabled
                    />
                    <br /><br />
                    <input
                        type="date"
                        value={detailBill?.cusStart || ""}
                        onChange={(e) => {
                            setDetailBill({ ...detailBill, cusStart: e.target.value });
                        }}
                        disabled
                    />
                </div>
            </div>
            <div className="partner-right row">
                <div className="partner-right-left">
                    <span>Hạn:</span>
                    <br /><br />
                    <span>Thời gian trả</span>
                    <br /><br />
                    <button className="btn btn-warning" onClick={onErrorClick}>Lỗi</button>
                </div>
                <div className="partner-right-right">
                    <input
                        type="text"
                        value={detailBill?.dealine || ""}
                        onChange={(e) => {
                            setDetailBill({ ...detailBill, dealine: e.target.value });
                        }}
                        disabled
                    />
                    <br /><br />
                    <input
                        type="date"
                        value={detailBill?.cusEnd || ""}
                        onChange={(e) => {
                            setDetailBill({ ...detailBill, cusEnd: e.target.value });
                        }}
                    />
                    <br /><br />
                    <input
                        type="text"
                        value={detailBill?.listCarError?.map((er) => er.error.name).join(', ')}
                        disabled
                    />
                </div>
            </div>
            <div className="partner-bottom">
                <button className="btn btn-primary">Save</button>
            </div>
        </div>
    )
}
export default EditStatCus;