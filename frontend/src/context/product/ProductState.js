import React, { useEffect, useState } from 'react'
import ProductContext from './productContext'
import axios from 'axios'

// Function for cleaning null, undefined and empty strings values in objects
function clean(obj) {
  for (var propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === ''
    ) {
      delete obj[propName]
    }
  }
  return obj
}

// ------------------------------------------
// Product State
// ------------------------------------------
const ProductState = props => {
  const [products, setProducts] = useState([])
  const [productsError, setProductsError] = useState(null)
  const [productsLoading, setProductsLoading] = useState(false)
  const [productsMessage, setProductsMessage] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setProductsError(null)
      setProductsMessage(null)
    }, 3000)
  }, [productsError, productsMessage])

  // Error Handler function
  const errorHandler = (err, info) => {
    if (err.response) {
      setProductsError({
        variant: 'danger',
        message: `${info}, ${err.response.data.error}`,
      })
    } else if (err.request) {
      setProductsError({
        variant: 'danger',
        message: `${info},  Không có phản hồi từ máy chủ!`,
      })
    } else {
      setProductsError({ variant: 'danger', message: err.message })
    }
    setProductsLoading(false)
  }

  // get all Products
  const getProducts = async (limit, skip, keyword, category) => {
    try {
      setProductsLoading(true)
      const { data } = await axios.get(`/api/products/getAll`, {
        params: { limit, skip, keyword, category },
      })
      setProducts(data.products)
      setProductsLoading(false)
      setProductsError(null)
      return data.totalResults
    } catch (err) {
      errorHandler(err, 'Không thể nhận được sản phẩm')
    }
  }

  // Add new product
  const addProduct = async fromData => {
    const productBody = clean(fromData)
    console.log(productBody, ' productBody')
    try {
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
        'Content-Type': 'multipart/form-data',
      }
      setProductsLoading(true)
      await axios.post('api/products/add', productBody, { headers })
      // setProducts([productBody, ...products])
      setProductsMessage({
        variant: 'success',
        message: 'Đã thêm sản phẩm thành công!',
      })
      setProductsLoading(false)
      setProductsError(null)
    } catch (err) {
      errorHandler(err, 'Không thể thêm sản phẩm')
    }
  }

  // Delete prdouct 
  const deleteProduct = async id => {
    try {
      setProductsLoading(true)
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
        'Content-Type': 'multipart/form-data',
      }
      const { data } = await axios.delete(`/api/products/${id}`, { headers })
      setProductsMessage({
        variant: 'success',
        message: 'Xóa thành công!',
      })
      setProductsLoading(false)
      setProductsError(null)
      return data.product
    } catch (err) {
      errorHandler(err, 'Không tìm thấy sản phẩm')
    }
  }

  // get one product
  const getOneProduct = async id => {
    try {
      setProductsLoading(true)
      const { data } = await axios.get(`/api/products/${id}`)
      setProductsLoading(false)
      setProductsError(null)
      return data.product
    } catch (err) {
      errorHandler(err)
    }
  }

  // Update prdouct details
  const updateProductDetails = async (
    id,
    name,
    sku,
    category,
    price,
    description,
    Stock
  ) => {
    try {
      setProductsLoading(true)
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
      const productBody = clean({
        name,
        sku,
        category,
        price,
        description,
        Stock,
      })
      await axios.patch(`/api/products/${id}`, productBody, { headers })
      setProductsMessage({
        variant: 'success',
        message: 'Chi tiết sản phẩm được cập nhật!',
      })
      setProductsLoading(false)
      setProductsError(null)
      // getCategories()
    } catch (err) {
      errorHandler(err, 'Không thể cập nhật chi tiết sản phẩm')
    }
  }
  // Delete prdouct Image


  // Update prdouct Image
  const updateProductImage = async (id, formData) => {
    try {
      setProductsLoading(true)
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
        'Content-Type': 'multipart/form-data',
      }
      const { data } = await axios.patch(
        `api/products/${id}/updateImage`,
        formData,
        { headers }
      )
      setProductsMessage({
        variant: 'success',
        message: 'Hình ảnh sản phẩm được cập nhật!',
      })
      setProductsLoading(false)
      setProductsError(null)
      return data.image
    } catch (err) {
      errorHandler(err, 'Không thể cập nhật hình ảnh')
    }
  }

  const newReview = async (payload) => {
    try {
      console.log(payload);
      setProductsLoading(true)

      const { data } = await axios.put("/api/products/review",
        {
          comment: payload.comment,
          rating: payload.rating,
          productId: payload.productId,
          user: payload.user,
          name: payload.name
        });
      console.log("res", data);


      setProductsLoading(false)
      // setProductsError(null)
      // return data

    } catch (error) {
      errorHandler(error, 'Bình luận thất bại')
    }
  };



  return (
    <ProductContext.Provider
      value={ {
        products,
        productsError,
        productsLoading,
        productsMessage,
        addProduct,
        getProducts,
        getOneProduct,
        updateProductDetails,
        updateProductImage,
        deleteProduct,
        errorHandler,
        newReview
      } }>
      { props.children }
    </ProductContext.Provider>
  )
}

export default ProductState
