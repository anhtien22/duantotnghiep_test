import React, { useContext } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import UserContext from "../context/user/UserContext";
import { useToasts } from "react-toast-notifications";

const Cart = () => {
  const navigate = useNavigate();

  // for user context
  const uContext = useContext(UserContext);
  const { user } = uContext;
  const { addToast } = useToasts();

  const {
    isEmpty,
    totalItems,
    totalUniqueItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
    items,
  } = useCart();
  console.log(items);
  const removeItems = (id) => {
    if (addToast) {
      addToast("Đã xóa sản phẩm", { appearance: "success", autoDismiss: true });
    }
    removeItem(id)
  }
  const emptyCarts = () => {
    if (addToast) {
      addToast("Đã xóa giỏ hàng", { appearance: "success", autoDismiss: true });
    }
    emptyCart()
  }
  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
  });

  return (
    <>
      <Breadcrumb pageName="Cart" />
      { isEmpty ? (
        <div className="text-center my-5">
          <h2 className=" my-3">Giỏ của bạn trống</h2>
          <button onClick={ () => navigate("/shop") }>Quay trở lại</button>
        </div>
      ) : (
        <div className="site-section">
          <div className="container">
            <div className="row mb-5">
              <form className="col-md-12" method="post">
                {/* <div className="site-blocks-table"> */ }
                <h4>
                  Giỏ hàng có : ({ totalUniqueItems }) loại sản phẩm và tổng số lượng sản phẩm là : ({ ' ' }
                  { totalItems }) trong giỏ hàng.
                </h4>


                <div className="content table-responsive table-full-width">
                  <table className="table table-hover">
                    <thead>
                      <th className="product-mahang">Ảnh</th>
                      <th className="product-tenhang">Sản Phẩm</th>
                      <th className="product-logo">Giá</th>
                      <th className="product-logo">Số Lượng</th>
                      <th className="product-logo">Tổng</th>
                      <th></th>
                    </thead>
                    <tbody>
                      {
                        <>
                          { items.map((item) => (
                            <tr key={ item._id }>
                              <td className="product-mahang">
                                <Link to={ `/shopSingle/${item._id}` }>
                                  <img src={ item.image } alt="img" className="img-fluid" id="img3" />
                                </Link>
                              </td>
                              <td className="product-tenhang">{ item.name }</td>
                              <td className="product-logo">{ formatter.format(item.price) }</td>
                              <td>
                                <div className="buttons_added">
                                  <input className="minus is-form" type="button" value="-" onClick={ () => updateItemQuantity(item.id, item.quantity - 1) } />
                                  <input aria-label="quantity" className="input-qty" type="number" value={ item.quantity } disabled onChange={ (e) => updateItemQuantity(item.id, e.target.value) } />
                                  <input className="plus is-form" type="button" value="+" onClick={ () => updateItemQuantity(item.id, item.quantity + 1) } disabled={ item.quantity >= item.Stock } />
                                </div>
                              </td>
                              <td>{ formatter.format(item.itemTotal) }</td>
                              <td>
                                <button onClick={ () => removeItems(item.id) } className="delete"><i className="fa fa-trash" ></i></button>
                              </td>

                            </tr>
                          )) }
                        </>
                      }
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
            <div className="row">
              <div className="col-md-7">
                <div className="row mb-5">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <button
                      onClick={ () => emptyCarts() }
                      className="btn btn-warning btn-sm btn-block">
                      Xóa Tất Cả
                    </button>
                  </div>
                  <div className="col-md-6">
                    <Link
                      to="/shop"
                      className="btn btn-outline-primary btn-sm btn-block"
                    >
                      Tiếp tục mua sắm
                    </Link>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <label className="text-black h4" htmlFor="coupon">
                      Phiếu mua hàng
                    </label>
                    <p>Nhập mã phiếu giảm giá của bạn nếu bạn có.</p>
                  </div>
                  <div className="col-md-8 mb-3 mb-md-0">
                    <input
                      type="text"
                      className="form-control py-3"
                      id="coupon"
                      placeholder="Coupon Code"
                    />
                  </div>
                  <div className="col-md-4">
                    <button className="btn btn-primary btn-sm">
                      Áp dụng phiếu giảm giá
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-5 pl-5">
                <div className="row justify-content-end">
                  <div className="col-md-10">
                    <div className="row">
                      <div className="col-md-12 text-right border-bottom mb-5">
                        <h3 className="text-black h4 text-uppercase text-center">
                          Tổng số giỏ hàng
                        </h3>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <span className="text-black">Tổng phụ</span>
                      </div>
                      <div className="col-md-6 text-right">
                        <strong className="text-black">{ formatter.format(cartTotal) }</strong>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-md-6">
                        <span className="text-black">Tổng cộng</span>
                      </div>
                      <div className="col-md-6 text-right">
                        <strong className="text-black">{ formatter.format(cartTotal) }</strong>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <button
                          className="btn btn-primary btn-lg py-3 btn-block"
                          onClick={ () =>
                            navigate(user ? "/checkout" : "/login")
                          }
                        >
                          Tiến hành kiểm tra
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) }
    </>
  );
};
export default Cart;
