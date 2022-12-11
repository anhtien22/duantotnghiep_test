import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CategoryContext from '../context/category/categoryContext'
import BrandContext from '../context/brand/brandContext'
import productContext from '../context/product/productContext'


const ProductDetails = () => {
  // for product context
  const pContext = useContext(productContext)
  const { getOneProduct, updateProductDetails, updateProductImage, deleteProduct } = pContext
  // for category context
  const cContext = useContext(CategoryContext)
  const { categories, getCategories } = cContext

  const bContext = useContext(BrandContext)
  const { brands, getBrands } = bContext

  const { id } = useParams()
  const [imageFile, setImageFile] = useState('')

  const [product, setProduct] = useState({
    name: '',
    sku: '',
    category: '',
    brand: '',
    price: '',
    description: '',
    Stock: '',
  })

  const [image, setImage] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getOneProduct(id)
      // console.log(fetchedProduct)
      setProduct(fetchedProduct)
      setImage(fetchedProduct.image)
    }
    fetchProduct()
    getCategories()
    getBrands()
    // eslint-disable-next-line
  }, [])

  const handleChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  // console.log(product)
  const handleSaveChanges = () => {
    // console.log(product)
    const { name, sku, category, brand, price, description, Stock } = product
    updateProductDetails(id, name, sku, category, brand, price, description, Stock)
  }
  const deleteSaveChanges = (id) => {
    // console.log(product)
    deleteProduct(id)
  }

  const handleUpdateImage = async () => {
    const formData = new FormData()
    formData.append('image', imageFile)

    console.log('Thêm sản phẩm để chạy')
    const imagePath = await updateProductImage(id, formData)
    setImage(imagePath)

    console.log('Cập nhật hình ảnh sản phẩm chạy')

    setImageFile(null)
  }



  return (
    <>
      {/* ACTIONS */ }
      <section id="actions" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <Link
                to="/adminDashboard"
                className="btn btn-secondary btn-block">
                <i className="fas fa-arrow-left" /> Trở về trang
              </Link>
            </div>
            <div className="col-md-4">
              <button
                className="btn btn-success btn-block"
                onClick={ handleSaveChanges }>
                <i className="fas fa-check" /> Lưu thay đổi
              </button>
            </div>
            <div className="col-md-4">
              <button className="btn btn-danger btn-block"
                onClick={ () => deleteSaveChanges(id) }>
                <i className="fas fa-trash" /> Xóa sản phẩm
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* DETAILS */ }
      <section id="details">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">
                  <h4>Sửa sản phẩm</h4>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="name">Tên sản phẩm</label>
                    <input
                      type="text"
                      name="name"
                      onChange={ handleChange }
                      value={ product.name }
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="sku">Mã sản phẩm</label>
                    <input
                      type="text"
                      name="sku"
                      onChange={ handleChange }
                      value={ product.sku }
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="category">Danh mục</label>
                    <select
                      className="form-control"
                      name="category"
                      onChange={ handleChange }>
                      <option value={ product.category._id }>
                        { product.category.title }
                      </option>
                      { categories.map(item => (
                        <option key={ item._id } value={ item._id }>
                          { item.title }
                        </option>
                      )) }
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="brand">Thương hiệu</label>
                    <select
                      className="form-control"
                      name="brand"
                      onChange={ handleChange }>
                      <option value={ product.brand._id }>
                        { product.brand.local }
                      </option>
                      { brands.map(item => (
                        <option key={ item._id } value={ item._id }>
                          { item.local }
                        </option>
                      )) }
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="price">Giá</label>
                    <input
                      type="text"
                      name="price"
                      onChange={ handleChange }
                      value={ product.price }
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Stock">Stock</label>
                    <input
                      type="text"
                      name="Stock"
                      onChange={ handleChange }
                      value={ product.Stock }
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="body">Mô tả</label>
                    <textarea
                      className="form-control"
                      name="description"
                      onChange={ handleChange }
                      value={ product.description }
                    />
                  </div>

                  {/* <div className="form-group">
                    <label htmlFor="image">Upload Image</label>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="image"
                        // onChange={uploadFileHandler}
                        name="image"
                        onChange={e => setImage(e.target.files[0])}
                        // value={product.description}
                      />
                      <label htmlFor="image" className="custom-file-label">
                        Choose File
                      </label>
                    </div>
                    <small className="form-text text-muted">Max Size 3mb</small>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <h3 className="text-center">Hình ảnh</h3>
              <img src={ image } alt="" className="d-block img-fluid mb-3" />
              <div className="form-group">
                <label htmlFor="image">Tải hình ảnh</label>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="image"
                    // onChange={uploadFileHandler}
                    name="image"
                    onChange={ e => setImageFile(e.target.files[0]) }
                  // value={product.description}
                  />
                  <label htmlFor="image" className="custom-file-label">
                    Chọn hình ảnh
                  </label>
                </div>
                <small className="form-text text-muted">Max Size 3mb</small>
              </div>
              <button
                className="btn btn-primary btn-block"
                disabled={ !imageFile }
                onClick={ handleUpdateImage }>
                Cập nhật hình ảnh
              </button>
              {/* <button className="btn btn-danger btn-block">Delete Image</button> */ }
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductDetails
