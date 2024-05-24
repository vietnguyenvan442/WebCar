import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ContractCar() {
    const [listCarError, setListCarError] = useState([]);
    const [car, setCar] = useState({ id: -1 });
    const [contractCar, setContractCar] = useState({});
    const [listContractCar, setListContractCar] = useState([]);

    const navigate = useNavigate();

    const [check, setCheck] = useState(false);

    const onAddClick = () => {
        const conCar = listContractCar.find(c => c.car.bienSo === car.bienSo);
        if (conCar != null) setCheck(true);
        else if (contractCar === null) setCheck(true);
        else {
            setCheck(false);

            const updateCar = { ...car, listCarError: listCarError };
            const updatedContractCar = { ...contractCar, car: updateCar };

            // Thêm contractCar mới vào danh sách
            setListContractCar(prevList => [...prevList, updatedContractCar]);
        }
    }

    useEffect(() => {
        const e = Cookies.get("listCarError");
        if (e) {
            setListCarError(JSON.parse(e));
        }
    }, [listCarError])

    useEffect(() => {
        const c = Cookies.get("car");
        if (c) {
            setCar(JSON.parse(c));
            setListCarError(JSON.parse(c).listCarError)
        }
    }, [])

    useEffect(() => {
        const cc = Cookies.get("contractCar");
        if (cc) setContractCar(JSON.parse(cc));
    }, [])



    useEffect(() => {
        const l = Cookies.get("listContractCar");
        if (l) {
            setListContractCar(JSON.parse(l));
        }
    }, [])

    const onDeleteClick = (a) => {
        const updateList = listContractCar.filter(contractCar => contractCar.car.bienSo !== a);
        setListContractCar(updateList);
    }

    const onOldClick = async () => {
        navigate("/contractcar/selectcar");
    }

    const onNextClick = () => { console.log(car)
        Cookies.set("car", JSON.stringify(car));
        Cookies.set("lisCarError", JSON.stringify(listCarError));
        Cookies.set("contractCar", JSON.stringify(contractCar));
        Cookies.set("listContractCar", JSON.stringify(listContractCar));
        navigate('/contractterms');
        console.log(listContractCar);
    }

    const onErrorClick = () => {
        Cookies.set("car", JSON.stringify(car));
        Cookies.set("contractCar", JSON.stringify(contractCar));
        Cookies.set("listContractCar", JSON.stringify(listContractCar));
        navigate('/contractcar/error')
    }
    return (
        <div className="partner row">
            <p className="header">Contract new Car</p>
            <button className="btn btn-warning" onClick={() => { onOldClick() }}>Thêm xe cũ</button>
            <div className="partner-left row">
                <div className="partner-left-left">
                    <span>Tên:</span>
                    <br /><br />
                    <span>Biển số</span>
                    <br /><br />
                    <span>Mô tả:</span>
                </div>
                <div className="partner-left-right">
                    <input
                        type="text"
                        value={car?.name || ""}
                        onChange={(e) => {
                            setCar({ ...car, name: e.target.value });
                        }}
                    />
                    <br /><br />
                    <input
                        type="text"
                        value={car?.bienSo || ""}
                        onChange={(e) => {
                            setCar({ ...car, bienSo: e.target.value });
                        }}
                    />
                    <br /><br />
                    <input
                        type="text"
                        value={car?.des || ""}
                        onChange={(e) => {
                            setCar({ ...car, des: e.target.value });
                        }}
                    />
                </div>
            </div>
            <div className="partner-right row">
                <div className="partner-right-left">
                    <span>Giá cho thuê:</span>
                    <br /><br />
                    <span>Giá thuê lại: </span>
                    <br /><br />
                    <button className="btn btn-warning" onClick={onErrorClick}>Thêm lỗi</button>
                </div>
                <div className="partner-right-right">
                    <input
                        type="number"
                        value={contractCar?.price || ""}
                        onChange={(e) => {
                            setContractCar({ ...contractCar, price: e.target.value });
                        }}
                    />
                    <br /><br /><br />
                    <input
                        type="number"
                        value={contractCar?.cost || ""}
                        onChange={(e) => {
                            setContractCar({ ...contractCar, cost: e.target.value });
                        }}
                    />
                    <br /> <br /> <br />
                    <input
                        disabled
                        type="text"
                        value={listCarError?.map((er) => er.error.name).join(', ') || ""}
                    />
                </div>
            </div>
            <div className="partner-bottom">
                {check && <span style={{ color: "red" }}>Xe đã tồn tại</span>} <br />
                <button className="btn btn-info" onClick={onAddClick}>Add</button>
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
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {listContractCar && listContractCar.map((contractCar) => (
                        <tr key={contractCar.car.bienSo} >
                            <td> {contractCar.car.name}</td>
                            <td>{contractCar.car.bienSo}</td>
                            <td>{contractCar.car.des}</td>
                            <td>
                                {contractCar.car && contractCar.car.listCarError.map((er) => er.error.name).join(', ')}
                            </td>

                            <td>{contractCar.price}</td>
                            <td>{contractCar.cost}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => onDeleteClick(contractCar.car.bienSo)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ textAlign: "center" }}>
                <button className="btn btn-success" style={{ width: "300px" }} onClick={onNextClick}>Next</button>
            </div>

        </div>
    )
}
export default ContractCar;