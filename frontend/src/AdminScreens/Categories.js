import React, { useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import Navbar from '../AdminComponents/Navbar'
// import Footer from '../AdminComponents/Footer'
import CategoryContext from '../context/category/categoryContext'
import EditCategoryModal from '../AdminComponents/EditCategoryModal'
import AddCategoryModal from '../AdminComponents/AddCategoryModal'

const Categories = () => {
  const context = useContext(CategoryContext)
  const { categories, getCategories } = context

  // const [categoryArray, setCategoryArray] = useState(categories)

  useEffect(() => {
    getCategories()

    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <Navbar />

      <div>
        {/* HEADER */}
        <header id="main-header" className="py-2 bg-success text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>
                  <i className="fas fa-folder" /> Categories
                </h1>
              </div>
            </div>
          </div>
        </header>
        {/* SEARCH */}
        <section id="search" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <a
                  href="/"
                  className="btn btn-success btn-block"
                  data-toggle="modal"
                  data-target="#addCategoryModal">
                  <i className="fas fa-plus" /> Add New Category
                </a>
                <AddCategoryModal />
              </div>
              <div className="col-md-6 ml-auto">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Categories..."
                  />
                  <div className="input-group-append">
                    <button className="btn btn-success">Search</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* CATEGORIES */}
        <section id="categories">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-header">
                    <h4>Latest Categories</h4>
                  </div>
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Date</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category, i) => (
                        <tr key={category._id}>
                          <td>{i + 1}</td>
                          <td>{category.title}</td>
                          <td>
                            {new Date(category.createdAt).toLocaleDateString()}
                          </td>
                          <td>
                            {/* <button className="btn btn-secondary">
                              <i className="fas fa-angle-double-right" />{" "}
                              Details
                            </button> */}
                            <EditCategoryModal category={category} />
                            <Button variant="danger" className="mx-2" disabled>
                              <i className="fas fa-trash" /> Delete
                            </Button>
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
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default Categories
