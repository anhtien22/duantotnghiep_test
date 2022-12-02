import React, { useContext, useEffect, useState } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import { useNavigate } from 'react-router-dom'
import { useCart } from 'react-use-cart'
import OrderContext from '../context/orders/orderContext'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import Loader from '../components/Loader'

const Checkout = () => {
  const navigate = useNavigate()

  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  })

  const [orderItems, setOrderItems] = useState([])

  const [paymentMethod, setPaymentMethod] = useState('')

  // const [paymentResult, setPaymentResult] = useState({})

  const [sdkReady, setSdkReady] = useState(false)

  // for order context
  const oContext = useContext(OrderContext)
  const { placeOrder } = oContext

  const handleChange = e => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value })
  }

  const {
    isEmpty,
    // totalItems,
    // totalUniqueItems,
    cartTotal,
    items,
  } = useCart()

  useEffect(() => {
    if (isEmpty) {
      navigate('/shop')
    }
    const newArr = items.map(
      ({ category, createdAt, id, updatedAt, __v, _id, sku, ...keep }) => ({
        ...keep,
        product: _id,
      })
    )
    setOrderItems(newArr)
    // eslint-disable-next-line
  }, [])

  // for paypal payment method
  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }
    if (paymentMethod === 'paypal') {
      // addPaypalScript()
      if (!window.paypal) {
        addPaypalScript()
      } else {
        setSdkReady(true)
      }
    }
    // addPaypalScript()
  }, [paymentMethod])

  const handlePlaceOrder = () => {
    placeOrder(orderItems, shippingAddress, paymentMethod, cartTotal)
  }

  return (
    <>
      <Breadcrumb pageName="Checkout" />
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-5 mb-md-0">
              <h2 className="h3 mb-3 text-black">Billing Details</h2>
              <div className="p-3 p-lg-5 border">
                <div className="form-group">
                  <label htmlFor="c_country" className="text-black">
                    Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={shippingAddress.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="c_country" className="text-black">
                    Phone <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group row">
                  <div className="col-md-12">
                    <label htmlFor="c_address" className="text-black">
                      Address <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      id="c_address"
                      name="address"
                      cols={30}
                      rows={5}
                      value={shippingAddress.address}
                      onChange={handleChange}
                      placeholder="Street address"></textarea>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="c_country" className="text-black">
                    City <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="c_country" className="text-black">
                    Country <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="country"
                    value={shippingAddress.country}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="c_country" className="text-black">
                    Postal Code <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="postalCode"
                    value={shippingAddress.postalCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row mb-5">
                <div className="col-md-12">
                  <h2 className="h3 mb-3 text-black">Your Order</h2>
                  <div className="p-3 p-lg-5 border">
                    <table className="table site-block-order-table mb-5">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map(item => (
                          <tr key={item._id}>
                            <td>
                              {item.name} <strong className="mx-2">x</strong>{' '}
                              {item.quantity}
                            </td>
                            <td>${item.itemTotal}.00</td>
                          </tr>
                        ))}
                        <tr>
                          <td className="text-black font-weight-bold">
                            <strong>Cart Subtotal</strong>
                          </td>
                          <td className="text-black">${cartTotal}.00</td>
                        </tr>
                        <tr>
                          <td className="text-black font-weight-bold">
                            <strong>Order Total</strong>
                          </td>
                          <td className="text-black font-weight-bold">
                            <strong>${cartTotal}.00</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="form-group my-5">
                      <label className="text-black">
                        Payment Method <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-control"
                        name="paymentMethod"
                        onChange={e => setPaymentMethod(e.target.value)}>
                        <option value="">Select</option>
                        <option value="cod">Cash On delivery</option>
                        <option value="paypal">Paypal</option>
                      </select>
                    </div>

                    <div className="form-group">
                      {paymentMethod === 'paypal' ? (
                        !sdkReady ? (
                          <Loader />
                        ) : (
                          <PayPalButton
                            currency="USD"
                            amount={cartTotal}
                            // onSuccess={handlePlaceOrder}
                            onSuccess={async (details, data) => {
                              // alert(
                              //   'Transaction completed by ' +
                              //     details.payer.name.given_name
                              // )
                              console.log(details, 'details')
                              console.log(data, 'data')

                              // setPaymentResult()
                              // console.log(paymentResult, 'paymentResult')

                              await placeOrder(
                                orderItems,
                                shippingAddress,
                                paymentMethod,
                                cartTotal,
                                {
                                  id: details.id,
                                  status: details.status,
                                  update_time: details.update_time,
                                  email_address: details.payer.email_address,
                                }
                              )
                            }}
                          />
                        )
                      ) : (
                        <button
                          className="btn btn-primary btn-lg py-3 btn-block"
                          onClick={handlePlaceOrder}>
                          Place Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </form> */}
        </div>
      </div>
    </>
  )
}

export default Checkout
