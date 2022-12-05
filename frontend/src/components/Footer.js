import React from 'react'

const Footer = () => {
  return (
    <footer className="site-footer border-top">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="row">
              <div className="col-md-12">
                <h3 className="footer-heading mb-4">Khuynh Hướng</h3>
              </div>
              <div className="col-md-6 col-lg-4">
                <ul className="list-unstyled">
                  <li>
                    <a href="/">Bán trực tuyến</a>
                  </li>
                  <li>
                    <a href="/">Đặc trưng</a>
                  </li>
                  <li>
                    <a href="/">Giỏ hàng</a>
                  </li>
                  <li>
                    <a href="/">Cửa hàng</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-6 col-lg-4">
                <ul className="list-unstyled">
                  <li>
                    <a href="/">Thương mại điện tử</a>
                  </li>
                  <li>
                    <a href="/">Vận chuyển </a>
                  </li>
                  <li>
                    <a href="/">Phát triển website</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-6 col-lg-4">
                <ul className="list-unstyled">
                  <li>
                    <a href="/">Điểm bán hàng</a>
                  </li>
                  <li>
                    <a href="/">Phần cứng</a>
                  </li>
                  <li>
                    <a href="/">Phần mềm</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
            <h3 className="footer-heading mb-4">Khuyến Mãi</h3>
            <a href="/" className="block-6">
              <img
                src="images/1_bn.jpg"
                alt="placeholder"
                className="img-fluid rounded mb-4"
              />
              <h3 className="font-weight-light mb-0">
                Drew
              </h3>
              <p>Khuyễn mãi từ  1 &mdash; 12, 2022</p>
            </a>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="block-5 mb-5">
              <h3 className="footer-heading mb-4">Địa Chỉ Liên Hệ</h3>
              <ul className="list-unstyled">
                <li className="address">

                  <a href=" https://goo.gl/maps/gviSv1m62iDQ8kub6">  Tòa P ,  Công Viên Phần Mềm Quang Trung , Q.12 TP.HCM  </a>

                </li>
                <li className="phone">
                  <a>+84 999 999 999</a>
                </li>
                <li className="email">duantotnghiep@domain.com</li>
              </ul>
            </div>
            <div className="block-7">
              <form action="/" method="post">
                <label htmlFor="email_subscribe" className="footer-heading">
                  Subscribe
                </label>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control py-4"
                    id="email_subscribe"
                    placeholder="Email"
                  />
                  <input
                    type="submit"
                    className="btn btn-sm btn-primary"
                    value="Send"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row pt-5 mt-5 text-center">
          <div className="col-md-12">
            <p>
              {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
              Copyright &copy;
              <script
                data-cfasync="false"
                src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script>
              <script>document.write(new Date().getFullYear())</script>
              Bảo lưu mọi quyền | Website này được thực hiện 
              <i className="icon-heart" aria-hidden="true"></i> bởi nhóm 
              <a
                href="https://colorlib.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary">
                MEN4MEN
              </a>
              {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer