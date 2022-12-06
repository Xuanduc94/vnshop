import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Layout(props) {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <nav className="navbar navbar-expand-lg bg-light">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">VNSHOP</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="#">Trang chủ</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Hóa đơn</a>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Bán hàng
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">Bán lẻ</a></li>
                                            <li><a className="dropdown-item" href="#">Bán sỉ</a></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><a className="dropdown-item" href="#">Phiếu báo giá</a></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Hệ thống
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="/unit">Đơn vị tính</a></li>
                                            <li><a className="dropdown-item" href="/product">Sản phẩm</a></li>
                                            <li><a className="dropdown-item" href="/customer">Khách hàng</a></li>
                                            <li><a className="dropdown-item" href="#">Thông tin cửa hàng</a></li>
                                        </ul>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            <div className='row'>
                {props.children}
            </div>
            <ToastContainer />
        </div>
    );
}

export default Layout;