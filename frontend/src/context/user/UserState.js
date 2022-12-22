import UserContext from './UserContext'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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

const UserState = props => {
  //fort navigate
  const navigate = useNavigate()

  // axios config
  const userToken = JSON.parse(localStorage.getItem('userToken'))
  const headers = {
    Authorization: `Bearer ${userToken || ''}`,
  }

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  const [user, setUser] = useState(userInfo || null)
  const [userError, setUserError] = useState(null)
  const [userLoading, setUserLoading] = useState(false)
  const [userMessage, setUserMessage] = useState(null)
  const [allUsers, setAllUsers] = useState([])

  //   for disabling the alert messages after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      setUserMessage(null)
      setUserError(null)
    }, 3000)
  }, [userMessage, userError])

  // Error handler funtion
  const errorHandler = (err, info) => {
    if (info === undefined || null) {
      info = ''
    }
    if (err.response) {
      setUserError({
        variant: 'danger',
        message: `${info} ${err.response.data.error}`,
      })
    } else if (err.request) {
      setUserError({
        variant: 'danger',
        message: `${info} No response from server`,
      })
    } else {
      setUserError({ variant: 'danger', message: err.message })
    }
    setUserLoading(false)
  }

  // -----------------------------------------------------------------
  // Login user
  // -----------------------------------------------------------------
  const login = async (email, password) => {
    try {
      setUserLoading(true)
      const { data } = await axios.post(`api/users/login`, {
        email,
        password,
      })
      localStorage.setItem('userInfo', JSON.stringify(data.user))
      localStorage.setItem('userToken', JSON.stringify(data.token))
      setUser(data.user)
      setUserError(null)
      setUserLoading(false)
      setUserMessage({ variant: 'success', message: 'Đăng nhập thành công' })
      navigate('/')
      //   history.push('/')
    } catch (err) {
      console.log(err.response);
      errorHandler(err)

    }
  }

  // -----------------------------------------------------------------
  // Signup a new user
  // -----------------------------------------------------------------
  const signup = async (name, email, password) => {
    try {
      const body = clean({ name, email, password })
      setUserLoading(true)
      const { data } = await axios.post(`api/users/register`, body)
      localStorage.setItem('userInfo', JSON.stringify(data.user))
      localStorage.setItem('userToken', JSON.stringify(data.token))
      setUser(data.user)
      setUserError(null)
      setUserLoading(false)
      setUserMessage({ variant: 'success', message: 'Đăng ký thành công' })
      navigate('/')
    } catch (err) {
      errorHandler(err)
    }
  }

  // -----------------------------------------------------------------
  // Logout a user
  // -----------------------------------------------------------------
  const logout = async (items) => {
    try {
      setUserLoading(true)
      // await axios.post(`api/users/logout`, null, {
      //   headers,
      // })
      console.log(items);
      localStorage.removeItem('userInfo')
      localStorage.removeItem('userToken')
      localStorage.removeItem('react-use-cart')

      setUser(null)
      setUserError(null)
      setUserLoading(false)
      setUserMessage({ variant: 'dark', message: 'Bạn đã đăng xuất!' })
      // navigate('/login')
      window.location.replace("/login")
    } catch (err) {
      errorHandler(err)
    }
  }

  // -----------------------------------------------------------------
  // Read user profile
  // -----------------------------------------------------------------
  const readProfile = async () => {
    try {
      setUserLoading(true)
      const { data } = await axios.get('api/users/profile', { headers })
      setUserError(null)
      setUserLoading(false)
      return data
    } catch (err) {
      errorHandler(err)
    }
  }

  // -----------------------------------------------------------------
  // Edit Profile
  // -----------------------------------------------------------------
  const editProfile = async (name, email) => {
    try {
      setUserLoading(true)
      const body = clean({ name, email })
      const { data } = await axios.patch('api/users/profile', body, { headers })
      setUser(data.user)
      localStorage.setItem('userInfo', JSON.stringify(data.user))
      setUserError(null)
      setUserLoading(false)
      setUserMessage({
        variant: 'success',
        message: 'Hồ sơ của bạn đã được cập nhật thành công',
      })
      return data
    } catch (err) {
      errorHandler(err, 'Không thể cập nhật hồ sơ của bạn!')
    }
  }

  // -----------------------------------------------------------------
  // Get all users
  // -----------------------------------------------------------------
  const getAllUsers = async () => {
    try {
      setUserLoading(true)
      const { data } = await axios.get('/api/users/getAll', { headers })
      setAllUsers(data.users)
      setUserError(null)
      setUserLoading(false)
    } catch (err) {
      errorHandler(err)
    }
  }

  // -----------------------------------------------------------------
  // Delete Profile
  // -----------------------------------------------------------------
  const deleteProfile = async () => {
    try {
      setUserLoading(false)
      await axios.delete('api/users/me', { headers })
      localStorage.removeItem('userInfo')
      setUser(null)
      setUserError(null)
      setUserLoading(false)
      setUserMessage({ variant: 'danger', message: 'Đã xóa hồ sơ' })
      navigate('/login')
    } catch (err) {
      errorHandler(err)
    }
  }
  const getOneUserAdmin = async id => {
    try {
      setUserLoading(true)
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
      const { data } = await axios.get(`/api/users/admin/user/${id}`, {
        headers,
      })
      setUserLoading(false)
      setUserError(null)
      return data.user
    } catch (err) {
      errorHandler(err)
    }
  }
  const forgotPassword = async (payload) => {
    try {
      setUserLoading(true)
      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post("/api/users/password/forgot", {
        email: payload.email
      },
        config
      );
      setUserLoading(false)
      setUserError(null)
      setUserMessage({
        variant: 'success',
        message: `${data.message}`,
      })
      return data.user;
    } catch (err) {
      errorHandler({ err })

    }
  };

  const resetPassword = async (token, payload) => {
    try {
      setUserLoading(true)

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.put(
        `/api/users/password/reset/${token}`,
        {
          password: payload.password,
          confirmPassword: payload.confirmPassword,
        },
        config
      );

      setUserLoading(false)
      setUserError(null)
      setUserMessage({
        variant: 'success',
        message: 'Bạn đã đổi mật khẩu thành công!',
      })
      return data.user;

    } catch (error) {
      // if (payload.password !== payload.confirmPassword) {
      errorHandler(error)
      // }

    }
  };

  const updatePassword = async (payload) => {
    try {
      // setUserLoading(true)
      const config = {
        headers: {
          "Content-Type": "application/json",
        }
      };

      const { data } = await axios.put(
        `/api/users/profile/updatepassword`,
        {
          oldPassword: payload.oldPassword,
          newPassword: payload.newPassword,
          confirmPassword: payload.confirmPassword,
        },
        config
      );
      // const res = await fetch(`/api/users/profile/updatepassword`, {
      //   method: "PATCH",
      //   headers,
      //   body: JSON.stringify({
      //     oldPassword: payload.oldPassword,
      //     newPassword: payload.newPassword,
      //     confirmPassword: payload.confirmPassword,
      //   }),
      // });
      // setUserLoading(false)
      // setUserError(null)
      // return data.user;
    } catch (err) {
      errorHandler(err)
    }
  };

  return (
    <UserContext.Provider
      value={ {
        user,
        userError,
        userLoading,
        userMessage,
        allUsers,
        login,
        signup,
        logout,
        readProfile,
        editProfile,
        getAllUsers,
        deleteProfile,
        getOneUserAdmin,
        forgotPassword,
        resetPassword,
        updatePassword
      } }>
      { props.children }
    </UserContext.Provider>
  )
}
// -----------------------------------------
//  Get One user admin
//   ---------------------------------------


export default UserState
