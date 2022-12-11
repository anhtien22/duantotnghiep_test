import Brand from '../models/Brand.js'

// @desc Add new category
// @route POST '/api/category/add'
// @access Private : Admin
export const addBrand = async (req, res) => {
  try {
    const brand = new Brand(req.body)
    await brand .save()
    res.status(201).json({ success: true, message: 'Thương hiệu đã thêm', brand})
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Get all category
// @route GET '/api/category/getAll'
// @access Public
export const getAllBrands  = async (req, res) => {
  try {
    const brands  = await Brand.find()
    res.json({ success: true, brands })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Get One category
// @route GET '/api/category/:id'
// @access Public
export const getBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id)
    if (!brand) {
      return res
        .status(404)
        .json({ success: false, error: 'Không tìm thấy thương hiệu' })
    }
    res.json({ success: true, brand })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Update Category
// @route PATCH '/api/category/:id'
// @access Private : Admin
export const updateBrand = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['local', 'image']
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  )
  if (!isValidOperation) {
    return res.status(400).json({ success: false, error: 'Cập nhật không hợp lệ' })
  }

  const brand = await Brand.findById(req.params.id)
  if (!brand) {
    return res.status(404).json({ success: false, error: 'Không tìm thấy thương hiệu' })
  }

  updates.forEach(update => (brand[update] = req.body[update]))
  try {
    await brand.save()
    res.json({ success: true, message: 'Thương hiệu được cập nhật!', brand })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Delete a category
// @route DELETE  '/api/category/:id'
// @access Private : Admin
export const deleteBrand= async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id)
    if (!brand) {
      return res
        .status(404)
        .json({ success: false, error: 'Không tìm thấy thương hiệu' })
    }

    await brand.remove()
    res.json({ success: true, message: 'Đã xóa thương hiệu' })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}
