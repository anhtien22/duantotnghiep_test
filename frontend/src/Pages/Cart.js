import React, { useContext } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import UserContext from "../context/user/UserContext";

const Cart = () => {
  const navigate = useNavigate();

  // for user context
  const uContext = useContext(UserContext);
  const { user } = uContext;

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

  console.log("items", items);

  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
  });

  console.log("items", items);
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


                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th className="product-thumbnail">Hình ảnh</th>
                      <th className="product-name">Sản Phẩm</th>
                      <th className="product-price">Giá</th>
                      <th className="product-quantity">Số Lượng</th>
                      <th className="product-total">Tổng</th>
                      <th className="product-remove"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      <>
                        { items.map((item) => (
                          <tr key={ item._id }>
                            <td scope="row">
                              <Link to={ `/shopSingle/${item._id}` }>
                                <img src={ item.image } alt="img" className="img-fluid" id="img3" />
                              </Link>
                            </td>
                            <td className="product-name">
                              <h2 className="h5 text-black">{ item.name }</h2>
                            </td>
                            <td> { formatter.format(item.price) }</td>
                            <td>
                              <div
                                className="input-group mb-3"
                                style={ { maxWidth: "120px" } }
                              >
                                <div className="input-group-prepend">
                                  <button
                                    onClick={ () => updateItemQuantity(item.id, item.quantity - 1) }
                                    className="btn btn-outline-primary js-btn-minus"
                                    type="button"
                                  >
                                    &minus;
                                  </button>
                                </div>
                                <input
                                  type="text"
                                  className="form-control text-center"
                                  value={ item.quantity }
                                  placeholder=""
                                  disabled
                                  onChange={ (e) => updateItemQuantity(item.id, e.target.value) }
                                  aria-describedby="button-addon1" />
                                <div className="input-group-append">
                                  <button
                                    onClick={ () => updateItemQuantity(item.id, item.quantity + 1) }
                                    className="btn btn-outline-primary js-btn-plus"
                                    type="button"
                                    disabled={ item.quantity >= item.Stock }>
                                    &#43;
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td>{ formatter.format(item.itemTotal) }</td>
                            <td>
                              <button onClick={ () => removeItem(item.id) } className="delete"><iconify-icon icon="ic:round-delete-forever"></iconify-icon></button>
                            </td>
                          </tr>
                        )) }
                      </>
                    }
                  </tbody>
                </table>

                {/* </div> */ }
              </form>
            </div>

            <div className="row">
              <div className="col-md-7">
                <div className="row mb-5">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <button
                      onClick={ () => emptyCart() }
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
