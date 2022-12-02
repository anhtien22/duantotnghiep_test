import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../context/user/UserContext'

const LoginScreen = () => {
  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({ email: '', password: '' })

  // for user context
  const uContext = useContext(UserContext)
  const { login, user } = uContext

  useEffect(() => {
    if (user) navigate('/')
    //   eslint-disable-next-line
  }, [])

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleLogin = e => {
    e.preventDefault()
    login(credentials.email, credentials.password)
  }

  return (
    <div>
      <div>
        <section id="actions" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row"></div>
          </div>
        </section>
        {/* LOGIN */}
        <section id="login">
          <div className="container">
            <p className="text-center">
              Don't have an accout? <Link to="/signup">Signup</Link>
            </p>
            <div className="row">
              <div className="col-md-6 mx-auto">
                <div className="card">
                  <div className="card-header">
                    <h4>Account Login</h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleLogin}>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          onChange={handleChange}
                          type="text"
                          className="form-control"
                          name="email"
                          value={credentials.email}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          onChange={handleChange}
                          type="password"
                          className="form-control"
                          name="password"
                          value={credentials.password}
                        />
                      </div>
                      <input
                        type="submit"
                        defaultValue="Login"
                        className="btn btn-primary btn-block"
                      />
                    </form>
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

export default LoginScreen
