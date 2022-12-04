import React, { useContext, useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { Link, useParams } from "react-router-dom";
import OrderContext from "../context/orders/orderContext";

const MyOrderDetails = () => {
  // for order context
  const oContext = useContext(OrderContext);
  const { getOneOrder } = oContext;

  const { id } = useParams();

  const [order, setOrder] = useState({
    shippingAddress: {},
    paymentResult: {},
    orderItems: [],
    user: {},
  });

  useEffect(() => {
    const fetchOrder = async () => {
      const result = await getOneOrder(id);
      setOrder(result);
    };
    fetchOrder();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Breadcrumb pageName="Order" />
      <section className="h-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-10 col-xl-8">
              <div className="card" style={{ borderRadius: "10px" }}>
                <div className="card-header px-4 py-5">
                  <h5 className="text-muted mb-0">
                    Thanks for your Order,{" "}
                    <span style={{ color: "#a8729a" }}>{order.user?.name}</span>
                    !
                  </h5>
                </div>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p
                      className="lead fw-normal mb-0"
                      style={{ color: "#a8729a" }}
                    >
                      Biên nhận
                    </p>
                    <p className="small text-muted mb-0">
                      ID : <b>{id}</b>
                    </p>
                  </div>

                  {order.orderItems.map((orderItem) => (
                    <div
                      key={orderItem._id}
                      className="card shadow-0 border mb-4"
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-2">
                            <Link to={`/shopSingle/${orderItem.product}`}>
                              <img
                                src={orderItem.image}
                                className="img-fluid"
                                alt="Phone"
                              />
                            </Link>
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0">
                              <b>{orderItem.name}</b>
                            </p>
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0 small">
                              {orderItem.description}
                            </p>
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0 small">
                              Số lượng: {orderItem.quantity}
                            </p>
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0 small">
                              Giá: {orderItem.price}
                            </p>
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0 small">
                              <b> Tiền: {orderItem.itemTotal}</b>
                            </p>
                          </div>
                        </div>
                        <hr
                          className="mb-4"
                          style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                        />
                        {/* <div className="row d-flex align-items-center">
                          <div className="col-md-2">
                            <p className="text-muted mb-0 small">Track Order</p>
                          </div>
                          <div className="col-md-10">
                            <div
                              className="progress"
                              style={{ height: '6px', borderRadius: '16px' }}>
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                  width: '20%',
                                  borderRadius: '16px',
                                  backgroundColor: '#a8729a',
                                }}
                                aria-valuenow={20}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            <div className="d-flex justify-content-around mb-1">
                              <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                Out for delivary
                              </p>
                              <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                Delivered
                              </p>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  ))}

                  <div className="row my-3">
                    <div className="col-md-6">
                      <h4>Chi tiết giao hàng</h4>
                      <div>
                        <b>GIoa hàng cho: </b> {order.shippingAddress.name}{" "}
                        <br />
                        <b>Số điện thoại : </b> {order.shippingAddress.phone}{" "}
                        <br />
                        <b>Địa chỉ: </b> {order.shippingAddress.address},{" "}
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.country} <br />
                        <b>Mã :</b> {order.shippingAddress.postalCode}
                      </div>
                    </div>
                    <div className="col-md-6 border-left">
                      <div className="">
                        <h4>Chi tiết đơn</h4>
                        <div>
                          <b>Ngày đặt hàng</b> :{" "}
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                        <div>
                          <b>Thanh toán</b> : {order.paymentMethod}
                        </div>
                        <div>
                          <b>Trạng thái</b> :{" "}
                          {order.paymentResult.status === "Canceled"
                            ? "Đã hủy"
                            : order.paymentResult.status === "Confirmed"
                            ? "Đang xác nhận"
                            : order.paymentResult.status === "Processing"
                            ? "Đang giao hàng"
                            : order.paymentResult.status === "Successfully"
                            ? "Đã giao hàng"
                            : ""}
                        </div>
                        {order.paymentMethod === "paypal" && (
                          <div>
                            <b>Id</b> : {order.paymentResult.id} <br />
                            <b>THời gian thanh toán</b> :{" "}
                            {new Date(
                              order.paymentResult.update_time
                            ).toLocaleString()}{" "}
                            <br />
                            <b>Địa chỉ email</b> :{" "}
                            {order.paymentResult.email_address}{" "}
                          </div>
                        )}
                        <div className="col-md-6"></div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card-footer border-0 px-4 py-5"
                    style={{
                      backgroundColor: "#a8729a",
                      borderBottomLeftRadius: "10px",
                      borderBottomRightRadius: "10px",
                    }}
                  >
                    <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                      Tổng tiền :{" "}
                      <span className="h2 mb-0 ms-2"> ${order.totalPrice}</span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyOrderDetails;
