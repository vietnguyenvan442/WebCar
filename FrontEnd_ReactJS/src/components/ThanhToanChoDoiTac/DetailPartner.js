import React from "react";
function DetailPartner() {

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
                    <br /><br />
                    <span>Tổng tiền:</span>
                </div>
                <div className="partner-left-right">
                    <input />
                    <br /><br />
                    <input />
                    <br /><br />
                    <input />
                    <br /><br />
                    <input />
                    <br /><br />
                    <input />
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
                    <input />
                    <br /><br />
                    <input />
                    <br /><br />
                    <input />
                    <br /><br />
                    <input />
                </div>
            </div>
            <div className="partner-bottom">
                <button className="btn btn-success">Pay</button>
                <button className="btn btn-warning" style={{marginLeft: "10px"}}>Show Cars</button>
            </div>
        </div>
    )
}
export default DetailPartner;