import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";

function Confirm(props) {
    const user = props.user;
    const [partner, setPartner] = useState({});
    const [listContractCar, setListContractCar] = useState([]);
    const [terms, setTerms] = useState("");
    const [contractPartner, setContractPartner] = useState({ id: -1 });
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
        const p = Cookies.get("partner");
        const list = Cookies.get("listContractCar");
        const t = Cookies.get("terms");

        setPartner(JSON.parse(p));
        setListContractCar(JSON.parse(list));
        setTerms(String(t));

        setContractPartner({
            id: -1,
            date: formattedDate,
            terms: terms,
            manager: user,
            partner: partner,
            listContractCar: listContractCar
        });
    }, [formattedDate, listContractCar, partner, terms, user])

    const onSaveClick = () => { console.log(contractPartner)
        if (window.confirm("Xác nhận lưu?")) {
            fetch(`http://localhost:8080/contractpartner`, {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(contractPartner),
                headers: {
                    "Content-Type": "application/json; charset=ISO-8859-1",
                },
            });
            navigate("/home");
        }
    }

    return (
        <div className="partner row">
            <p className="header">Confirm Contract Partner</p>
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
                        disabled
                    />
                    <br /><br />
                    <input
                        type="date"
                        value={partner.dob || ""}
                        onChange={(e) => {
                            setPartner({ ...partner, dob: e.target.value });
                        }}
                        disabled
                    />
                    <br /><br />
                    <input
                        type="text"
                        value={partner.sdt || ""}
                        onChange={(e) => {
                            setPartner({ ...partner, sdt: e.target.value });
                        }}
                        disabled
                    />
                    <br /><br />
                    <input
                        type="text"
                        value={partner.cccd || ""}
                        onChange={(e) => {
                            setPartner({ ...partner, cccd: e.target.value });
                        }}
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
                        disabled
                    />
                    <br /><br />
                    <input
                        type="text"
                        value={partner.addr || ""}
                        onChange={(e) => {
                            setPartner({ ...partner, addr: e.target.value });
                        }}
                        disabled
                    />
                    <br /><br />
                    <input
                        type="text"
                        value={partner.bank || ""}
                        onChange={(e) => {
                            setPartner({ ...partner, bank: e.target.value });
                        }}
                        disabled
                    />
                    <br /><br />
                    <input
                        type="text"
                        value={partner.bankID || ""}
                        onChange={(e) => {
                            setPartner({ ...partner, bankID: e.target.value });
                        }}
                        disabled
                    />
                </div>
            </div>
            <div className="partner-bottom">
                <h2>List Car</h2>
            </div>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Tên</th>
                        <th>Biển số</th>
                        <th>Mô tả</th>
                        <th>Lỗi</th>
                        <th>Giá cho thuê</th>
                        <th>Giá thuê lại</th>
                    </tr>
                </thead>
                <tbody>
                    {listContractCar && listContractCar.map((contractCar) => (
                        <tr key={contractCar.car.bienSo} >
                            <td> {contractCar.car.name}</td>
                            <td>{contractCar.car.bienSo}</td>
                            <td>{contractCar.car.des}</td>
                            <td>{contractCar.car && contractCar.car.listCarError.map((er) => er.error.name).join(', ')}</td>
                            <td>{contractCar.price}</td>
                            <td>{contractCar.cost}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ textAlign: "center" }}>
                <div className="terms">
                    <h2>Terms</h2>
                    <br />
                    <textarea
                        type="text"
                        value={terms}
                    />
                    <br /><br />
                    <button className="btn btn-primary" style={{ width: "300px" }} onClick={() => { onSaveClick() }}>Save</button>
                </div>
            </div>

        </div>
    )
}
export default Confirm;