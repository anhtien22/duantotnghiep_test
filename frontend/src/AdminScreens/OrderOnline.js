import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../AdminComponents/Navbar";
import OrderContext from "../context/orders/orderContext";
const total = (orders, status) =>
  orders.reduce((r, index) => {
    if (index.paymentResult.status === status) {
      if (index.orderItems.length) {
        const total = index.orderItems.reduce((count, item) => {
          return (count += item.price * item.quantity);
        }, 0);

        return (r += total);
      }
    }
    return r;
  }, 0);

const OrderOnline = () => {
  // for order context
  const oContext = useContext(OrderContext);
  const { getAllOrders, orders } = oContext;
  const resulf = total(orders, "Successfully");
  const resulf2 = total(orders, "COMPLETED");
  const resulf3 = resulf + resulf2;
  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
  });
  useEffect(() => {
    getAllOrders();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar />
      {/* HEADER */}
      <header id="main-header" className="py-2 bg-warning text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-users" /> Orders
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* SEARCH */}
      <section id="search" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row">
            <div>Doanh thu giao hàng: {formatter.format(resulf)}</div>

            <div>
              <Link to={`/orderAdmin/cod`} className="btn btn-secondary">
                <i className="fas fa-angle-double-right" /> Chi tiết
              </Link>
              Doanh thu đã thanh toán online: {formatter.format(resulf2)}
            </div>
            <div>Tổng doanh thu : {formatter.format(resulf3)}</div>
            <Link to={`/orders`} className="btn btn-secondary">
              <i className="fas fa-angle-double-right" /> Chi tiết
            </Link>
            <div>
              Đã hủy
              <Link to={`/orderAdmin/canceled`} className="btn btn-secondary">
                <i className="fas fa-angle-double-right" /> Chi tiết
              </Link>
            </div>
            <div className="col-md-6 ml-auto">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Users..."
                />
                <div className="input-group-append">
                  <button className="btn btn-warning">Search</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="users">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <h4>Đơn online mới nhất </h4>
                </div>
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>Mã</th>
                      <th>Tên người dùng</th>
                      <th>Ngày đặt hàng</th>
                      <th>Tiền </th>
                      <th>Trạng thái</th>
                      <th>Xem thêm</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) =>
                      order.paymentMethod === "paypal" ? (
                        <tr key={order._id}>
                          {/* <td>{index + 1}</td> */}
                          <td>{order._id}</td>
                          <td>{order.user?.name}</td>
                          <td>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td>{formatter.format(order.totalPrice)}</td>
                          <td className="px-4 py-3">
                            <div className="flex-grow w-full online">
                              {order.paymentResult.status === "COMPLETED"
                                ? "Đã thanh toán online"
                                : ""}
                            </div>
                          </td>

                          <td>
                            <Link
                              to={`/orderDetailsAdmin/${order._id}`}
                              className="btn btn-secondary"
                            >
                              <i className="fas fa-angle-double-right" /> Chi
                              tiết
                            </Link>
                          </td>
                        </tr>
                      ) : (
                        ""
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderOnline;
