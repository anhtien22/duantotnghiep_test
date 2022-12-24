import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import productContext from "../context/product/productContext";
import { useCart } from "react-use-cart";
import UserContext from "../context/user/UserContext";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
// import Paginator from 'react-hooks-paginator';
import { Pagination } from "@mui/material";
import usePagination from "../helpers/Pagination"
import { useToasts } from "react-toast-notifications";

const ShopSingle = () => {
  const { addItem } = useCart();
  const { addToast } = useToasts();
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const [product, setProduct] = useState({ brand: {} });
  const pageLimit = 3;
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productReview, setProductReview] = useState([]);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  console.log("productReview", productReview);

  const [page, setPage] = useState(1);
  const PER_PAGE = 2;
  const count = Math.ceil(productReview.length / PER_PAGE);
  const data = usePagination(productReview, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    data.jump(p);
  };

  // for product context
  const pContext = useContext(productContext);
  const { getOneProduct, newReview } = pContext;

  // user context
  const userContext = useContext(UserContext)
  const { user } = userContext

  useEffect(() => {
    const fetctProduct = async () => {
      const fetchedProduct = await getOneProduct(id);
      setProduct(fetchedProduct);
      setProductReview(fetchedProduct.reviews)
    };
    fetctProduct();
    // eslint-disable-next-line
  }, [offset]);


  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    if (addToast) {
      addToast("Cảm ơn bạn đã đánh giá", { appearance: "success", autoDismiss: true });
    }
    const payload = { rating, comment, productId: product._id, user: user._id, name: user.name };
    newReview(payload);
  };

  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
  });


  return (
    <>
      <Breadcrumb pageName={product.name} />



      <div class="container11">
        <div class="imgBx">
          <img src={product.image} />
        </div>
        <div class="details">
          <div class="content">
            <h2>{product.name}<br></br>
              <span>Thương hiệu: {product.brand.local}</span>
            </h2>
            <p>ssadasdasdasdasdasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssasddddddddddddddddddddddddd</p>
            
            <p class="product-colors">
              <input class="minus is-form" type="button" value="-" disabled={quantity < 2} onClick={() => setQuantity(quantity - 1)} />
              <input aria-label="quantity" class="input-qty" type="number" value={quantity} disabled onChange={(e) => setQuantity(e.target.value)} />
              <input class="plus is-form" type="button" value="+" onClick={() => setQuantity(quantity + 1)} disabled={quantity >= product.Stock} />
            </p>
            
            
              {product.Stock >= 0 ? (
                <>
                    {/* <span>Tổng lượt đánh giá: {product?.ratings}</span> */}
                    <div id="start">
                      <h3>{formatter.format(product.price)}</h3>
                    <Rating name="rating" readOnly defaultValue={product.ratings} precision={0.5} />
                    </div>
                  <Link to="/Cart" onClick={() => { let item = { ...product, id: product._id, }; addItem(item, quantity); }} >
                    <button type="button">buy now</button>
                  </Link><br></br>
                  <small>Mã sản phẩm: {product.sku}</small>
                  
                </>) : (<>
                  <button className="buy-now btn btn-sm btn-primary">Hết hàng</button>
                  
                </>
                
              )}
            
              {/* <button>Buy Now</button> */}
          </div>
        </div>
      </div>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-sm-5 col-md-6 col-12 pb-4">
              <h1>Comments</h1>
              {data.currentData().map((review, key) => (
                <div className="comment mt-4 text-justify float-left col-122">
                  <div className="box1">
                    <h4>{review.name}</h4> &ensp;
                    <span className="text-secondary">
                      {new Date(
                        review.createdAt
                      ).toLocaleString()}
                    </span>
                  </div>
                  <Box>
                    <Rating
                      name="rating" size="small"
                      defaultValue={review.rating}
                      readOnly
                    />
                  </Box>
                  <p>{review.comment}</p>
                  <hr></hr>
                </div>
              ))}
              <Pagination
                count={count}
                size="large"
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
              />
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

                    <label htmlFor="message">Message</label>
                    <textarea
                      name="msg"
                      cols="30"
                      rows="5"
                      className="form-control"
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <input className="btn btn-secondary" type="submit" />
                </>) : (
                  <p>Bạn cần đăng nhập để bình luận <Link to="/login">tại đây</Link></p>
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
