import Variation from '../models/Variation.js'

// @desc Add new variation
// @route POST '/api/variation/add'
// @access Private : Admin
export const addVariation = async (req, res) => {
  try {
    const variation = new Variation(req.body)
    await variation.save()
    res.status(201).json({ success: true, message: 'Variation Added', variation })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Get all variation
// @route GET '/api/variation/getAll'
// @access Public
export const getAllVariation = async (req, res) => {
  try {
    const variation = await Variation.find()
    res.json({ success: true, variation })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Get One variation
// @route GET '/api/variation/:id'
// @access Public
export const getVariation = async (req, res) => {
  try {
    const variation = await Variation.findById(req.params.id)
    if (!variation) {
      return res
        .status(404)
        .json({ success: false, error: 'Variation not found' })
    }
    res.json({ success: true, variation })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Update variation
// @route PATCH '/api/variation/:id'
// @access Private : Admin
export const updateVariation = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['color', 'size']
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  )
  if (!isValidOperation) {
    return res.status(400).json({ success: false, error: 'Invalid updates' })
  }

  const variation = await Variation.findById(req.params.id)
  if (!variation) {
    return res.status(404).json({ success: false, error: 'variation not found' })
  }

  updates.forEach(update => (variation[update] = req.body[update]))
  try {
    await variation.save()
    res.json({ success: true, message: 'variation Updated!', variation })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Delete a variation
// @route DELETE  '/api/variation/:id'
// @access Private : Admin
export const deleteVariation = async (req, res) => {
  try {
    const variation = await Variation.findById(req.params.id)
    if (!variation) {
      return res
        .status(404)
        .json({ success: false, error: 'variation not found' })
    }

    await variation.remove()
    res.json({ success: true, message: 'variation deleted' })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}
