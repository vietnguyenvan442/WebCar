import Cookies from "js-cookie";
import React from "react";
import { useNavigate } from "react-router-dom";

function PaymentMethod(){
    const navigate = useNavigate();

    const onBankClick=()=>{
        Cookies.set('method', JSON.stringify("bank"));
        navigate("/paymentmonth/banktranfer");console.log(JSON.parse(Cookies.get('method')))
    }

    const onDirectClick=()=>{
        Cookies.set('method', JSON.stringify("direct"));
        navigate("/paymentmonth/directpayment");console.log(JSON.parse(Cookies.get('method')))
    }

    return(
        <div className="home">
            <h1>Payment Method</h1>
            <br/>
            <button className="btn btn-primary" onClick={onBankClick}>Chuyển khoản ngân hàng</button>
            <br/> <br/>
            <button className="btn btn-primary" onClick={onDirectClick}>Thanh toán trực tiếp</button>
        </div>
    )
}
export default PaymentMethod;