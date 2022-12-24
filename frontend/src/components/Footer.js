import React from 'react'

const Footer = () => {
  return (
    <footer className="site-footer border-top">
      <div className="container">
        <div className="row" id='footer'>
          <div className="col-lg-3  mb-lg-0">
            <div className="row">
              <div className="col-md-12">
                <h3 className="footer-heading mb-4">Về Công Ty</h3>
              </div>
              <div className="col-md-6 col-lg">
                <ul className="list-unstyled">
                  <li>
                    <a href="/">Lứa tuyển dụng</a>
                  </li>
                  <li>
                    <a href="/">Liên hệ nhượng quyền</a>
                  </li>
                  <li>
                    <a href="/">Về MEN4MEN</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-3 mb-lg-0">
            <div className="row">
              <div className="col-md-12">
                <h3 className="footer-heading mb-4">Hỗ Trợ</h3>
              </div>
              <div className="col-md-6 col-lg">
                <ul className="list-unstyled">
                  <li>
                    <a href="/">FAQs</a>
                  </li>
                  <li>
                    <a href="/">Bảo mật thông tin</a>
                  </li>
                  <li>
                    <a href="/">Chính sách chung</a>
                  </li>
                  <li>
                    <a href="/">Tra cứu đơn hàng</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="block-5">
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
          </div>
        </div>
        {/* <div className="block-7"> */}
          {/* <form action="/" method="post"> */}
            {/* <div className="form-group"> */}
              {/* <input type="text" className="form-control py-4" id="email_subscribe" placeholder="Email"/> */}
              {/* <input type="submit" className="btn btn-sm btn-primary" value="Send"/> */}
            {/* </div> */}
          {/* </form> */}
        {/* </div> */}
        <br></br>
        <br></br>
        <div className="row text-center">
          <div className="col-md-12">
            <p>
              Copyright &copy;
              <script
                data-cfasync="false"
                src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script>
              <script>document.write(new Date().getFullYear())</script>
              Bảo lưu mọi quyền | Website này được thực hiện&#160;
              <i className="icon-heart" aria-hidden="true"></i> bởi nhóm
              <a
                href="https://colorlib.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary">
                &#160;MEN4MEN
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer