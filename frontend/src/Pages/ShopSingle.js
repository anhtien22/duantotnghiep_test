import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import productContext from "../context/product/productContext";
import { useCart } from "react-use-cart";
import UserContext from "../context/user/UserContext";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
const ShopSingle = () => {


  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const [product, setProduct] = useState({ category: {} });


  // comment 
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  // const [productId, setProductId] = useState(product?._id);

  // for product context
  const pContext = useContext(productContext);
  const { getOneProduct, newReview } = pContext;

  // user context
  const userContext = useContext(UserContext)
  const { user } = userContext

  console.log("user", user);

  useEffect(() => {
    const fetctProduct = async () => {
      const fetchedProduct = await getOneProduct(id);
      setProduct(fetchedProduct);
    };
    fetctProduct();
    // eslint-disable-next-line
  }, []);
  const reviewSubmitHandler = (e) => {
    e.preventDefault();

    const payload = { rating, comment, productId: product._id, user: user._id, name: user.name };
    console.log(payload);
    newReview(payload);
  };

  return (
    <>
      <Breadcrumb pageName={ product.name } />
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img src={ product.image } alt="img" className="img-fluid" />
            </div>
            <div className="col-md-6">
              <h2 className="text-black">{ product.name }</h2>
              <p>{ product.description }</p>
              <p>
                <small className="text-secondary">
                  { product.category.title }
                </small>
              </p>
              <p>
                <strong className="text-primary h4">${ product.price }</strong>
              </p>

              <div className="mb-5">
                <div className="input-group mb-3" style={ { maxWidth: "120px" } }>
                  <div className="input-group-prepend">
                    <button
                      disabled={ quantity < 2 }
                      className="btn btn-outline-primary js-btn-minus"
                      onClick={ () => setQuantity(quantity - 1) }
                      type="button"
                    >
                      &minus;
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control text-center"
                    value={ quantity }
                    onChange={ (e) => setQuantity(e.target.value) }
                    disabled
                    placeholder=""
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-primary js-btn-plus"
                      onClick={ () => setQuantity(quantity + 1) }
                      type="button"
                      disabled={
                        quantity >= product.Stock
                      }
                    >
                      &#43;
                    </button>
                  </div>
                </div>
              </div>
              <p>

                { product.Stock >= 0 ? (<>
                  <Link
                    to="/Cart"
                    className="buy-now btn btn-sm btn-primary"
                    onClick={ () => {
                      let item = {
                        ...product,
                        id: product._id,
                      };
                      addItem(item, quantity);
                    } }
                  >
                    Thêm vào giỏ
                  </Link>
                </>) : (<>
                  <button
                    className="buy-now btn btn-sm btn-primary"
                  >
                    Hết hàng
                  </button>
                </>) }
              </p>
            </div>
          </div>
        </div>
      </div>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-sm-5 col-md-6 col-12 pb-4">
              <h1>Comments</h1>
              <div className="comment mt-4 text-justify float-left">

                { product.reviews &&
                  product.reviews.map((review) => (
                    <>
                      <h4>{ review.name }</h4>
                      <span>{ review.createdAt }</span>
                      <br></br>
                      <p>{ review.comment }</p>
                    </>
                  )) }

              </div>
            </div>
            <div className="col-lg-4 col-md-5 col-sm-4 offset-md-1 offset-sm-1 col-12 mt-4">
              <form id="algin-form" onSubmit={ reviewSubmitHandler }>
                <h4>Leave a comment</h4>
                { user ? (<>
                  <div className="form-group">
                    <label>Your rating:</label>
                    <Box
                      sx={ {
                        '& > legend': { mt: 1 },
                      } }
                    >
                      <Rating
                        name="rating"
                        value={ rating }
                        onChange={ (event, newValue) => {
                          setRating(newValue);
                        } }
                      />

                    </Box>
                    {/* </div> */ }
                    <label for="message">Message</label>
                    <textarea name="msg" id="" msg cols="30" rows="5" className="form-control"
                      value={ comment }
                      onChange={ (e) => setComment(e.target.value) } ></textarea>
                  </div>

                  <input type="submit" />
                </>) : (
                  <>
                    <p>Bạn cần đăng nhập để bình luận <Link to="/login">tại đây</Link></p>
                  </>
                ) }

              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopSingle;
