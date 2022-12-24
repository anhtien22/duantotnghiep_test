import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/user/UserContext'
import { useNavigate } from 'react-router-dom'
import { useToasts } from "react-toast-notifications";
import {
  Form, Input,
  Select,
} from 'antd';
const SignupScreen = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate()
  const { addToast } = useToasts();
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
  })

  // for user context
  const uContext = useContext(UserContext)
  const { signup, user } = uContext

  useEffect(() => {
    if (user) navigate('/')
    //   eslint-disable-next-line
  }, [])

  const handleChange = e => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
  }

  const handleSignup = e => {
    // e.preventDefault()
    signup(userDetails.name, userDetails.email, userDetails.password, addToast)
  }

  return (
    <div>
      <div>
        <section id="actions" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row"></div>
          </div>
        </section>
        {/* Signup */ }
        <section id="Signup">
          <div className="container">
            <p className="text-center">
              Bạn có sẳn tài khoản chưa? <Link to="/login">Đăng Nhập</Link>
            </p>
            <div className="row">
              <div className="col-md-6 mx-auto">
                <div className="card">
                  <div className="card-header">
                    <h4>Tài khoản đăng ký</h4>
                  </div>
                  <div className="card-body">
                    <Form form={ form }
                      onFinish={ handleSignup }>
                      <div className="form-group">
                        <Form.Item
                          name="name"
                          label="Tên"
                          rules={ [
                            {
                              min: 3,
                              message: 'Tên của bạn phải trên 3 kí tự',
                            },
                          ] }
                        >
                          <Input
                            type="text"
                            name="name"
                            className="form-control"
                            value={ userDetails.name }
                            onChange={ handleChange } />
                        </Form.Item>
                        {/* <label htmlFor="name">Tên</label>
                        <input
                          onChange={ handleChange }
                          type="text"
                          className="form-control"
                          name="name"
                          value={ userDetails.name }
                        /> */}
                      </div>
                      <div className="form-group">
                        <Form.Item
                          name="email"
                          label="Email"
                        >
                          <Input
                            type="email"
                            name="email"
                            className="form-control"
                            value={ userDetails.email }
                            onChange={ handleChange } />
                        </Form.Item>
                        {/* <label htmlFor="email">Email</label>
                        <input
                          onChange={ handleChange }
                          type="text"
                          className="form-control"
                          name="email"
                          value={ userDetails.email }
                        /> */}
                      </div>
                      <div className="form-group">
                        <Form.Item
                          name="password"
                          label="Mật khẩu"
                        >
                          <Input
                            type="password"
                            name="password"
                            className="form-control"
                            value={ userDetails.password }
                            onChange={ handleChange } />
                        </Form.Item>
                        {/* <label htmlFor="password">Mật khẩu</label>
                        <input
                          onChange={ handleChange }
                          type="password"
                          className="form-control"
                          name="password"
                          value={ userDetails.password }
                        /> */}
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Đăng ký
                      </button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SignupScreen
