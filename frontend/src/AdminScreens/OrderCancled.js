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

const OrderCancled = () => {
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
  const canceled = orders.map((i) => {
    let arr = [];
    if (i.paymentResult.status === "Canceled") {
      arr.push(i.paymentResult.status);
    }
    return arr;
  });
  const cance = canceled.filter((g) => g[0] === "Canceled");

  return orders ? (
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
            {/* <div>Doanh thu giao hàng: {formatter.format(resulf)}</div>
            <Link to={`/orderAdmin/cod`} className="btn btn-secondary">
              <i className="fas fa-angle-double-right" /> Chi tiết
            </Link>
            <div>
              Doanh thu đã thanh toán online: {formatter.format(resulf2)}
              <Link to={`/orderAdmin/online`} className="btn btn-secondary">
                <i className="fas fa-angle-double-right" /> Chi tiết
              </Link>
            </div>
            <div>Tổng doanh thu : {formatter.format(resulf3)}</div>
            <Link to={`/orders`} className="btn btn-secondary">
              <i className="fas fa-angle-double-right" /> Chi tiết
            </Link> */}

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
      <div className="" style={{ display: 'flex', justifyContent: 'center', gap: '50px' }}>

        <div className="card text-center bg-success text-white mb-3">
          <div className="card-body">
            <h5>Doanh thu giao hàng</h5>
            <h4 className="display-4">
              <i className="fas fa-coins" />
            </h4>
            <h2>{formatter.format(resulf)}</h2>
            <Link to={`/orderAdmin/cod`} className="btn btn-outline-light btn-sm">
              Chi tiết
            </Link>
          </div>
        </div>

        <div className="card text-center bg-danger text-white mb-3">
          <div className="card-body">
            <h5>Doanh thu online</h5>
            <h4 className="display-4">
              <i className="fab fa-cc-paypal" />
            </h4>
            <h2>{formatter.format(resulf2)}</h2>
            <Link to={`/orderAdmin/online`} className="btn btn-outline-light btn-sm">
              Chi tiết
            </Link>
          </div>
        </div>



        <div className="card text-center bg-warning text-white mb-3">
          <div className="card-body">
            <h5>Đơn hàng đã hủy</h5>
            <h4 className="display-4">
              <i className="fas fa-window-close" />
            </h4>
            <h2>{cance.length}</h2>
          </div>
        </div>

        <div className="card text-center bg-primary text-white mb-3">
          <div className="card-body">
            <h5>Tổng doanh thu</h5>
            <h4 className="display-4">
              <i className="far fa-money-bill-alt" />
            </h4>
            <h2>{formatter.format(resulf3)}</h2>
            <Link to={`/orders`} className="btn btn-outline-light btn-sm">
              Chi tiết
            </Link>
          </div>
        </div>
      </div>

      <section id="users">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <h4>Đơn đã hủy </h4>
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
                      order.paymentResult.status === "Canceled" ? (
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
                              {order.paymentResult.status === "Canceled"
                                ? "Đã Hủy"
                                : ""}
                            </div>
                          </td>

                          <td>
                            <Link
                              to={`/orderDetailsAdmin/${order._id}`}
                              className="btn btn-secondary bg-primary text-white"
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
  ) : "Đơn hàng trống"
};

export default OrderCancled;
