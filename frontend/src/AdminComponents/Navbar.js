import React from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-0">
        <div className="container">
          <Link to="/adminDashboard" className="navbar-brand">
            Admin Dashboard
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
                  Products
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link to="/categories" className="nav-link">
                  Categories
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link to="/users" className="nav-link">
                  Users
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link to="/orders" className="nav-link">
                  Orders
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
