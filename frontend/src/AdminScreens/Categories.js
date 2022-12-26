import React, { useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import Navbar from '../AdminComponents/Navbar'
// import Footer from '../AdminComponents/Footer'
import CategoryContext from '../context/category/categoryContext'
import EditCategoryModal from '../AdminComponents/EditCategoryModal'
import AddCategoryModal from '../AdminComponents/AddCategoryModal'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'

const Categories = () => {
  const context = useContext(CategoryContext)
  const { categories, getCategories, deleteCategory } = context
  const navigate = useNavigate()
  // const [categoryArray, setCategoryArray] = useState(categories)

  useEffect(() => {
    getCategories()

    // eslint-disable-next-line
  }, [])

  //delete catagory
  const deleteSaveChanges = (id) => {
    swal({
      title: "Bạn có chắc muốn xóa không?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal({
            title: "Đã xóa danh mục thành công!",
            icon: "success",
            buttons: true,
          });
          deleteCategory(id)
          // setTimeout(() => {
          window.location.reload()


          // }, 3000)
        } else {
          window.location.reload()
        }
      });

  }
  return (
    <div>
      <Navbar />

      <div>
        {/* HEADER */ }
        <header id="main-header" className="py-2 bg-success text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>
                  <i className="fas fa-folder" /> Danh mục
                </h1>
              </div>
            </div>
          </div>
        </header>
        {/* SEARCH */ }
        <section id="search" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row" id="boxx2">
              <div className="col-md-6">
                <a
                  href="/"
                  className="btn btn-success btn-block"
                  data-toggle="modal"
                  data-target="#addCategoryModal">
                  <i className="fas fa-plus" /> Thêm mới danh mục
                </a>
                <AddCategoryModal />
              </div>
              <div className="col-md-6 ml-auto">
                <form>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tìm kiếm danh mục..."
                    />
                    <div className="input-group-append">
                      <button className="btn btn-success" type="submit">Tìm kiếm</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        {/* CATEGORIES */ }
        <section id="categories">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-header">
                    <h4>Danh mục mới nhất</h4>
                  </div>
                  <div className="content table-responsive table-full-width">
                    <table className="table table-hover">
                      <thead>
                        <th className="product-mahang1">#</th>
                        <th className="product-tenhang">Tiêu đề</th>
                        <th>Thao tác</th>
                      </thead>
                      <tbody>
                        {
                          <>
                            { categories && categories.map((category, i) => (
                              <tr key={ category._id }>
                                <td className="product-mahang1">
                                  { i + 1 }
                                </td>
                                <td className="product-tenhang">{ category.title }</td>
                                <td id='buttonadmin' >
                                  <EditCategoryModal category={ category } />
                                  <Button variant="danger" className="mx-2" onClick={ () => deleteSaveChanges(category._id) }>
                                    <i className="fas fa-trash" />
                                  </Button>
                                </td>
                              </tr>
                            )) }
                          </>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <Footer /> */ }
    </div>
  )
}

export default Categories
