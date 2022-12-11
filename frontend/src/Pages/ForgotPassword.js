import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/user/UserContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const uContext = useContext(UserContext)
  const { forgotPassword } = uContext

  const handleForgotPassword = e => {
    e.preventDefault()
    const payload = { email }
    forgotPassword(payload);
  }

  return (
    <div>
      <section id="actions" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row"></div>
        </div>
      </section>
      {/* LOGIN */ }
      <section id="login">
        <div className="container">
          <p className="text-center">
            Don't have an accout? <Link to="/signup">Đăng ký</Link> |
            <Link to="/forgotpassword"> Quên mật khẩu</Link>
          </p>
          <div className="row">
            <div className="col-md-6 mx-auto">
              <div className="card">
                <div className="card-header">
                  <h4>Forgot Password</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={ handleForgotPassword }>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        onChange={ (e) => setEmail(e.target.value) }
                        type="text"
                        className="form-control"
                        name="email"
                        value={ email }
                      />
                    </div>

                    <input
                      type="submit"
                      defaultValue="ForgotPassword"
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
  );
};

export default ForgotPassword;