import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../context/user/UserContext'
import { useCart } from 'react-use-cart'
import { changeLanguage, multilanguage } from 'redux-multilanguage'
import PropTypes from "prop-types";
// import { useDispatch } from 'react-redux'


const Header = ({
  currentLanguageCode,
  dispatch,
  strings
}) => {
  // const dispatch = useDispatch();
  const changeLanguageTrigger = e => {
    const languageCode = e.target.value;
    dispatch(changeLanguage(languageCode));
  };

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
      <div className="site-navbar">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="
                  col-6 col-md-4
                  order-2 order-md-1
                  site-search-icon
                  text-left
                ">
              {/* <form action="" className="site-block-top-search">
                <span className="icon icon-search2"></span>
                <input
                  type="text"
                  className="form-control border-2"
                  placeholder="Search"
                />
              </form> */}
              <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {currentLanguageCode === "en"
                    ? "English"
                    : currentLanguageCode === "vn"
                      ? "Viet Nam"
                      : ""}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button value="en" onClick={e => changeLanguageTrigger(e)}>
                      {strings["english"]}
                    </button>
                  </li>
                  <li>
                    <button value="vn" onClick={e => changeLanguageTrigger(e)}>
                      {strings["vietnamese"]}
                    </button>
                  </li>

                </ul>
              </div>

            </div>

            <div className="col-12 mb-3 mb-md-0 col-md-4 order-1 order-md-2 text-center">
              <div className="logo">
                <a href='/'>
                  <img src="images/logo6.png" alt="placeholder"></img>
                </a>
              </div>
            </div>

            <div className="col-6 col-md-4 order-3 order-md-3 text-right">


              <div className="dropdown2">
                {user ? (
                  <>
                    <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Helo {user.name}</button>
                  </>
                  ):(<button></button>)
                }
                <ul className="dropdown-menu">
                  <ul>
                    {user && user.role === 'admin' && (
                      <li>
                        <Link to="/adminDashboard">
                          <i class='fas fa-user-cog'>&ensp;</i> {strings["ADMIN_DASHBOARD"]}
                        </Link>
                      </li>
                    )}
                    {user ? (
                      <>
                        <li>
                          <Link to="/profile">
                            <i class='fas fa-user-edit'>&ensp;</i>
                            {user.name}
                          </Link>
                        </li>
                        <li>
                          <Link to="/" onClick={logoutHandler}>
                            <i class='fas fa-sign-in-alt'> &ensp;</i>
                            {strings["LOGOUT"]}
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link to="/login">
                          <i className="fas fa-sign-in-alt"> &ensp;</i>{strings["LOGIN"]}
                          </Link>
                        </li>
                        <li>
                          <Link to="/signup">
                            <i className="fas fa-user-plus">&ensp;</i>{strings["SIGNUP"]}
                          </Link>
                        </li>
                      </>
                    )}
                    <li>
                      <Link to="/cart" className="site-cart">
                        <span className="icon icon-shopping_cart">&ensp;</span>
                        {totalUniqueItems && totalUniqueItems > 0 ? (
                          <span className="count">{totalUniqueItems}</span>
                        ) : (
                          ''
                        )}
                      </Link>
                    </li>
                  </ul>
                </ul>
              </div>
              <div className="site-top-icons">
                <span className='icon'>
                  <li className="d-inline-block d-md-none ml-md-0">
                    <a href="/" className="site-menu-toggle js-menu-toggle">
                      <span className="icon-menu"></span>
                    </a>
                  </li>
                </span>
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
              <Link to="/">
                {strings["HOME"]}
              </Link>
            </li>
            <li>
              <Link to="/shop">
                {strings["SHOP"]}
              </Link>
            </li>
            <li>
              <Link to="/contact">
                {strings["CONTACT_US"]}
              </Link>
            </li>

            <span>
              <ul>
                {user && user.role === 'admin' && (
                  <li>
                    <Link to="/adminDashboard">
                      <i class='fas fa-user-cog'>&ensp;</i> {strings["ADMIN_DASHBOARD"]}
                    </Link>
                  </li>
                )}
                {user ? (
                  <>
                    <li>
                      <Link to="/profile">
                        <i class='fas fa-user-edit'>&ensp;</i>
                        {user.name}
                      </Link>
                    </li>
                    <li>
                      <Link to="/" onClick={logoutHandler}>
                        <i class='fas fa-sign-in-alt'>&ensp;</i>
                        {strings["LOGOUT"]}
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/login">
                      <i className="fas fa-sign-in-alt"> &ensp;</i>{strings["LOGIN"]}
                      </Link>
                    </li>
                    <li>
                      <Link to="/signup">
                      <i className="fas fa-user-plus">&ensp;</i>{strings["SIGNUP"]}
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
              </ul>
            </span>


          </ul>
        </div>
      </nav>
    </header>
  )
}
Header.propTypes = {
  setCurrency: PropTypes.func,
  currency: PropTypes.object,
  currentLanguageCode: PropTypes.string,
  dispatch: PropTypes.func
};
export default multilanguage(Header);
