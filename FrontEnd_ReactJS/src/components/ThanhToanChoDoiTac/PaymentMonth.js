import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PaymentMonth() {
    const [st, setST] = useState();
    const [et, setET] = useState();
    const [data, setData] = useState([]);

    const [search, SetSearch] = useState("");

    const navigate = useNavigate();

    const [listBillPartner, setListBillPartner] = useState([]);

    const onStatClick = (st, et) => {
        const time = st + "," + et;
        fetch(`http://localhost:8080/listbillpartner/${time}`)
            .then((response) => response.json())
            .then((data) => {
                setData(data)
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        setListBillPartner(data);
    }, [data]);

    useEffect(() => {
        setListBillPartner(
            data.filter(
                (bp) =>
                    bp.partner.name.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search]);

    const onViewClick = (id, p) => {
        Cookies.set("billPartner", JSON.stringify(p));
        navigate(`/paymentmonth/statcar/${id}`)
    }

    const onPayClick =(p)=>{
        Cookies.set("billPartner", JSON.stringify(p));
        navigate('/paymentmonth/paymentmethod'); console.log(Cookies.get("billPartner"));
    }

    console.log(listBillPartner)
    
    return (
        <div className="listPartner row">
            <p className="header">Statistic List Partner</p>
            <div className="listPartner-time row">
                <span>StartTime: </span>
                <input type="date"
                    onChange={(e) => {
                        setST(e.target.value);
                    }}
                />
                <span>EndTime: </span>
                <input type="date"
                    onChange={(e) => {
                        setET(e.target.value);
                    }}
                />
                <button className="btn btn-warning" onClick={() => { onStatClick(st, et) }}>Statistic</button>
            </div>
            <div className="input-group mb-3">
                <input
                    placeholder="search partner"
                    type="text"
                    className="form-admin-top-search-input"
                    onChange={(e) => { SetSearch(e.target.value) }}
                />
                <span className="input-group-text"><i class="fas fa-search"></i></span>
            </div>
            <div className="listPartner-table">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Tên</th>
                            <th>SĐT</th>
                            <th>CCCD</th>
                            <th>Địa chỉ</th>
                            <th>Tổng tiền</th>
                            <th>Xem hóa đơn</th>
                            <th>Thanh toán</th>
                        </tr>
                    </thead>
                    <tbody>

                        {listBillPartner.map((b) => (
                            <tr key={b.id} >
                                <td> {b.partner.name}</td>
                                <td>{b.partner.sdt}</td>
                                <td>{b.partner.cccd}</td>
                                <td> {b.partner.addr}</td>
                                <td>{b.totalCost}</td>
                                <td><button className="btn btn-primary" onClick={()=>{onViewClick(b.id, b)}}>Xem</button></td>
                                <td>
                                    <button className="btn btn-success" onClick={()=>{onPayClick(b)}}>Pay</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default PaymentMonth;