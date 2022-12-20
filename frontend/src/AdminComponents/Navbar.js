import React from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-0">
        <div className="container">
          <Link to="/adminDashboard" className="navbar-brand">
            Bảng điều khiển
          </Link>
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav">
              <li className="nav-item px-2">
                <Link to="/adminDashboard" className="nav-link active">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link to="/products" className="nav-link">
                  Sản phẩm
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link to="/categories" className="nav-link">
                  Danh mục
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link to="/brands" className="nav-link">
                  Thương hiệu
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link to="/users" className="nav-link">
                  Tài khoản
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link to="/orders" className="nav-link">
                  Đơn hàng
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link to="/reviews" className="nav-link">
                  Bình luận
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Breadcrumb pageName="Admin Panel" />
    </>
  )
}

export default Navbar
