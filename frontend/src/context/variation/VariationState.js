import React, { useEffect, useState } from 'react'
import VariationContext from './variationContext'
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
const VariationState = props => {
  const [variations, setVariations] = useState([])
  const [variationsError, setVariationsError] = useState(null)
  const [variationsLoading, setVariationsLoading] = useState(false)
  const [variationsMessage, setVariationsMessage] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setVariationsError(null)
      setVariationsMessage(null)
    }, 3000)
  }, [variationsError, variationsMessage])

  // Error Handler function
  const errorHandler = (err, info) => {
    if (err.response) {
      setVariationsError({
        variant: 'danger',
        message: `${info}, ${err.response.data.error}`,
      })
    } else if (err.request) {
      setVariationsError({
        variant: 'danger',
        message: `${info},  No response from server!`,
      })
    } else {
      setVariationsError({ variant: 'danger', message: err.message })
    }
    setVariationsLoading(false)
  }

  // Add new variation
  const addVariation = async title => {
    const variationBody = clean({ title })
    try {
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
      setVariationsLoading(true)
      await axios.post('api/variation/add', variationBody, { headers })
      setVariations([...variations, variationBody])
      setVariationsMessage({
        variant: 'success',
        message: 'variation added successfully!',
      })
      setVariationsLoading(false)
      setVariationsError(null)
    } catch (err) {
      errorHandler(err)
    }
  }

  // get all variation
  const getVariations = async () => {
    try {
      setVariationsLoading(true)
      const { data } = await axios.get('api/variation/getAll')
      setVariations(data.variations)
      setVariationsLoading(false)
      setVariationsError(null)
    } catch (err) {
      errorHandler(err)
    }
  }

  // get one variation
  const getOneVariation = async id => {
    try {
      const { data } = await axios.get(`/api/variation/${id}`)
      return data.variations
    } catch (err) {
      errorHandler(err)
    }
  }

  const updateVariation = async (id, title) => {
    try {
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
      setVariationsLoading(true)
      await axios.patch(`api/variation/${id}`, { title }, { headers })
      getVariations()
      setVariationsMessage({
        variant: 'info',
        message: 'Category updated!',
      })
      setVariationsLoading(false)
      setVariationsError(null)
    } catch (err) {
      errorHandler(err)
    }
  }

  return (
    <VariationContext.Provider
      value={ {
        variations,
        variationsError,
        variationsLoading,
        variationsMessage,
        getVariations,
        addVariation,
        getOneVariation,
        updateVariation,
      } }>
      { props.children }
    </VariationContext.Provider>
  )
}

export default VariationState
