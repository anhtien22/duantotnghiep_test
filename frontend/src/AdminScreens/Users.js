import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../AdminComponents/Navbar'
import UserContext from '../context/user/UserContext'
// import Footer from '../AdminComponents/Footer'

const Users = () => {
  // for user context
  const uContext = useContext(UserContext)
  const { getAllUsers, allUsers, deleteOneUserAdmin } = uContext

  useEffect(() => {
    getAllUsers()
    // eslint-disable-next-line
  }, [])
  const deleteSaveChanges = (id) => {
    // const { name, sku, category, price, description } = user
    deleteOneUserAdmin(id)
  }
  return (
    <>
      <Navbar />
      <div>
        {/* HEADER */ }
        <header id="main-header" className="py-2 bg-warning text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>
                  <i className="fas fa-users" /> Tài khoản
                </h1>
              </div>
            </div>
          </div>
        </header>
        {/* SEARCH */ }
        <section id="search" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-6 ml-auto">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm người dùng..."
                  />
                  <div className="input-group-append">
                    <button className="btn btn-warning">Tìm kiếm</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* USERS */ }
        <section id="users">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-header">
                    <h4>Tài khoản mới nhất</h4>
                  </div>
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Ngày</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      { allUsers.map((user, i) => (
                        <tr key={ user._id }>
                          <td>{ i + 1 }</td>
                          <td>{ user.name }</td>
                          <td>{ user.email }</td>
                          <td>{ new Date(user.createdAt).toLocaleString() }</td>
                          <td>
                            {/* <Link
                              to={ `/usersDetailsAdmin/${user._id}` }
                              className="btn btn-secondary">
                              <button
                                className="btn btn-secondary"
                              // disabled
                              >
                                <i className="fas fa-angle-double-right" /> Action
                              </button>
                            </Link> */}
                            <button
                              className="btn btn-secondary bg-danger text-white"
                              disabled
                              onClick={ () => deleteSaveChanges(user._id) }>
                              <i className="fas fa-angle-double-right" /> Xóa
                            </button>

                          </td>
                        </tr>
                      )) }
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <div className="card-header">
                    <h4>All Admins</h4>
                  </div>
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Ngày</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Admin</td>
                        <td>admin@gmail.com</td>
                        <td>
                          <a href="details.html" className="btn btn-secondary bg-primary text-white">
                            <i className="fas fa-angle-double-right" /> Chi tiết
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <Footer /> */ }
    </>
  )
}

export default Users
