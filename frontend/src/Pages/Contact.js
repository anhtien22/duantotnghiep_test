import React from "react"
import Breadcrumb from "../components/Breadcrumb"

const Contact = () => {
  return (
    <>
      <Breadcrumb pageName="Contact" />
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="h3 mb-3 text-black">Gửi liên hệ về cho MEN4MEN</h2>
            </div>
            <div className="col-md-7">
              <form action="#" method="post">
                <div className="p-3 p-lg-5 border">
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="c_fname" className="text-black">
                       Nhập tên <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="c_fname"
                        name="c_fname"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="c_lname" className="text-black">
                        Nhập họ <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="c_lname"
                        name="c_lname"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="c_email" className="text-black">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="c_email"
                        name="c_email"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="c_subject" className="text-black">
                        Chủ đề{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="c_subject"
                        name="c_subject"
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="c_message" className="text-black">
                        Nội dung{" "}
                      </label>
                      <textarea
                        name="c_message"
                        id="c_message"
                        cols="30"
                        rows="7"
                        className="form-control"
                      ></textarea>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-12">
                      <input
                        type="submit"
                        className="btn btn-primary btn-lg btn-block"
                        value="Gửi liên hệ"
                      />
                    </div>
                  </div>
                </div>
              </form>
              <br></br>
            </div>
            <div className="col-md-5 ml-auto">
              <div className="p-4 border mb-3">
                <span className="d-block text-primary h6 text-uppercase">
                  Địa chỉ
                </span>
                <p className="mb-0">
                Tòa P , Công Viên Phần Mềm Quang Trung , Q.12 TP.HCM
                </p>
              </div>
              <div className="p-4 border mb-3">
                <span className="d-block text-primary h6 text-uppercase">
                  Điện thoại
                </span>
                <p className="mb-0">
                +84 999 999 999
                </p>
              </div>
              <div className="p-4 border mb-3">
                <span className="d-block text-primary h6 text-uppercase">
                  Email
                </span>
                <p className="mb-0">
                duantotnghiep@domain.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
