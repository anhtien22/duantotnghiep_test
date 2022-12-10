import React, { useContext, useEffect, useState } from 'react'
import CategoryContext from '../context/category/categoryContext'
import BrandContext from '../context/brand/brandContext'
import productContext from '../context/product/productContext'



const AddProductModal = () => {
  // for product context
  const pContext = useContext(productContext)
  const { addProduct } = pContext

  // for category context
  const cContext = useContext(CategoryContext)
  const { categories, getCategories } = cContext

  // for category context
  const bContext = useContext(BrandContext)
  const { brands, getBrands } = bContext

  useEffect(() => {
    getCategories()
    getBrands()
    // eslint-disable-next-line
  }, [])

  const [product, setProduct] = useState({
    name: '',
    sku: '',
    category: '',
    brand: '',
    price: '',
    description: '',
  })

  const [image, setImage] = useState(null)

  const handleChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const handleAddproduct = () => {
    const { name, sku, category, brand, price, description } = product
    const formData = new FormData()
    formData.append('image', image)
    formData.append('name', name)
    formData.append('sku', sku)
    formData.append('category', category)
    formData.append('brand', brand)
    formData.append('price', price)
    formData.append('description', description)
    console.log('Add product to run')
    addProduct(formData)
    console.log('Add product ran')
    setProduct({
      name: '',
      sku: '',
      category: '',
      brand: '',
      price: '',
      description: '',
    })
    setImage('')
  }

  return (
    <>
      {/* ADD POST MODAL */}
      <div
        style={{ zIndex: '9999' }}
        className="modal fade"
        id="addProductModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Add Product</h5>
              <button className="close" data-dismiss="modal">
                <span>×</span>
              </button>
            </div>
            {/* <form onSubmit={handleAddproduct}> */}
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={product.name}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="sku">SKU</label>
                <input
                  type="text"
                  name="sku"
                  onChange={handleChange}
                  value={product.sku}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  className="form-control"
                  name="category"
                  onChange={handleChange}>
                  <option value>Select Category</option>
                  {categories.map(item => (
                    <option key={item._id} value={item._id}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="brand">Brand</label>
                <select
                  className="form-control"
                  name="brand"
                  onChange={handleChange}>
                  <option value>Select Brand</option>
                  {brands.map(item => (
                    <option key={item._id} value={item._id}>
                      {item.local}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="price">Pirce</label>
                <input
                  type="text"
                  name="price"
                  onChange={handleChange}
                  value={product.price}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="body">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  onChange={handleChange}
                  value={product.description}
                />
              </div>

              <div className="form-group">
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
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                type="submit"
                data-dismiss="modal"
                onClick={handleAddproduct}>
                Add Product
              </button>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default AddProductModal
