import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/user/UserContext';
import { useToasts } from "react-toast-notifications";

const UpdatePassword = () => {

  const uContext = useContext(UserContext);
  const { updatePassword } = uContext;
  const { addToast } = useToasts();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const payload = { oldPassword, newPassword, confirmPassword };
    updatePassword(payload, addToast);
  };

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
          <div className="row">
            <div className="col-md-6 mx-auto">
              <div className="card">
                <div className="card-header">
                  <h4>Đổi mật khẩu</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={ updatePasswordSubmit }>
                    <div className="form-group">
                      <label htmlFor="oldPassword">Mật khẩu cũ</label>
                      <input
                        onChange={ (e) => setOldPassword(e.target.value) }
                        type="password"
                        className="form-control"
                        value={ oldPassword }
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="newPassword">Mật khẩu mới</label>
                      <input
                        onChange={ (e) => setNewPassword(e.target.value) }
                        type="password"
                        className="form-control"
                        value={ newPassword }
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="confirmPassword">Nhập mật khẩu mới</label>
                      <input
                        onChange={ (e) => setConfirmPassword(e.target.value) }
                        type="password"
                        className="form-control"
                        value={ confirmPassword }
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

export default UpdatePassword;