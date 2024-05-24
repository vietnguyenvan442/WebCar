import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function ContractCarOld() {
    const [listCar, setListCar] = useState([]);
    const [data, setData] = useState([]);
    const [search, SetSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/listcar")
            .then((respone) => respone.json())
            .then((data) => {
                setData(data);
            })
            .catch((err) => console.log(err));
    }, [])

    useEffect(() => {
        setListCar(data);
    }, [data]);

    useEffect(() => {
        setListCar(
            data.filter(
                (car) =>
                    car.name.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search]);

    const onChonClick = (car) => {
        Cookies.set("car", JSON.stringify(car));
        navigate('/Contractcar');
    }

    return (
        <div className="listPartner row">
            <p className="header">Contract old Car</p>
            <div className="input-group mb-3">
                <input
                    placeholder="search car"
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
                            <th>Biển số</th>
                            <th>Mô tả</th>
                            <th>Lỗi</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listCar.map((car) => (
                            <tr key={car.id} >
                                <td> {car.name}</td>
                                <td>{car.bienSo}</td>
                                <td>{car.des}</td>
                                <td>
                                    {car.listCarError.map((er) => er.error.name).join(', ')}
                                </td>
                                <td><button className="btn btn-primary" onClick={() => { onChonClick(car) }}>Chọn</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default ContractCarOld;