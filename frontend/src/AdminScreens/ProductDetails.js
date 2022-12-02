import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CategoryContext from '../context/category/categoryContext'
import productContext from '../context/product/productContext'

const ProductDetails = () => {
  // for product context
  const pContext = useContext(productContext)
  const { getOneProduct, updateProductDetails, updateProductImage, deleteProduct } = pContext
  // for category context
  const cContext = useContext(CategoryContext)
  const { categories, getCategories } = cContext

  const { id } = useParams()

  const [imageFile, setImageFile] = useState('')

  const [product, setProduct] = useState({
    name: '',
    sku: '',
    category: '',
    price: '',
    description: '',
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
    // eslint-disable-next-line
  }, [])

  const handleChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  // console.log(product)
  const handleSaveChanges = () => {
    // console.log(product)
    const { name, sku, category, price, description } = product
    updateProductDetails(id, name, sku, category, price, description)
  }
  const deleteSaveChanges = () => {
    // console.log(product)
    const { name, sku, category, price, description } = product
    deleteProduct(id, name, sku, category, price, description)
  }

  const handleUpdateImage = async () => {
    const formData = new FormData()
    formData.append('image', imageFile)

    console.log('Add product to run')
    const imagePath = await updateProductImage(id, formData)
    setImage(imagePath)

    console.log('update  product image  ran')

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
                <i className="fas fa-arrow-left" /> Back To Dashboard
              </Link>
            </div>
            <div className="col-md-4">
              <button
                className="btn btn-success btn-block"
                onClick={ handleSaveChanges }>
                <i className="fas fa-check" /> Save Changes
              </button>
            </div>
            <div className="col-md-4">
              <button className="btn btn-danger btn-block"
                onClick={ deleteSaveChanges }>
                <i className="fas fa-trash" /> Delete Product
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
                  <h4>Edit Product</h4>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="name">Product Name</label>
                    <input
                      type="text"
                      name="name"
                      onChange={ handleChange }
                      value={ product.name }
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="sku">SKU</label>
                    <input
                      type="text"
                      name="sku"
                      onChange={ handleChange }
                      value={ product.sku }
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="category">Category</label>
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
                    <label htmlFor="price">Pirce</label>
                    <input
                      type="text"
                      name="price"
                      onChange={ handleChange }
                      value={ product.price }
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="body">Description</label>
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
              <h3 className="text-center">Image</h3>
              <img src={ image } alt="" className="d-block img-fluid mb-3" />
              <div className="form-group">
                <label htmlFor="image">Upload Image</label>
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
                    Choose File
                  </label>
                </div>
                <small className="form-text text-muted">Max Size 3mb</small>
              </div>
              <button
                className="btn btn-primary btn-block"
                disabled={ !imageFile }
                onClick={ handleUpdateImage }>
                Update Image
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
