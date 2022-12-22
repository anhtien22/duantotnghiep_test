import React, { useContext, useEffect, useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import Breadcrumb from "../components/Breadcrumb";
import CategoryContext from "../context/category/categoryContext";
import productContext from "../context/product/productContext";
import { getSortedProducts } from "../helpers/product";


const Shop = () => {
  // for product context
  const pContext = useContext(productContext);
  const { getProducts, products } = pContext;

  // console.log("products", products);
  // for category context
  const cContext = useContext(CategoryContext);
  const { categories, getCategories } = cContext;

  const limit = 6;
  const [skip, setSkip] = useState(0);
  const [keyWord, setKeyWord] = useState("");
  const [category, setCategory] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const populateProducts = async () => {
      setTotalResults(await getProducts(limit, skip, keyWord, category));
      // await getProducts(limit, skip, keyWord, category);
    };
    populateProducts();
    getCategories();
    // eslint-disable-next-line
  }, [skip, limit, category]);

  const [data, setData] = useState([]);
  console.log("data", data);
  const [sortType, setSortType] = useState('default');
  useEffect(() => {
    const sortArray = type => {
      const sorted = [...products]
      const types = {
        default: 'default',
        priceHighToLow: 'priceHighToLow',
        priceLowToHigh: 'priceLowToHigh',
      };
      const sortProperty = types[type];
      if (sortProperty === "default") {
        return data;
      }
      if (sortProperty === "priceHighToLow") {
        sorted.sort((a, b) => b.price - a.price);
      }
      if (sortProperty === "priceLowToHigh") {
        sorted.sort((a, b) => a.price - b.price);
      }
      // const sorted = [...products].sort((a, b) => b[sortProperty] - a[sortProperty]);
      console.log(sorted);
      setData(sorted);
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

  return (
    <>
      <Breadcrumb pageName="Shop" />
      <div className="site-section-shop">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-9 order-2">
              <div className="row">
                <div className="col-md-12 mb-5 d-flex justify-content-between"  id="rowshop">
                  <div className=" col-md-6 float-md-left mb-4">

                    <h2 className="text-black h5">SHOP ALL</h2>
                    <select
                      onChange={e => setSortType(e.target.value)}
                    >
                      <option value="default">Mặc định</option>
                      <option value="priceHighToLow">Giá từ cao đến thấp</option>
                      <option value="priceLowToHigh">Giá từ thấp đến cao</option>
                    </select>
                  </div>
                  <div className="col-md-6 " id="search">
                    <Form className="d-flex" onSubmit={handleSearchSubmit}>
                      <FormControl
                        type="search"
                        placeholder="Search products"
                        className="me-2 "
                        aria-label="Search"
                        size="sm"
                        value={keyWord}
                        onChange={handleChange}
                      />

                      <button type="submit" className="btn btn-secondary ">Search</button>
                    </Form>
                  </div>
                </div>
              </div>

              <div className="row mb-5" id="shopproducts">
                {products.map((product) => (
                  <div
                    className="col-sm-6 col-lg-4 mb-4"
                    data-aos="fade-up"
                    key={product._id}
                  >
                    <div className="block-4 text-center border">
                      <div className="box-image">
                        <figure className="block-4-image">
                          <Link to={`/shopSingle/${product._id}`}>
                            <img src={product.image} alt="placeholder" className="img-fluid" />
                          </Link>
                          <button class="deroul_titre" onClick={() => { let item = { ...product, id: product._id, }; addItem(item, quantity); }}>Mua ngay</button>
                          <p className="deroul_soustitre">{product.category.title}</p>
                        </figure>
                      </div>
                      <div className="block-4-text p-4">
                        <p id="name"><Link to={`/shopSingle/${product._id}`}>{product.name}</Link>
                        </p>
                        <p id="price">{formatter.format(product.price)}</p>
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


              <section id="sidebar">
                <div className="py-2 border-bottom ml-3">
                  <h6 className="font-weight-bold">Danh Mục</h6>
                  <div id="orange"><span className="fa fa-minus"></span></div>
                  <form>
                    <div className="form-group" onClick={() => { setCategory('');setSkip(0)}}>
                      <label for="artisan">Tất cả</label>
                    </div>
                    {categories.map((cate) => (
                      <div className="form-group" onClick={() => { setCategory(cate._id);setSkip(0);}}>
                        <label for="breakfast">{cate.title}</label>
                      </div>
                    ))}
                  </form>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Shop;
