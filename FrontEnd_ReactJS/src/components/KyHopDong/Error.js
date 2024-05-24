import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Error() {
    const [error, setError] = useState({ id: -1 });
    const [errors, setErrors] = useState([]);
    const [listError, setListError] = useState([]);

    const [check, setCheck] = useState(false);
    const navigate = useNavigate()

    const onAddClick = () => {
            const er = listError.find(l => l.error.name == error.name);
            if (er != null) setCheck(true);
            else {
                setCheck(false);
                const updated = { error };
                setListError(prevList => [...prevList, updated]);
            }
        
    }

    const onAddOldClick = (error) => {
        const er = listError.find(l => l.error.name == error.name);
        if (er != null) setCheck(true);
        else {
            setCheck(false);
            const updated = { error };
            setListError(prevList => [...prevList, updated]);
        }
    }

    const onDeleteClick = (error) => {
        const updateList = listError.filter(l => l.error !== error);
        setListError(updateList);
    }

    useEffect(() => {
        fetch("http://localhost:8080/listerror")
            .then((respone) => respone.json())
            .then((data) => {
                setErrors(data);
            })
            .catch((err) => console.log(err));
    }, [])

    useEffect(() => {
        const e = Cookies.get("listCarError");
        if (e) {
            setListError(JSON.parse(e));
        }
    }, [])

    const onNextClick = () => {
        Cookies.set("listCarError", JSON.stringify(listError));
        navigate('/Contractcar');
    }
    
    return (
        <div className="partner row error">
            <p className="header">Error of Car</p>
            <div className="partner-left row">
                <div className="partner-left-left">
                    <span>Tên:</span>
                </div>
                <div className="partner-left-right">
                    <input
                        type="text"
                        onChange={(e) => { setError({ ...error, name: e.target.value }) }}
                    />
                    <br /><br />
                    <button className="btn btn-info" onClick={() => { onAddClick() }}>Add</button>
                </div>
            </div>
            <div className="partner-right row">
                <span style={{ textAlign: "center" }}>Lỗi cũ</span>
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Tên</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {error && errors.map((e) => (
                            <tr key={e.id} >
                                <td> {e.name}</td>
                                <td><button className="btn btn-info" onClick={() => { onAddOldClick(e) }}>Add</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {check && <span style={{ color: "red" }}>Lỗi đã tồn tại</span>} <br />
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Tên</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>

                    {listError && listError.map((e) => (
                        <tr key={e.error.id} >
                            <td> {e.error.name}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => onDeleteClick(e.error)}>Xóa</button>
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

export default Error;