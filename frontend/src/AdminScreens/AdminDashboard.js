import React, { useContext, useEffect } from 'react'
import Navbar from '../AdminComponents/Navbar'
import AddProductModal from '../AdminComponents/AddProductModal'
import AddCategoryModal from '../AdminComponents/AddCategoryModal'
import { Link } from 'react-router-dom'
import productContext from '../context/product/productContext'
import categoryContext from '../context/category/categoryContext'
import userContext from '../context/user/UserContext'
import OrderContext from '../context/orders/orderContext'


const AdminDashboard = () => {
  // for product context
  const cContext = useContext(categoryContext)
  const pContext = useContext(productContext)
  const uContext = useContext(userContext)
  const oContext = useContext(OrderContext)
  const { getProducts, products } = pContext
  const { getCategories, categories } = cContext
  const { getAllUsers, allUsers } = uContext
  const { getAllOrders, orders } = oContext
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
  // const limit = 5
  const skip = 0

  const limit = 5;
  // const [skip, setSkip] = useState(0)
  // const [keyWord, setKeyWord] = useState('')
  // const [category, setCategory] = useState('')
  // const [totalResults, setTotalResults] = useState(0)
  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
  });
  useEffect(() => {
    getProducts(skip, '', '')
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    getCategories(skip, '', '')
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    getAllUsers(skip, '', '')
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    getAllOrders(skip, '', '')
    // eslint-disable-next-line
    getProducts(limit, skip, "", "");
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        {/* HEADER */ }
        <header id="main-header" className="py-2 bg-primary text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>
                  <i className="fas fa-cog" />
                  Admin Dashboard
                </h1>
              </div>
            </div>
          </div>
        </header>
        {/* ACTIONS */ }
        <section id="actions" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <a
                  href="/"
                  className="btn btn-primary btn-block"
                  data-toggle="modal"
                  data-target="#addProductModal">
                  <i className="fas fa-plus" /> Thêm sản phẩm
                </a>
              </div>

              <div className="col-md-4">
                <a
                  href="/"
                  className="btn btn-success btn-block"
                  data-toggle="modal"
                  data-target="#addCategoryModal">
                  <i className="fas fa-plus" /> Thêm danh mục
                </a>
              </div>

              <div className="col-md-4">
                <Link to="/users" className="btn btn-warning btn-block">
                  <i className="fas fa-plus" /> Quản lý người dùng
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* POSTS */ }
        <section id="posts">
          <div className="container">
            <div className="row">
              <div className="col-md-9">
                <div className="card">
                  <div className="card-header">
                    <h4>Sản phẩm mới nhất</h4>
                  </div>
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>Tên</th>
                        <th>Giá</th>
                        <th>Ngày</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      { products.map((product, i) => (
                        <tr key={ product._id }>
                          <td>{ i + 1 }</td>
                          <td>{ product.name }</td>
                          <td>{ formatter.format(product.price) }</td>
                          <td>
                            { new Date(product.createdAt).toLocaleDateString() }
                          </td>
                          <td>
                            <Link
                              to={ `/productDetailsAdmin/${product._id}` }
                              className="btn btn-secondary bg-primary text-white"
                            >
                              <i className="fas fa-angle-double-right" />{ " " }
                              Chi tiết
                            </Link>
                          </td>
                        </tr>
                      )) }
                    </tbody>
                  </table>
                  <div className="text-center my-3">
                    <Link to="/products">
                      <button className="btn btn-info">Xem tất cả sản phẩm</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center bg-primary text-white mb-3">
                  <div className="card-body">
                    <h3>Sản phẩm</h3>
                    <h4 className="display-4">
                      <i className="fas fa-pencil-alt" /> { products.length }
                    </h4>
                    <Link
                      to="/products"
                      className="btn btn-outline-light btn-sm">
                      Xem
                    </Link>
                  </div>
                </div>
                <div className="card text-center bg-success text-white mb-3">
                  <div className="card-body">
                    <h3>Danh mục</h3>
                    <h4 className="display-4">
                      <i className="fas fa-folder" /> { categories.length }
                    </h4>
                    <Link
                      to="/categories"
                      className="btn btn-outline-light btn-sm">
                      Xem
                    </Link>
                  </div>
                </div>
                <div className="card text-center bg-warning text-white mb-3">
                  <div className="card-body">
                    <h3>Tài khoản</h3>
                    <h4 className="display-4">
                      <i className="fas fa-users" /> { allUsers.length }
                    </h4>
                    <Link to="/users" className="btn btn-outline-light btn-sm">
                      Xem
                    </Link>
                  </div>
                </div>
                <div className="card text-center bg-warning text-white mb-3">
                  <div className="card-body">
                    <h3>Doanh Thu</h3>
                    <p className="display-4">
                      <i className="fas fa-users" /> { formatter.format(resulf) }
                    </p>
                    <Link to="/orders" className="btn btn-outline-light btn-sm">
                      Xem
                    </Link>
                  </div>
                </div>
                {/* <div className="card text-center bg-warning text-white mb-3">
                  <div className="card-body">
                    <h3>Đơn hàng</h3>
                    <h4 className="display-4">
                      <i className="fas fa-users" />
                      {oContext.orders?.length}
                    </h4>
                    <Link to="/orders" className="btn btn-outline-light btn-sm">
                      View
                    </Link>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* <Footer /> */ }

      <div>
        <AddProductModal />

        <AddCategoryModal />
      </div>
    </div>
  );
};

export default AdminDashboard;
