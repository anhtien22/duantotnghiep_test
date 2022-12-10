import React, { useEffect, useState } from 'react'
import BrandContext from './brandContext'
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
// Category State
// ------------------------------------------
const BrandState = props => {
  const [brands, setBrands] = useState([])
  const [brandsError, setBrandsError] = useState(null)
  const [brandsLoading, setBrandsLoading] = useState(false)
  const [brandsMessage, setBrandsMessage] = useState(null)

  useEffect(() => {
    setTimeout(() => {
        setBrandsError(null)
        setBrandsMessage(null)
    }, 3000)
  }, [brandsError, brandsMessage])

  // Error Handler function
  const errorHandler = (err, info) => {
    if (err.response) {
        setBrandsError({
        variant: 'danger',
        message: `${info}, ${err.response.data.error}`,
      })
    } else if (err.request) {
        setBrandsError({
        variant: 'danger',
        message: `${info},  Không có phản hồi từ máy chủ!`,
      })
    } else {
        setBrandsError({ variant: 'danger', message: err.message })
    }
    setBrandsLoading(false)
  }

  // Add new category
  const addBrand = async local => {
    const brandBody = clean({ local })
    try {
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
      setBrandsLoading(true)
      await axios.post('api/brand/add', brandBody, { headers })
      setBrands([...brands, brandBody])
      setBrandsMessage({
        variant: 'success',
        message: 'Thương hiệu được thêm thành công!',
      })
      window.location.reload();
      setBrandsLoading(false)
      setBrandsError(null)
    } catch (err) {
      errorHandler(err)
    }
  }

  // get all categories
  const getBrands = async (limit, skip, keyword) => {
    try {
        setBrandsLoading(true)
      const { data } = await axios.get('api/brand/getAll', {
        params: { limit, skip, keyword},
      })
      setBrands(data.brands)
      setBrandsLoading(false)
      setBrandsError(null)
    } catch (err) {
      errorHandler(err)
    }
  }

// Delete Category
const deleteBrand = async id  => {
  try {
    setBrandsLoading(true)
    const userToken = JSON.parse(localStorage.getItem('userToken'))
    const headers = {
      Authorization: `Bearer ${userToken && userToken}`,
      'Content-Type': 'multipart/form-data',
    }
    const { data } = await axios.delete(`/api/brand/${id}`, { headers })
    setBrandsLoading(false)
    setBrandsError(null)
    setBrandsMessage({
      variant: 'success',
      message: 'Xóa thành công!',
    })
    window.location.reload();
    return data.categories
  } catch (err) {
    errorHandler(err, 'Không tìm thấy sản phẩm')
  }
}

  // get one category
  const getOneBrand = async id => {
    try {
      const { data } = await axios.get(`/api/brand/${id}`)
      return data.categories
    } catch (err) {
      errorHandler(err)
    }
  }

  const updateBrand = async (id, local) => {
    try {
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
      setBrandsLoading(true)
      await axios.patch(`api/brand/${id}`, { local }, { headers })
      getBrands()
      setBrandsMessage({
        variant: 'info',
        message: 'Thương hiệu được cập nhật',
      })
      setBrandsLoading(false)
      setBrandsError(null)
    } catch (err) {
      errorHandler(err)
    }
  }

  return (
    <BrandContext.Provider
      value={{
        brands,
        brandsError,
        brandsLoading,
        brandsMessage,
        getBrands,
        addBrand,
        deleteBrand,
        getOneBrand,
        updateBrand,
      }}>
      {props.children}
    </BrandContext.Provider>
  )
}

export default BrandState
