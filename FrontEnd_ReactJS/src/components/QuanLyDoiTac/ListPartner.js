import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function ListPartner() {
    const [partners, setPartners] = useState([]);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [search, SetSearch] = useState("");

    const onViewClick = (id) => {
        navigate(`/partner/${id}`)
    }

    const onDeleteClick = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa quyển sách này không?")) {
            fetch(`http://localhost:8080/partner/delete/${id}`, {
                method: "DELETE",
            })
                .then(() => {
                    fetch("http://localhost:8080/listpartner")
                        .then((respone) => respone.json())
                        .then((data) => {
                            setData(data)
                        })
                        .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
        }
    };
    useEffect(() => {
        fetch("http://localhost:8080/listpartner")
            .then((respone) => respone.json())
            .then((data) => {
                setData(data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        setPartners(data);
        Cookies.set("searchListPartner", JSON.stringify(partners));
    }, [data]);

    useEffect(() => {
        setPartners(
            data.filter(
                (partner) =>
                    partner.name.toLowerCase().includes(search.toLowerCase())
            )
        );
        Cookies.set("searchListPartner", JSON.stringify(partners));
    }, [search]);

    return (
        <div className="listPartner row">
            <p className="header">List Partner</p>
            <div className="input-group mb-3">
                <input 
                    placeholder="search partner" 
                    type="text"
                    className="form-admin-top-search-input"
                    onChange={(e) => { SetSearch(e.target.value) }}
                />
                <span className="input-group-text"><i class="fas fa-search"></i></span>
            </div>
            <div className="listPartner-button">
                <button className="btn btn-warning" onClick={() => onViewClick(-1)}>Add partner</button>
            </div>
            <div className="listPartner-table">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Tên</th>
                            <th>Ngày sinh</th>
                            <th>Số điện thoại</th>
                            <th>CCCD</th>
                            <th>Email</th>
                            <th>Địa chỉ</th>
                            <th>Ngân hàng</th>
                            <th>Số thẻ</th>
                            <th>Xem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {partners.map((partner) => (
                            <tr key={partner.id} >
                                <td> {partner.name}</td>
                                <td>{partner.dob}</td>
                                <td>{partner.sdt}</td>
                                <td>{partner.cccd}</td>
                                <td>{partner.email}</td>
                                <td> {partner.addr}</td>
                                <td>{partner.bank}</td>
                                <td>{partner.bankID}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => onViewClick(partner.id)}>Xem chi tiết</button>
                                    <br />
                                    <button className="btn btn-danger" onClick={() => onDeleteClick(partner.id)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default ListPartner;