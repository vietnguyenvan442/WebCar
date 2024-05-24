import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ContractPartnerOld() {
    const [partners, setPartners] = useState([]);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [search, SetSearch] = useState("");

    const onChonClick = (partner) => {
        Cookies.set("partner", JSON.stringify(partner));
        console.log(JSON.parse(Cookies.get("partner")));
        navigate("/contractcar");
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
    }, [data]);

    useEffect(() => {
        setPartners(
            data.filter(
                (partner) =>
                    partner.name.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search]);

    return (
        <div className="listPartner row">
            <p className="header">Contract Partner old</p>
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
                            <th>Ngày sinh</th>
                            <th>Số điện thoại</th>
                            <th>CCCD</th>
                            <th>Email</th>
                            <th>Địa chỉ</th>
                            <th>Ngân hàng</th>
                            <th>Số thẻ</th>
                            <th></th>
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
                                <td><button className="btn btn-primary" onClick={() => { onChonClick(partner)}}>Chọn</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default ContractPartnerOld;