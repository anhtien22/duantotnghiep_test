import React, { useContext, useEffect, useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import Breadcrumb from "../components/Breadcrumb";
import CategoryContext from "../context/category/categoryContext";
import productContext from "../context/product/productContext";
import { useToasts } from "react-toast-notifications";

const Shop = () => {
  // for product context
  const pContext = useContext(productContext);
  const { getProducts, products } = pContext;
  const navigate = useNavigate();

  console.log("products", products);
  // for category context
  const cContext = useContext(CategoryContext);
  const { categories, getCategories } = cContext;

  const limit = 2;
  const [skip, setSkip] = useState(0);
  const [keyWord, setKeyWord] = useState("");
  const [category, setCategory] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const { addToast } = useToasts();


  useEffect(() => {
    const populateProducts = async () => {
      setTotalResults(await getProducts(limit, skip, keyWord, category));
      // await getProducts(limit, skip, keyWord, category);
    };
    populateProducts();
    getCategories();
    // eslint-disable-next-line
  }, [skip, limit, category]);

  // const priceHighToLow = (value) => {
  //   const sortProducts = [...products];
  //   console.log("sortProducts", sortProducts);

  //   if (value === "default") {
  //     return sortProducts;
  //   }
  //   if (value === "priceHighToLow") {
  //     sortProducts.sort((a, b) => {
  //       console.log("priceHighToLow", sortProducts);
  //       return b.price - a.price;
  //     });
  //     return sortProducts
  //   }
  //   if (value === "priceLowToHigh") {
  //     sortProducts.sort((a, b) => {
  //       console.log("priceLowToHigh", sortProducts);
  //       return a.price - b.price;
  //     });
  //   }
  //   return products;
  // }

  const [data, setData] = useState([]);

  const [sortType, setSortType] = useState();
  useEffect(() => {
    const sortArray = (type) => {
      const sorted = products;

      if (type === "priceHighToLow") {
        sorted.sort((a, b) => b.price - a.price);
        // sortProducts.sort((a, b) => {
        //         console.log("priceHighToLow", sortProducts);
        //         return b.price - a.price;
        //       });
      }
      if (type === "priceLowToHigh") {
        sorted.sort((a, b) => a.price - b.price);
      }
      // const sorted = [...products].sort((a, b) => b[sortProperty] - a[sortProperty]);
      setData([...sorted]);
    };

    sortArray(sortType);
  }, [sortType]);

  const handleChange = (e) => {
    setKeyWord(e.target.value);

  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSkip(0);
    setCategory("");
    const populateProducts = async () => {
      setTotalResults(await getProducts(limit, skip, keyWord, category));
      // await getProducts(limit, skip, keyWord, category);
      if (keyWord.trim()) {
        navigate(`/shop?search=${keyWord}`);
      } else {
        navigate(`/shop`)
      }
    };
    populateProducts();
  };

  const handlePreviousClick = async () => {
    if (skip > 0) {
      setSkip(skip - limit);
    }
  };

  const handleNextClick = async () => {
    setSkip(skip + limit);
  };

  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
  });
  const [price, setPrice] = useState(0);
  const handleInput = (e) => {
    setPrice(e.target.value);
  };
  console.log(price);
  const filterProduct = [...products];

  return (
    <>
      <Breadcrumb pageName="Shop" />
      <div className="site-section-shop">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-9 order-2">
              <div className="row">
                <div className="col-md-12 mb-5 d-flex justify-content-between" id="rowshop">
                  <div className=" col-md-6 float-md-left mb-4">
                    <h2 className="text-black h5">SHOP ALL</h2>
                    <select onChange={ (e) => setSortType(e.target.value) }>
                      <option disabled value="default">
                        Sắp xếp
                      </option>
                      <option value="priceHighToLow">
                        Giá từ cao đến thấp
                      </option>
                      <option value="priceLowToHigh">
                        Giá từ thấp đến cao
                      </option>
                    </select>
                  </div>
                  <div className="col-md-6 " id="search">
                    <Form className="d-flex" onSubmit={ handleSearchSubmit }>
                      <FormControl
                        type="search"
                        placeholder="Search products"
                        className="me-2 "
                        aria-label="Search"
                        size="sm"
                        value={ keyWord }
                        onChange={ handleChange }
                      />

                      <button type="submit" className="btn btn-secondary ">
                        Search
                      </button>
                    </Form>
                  </div>
                </div>
              </div>

              <div className="row mb-5">
                { products &&
                  products
                    .filter((filterProduct) => {
                      return filterProduct.price <= price * 1;
                    })
                    .map((product) => (
                      <div
                        className="col-sm-6 col-lg-4 mb-4"
                        data-aos="fade-up"
                        key={ product.name }
                      >
                        <div className="block-4 text-center border">
                          <figure className="block-4-image">
                            <Link to={ `/shopSingle/${product._id}` }>
                              <img
                                src={ product.image }
                                alt="placeholder"
                                className="img-fluid"
                              />
                            </Link>
                          </figure>
                          <div className="block-4-text p-4">
                            <h3>
                              <Link
                                className="text-black font-weight-bold"
                                to={ `/shopSingle/${product._id}` }
                              >
                                { product.name }
                              </Link>
                            </h3>
                            <p className="mb-0 text-secondary">
                              { product.category.title }
                            </p>
                            <p className="text-black font-weight-bold">
                              { formatter.format(product.price) }
                            </p>
                            <p
                              className="buy-now btn btn-sm btn-outline-dark"
                              onClick={ () => {
                                let item = {
                                  ...product,
                                  id: product._id,
                                };
                                addItem(item, quantity);
                              } }
                            >
                              {/* <Link
                        to="/Cart"
                        className="buy-now btn btn-sm btn-primary"
                        onClick={() => {
                          let item = {
                            ...product,
                            id: product._id,
                          };
                          addItem(item, quantity);
                        }}
                      >
                        Add To Cart
                      </Link> */}
                              add cart
                            </p>
                          </div>
                        </div>
                      </div>
                    )) }
              </div>

              <div className="row" data-aos="fade-up">
                <div className="col-md-12 text-center">
                  <div className="d-flex justify-content-between align-items-center my-3">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={ handlePreviousClick }
                      disabled={ skip < 1 }
                    >
                      &larr; Trước
                    </Button>

                    <div className="text-center mx-2">
                      Trang -{ skip / limit + 1 },
                      <span className="text-muted">
                        { " " }
                        Hiển thị { products.length } trong số { totalResults } sản
                        phẩm .
                      </span>
                    </div>

                    <Button
                      variant="success"
                      size="sm"
                      onClick={ handleNextClick }
                      disabled={ totalResults - skip <= limit }
                    >
                      Tiếp tục &rarr;
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3 order-1 mb-5 mb-md-0">
              <div className="border p-4 rounded mb-4">
                {/* <h3 className="mb-3 h6 text-uppercase text-black d-block">
                  Danh Mục
                </h3> */}
                {/* <div className="cont">
                  <label className="container">Tất cả
                    <input type="radio" checked="checked" name="radio" onClick={ () => {
                      setCategory('')
                      setSkip(0)
                    } } />
                    <span className="checkmark"></span>
                  </label>
                  { categories.map(cate => (
                    <label className="container"  >{ cate.title }
                      <input type="radio" name="radio" onClick={ () => {
                        setCategory(cate._id)
                        setSkip(0)
                      } } />
                      <span className="checkmark" key={ cate._id }></span>
                    </label>
                  )) }
                </div> */}
                {/* <div className="mb-4"> */ }
                <h3 className="mb-3 h6 text-uppercase text-black d-block">
                  Danh Mục
                </h3>
                {/* <div id="slider-range" className="border-primary"> */ }
                <ul className="list-unstyled mb-0">
                  <li className="mb-1">
                    <button
                      className="d-flex btn btn-secondary"
                      onClick={ () => {
                        setCategory("");
                        setSkip(0);
                      } }
                    >
                      <span>Tất cả</span>
                      {/* <span className="text-black ml-auto">
                        ({totalResults})
                      </span> */}
                    </button>
                  </li>
                  { categories.map((cate) => (
                    <li className="mb-1" key={ cate._id }>
                      <button
                        className="d-flex btn btn-secondary"
                        onClick={ () => {
                          setCategory(cate._id);
                          setSkip(0);
                        } }
                      >
                        <span>{ cate.title }</span>
                        {/* <span className="text-black ml-auto">(2,220)</span> */ }
                      </button>
                    </li>
                  )) }
                </ul>
                <div className="App">
                  <p>
                    Filter Price:
                    <br /> 0 VND - { formatter.format(price) }
                  </p>
                  <input type="range" min={ 0 } max={ 5000000 } onInput={ handleInput } />
                </div>
                {/* </div> */ }


                <section id="sidebar">
                  <div className="py-2 border-bottom ml-3">
                    <h6 className="font-weight-bold">Danh Mục</h6>
                    <div id="orange"><span className="fa fa-minus"></span></div>
                    <form>
                      <div className="form-group" onClick={ () => { setCategory(''); setSkip(0) } }>
                        <label htmlFor="artisan">Tất cả</label>
                      </div>
                      { categories.map((cate) => (
                        <div className="form-group" onClick={ () => { setCategory(cate._id); setSkip(0); } }>
                          <label htmlFor="breakfast">{ cate.title }</label>
                        </div>
                      )) }
                    </form>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Shop;
