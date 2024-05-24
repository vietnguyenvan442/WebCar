import { format } from "date-fns";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function ConfirmDirectPayment() {
    const [billPartner, setBillPartner] = useState({})
    const [detailBill, setDetailBill] = useState({});
    const [currentDate, setCurrentDate] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 60000 * 60 * 24);

        // Clear interval khi component unmount
        return () => clearInterval(intervalId);
    }, []); // Chỉ gọi useEffect một lần khi component mount

    const formattedDate = format(currentDate, 'yyyy-MM-dd');

    useEffect(() => {
        const bp = Cookies.get("billPartner");
        if (bp) setBillPartner(JSON.parse(bp));
    }, [])

    useEffect(() => {
        const db = Cookies.get("detailBill");
        if (db) {
            setDetailBill(JSON.parse(db));
        }
    }, [])

    const onCacelClick = () => {
        navigate("/paymentmonth/paymentmethod");
    }

    const onPayClick = () => {
        if (window.confirm("Xác nhận thanh toán?")) {
            const method = String(Cookies.get("method")) + "," + formattedDate;
            if (detailBill == {}) {

                fetch(`http://localhost:8080/paysave/${method}`, {
                    method: "POST",
                    mode: "cors",
                    body: JSON.stringify(billPartner),
                    headers: {
                        "Content-Type": "application/json; charset=ISO-8859-1",
                    },
                });
            }
            else {
                const requestBody = {
                    billPartner,
                    detailBill,
                };
                fetch(`http://localhost:8080/paysave/detailbill/${method}`, {
                    method: "POST",
                    mode: "cors",
                    body: JSON.stringify(requestBody),
                    headers: {
                        "Content-Type": "application/json; charset=ISO-8859-1",
                    },
                });
            }

            navigate('/home')
        }
    }

    return (
        <div className="partner row">
            <p className="header">Payment by Direct payment</p>
            <div className="partner-left row">
                <div className="partner-left-left">
                    <span>Tên:</span>
                    <br /><br />
                    <span>Số điện thoại:</span>
                    <br /><br />
                    <span>CCCD:</span>
                </div>
                <div className="partner-left-right">
                    <input
                        type="text"
                        value={billPartner?.partner?.name || ""}
                        disabled
                    />
                    <br /><br />
                    <input
                        type="text"
                        value={billPartner?.partner?.sdt || ""}
                        disabled
                    />
                    <br /><br />
                    <input
                        type="text"
                        value={billPartner?.partner?.cccd || ""}
                        disabled
                    />
                </div>
            </div>
            <div className="partner-right row">
                <div className="partner-right-left">
                    <span>Email:</span>
                    <br /><br />
                    <span>Địa chỉ</span>
                    <br /><br />
                    <span>Tổng tiền:</span>
                </div>
                <div className="partner-right-right">
                    <input
                        type="text"
                        value={billPartner?.partner?.email || ""}
                        disabled
                    />
                    <br /><br />
                    <input
                        type="text"
                        value={billPartner?.partner?.addr || ""}
                        disabled
                    />
                    <br /><br />
                    <input
                        type="text"
                        value={detailBill?.totalCost || billPartner?.totalCost || ""}
                        disabled
                    />
                </div>
            </div>
            <div className="partner-bottom">
                <button className="btn btn-warning" onClick={onCacelClick}>Cancel</button>
                <button className="btn btn-success" style={{ marginLeft: "10px" }} onClick={onPayClick}>Confirm</button>
            </div>
        </div>
    )
}
export default ConfirmDirectPayment;