import { Rating } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import CategoryContext from "../context/category/categoryContext";
import productContext from "../context/product/productContext";
const FeaturedProducts = () => {
  const pContext = useContext(productContext);
  const { getProducts, products } = pContext;
  console.log("products", products);
  // for category context
  const cContext = useContext(CategoryContext);
  const { getCategories } = cContext;

  const limit = 3;
  const [skip, setSkip] = useState(0);
  const [keyWord, setKeyWord] = useState("");
  const [category, setCategory] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const populateProducts = async () => {
      setTotalResults(await getProducts(limit, skip, keyWord, category));
    };
    populateProducts();
    getCategories();
    // eslint-disable-next-line
  }, [skip, limit, category]);

  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
  });
  return (
    <div className="site-section block-3 site-blocks-2 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 site-section-heading text-center pt-4">
            <h2>Sản phẩm mới</h2>
          </div>
          <div className="row mb-5">
            { products.map((product) => (
              <div
                className="col-sm-6 col-lg-4 mb-4"
                data-aos="fade-up"
                key={ product._id }
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
                      <Link className="text-black font-weight-bold" to={ `/shopSingle/${product._id}` }>
                        { product.name }
                      </Link>
                    </h3>
                    <p className="mb-0 text-secondary">
                      { product.category.title }
                    </p>
                    <p className="text-black font-weight-bold">
                      { formatter.format(product.price) }
                    </p>
                    <p className="text-black font-weight-bold">
                      <Rating name="half-rating-read" defaultValue={ product.ratings } readOnly />
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
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
