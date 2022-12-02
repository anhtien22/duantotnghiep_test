import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../context/user/UserContext'
import { useCart } from 'react-use-cart'

const Header = () => {
  const navigate = useNavigate()

  const { totalUniqueItems } = useCart()

  // for user context
  const userContext = useContext(UserContext)
  const { logout, user } = userContext

  const logoutHandler = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="site-navbar" role="banner">
      <div className="site-navbar-top">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="
                  col-6 col-md-4
                  order-2 order-md-1
                  site-search-icon
                  text-left
                ">
              <form action="" className="site-block-top-search">
                <span className="icon icon-search2"></span>
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Search"
                />
              </form>
            </div>

            <div
              className="
                  col-12
                  mb-3 mb-md-0
                  col-md-4
                  order-1 order-md-2
                  text-center
                ">
              <div className="site-logo">
                <Link to="/" className="js-logo-clone">
                  Shoppers
                </Link>
              </div>
            </div>

            <div className="col-6 col-md-4 order-3 order-md-3 text-right">
              <div className="site-top-icons">
                <ul>
                  {user && user.role === 'admin' && (
                    <li>
                      <Link to="/adminDashboard">
                        <i className="fas fa-user-cog text-info"></i> Admin
                        Dashboard
                      </Link>
                    </li>
                  )}
                  {user ? (
                    <>
                      <li>
                        <Link to="/profile">
                          <i className="fas fa-user text-success"></i>{' '}
                          {user.name}
                        </Link>
                      </li>
                      <li>
                        <Link to="/" onClick={logoutHandler}>
                          <i className="fas fa-sign-out-alt text-warning"></i>{' '}
                          Logout
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link to="/login">
                          Login{' '}
                          <i className="fas fa-sign-in-alt text-primary"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="/signup">
                          Signup{' '}
                          <i className="fas fa-user-plus text-primary"></i>
                        </Link>
                      </li>
                    </>
                  )}

                  <li>
                    <Link to="/cart" className="site-cart">
                      <span className="icon icon-shopping_cart"></span>
                      {totalUniqueItems && totalUniqueItems > 0 ? (
                        <span className="count">{totalUniqueItems}</span>
                      ) : (
                        ''
                      )}
                    </Link>
                  </li>
                  <li className="d-inline-block d-md-none ml-md-0">
                    <a href="/" className="site-menu-toggle js-menu-toggle">
                      <span className="icon-menu"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav
        className="site-navigation text-right text-md-center"
        role="navigation">
        <div className="container">
          <ul className="site-menu js-clone-nav d-none d-md-block">
            <li className="active">
              <Link to="/">Home</Link>
            </li>
            <li className="">
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <a href="/">Catalogue</a>
            </li>
            <li>
              <a href="/">New Arrivals</a>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
