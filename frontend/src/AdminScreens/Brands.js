import React, { useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import Navbar from '../AdminComponents/Navbar'
// import Footer from '../AdminComponents/Footer'
import BrandContext from '../context/brand/brandContext'
import EditBrandModal from '../AdminComponents/EditBrandModal'
import AddBrandModal from '../AdminComponents/AddBrandModal'

const Brands = () => {
  const context = useContext(BrandContext)
  const { brands, getBrands, deleteBrand } = context

  // const [categoryArray, setCategoryArray] = useState(categories)

  useEffect(() => {
    getBrands()

    // eslint-disable-next-line
  }, [])

  //delete catagory
  const deleteSaveChanges = (id) => {
    deleteBrand(id)
  }
  return (
    <div>
      <Navbar />

      <div>
        {/* HEADER */ }
        <header id="main-header" className="py-2 bg-secondary text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>
                  <i className="fas fa-folder" /> Thương hiệu
                </h1>
              </div>
            </div>
          </div>
        </header>
        {/* SEARCH */ }
        <section id="search" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row" id='boxx2'>
              <div className="col-md-6">
                <a
                  href="/"
                  className="btn bg-secondary text-white btn-block"
                  data-toggle="modal"
                  data-target="#addBrandModal">
                  <i className="fas fa-plus" /> Thêm mới thương hiệu
                </a>
                <AddBrandModal />
              </div>
              <div className="col-md-6 ml-auto">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm danh mục..."
                  />
                  <div className="input-group-append">
                    <button className="btn btn-secondary">Tìm kiếm</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* CATEGORIES */ }
        <section id="brands">
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
                        <th></th>
                      </thead>
                      <tbody>
                        {
                          <>
                            { brands.map((brand, i) => (
                              <tr key={ brand._id }>
                                <td className="product-mahang1">
                                  { i + 1 }
                                </td>
                                <td className="product-tenhang">{ brand.local }</td>
                                <td className="product-logo">{ new Date(brand.createdAt).toLocaleDateString() }</td>
                                <td id='buttonadmin'>
                                  <EditBrandModal brand={ brand } />
                                  <Button variant="danger" className="mx-2" onClick={ () => deleteSaveChanges(brand._id) }>
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

export default Brands
