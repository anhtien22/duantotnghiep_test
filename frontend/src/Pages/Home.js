import React from 'react'
import { multilanguage } from 'redux-multilanguage';
import FeaturedProducts from '../components/FeaturedProducts'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css'
import 'swiper/swiper-bundle.min.css'

import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'
import "../../src/App.css";
import SwiperCore, { Navigation, Pagination, Autoplay, EffectFade } from 'swiper';
import { Link } from 'react-router-dom';

SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade]);

const Home = ({ strings }) => {
  return (
    <>
      <Swiper
        loop={ true }
        autoplay={ {
          delay: 4000,
          disableOnInteraction: false
        } }
        effect='fade'
        fadeEffect={ {
          crossFade: true
        } }
        navigation
        pagination={ { clickable: true } }
        onSwiper={ (swiper) => console.log(swiper) }
        onSlideChange={ () => console.log('slide change') }
      >
        <SwiperSlide>
          <Link to={ "/shop" } className="link">
            <img src="images/Baner/Baner1.png" alt="" />
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to={ "/shop" } className="link">
            <img src="images/Baner/Baner2.png" alt="" />
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to={ "/shop" } className="link">
            <img src="images/Baner/Baner3.png" alt="" />
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to={ "/shop" } className="link">
            <img src="images/Baner/Baner4.png" alt="" />
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to={ "/shop" } className="link">
            <img src="images/Baner/Baner5.png" alt="" />
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to={ "/shop" } className="link">
            <img src="images/Baner/Baner6.png" alt="" />
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to={ "/shop" } className="link">
            <img src="images/Baner/Baner7.png" alt="" />
          </Link>
        </SwiperSlide>
      </Swiper>

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
                <h2 className="text-uppercase">{ strings["FREE_SHIPPING"] }</h2>
                <p>
                  { strings["Shop_Will_Support_Product_Delivery_For_Orders_Over_500000_VND_And_First_Time_Purchase_Orders_At_The_Shop"] }
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
                <h2 className="text-uppercase">{ strings["FREE_REFUND"] }</h2>
                <p>
                  { strings["According_to_the_terms_set_forth_in_the_Terms_of_Service_the_Shop_guarantees_the_interests_of_the_buyer"] }
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
                <h2 className="text-uppercase">{ strings["CUSTOMER_SUPPORT"] }</h2>
                <p>
                  { strings["24/7_Support_Anytime_Customer_Needs_Support_Responding_to_Customer_Questions_and_Inquiries"] }
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
              <h2>Brand Cooperation!</h2>
            </div>
          </div>

          <Swiper watchSlidesProgress={ true } slidesPerView={ 4 } className="mySwiper">
            <SwiperSlide><img src="images/Logo/3.png" alt="" /></SwiperSlide>
            <SwiperSlide><img src="images/Logo/4.png" alt="" /></SwiperSlide>
            <SwiperSlide><img src="images/Logo/5.png" alt="" /></SwiperSlide>
            <SwiperSlide><img src="images/Logo/1.png" alt="" /></SwiperSlide>
            <SwiperSlide><img src="images/Logo/2.png" alt="" /></SwiperSlide>
            <SwiperSlide><img src="images/Logo/3.png" alt="" /></SwiperSlide>
            <SwiperSlide><img src="images/Logo/4.png" alt="" /></SwiperSlide>
          </Swiper>
        </div>
      </div>

    </>
  );
};

export default multilanguage(Home);

