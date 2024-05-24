import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function StatCustomer() {
    const params = useParams();
    const id = params.id;
    const [listDetailBill, setListDetailBill] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        fetch(`http://localhost:8080/statcus/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setListDetailBill(data)
                console.log(data)
            })
            .catch((err) => console.log(err));
    }, [])

    const onPayClick=(db)=>{
        Cookies.set("detailBill", JSON.stringify(db));
        navigate('/paymentmonth/paymentmethod')
    }

    const onEditClick=(db)=>{
        Cookies.set("detailBill", JSON.stringify(db));
        navigate('/paymentmonth/editstatcus');
    }

    return (
        <div className="listPartner row">
            <p className="header">Statistic List Customer of Car A</p>
            <div className="input-group mb-3">
                <input placeholder="search partner" />
                <span className="input-group-text"><i class="fas fa-search"></i></span>
            </div>
            <div className="listPartner-table">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Tên</th>
                            <th>CCCD</th>
                            <th>Thời gian thuê</th>
                            <th>Hạn (ngày)</th>
                            <th>Thời gian trả</th>
                            <th>Tổng thời gian thuê</th>
                            <th>Lỗi</th>
                            <th>Tổng tiền thu được</th>
                            <th>Tổng tiền phải trả</th>
                            <th>Thanh toán</th>
                            <th>Sửa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listDetailBill && listDetailBill.map((db) => (
                            <tr key={db.id} >
                                <td>{db.customer.name}</td>
                                <td>{db.customer.cccd}</td>
                                <td>{db.cusStart}</td>
                                <td>{db.dealine}</td>
                                <td>{db.cusEnd}</td>
                                <td>{db.totalTime}</td>
                                <td>{db.listCarError.map((er) => er.error.name).join(', ')}</td>
                                <td>{db.price}</td>
                                <td>{db.cost - db.fine}</td>
                                <td><button className="btn btn-primary" onClick={()=>{onPayClick(db)}}>Pay</button></td>
                                <td><button className="btn btn-success" onClick={()=>{onEditClick(db)}}>Edit</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <button className="btn btn-primary">Cancel</button>
            </div>
        </div>
    )
}
export default StatCustomer;