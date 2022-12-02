import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../AdminComponents/Navbar'
import OrderContext from '../context/orders/orderContext'

const Orders = () => {
  // for order context
  const oContext = useContext(OrderContext)
  const { getAllOrders, orders } = oContext

  useEffect(() => {
    getAllOrders()
    // eslint-disable-next-line
  }, [])

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
                  <h4>Latest Orders</h4>
                </div>
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>User</th>
                      <th>Date</th>
                      <th>Order Amount</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={order._id}>
                        <td>{index + 1}</td>
                        <td>{order.user.name}</td>
                        <td>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td>{order.totalPrice}</td>
                        <td>
                          <Link
                            to={`/orderDetailsAdmin/${order._id}`}
                            className="btn btn-secondary">
                            <i className="fas fa-angle-double-right" /> Details
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
  )
}

export default Orders
