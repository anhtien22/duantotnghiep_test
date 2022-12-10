import PropTypes from "prop-types";
import './App.css'
import React, { useEffect } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Shop from './Pages/Shop'
import ShopSingle from './Pages/ShopSingle'
import Contact from './Pages/Contact'
import Cart from './Pages/Cart'
import Checkout from './Pages/Checkout'
import ThankYou from './Pages/ThankYou'
import AdminDashboard from './AdminScreens/AdminDashboard'
import LoginScreen from './Pages/LoginScreen'
import Products from './AdminScreens/Products'
import Categories from './AdminScreens/Categories'
import Users from './AdminScreens/Users'
import Misc from './components/Misc'
import SignupScreen from './Pages/SignupScreen'
import ProfileScreen from './Pages/ProfileScreen'
import Orders from './AdminScreens/Orders'
import MyOrderDetails from './Pages/MyOrderDetails'
import ProductDetails from './AdminScreens/ProductDetails'
import OrderDetails from './AdminScreens/OrderDetails'
import UserDetails from './AdminScreens/UserDetails'
import ForgotPassword from './Pages/ForgotPassword'
import ResetPassword from './Pages/ResetPassword'
import UpdatePassword from './Pages/UpdatePassword'
import Brands from './AdminScreens/Brands'
import OrderOnline from "./AdminScreens/OrderOnline";
import OrderCod from "./AdminScreens/OrderCod";
import OrderCancled from "./AdminScreens/OrderCancled";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import { connect } from "react-redux";

function App(props) {
  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          en: require("./translations/english.json"),
          vn: require("./translations/vn.json")
        }
      })
    );
  });

  return (
    <main className="site-wrap">
      <Misc />
      <Header />
      <Routes>
        <Route path="/" element={ <Home /> } />

        <Route path="/about" element={ <About /> } />

        <Route path="/shop" element={ <Shop /> } />

        <Route path="/shopSingle/:id" element={ <ShopSingle /> } />

        <Route path="/contact" element={ <Contact /> } />

        <Route path="/cart" element={ <Cart /> } />

        <Route path="/Checkout" element={ <Checkout /> } />

        <Route path="/thankyou" element={ <ThankYou /> } />

        <Route path="/login" element={ <LoginScreen /> } />

        <Route path="/signup" element={ <SignupScreen /> } />

        <Route path="/forgotpassword" element={ <ForgotPassword /> } />

        <Route path="password/resetPassword/:token" element={ <ResetPassword /> } />

        <Route path="/profile" element={ <ProfileScreen /> } />

        <Route path="/profile/updatepassword" element={ <UpdatePassword /> } />

        <Route path="/myOrderDetails/:id" element={ <MyOrderDetails /> } />

        <Route path="/adminDashboard" element={ <AdminDashboard /> } />

        <Route path="/products" element={ <Products /> } />

        <Route path="/categories" element={ <Categories /> } />

        <Route path="/brands" element={ <Brands /> } />

        <Route path="/users" element={ <Users /> } />

        <Route path="/usersDetailsAdmin/:id" element={ <UserDetails /> } />

        <Route path="/orders" element={ <Orders /> } />

        <Route path="/productDetailsAdmin/:id" element={ <ProductDetails /> } />

        <Route path="/orderDetailsAdmin/:id" element={ <OrderDetails /> } />
        <Route path="/orderAdmin/online" element={ <OrderOnline /> } />
        <Route path="/orderAdmin/cod" element={ <OrderCod /> } />
        <Route path="/orderAdmin/canceled" element={ <OrderCancled /> } />
      </Routes>
      <Footer />
    </main>
  );
}
App.propTypes = {
  dispatch: PropTypes.func
};
export default connect()(multilanguage(App));
