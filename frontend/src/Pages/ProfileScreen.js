import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrderContext from "../context/orders/orderContext";
import UserContext from "../context/user/UserContext";
import { useToasts } from "react-toast-notifications";

const ProfileScreen = () => {
  // for user context
  const uContext = useContext(UserContext);
  const { user, editProfile } = uContext;
  // for order context
  const oContext = useContext(OrderContext);
  const { myOrders, getMyOrders } = oContext;

  const { addToast } = useToasts();

  useEffect(() => {
    getMyOrders();
    //eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editProfile(userInfo.name, userInfo.email, addToast);
  };

  const [userInfo, setUserInfo] = useState({
    name: user.name,
    email: user.email,
  });
  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
  });
  return (
    <>
      {/* ACTIONS */ }
      <section id="actions" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row" id="boxx1">
            <div className="col-md-4">
              <Link to="/" className="btn btn-secondary btn-block">
                <i className="fas fa-arrow-left" /> Trở về trang chủ
              </Link>
            </div>
            <div className="col-md-4">
              <Link to="/profile/updatepassword" className="btn btn-success btn-block">
                <i className="fas fa-lock" /> Đổi mật khẩu
              </Link>
            </div>
            <div className="col-md-4">
              <button disabled className="btn btn-danger btn-block">
                <i className="fas fa-trash" />
                Xóa tài khoản
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* PROFILE */ }
      <section id="profile" className="my-5">
        <div className="container">
          <div className="row" id="profilescreen">
            <div className="col-md-8" >
              <div className="card">
                <div className="card-header">
                  <h4>Chỉnh sửa hồ sơ</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={ handleSubmit }>
                    <div className="form-group">
                      <label htmlFor="name">Tên</label>
                      <input
                        type="text"
                        name="name"
                        onChange={ handleChange }
                        className="form-control"
                        value={ userInfo.name }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        onChange={ handleChange }
                        value={ userInfo.email }
                      />
                    </div>

                    <div className="form-group">
                      <input
                        value="save changes"
                        type="submit"
                        className="btn btn-dark btn-block"
                      />
                    </div>
                  </form>
                </div>
              </div>
              <br></br>
            </div>

            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h4>Đơn đặt hàng</h4>
                </div>
                <div className="content table-responsive table-full-width">
                  <table className="table table-hover">
                    <thead>
                      <th className="product-mahang1">Id</th>
                      <th className="product-tenhang">Số lượng sản phẩm</th>
                      <th className="product-logo">Tiền đơn</th>
                      <th className="product-logo">Ngày đặt hàng</th>
                      <th></th>
                    </thead>
                    <tbody>
                      {
                        <>
                          { myOrders.length > 0 ? (
                            myOrders.map((order) => (
                              <tr key={ order._id }>
                                <td className="product-mahang1">
                                  { order._id }
                                </td>
                                <td className="product-tenhang">{ order.orderItems.length } item(s)</td>
                                <td className="product-logo">{ formatter.format(order.totalPrice) }</td>
                                <td>
                                  { new Date(order.createdAt).toLocaleDateString() }
                                </td>
                                <td>
                                  <Link
                                    to={ `/myOrderDetails/${order._id}` }
                                    className="btn btn-secondary"
                                  >
                                    <i className="fas fa-angle-double-right" /> Chi
                                    tiết
                                  </Link>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={ 4 }>
                                <h3 className="text-center">
                                  Bạn chưa có đơn hàng nào{ " " }
                                </h3>
                              </td>
                            </tr>
                          ) }
                        </>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileScreen;
