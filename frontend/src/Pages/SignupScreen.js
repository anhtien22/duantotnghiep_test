import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/user/UserContext'
import { useNavigate } from 'react-router-dom'

const SignupScreen = () => {
  const navigate = useNavigate()
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
    e.preventDefault()
    signup(userDetails.name, userDetails.email, userDetails.password)
  }

  return (
    <div>
      <div>
        <section id="actions" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row"></div>
          </div>
        </section>
        {/* Signup */}
        <section id="Signup">
          <div className="container">
            <p className="text-center">
              Already have an account? <Link to="/login">Signup</Link>
            </p>
            <div className="row">
              <div className="col-md-6 mx-auto">
                <div className="card">
                  <div className="card-header">
                    <h4>Account Register</h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSignup}>
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                          onChange={handleChange}
                          type="text"
                          className="form-control"
                          name="name"
                          value={userDetails.name}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          onChange={handleChange}
                          type="text"
                          className="form-control"
                          name="email"
                          value={userDetails.email}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          onChange={handleChange}
                          type="password"
                          className="form-control"
                          name="password"
                          value={userDetails.password}
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

export default SignupScreen
