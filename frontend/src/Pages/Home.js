import React from "react";
import FeaturedProducts from "../components/FeaturedProducts";

const Home = () => {
  return (
    <>
      <div
        className="site-blocks-cover"
        style={{ backgroundImage: 'url(images/ANH_1.jpg)' }}
        data-aos="fade">
        <div className="container">
          <div
            className="
              row
              align-items-start align-items-md-center
              justify-content-end
            "
          >
            <div className="col-md-5 text-center text-md-left pt-5 pt-md-0">
              <h1 className="mb-2" style={{color:'#472D2D'}}>Grand Launching</h1>
              <div className="intro-text text-center text-md-left">
                <p className="mb-4" style={{color:'#472D2D'}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus at iaculis quam. Integer accumsan tincidunt
                  fringilla.
                </p>
                <p>
                  <a href="http://localhost:3000/shop" className="btn btn-sm btn-primary" style={{background:'black',border:'black'}}>
                    Shop Now
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section site-section-sm site-blocks-1">
        <div className="container">
          <div className="row">
            <div
              className="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4"
              data-aos="fade-up"
              data-aos-delay=""
            >
              <div className="icon mr-4 align-self-start">
                <span className="icon-truck"></span>
              </div>
              <div className="text">
                <h2 className="text-uppercase">MIỄN PHÍ VẬN CHUYỂN</h2>
                <p>
                Shop sẽ hỗ trợ giao sản phẩm cho các đơn hàng trên 500k và các đơn hàng mua lần đầu tại shop .
                </p>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="icon mr-4 align-self-start">
                <span className="icon-refresh2"></span>
              </div>
              <div className="text">
                <h2 className="text-uppercase">MIỄN PHÍ HOÀN TRẢ</h2>
                <p>
                Theo các điều lệ được quy định trong Điều khoản dịch vụ, Shop đảm bảo quyền lợi của Người mua .
                </p>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="icon mr-4 align-self-start">
                <span className="icon-help"></span>
              </div>
              <div className="text">
                <h2 className="text-uppercase">HỖ TRỢ KHÁCH HÀNG</h2>
                <p>
                Hỗ trợ 24/7 bất cứ lúc nào mà khách hàng cần hỗ trợ đáp ứng các câu hỏi và thắc mắc của khách hàng.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section site-blocks-2">
        <div className="container">
          <div className="row">
            <div
              className="col-sm-6 col-md-6 col-lg-4 mb-4 mb-lg-0"
              data-aos="fade"
              data-aos-delay=""
            >
              <a className="block-2-item" href="/">
                <figure className="image">
                  <img src="images/6_im.jpg" alt="" className="img-fluid" />
                </figure>
                <div className="text">
                  <span className="text-uppercase">Collections</span>
                  <h3>Women</h3>
                </div>
              </a>
            </div>
            <div
              className="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0"
              data-aos="fade"
              data-aos-delay="100"
            >
              <a className="block-2-item" href="/">
                <figure className="image">
                  <img src="images/2_im.jpg" alt="" className="img-fluid" />
                </figure>
                <div className="text">
                  <span className="text-uppercase">Collections</span>
                  <h3>Children</h3>
                </div>
              </a>
            </div>
            <div
              className="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0"
              data-aos="fade"
              data-aos-delay="200"
            >
              <a className="block-2-item" href="/">
                <figure className="image">
                  <img src="images/3_im.jpg" alt="" className="img-fluid" />
                </figure>
                <div className="text">
                  <span className="text-uppercase">Collections</span>
                  <h3>Men</h3>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <FeaturedProducts />

      <div className="site-section block-8">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-md-7 site-section-heading text-center pt-4">
              <h2>Big Sale!</h2>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-12 col-lg-7 mb-5">
              <a href="/">
                <img
                  src="images/model_1.jpg"
                  alt="placeholder"
                  className="img-fluid rounded"
                />
              </a>
            </div>
            <div className="col-md-12 col-lg-5 text-center pl-md-5">
              <h2>
                <a href="/">50% less in all items</a>
              </h2>
              <p className="post-meta mb-4">
                By <a href="/">Carl Smith</a>
                <span className="block-8-sep">&bullet;</span> September 3, 2018
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quisquam iste dolor accusantium facere corporis ipsum animi
                deleniti fugiat. Ex, veniam?
              </p>
              <p>
                <a href="/" className="btn btn-primary btn-sm">
                  Shop Now
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
