import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function StatCar() {
    const params = useParams();
    const id = params.idbp;
    const [listCar, setListCar] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/statcar/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setListCar(data)
                console.log(data)
            })
            .catch((err) => console.log(err));
    }, []);


    const onCacelClick=()=>{
        navigate("/paymentmonth");
    }

    const onViewClick=(idc, iddb)=>{
        const id = idc+","+iddb;
        navigate(`/paymentmonth/statcustomer/${id}`);
    }

    return (
        <div className="listPartner row">
            <p className="header">Statistic List Car</p>
            <div className="input-group mb-3">
                <input placeholder="search partner" />
                <span className="input-group-text"><i class="fas fa-search"></i></span>
            </div>
            <div className="listPartner-table">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Tên</th>
                            <th>Biển số</th>
                            <th>Mô tả</th>
                            <th>Tổng tiền thu được</th>
                            <th>Tổng tiền phải trả</th>
                            <th>Xem hóa đơn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listCar && listCar.map((c) => (
                            <tr key={c.car.id} >
                                <td> {c.car.name}</td>
                                <td>{c.car.bienSo}</td>
                                <td>{c.car.des}</td>
                                <td> {c.price}</td>
                                <td>{c.cost}</td>
                                <td><button className="btn btn-success" onClick={()=>{onViewClick(c.car.id, id)}}>Xem</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <button className="btn btn-primary" onClick={onCacelClick}>Cancel</button>
            </div>
        </div>
    )
}
export default StatCar;