import Cookies from "js-cookie";
import React, { useEffect } from "react";

function Home(props) {
    const user = props.user;

    // Hàm để xóa toàn bộ cookies
    const removeAllCookies = () => {
        const cookies = Cookies.get();
        Object.keys(cookies).forEach(cookieName => {
            Cookies.remove(cookieName);
        });
    };

    // Gọi hàm để xóa toàn bộ cookies khi vào trang cụ thể
    useEffect(() => {
        removeAllCookies();
    }, []);
    return (
        <div className="home">
            <p className="header">Trang chủ</p>
            <div className="home-user">
                <span>Tên quản lý: {user.name}</span>
            </div>
            <div className="home-link">
                <a href="/listpartner">Quản lý đối tác</a><br /><br />
                <a href="/contract">Ký hợp đồng</a><br /><br />
                <a href="/payment">Thanh toán đối tác</a>
            </div>
        </div>
    )
}
export default Home;