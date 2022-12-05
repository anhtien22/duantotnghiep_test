import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../AdminComponents/Navbar";
import OrderContext from "../context/orders/orderContext";

const statusOrder = {
  Confirmed: "Đang xác nhận",
  Processing: "Đang giao hàng",
  Successfully: "Đã giao hàng",
  Canceled: "Đã hủy",
};
const Orders = () => {
  // for order context
  const oContext = useContext(OrderContext);
  const { getAllOrders, orders, updateStatustAdmin } = oContext;
  const resulf = orders.reduce((r, index) => {
    if (index.paymentResult.status === "Successfully") {
      if (index.orderItems.length) {
        const total = index.orderItems.reduce((count, item) => {
          return (count += item.price * item.quantity);
        }, 0);

        return (r += total);
      }
    }
    return r;
  }, 0);
  const statusHtml = (orderStatus) => {
    const index = Object.keys(statusOrder).findIndex(
      (key) => key === orderStatus
    );

    return Object.keys(statusOrder)
      .map(function (key, i) {
        if (i >= index) {
          return `<option
          value="${key}"
          className="text-gray-200 dark:text-slate-800"
        >${statusOrder[key]}</option>`;
        }
        return "";
      })
      .join("");
  };
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
            <div>Doanh thu: {formatter.format(resulf)}</div>
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
                  <h4>Đơn đặt hàng mới nhất </h4>
                </div>
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Tên người dùng</th>
                      <th>Ngày đặt hàng</th>
                      <th>Tiền </th>
                      <th>Trạng thái</th>
                      <th>Xem thêm</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={order._id}>
                        <td>{index + 1}</td>
                        <td>{order.user?.name}</td>
                        <td>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td>{formatter.format(order.totalPrice)}</td>
                        <td className="px-4 py-3">
                          <div className="flex-grow w-full">
                            <select
                              onChange={(e) => updateStatustAdmin(e, order._id)}
                              className="block w-full px-2 py-1 text-sm outline-none rounded-md form-select focus:shadow-none leading-5 h-12 bg-[#24262D] dark:bg-[#F4F5F7] border-[1px] border-gray-600 dark:border-gray-300 text-gray-200 dark:text-black"
                              name="orderStatus"
                              dangerouslySetInnerHTML={{
                                __html: statusHtml(order.paymentResult.status),
                              }}
                            ></select>
                          </div>
                        </td>

                        <td>
                          <Link
                            to={`/orderDetailsAdmin/${order._id}`}
                            className="btn btn-secondary"
                          >
                            <i className="fas fa-angle-double-right" /> Chi tiết
                          </Link>
                        </td>
                      </tr>
                    ))}
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

export default Orders;
