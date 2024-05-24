import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

function ErrorCus() {
    const [listOldError, setListOldError] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [listError, setListError] = useState([]);
    const [detailBill, setDetailBill] = useState({});
    const [check, setCheck] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8080/listerror`)
            .then((response) => response.json())
            .then((data) => {
                setListOldError(data)
                console.log(data)
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        const db = Cookies.get("detailBill");
        if (db) {
            setDetailBill(JSON.parse(db));
            setListError(JSON.parse(db).listCarError);
        }
    }, [])

    const onDeleteClick = (error) => {
        const list = listError.filter(l => l.error.name !== name);
        setListError(list);
    }

    const onAddOldClick = (name) => {
        setName(name);
    }

    const onAddClick = () => {
        const e = listError.find(c => c.error == name);
        if(e) setCheck(true);
        else if (name == null || price == null) setCheck(true);
        else {
            setCheck(false);
            const newError = { error: {id: -1, name: name }, price: price, state: 0};
            setListError((prevList) => [...prevList, newError]);
        }
    }
    
    useEffect(()=>{
        setDetailBill((prev) => ({
            ...prev,
            listCarError: []
        }));
        setDetailBill((prev) => ({
            ...prev,
            listCarError: { ...prev.listCarError, ...listError }
        }));
    }, [listError])

    const onSaveClick=()=>{
        if (window.confirm("Xác nhận lưu?")) {
            fetch(`http://localhost:8080/errorcus`, {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(detailBill),
                headers: {
                    "Content-Type": "application/json; charset=ISO-8859-1",
                },
            });
        }
    }

    console.log(detailBill);

    return (
        <div className="partner row error">
            <p className="header">Error of Car by Customer</p>
            <div className="partner-left row">
                <div className="partner-left-left">
                    <span>Tên:</span>
                    <br /> <br />
                    <span>Giá:</span>
                </div>
                <div className="partner-left-right">
                    <input
                        type="text"
                        value={name || ""}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    <br /><br />
                    <input
                        type="text"
                        value={price || ""}
                        onChange={(e) => {
                            setPrice(e.target.value);
                        }}
                    />
                    <br /><br />
                    <button className="btn btn-info" onClick={onAddClick}>Add</button>
                </div>
            </div>
            <div className="partner-right row">
                <span style={{ textAlign: "center" }}>Chọn lỗi cũ</span>
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Tên</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOldError && listOldError.map((e) => (
                            <tr key={e.id} >
                                <td> {e?.name}</td>
                                <td><button className="btn btn-info" onClick={() => { onAddOldClick(e.name) }}>Add</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {check && <span style={{ color: "red" }}>Hãy điền lại!</span>} <br />
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Tên</th>
                        <th>Giá</th>
                        <th>Trạng thái</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {listError && listError.map((e) => (
                        <tr key={e.id} >
                            <td>{e?.error?.name}</td>
                            <td>{e.price}</td>
                            <td><button className="btn btn-danger" onClick={() => onDeleteClick(e)}>Xóa</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ textAlign: "center" }}>
                <button className="btn btn-primary" style={{ width: "300px" }} onClick={onSaveClick}>Save</button>
            </div>

        </div>
    )
}

export default ErrorCus;