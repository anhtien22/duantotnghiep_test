import React, { useContext } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from 'react-use-cart'
import UserContext from '../context/user/UserContext'

const Cart = () => {
  const navigate = useNavigate()

  // for user context
  const uContext = useContext(UserContext)
  const { user } = uContext

  const {
    isEmpty,
    totalItems,
    totalUniqueItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
    items,
  } = useCart()

  return (
    <>
      <Breadcrumb pageName="Cart" />
      {isEmpty ? (
        <div className="text-center my-5">
          <h2 className=" my-3">Your cart is empty</h2>
          <button onClick={() => navigate('/shop')}>Back to Shop</button>
        </div>
      ) : (
        <div className="site-section">
          <div className="container">
            <div className="row mb-5">
              <form className="col-md-12" method="post">
                <div className="site-blocks-table">
                  <h4>
                    Cart has ({totalUniqueItems}) products and total items are ({' '}
                    {totalItems}) in the cart.
                  </h4>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th className="product-thumbnail">Image</th>
                        <th className="product-name">Product</th>
                        <th className="product-price">Price</th>
                        <th className="product-quantity">Quantity</th>
                        <th className="product-total">Total</th>
                        <th className="product-remove">Remove</th>
                      </tr>
                    </thead>

                    <tbody>
                      {
                        <>
                          {items.map(item => (
                            <tr key={item._id}>
                              <td className="product-thumbnail">
                                <Link to={`/shopSingle/${item._id}`}>
                                  <img
                                    src={item.image}
                                    alt="img"
                                    className="img-fluid"
                                  />
                                </Link>
                              </td>
                              <td className="product-name">
                                <h2 className="h5 text-black">{item.name}</h2>
                              </td>
                              <td>${item.price}</td>
                              <td>
                                <div
                                  className="input-group mb-3"
                                  style={{ maxWidth: '120px' }}>
                                  <div className="input-group-prepend">
                                    <button
                                      onClick={() =>
                                        updateItemQuantity(
                                          item.id,
                                          item.quantity - 1
                                        )
                                      }
                                      className="btn btn-outline-primary js-btn-minus"
                                      type="button">
                                      &minus;
                                    </button>
                                  </div>
                                  <input
                                    type="text"
                                    className="form-control text-center"
                                    value={item.quantity}
                                    placeholder=""
                                    onChange={e =>
                                      updateItemQuantity(
                                        item.id,
                                        e.target.value
                                      )
                                    }
                                    aria-describedby="button-addon1"
                                  />
                                  <div className="input-group-append">
                                    <button
                                      onClick={() =>
                                        updateItemQuantity(
                                          item.id,
                                          item.quantity + 1
                                        )
                                      }
                                      className="btn btn-outline-primary js-btn-plus"
                                      type="button">
                                      &#43;
                                    </button>
                                  </div>
                                </div>
                              </td>
                              <td>${item.itemTotal}</td>
                              <td>
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="btn btn-danger btn-sm">
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
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
                      onClick={() => emptyCart()}
                      className="btn btn-warning btn-sm btn-block">
                      Empty Cart
                    </button>
                  </div>
                  <div className="col-md-6">
                    <Link
                      to="/shop"
                      className="btn btn-outline-primary btn-sm btn-block">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <label className="text-black h4" htmlFor="coupon">
                      Coupon
                    </label>
                    <p>Enter your coupon code if you have one.</p>
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
                      Apply Coupon
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
                          Cart Totals
                        </h3>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <span className="text-black">Subtotal</span>
                      </div>
                      <div className="col-md-6 text-right">
                        <strong className="text-black">${cartTotal}.00</strong>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-md-6">
                        <span className="text-black">Total</span>
                      </div>
                      <div className="col-md-6 text-right">
                        <strong className="text-black">${cartTotal}.00</strong>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <button
                          className="btn btn-primary btn-lg py-3 btn-block"
                          onClick={() =>
                            navigate(user ? '/checkout' : '/login')
                          }>
                          Proceed To Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default Cart
