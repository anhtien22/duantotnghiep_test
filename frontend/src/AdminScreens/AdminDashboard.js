import React, { useContext, useEffect } from 'react'
import Navbar from '../AdminComponents/Navbar'
import AddProductModal from '../AdminComponents/AddProductModal'
import AddCategoryModal from '../AdminComponents/AddCategoryModal'
import { Link } from 'react-router-dom'
import productContext from '../context/product/productContext'

const AdminDashboard = () => {
  // for product context
  const pContext = useContext(productContext)
  const { getProducts, products } = pContext

  const limit = 5
  const skip = 0
  // const [skip, setSkip] = useState(0)
  // const [keyWord, setKeyWord] = useState('')
  // const [category, setCategory] = useState('')
  // const [totalResults, setTotalResults] = useState(0)

  useEffect(() => {
    getProducts(limit, skip, '', '')
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <Navbar />
      <div>
        {/* HEADER */}
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
        {/* ACTIONS */}
        <section id="actions" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <a
                  href="/"
                  className="btn btn-primary btn-block"
                  data-toggle="modal"
                  data-target="#addProductModal">
                  <i className="fas fa-plus" /> Add Porduct
                </a>
              </div>

              <div className="col-md-4">
                <a
                  href="/"
                  className="btn btn-success btn-block"
                  data-toggle="modal"
                  data-target="#addCategoryModal">
                  <i className="fas fa-plus" /> Add Category
                </a>
              </div>

              <div className="col-md-4">
                <Link to="/users" className="btn btn-warning btn-block">
                  <i className="fas fa-plus" /> Manage Users
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* POSTS */}
        <section id="posts">
          <div className="container">
            <div className="row">
              <div className="col-md-9">
                <div className="card">
                  <div className="card-header">
                    <h4>Latest Products</h4>
                  </div>
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, i) => (
                        <tr key={product._id}>
                          <td>{i + 1}</td>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>
                            {new Date(product.createdAt).toLocaleDateString()}
                          </td>
                          <td>
                            <Link
                              to={`/productDetailsAdmin/${product._id}`}
                              className="btn btn-secondary">
                              <i className="fas fa-angle-double-right" />{' '}
                              Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="text-center my-3">
                    <Link to="/products">
                      <button className="btn btn-info">See all products</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center bg-primary text-white mb-3">
                  <div className="card-body">
                    <h3>Products</h3>
                    <h4 className="display-4">
                      <i className="fas fa-pencil-alt" /> {products.length}
                    </h4>
                    <Link
                      to="/products"
                      className="btn btn-outline-light btn-sm">
                      View
                    </Link>
                  </div>
                </div>
                <div className="card text-center bg-success text-white mb-3">
                  <div className="card-body">
                    <h3>Categories</h3>
                    <h4 className="display-4">
                      <i className="fas fa-folder" /> 4
                    </h4>
                    <Link
                      to="/categories"
                      className="btn btn-outline-light btn-sm">
                      View
                    </Link>
                  </div>
                </div>
                <div className="card text-center bg-warning text-white mb-3">
                  <div className="card-body">
                    <h3>Users</h3>
                    <h4 className="display-4">
                      <i className="fas fa-users" /> 4
                    </h4>
                    <Link to="/users" className="btn btn-outline-light btn-sm">
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* <Footer /> */}

      <div>
        <AddProductModal />

        <AddCategoryModal />
      </div>
    </div>
  )
}

export default AdminDashboard
