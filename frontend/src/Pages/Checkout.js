import React, { useCallback, useContext, useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import OrderContext from "../context/orders/orderContext";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import Loader from "../components/Loader";
import UserContext from "../context/user/UserContext";
import { useToasts } from "react-toast-notifications";
import {
  Form, Input,
  Select,
} from 'antd';
const { Option } = Select

const Checkout = () => {
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const [form] = Form.useForm();
  const uContext = useContext(UserContext);
  const { user } = uContext;
  const [shippingAddress, setShippingAddress] = useState({
    name: user.name,
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [orderItems, setOrderItems] = useState([]);

  const [paymentMethod, setPaymentMethod] = useState("");

  // const [paymentResult, setPaymentResult] = useState({})

  const [sdkReady, setSdkReady] = useState(false);

  // for order context
  const oContext = useContext(OrderContext);
  const { placeOrder } = oContext;
  // user context


  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const {
    isEmpty,
    // totalItems,
    // totalUniqueItems,
    cartTotal,
    items,
  } = useCart();

  useEffect(() => {
    if (isEmpty) {
      navigate("/shop");
    }
    const newArr = items.map(
      ({ category, createdAt, id, updatedAt, __v, _id, sku, ...keep }) => ({
        ...keep,
        product: _id,
      })
    );
    setOrderItems(newArr);
    // eslint-disable-next-line
  }, []);
  const setPaymentMethods = useCallback(
    (value) => {
      setPaymentMethod(value)
    },
    []
  )
  // for paypal payment method
  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    console.log("paymentMethod", paymentMethod);
    if (paymentMethod === "paypal") {
      // addPaypalScript()
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
    // addPaypalScript()
  }, [paymentMethod]);

  const handlePlaceOrder = () => {
    placeOrder(orderItems, shippingAddress, paymentMethod, cartTotal, addToast);
  };
  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
  });
  return (
    <>
      <Form
        form={ form }
        name="register"
        onFinish={ handlePlaceOrder }>
        <Breadcrumb pageName="Checkout" />
        <div className="site-section">
          <div className="container">
            <div className="row">
              <div className="col-md-6 mb-5 mb-md-0">
                <h2 className="h3 mb-3 text-black">Chi tiết thanh toán</h2>
                <div className="p-3 p-lg-5 border">
                  <div className="form-group">
                    <Form.Item
                      name="name"
                      label="Tên"
                      rules={ [
                        {
                          required: true,
                          message: 'Xin vui lòng nhập tên',
                        },
                      ] }
                    >
                      <Input
                        type="text"
                        name="name"
                        className="form-control"
                        value={ shippingAddress.name }
                        onChange={ handleChange } />
                    </Form.Item>
                    {/* <label htmlFor="c_country" className="text-black">
                      Tên <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={ shippingAddress.name }
                      onChange={ handleChange }
                    // defaultValue={ shippingAddress.name }
                    /> */}
                  </div>

                  <div className="form-group">
                    <Form.Item
                      name="phone"
                      label="Số điện thoại"
                      rules={ [
                        {
                          required: true,
                          message: 'Vui lòng nhập số điện thoại!',
                        },
                        {
                          min: 10,
                          message: 'Sô điện thoại không hợp lệ!',
                        },
                        {
                          max: 10,
                          message: 'Sô điện thoại không hợp lệ!',
                        },
                      ] }
                    >
                      <Input
                        type="number"
                        name="phone"
                        className="form-control"
                        maxLength={ 11 }
                        value={ shippingAddress.phone }
                        onChange={ handleChange } />
                    </Form.Item>
                    {/* <label htmlFor="c_country" className="text-black">
                      Số điện thoại <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="phone"
                      value={ shippingAddress.phone }
                      onChange={ handleChange }
                    /> */}
                  </div>

                  <div className="form-group ">
                    <Form.Item
                      name="address"
                      label="Địa chỉ"
                      rules={ [
                        {
                          required: true,
                          message: 'Vui lòng nhập địa chỉ!',
                        },
                      ] }
                    >
                      <Input.TextArea
                        className="width-textarea"
                        name="address"
                        showCount maxLength={ 100 }
                        value={ shippingAddress.address }
                        onChange={ handleChange }
                        placeholder="Street address"
                      />
                    </Form.Item>
                    {/* <div className="col-md-12">
                      <label htmlFor="c_address" className="text-black">
                        Địa chỉ <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        id="c_address"
                        name="address"
                        cols={ 30 }
                        rows={ 5 }
                        value={ shippingAddress.address }
                        onChange={ handleChange }
                        placeholder="Street address"
                      ></textarea>
                    </div> */}
                  </div>

                  <div className="form-group">
                    <Form.Item
                      name="city"
                      label="Thành Phố"
                      rules={ [
                        {
                          required: true,
                          message: 'Vui lòng nhập thành phố của bạn!',
                        }
                      ] }
                    >
                      <Input type="number"
                        name="city"

                        className="form-control"
                        value={ shippingAddress.city }
                        onChange={ handleChange } />
                    </Form.Item>
                    {/* <label htmlFor="c_country" className="text-black">
                      Thành Phố <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={ shippingAddress.city }
                      onChange={ handleChange }
                    /> */}
                  </div>

                  <div className="form-group">
                    <Form.Item
                      name="country"
                      label="Huyện/Phường"
                      rules={ [
                        {
                          required: true,
                          message: 'Vui lòng nhập Huyện/Phường của bạn!',
                        }
                      ] }
                    >
                      <Input
                        type="text"
                        name="country"

                        className="form-control"
                        value={ shippingAddress.country }
                        onChange={ handleChange } />
                    </Form.Item>
                    {/* <label htmlFor="c_country" className="text-black">
                      Huyện/Phường <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="country"
                      value={ shippingAddress.country }
                      onChange={ handleChange }
                    /> */}
                  </div>

                  <div className="form-group">
                    <Form.Item
                      name="postalCode"
                      label="Mã bưu điện"
                      rules={ [
                        {
                          required: true,
                          message: 'Vui lòng nhập mã bưu điện của bạn!',
                        },
                        {
                          min: 6,
                          message: 'Mã bưu điện của bạn chưa hợp lệ!',
                        }
                      ] }
                    >
                      <Input
                        type="number"
                        name="postalCode"

                        className="form-control"
                        value={ shippingAddress.postalCode }
                        maxLength={ 6 }
                        onChange={ handleChange } />
                    </Form.Item>
                    {/* <label htmlFor="c_country" className="text-black">
                      Mã bưu điện <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="postalCode"
                      value={ shippingAddress.postalCode }
                      onChange={ handleChange }
                    /> */}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row mb-5">
                  <div className="col-md-12">
                    <h2 className="h3 mb-3 text-black">Đơn hàng của bạn</h2>
                    <div className="p-3 p-lg-5 border">
                      <table className="table site-block-order-table mb-5">
                        <thead>
                          <tr>
                            <th>Sản Phẩm</th>
                            <th>Giá</th>
                          </tr>
                        </thead>
                        <tbody>
                          { items.map((item) => (
                            <tr key={ item._id }>
                              <td>
                                { item.name } <strong className="mx-2">x</strong>{ " " }
                                { item.quantity }
                              </td>
                              <td>{ formatter.format(item.itemTotal) }</td>
                            </tr>
                          )) }
                          <tr>
                            <td className="text-black font-weight-bold">
                              <strong>Tổng :</strong>
                            </td>
                            <td className="text-black">{ formatter.format(cartTotal) }</td>

                          </tr>
                          <tr>
                            <td className="text-black font-weight-bold">
                              <strong>Order Total</strong>
                            </td>
                            <td className="text-black font-weight-bold">
                              <strong>{ formatter.format(cartTotal) }</strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="form-group my-5">
                        {/* <Form.Item className="form-group my-5" label="Phương thức thanh toán" name="paymentMethod">
                        <Select
                          className="form-control"
                          onChange={ setPaymentMethods }>
                          <Option value="">Lựa chọn</Option>
                          <Option value="cod">Thanh toán khi nhận hàng</Option>
                          <Option value="paypal">Paypal</Option>
                        </Select>
                      </Form.Item> */}
                        <label className="text-black">
                          Phương thức thanh toán <span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-control"
                          name="paymentMethod"
                          onChange={ (e) => setPaymentMethod(e.target.value) }
                        >
                          <option value="">Lựa chọn</option>
                          <option value="cod">Thanh toán khi nhận hàng</option>
                          <option value="paypal">Paypal</option>
                        </select>
                      </div>

                      <div className="form-group">
                        { paymentMethod === "paypal" ? (
                          !sdkReady ? (
                            <Loader />
                          ) : (
                            <PayPalButton
                              currency="USD"
                              amount={ cartTotal }
                              // onSuccess={handlePlaceOrder}
                              onSuccess={ async (details, data) => {
                                // alert(
                                //   'Transaction completed by ' +
                                //     details.payer.name.given_name
                                // )
                                console.log(details, "details");
                                console.log(data, "data");

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
                                );
                              } }
                            />
                          )
                        ) : (
                          <button
                            className="btn btn-primary btn-lg py-3 btn-block"
                            // onClick={ handlePlaceOrder }
                            type="submit"
                          >
                            Tiến hành đặt hàng
                          </button>
                        ) }
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>
            {/* </form> */ }
          </div>
        </div>
      </Form>
    </>
  );
};

export default Checkout;
