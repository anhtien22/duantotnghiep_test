import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import productContext from "../context/product/productContext";
import { useCart } from "react-use-cart";
import UserContext from "../context/user/UserContext";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

import { football } from "./data";
import Pagination from "./Pagination";
import './test.css'

const ShopSingle = () => {



  const pageSize = 5;
  const pageLength = football.length / pageSize;
  const [page, setPage] = useState(1);
  const [list, setList] = useState(football.slice(page - 1, page * pageSize));

  const handlePage = (thePage) => {
    setPage(thePage);
    const t = football.slice((thePage - 1) * pageSize, thePage * pageSize);
    setList(t);
  };

  const prevHandler = (thePage) => {
    if (thePage === 1) {
      handlePage(1);
    } else {
      handlePage(Number(thePage) - 1);
    }
  };

  const nextHandler = (thePage, thePageLength) => {
    if (thePage < thePageLength) {
      handlePage(Number(thePage) + 1);
    }
  };










  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const [product, setProduct] = useState({ brand: {} });
  const [productReview, setProductReview] = useState("")
  console.log("productReview", productReview);
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
      setProductReview(fetchedProduct)
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

  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
  });


  return (
    <>
      <Breadcrumb pageName={product.name} />
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6" id="img">
              <img src={product.image} alt="img" id="img2" className="img-fluid" />
            </div>
            <div className="col-md-6">
              <h2 className="text-black">{product.name}</h2>
              <p>{product.description}</p>
              <p>
                <small className="text-secondary">
                  {/* Thương hiệu: { product.brand.local } */}
                </small>
              </p>
              <p>
                <strong className="text-primary h4">{formatter.format(product.price)}</strong>
              </p>

              <div className="mb-5">
                <div className="input-group mb-3" style={{ maxWidth: "120px" }}>
                  <div className="input-group-prepend">
                    <button
                      disabled={quantity < 2}
                      className="btn btn-outline-primary js-btn-minus"
                      onClick={() => setQuantity(quantity - 1)}
                      type="button"
                    >
                      &minus;
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control text-center"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    disabled
                    placeholder=""
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-primary js-btn-plus"
                      onClick={() => setQuantity(quantity + 1)}
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

                {product.Stock >= 0 ? (<>
                  <Link
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
                    Thêm vào giỏ
                  </Link>
                </>) : (<>
                  <button
                    className="buy-now btn btn-sm btn-primary"
                  >
                    Hết hàng
                  </button>
                </>)}
              </p>
              <small>Mã sản phẩm: {product.sku}</small>
            </div>
          </div>
        </div>
      </div>
      <section>


        {list.map((x, i) => {
          const { long, short, country } = x;
          return (

            <tr key={i}>
              <td>{long}</td>
              <td className="center">{short}</td>
              <td>{country}</td>
            </tr>
          );
        })}

        <Pagination
          page={page}
          pages={pageLength}
          onClick={(pageEvent) => {
            handlePage(pageEvent);
          }}
          prevHandler={() => prevHandler(page)}
          nextHandler={() => nextHandler(page, pageLength)}
        />




        <div className="container">
          <div className="row">
            <div className="col-sm-5 col-md-6 col-12 pb-4">
              <h1>Comments</h1>
              <div className="comment mt-4 text-justify float-left">

                {productReview.reviews &&
                  productReview.reviews.map((review) => (
                    <>

                      <h4>{review.name}</h4>
                      <span>{review.createdAt}</span>
                      <br></br>
                      <p>{review.comment}</p>
                    </>
                  ))}

              </div>
            </div>
            <div className="col-lg-4 col-md-5 col-sm-4 offset-md-1 offset-sm-1 col-12 mt-4">
              <form id="algin-form" onSubmit={reviewSubmitHandler}>
                <h4>Leave a comment</h4>
                {user ? (<>
                  <div className="form-group">
                    <label>Your rating:</label>
                    <Box
                      sx={{
                        '& > legend': { mt: 1 },
                      }}
                    >
                      <Rating
                        name="rating"
                        value={rating}
                        onChange={(event, newValue) => {
                          setRating(newValue);
                        }}
                      />

                    </Box>
                    {/* </div> */}
                    <label for="message">Message</label>
                    <textarea name="msg" id="" msg cols="30" rows="5" className="form-control"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)} ></textarea>
                  </div>

                  <input type="submit" />
                </>) : (
                  <>
                    <p>Bạn cần đăng nhập để bình luận <Link to="/login">tại đây</Link></p>
                  </>
                )}

              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ShopSingle;
