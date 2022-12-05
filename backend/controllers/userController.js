import { errorHandler } from '../middleware/errorMiddleware.js'
import User from '../models/User.js'

// import sendEmail from "../utils/sendEmail";
import crypto from "crypto";

import { sendEmail } from '../utils/sendEmail.js';
// @desc Register a new user
// @route POST '/api/users/register'
// @access Public
export const registerUser = async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).json({ success: true, user, token })
  } catch (e) {
    res.status(400).json({ success: false, error: e.message })
  }
}

// @desc Login user
// @route POST '/api/users/login'
// @access Public
export const login = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.status(200).json({ success: true, user, token })
  } catch (e) {
    res.status(400).json({ success: false, error: e.message })
  }
}

// @desc Read user profile
// @route GET '/api/users/profile'
// @access Private: User
export const readProfile = async (req, res) => {
  // res.json(req.user)
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  })
}

// @desc Update user profile
// @route PATCH '/api/users/profile'
// @access Private : user
export const updateProfile = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password']
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  )
  if (!isValidOperation) {
    return res.status(400).json({ error: 'Cập nhật không hợp lệ' })
  }

  updates.forEach(update => (req.user[update] = req.body[update]))
  try {
    await req.user.save()
    res.json({ success: true, message: 'Hồ sơ cá nhân đã cập nhật', user: req.user })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

// @desc Delete user profile
// @route DELETE '/api/users/profile'
// @access Private: user
export const deleteProfile = async (req, res) => {
  try {
    await req.user.remove()
    res.json({ success: true, message: 'Người dùng đã xóa' })
  } catch (e) {
    res.status(500).json({ success: false, error: e.message })
  }
}

// @desc Get all users
// @route DELETE '/api/users/profile'
// @access Private: Admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).sort('-createdAt')
    res.json({ success: true, users })
  } catch (err) {
    res.status(500).json({ success: false, error: e.message })
  }
}


export const forgotPassword = async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email
  });
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({
    validateBeforeSave: false
  });

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/users/password/reset/${resetToken}`;
  const message = `Your password reset token is ttemp :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({
      validateBeforeSave: false
    });

    return next(new errorHandler(error.message, 500));
  }
};

export const resetPassword = async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ error: 'Reset Password Token is invalid or has been expired' })
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({ error: 'Password does not password' })
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  const token = await user.generateAuthToken()
  res.status(200).json({ success: true, user, token })
};

export const getOneUserAdmin = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new errorHandler(`User does not exist with ID:${req.params.id}`))
  }
  res.status(200).json({
    success: true,
    user,
  })
};

export const updateUserRole = async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  }

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  })

};

export const deleteOneUserAdmin = async (req, res, next) => {

  const user = await User.findById(req.params.id)

  if (!user) {
    return next(new errorHandler(`User does not exist with Id: ${req.params.id}`))
  }
  await user.remove();

  res.status(200).json({
    success: true,
    message: "Xóa thành công"
  })

};