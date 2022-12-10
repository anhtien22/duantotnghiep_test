import React, { useContext, useEffect, useState } from 'react'
import { Form, FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import CategoryContext from '../context/category/categoryContext'
import productContext from '../context/product/productContext'


const Shop = () => {
  // for product context
  const pContext = useContext(productContext)
  const { getProducts, products } = pContext

  console.log("products", products);
  // for category context
  const cContext = useContext(CategoryContext)
  const { categories, getCategories } = cContext

  const limit = 6
  const [skip, setSkip] = useState(0)
  const [keyWord, setKeyWord] = useState('')
  const [category, setCategory] = useState('')
  const [totalResults, setTotalResults] = useState(0)

  useEffect(() => {
    const populateProducts = async () => {
      setTotalResults(await getProducts(limit, skip, keyWord, category))
    }
    populateProducts()
    getCategories()
    // eslint-disable-next-line
  }, [skip, limit, category])

  const handleChange = e => {
    setKeyWord(e.target.value)
  }

  const handleSearchSubmit = e => {
    e.preventDefault()
    setSkip(0)
    setCategory('')
    const populateProducts = async () => {
      setTotalResults(await getProducts(limit, skip, keyWord, category))
    }
    populateProducts()
  }

  const handlePreviousClick = async () => {
    if (skip > 0) {
      setSkip(skip - limit)
    }
  }

  const handleNextClick = async () => {
    setSkip(skip + limit)
  }

  return (
    <>
      <Breadcrumb pageName="Shop" />
      <div className="site-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-9 order-2">
              <div className="row">
                <div className="col-md-12 mb-5 d-flex justify-content-between">
                  <div className="float-md-left mb-4">
                 
                    <h2 className="text-black h5">SHOP ALL</h2>
                
                  </div>
                  <div className="d-flex">
                    <Form className="d-flex" onSubmit={handleSearchSubmit}>
                      {/* <FormControl type="search" placeholder="Search products" className="me-2" aria-label="Search" minLength={ 3 }size="sm" value={ keyWord } onChange={ handleChange }/> */}
                      <div class="wrap">
                        <div class="search">
                          <input type="text" class="searchTerm" placeholder="Search?" onChange={handleChange} value={keyWord} minLength={3} size="sm" />
                          <button type="submit" class="searchButton">
                            <i class="fa fa-search"></i>
                          </button>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>

              <div className="row mb-5">
                {products.map(product => (
                  <div
                    className="col-sm-6 col-lg-4 mb-4"
                    data-aos="fade-up"
                    key={product._id}>
                    <div className="block-4 text-center border">
                      <figure className="block-4-image">
                        <Link to={`/shopSingle/${product._id}`}>
                          <img
                            src={product.image}
                            alt="placeholder"
                            className="img-fluid"
                          />
                        </Link>
                      </figure>
                      <div className="block-4-text p-4">
                        <h3>
                          <Link to={`/shopSingle/${product._id}`}>
                            {product.name}
                          </Link>
                        </h3>
                        <p className="mb-0 text-secondary">
                          {product.category.title}
                        </p>
                        <p className="text-primary font-weight-bold">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="row" data-aos="fade-up">
                <div className="col-md-12 text-center">
                  <div className="d-flex justify-content-between align-items-center my-3">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={handlePreviousClick}
                      disabled={skip < 1}>
                      &larr; Trước
                    </Button>

                    <div className="text-center mx-2">
                      Trang -{skip / limit + 1},
                      <span className="text-muted">
                        {' '}
                        Hiển thị {products.length} trong số {totalResults}{' '}
                        sản phẩm .
                      </span>
                    </div>

                    <Button
                      variant="success"
                      size="sm"
                      onClick={handleNextClick}
                      disabled={totalResults - skip <= limit}>
                      Tiếp tục &rarr;
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3 order-1 mb-5 mb-md-0">
              <div className="border p-4 rounded mb-4">
                <h3 className="mb-3 h6 text-uppercase text-black d-block">
                Danh Mục
                </h3>
                <div className="cont">
                  <label className="container">Tất cả
                    <input type="radio" checked="checked" name="radio" onClick={ () => { setCategory('')
                    setSkip(0)} }/>
                    <span className="checkmark"></span>
                  </label>
                  { categories.map(cate => (
                  <label className="container"  >{ cate.title }
                    <input type="radio" name="radio" onClick={ () => { setCategory(cate._id)
                    setSkip(0)} }/>
                    <span className="checkmark" key={ cate._id }></span>
                  </label>
                  )) } 
                </div>
                  <div className="border p-4 rounded mb-4">
                    <div className="mb-4">
                      <h3 className="mb-3 h6 text-uppercase text-black d-block">
                        Filter by Price
                      </h3>
                      <div id="slider-range" className="border-primary">

                      </div>
                      <input
                        type="text"
                        name="text"
                        id="amount"
                        className="form-control border-0 pl-0 bg-white"
                        disabled=""
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="site-section site-blocks-2">
                    <div className="row justify-content-center text-center mb-5">
                      <div className="col-md-7 site-section-heading pt-4">
                        <h2>Danh Mục</h2>
                      </div>
                    </div>
                    <div className="row">
                      <div
                        className="col-sm-6 col-md-6 col-lg-4 mb-4 mb-lg-0"
                        data-aos="fade"
                        data-aos-delay="">
                        <a className="block-2-item" href="/">
                          <figure className="image">
                            <img
                              src="images/women.jpg"
                              alt=""
                              className="img-fluid"
                            />
                          </figure>
                          <div className="text">
                            <span className="text-uppercase">Bộ sưu tập</span>
                            <h3>Women</h3>
                          </div>
                        </a>
                      </div>
                      <div
                        className="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0"
                        data-aos="fade"
                        data-aos-delay="100">
                        <a className="block-2-item" href="/">
                          <figure className="image">
                            <img
                              src="images/children.jpg"
                              alt=""
                              className="img-fluid"
                            />
                          </figure>
                          <div className="text">
                            <span className="text-uppercase">Bộ sưu tập</span>
                            <h3>Children</h3>
                          </div>
                        </a>
                      </div>
                      <div
                        className="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0"
                        data-aos="fade"
                        data-aos-delay="200">
                        <a className="block-2-item" href="/">
                          <figure className="image">
                            <img
                              src="images/men.jpg"
                              alt=""
                              className="img-fluid"
                            />
                          </figure>
                          <div className="text">
                            <span className="text-uppercase">Bộ sưu tập</span>
                            <h3>Men</h3>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      )
}
      export default Shop
