import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../AdminComponents/Navbar";
import productContext from "../context/product/productContext";
const ReviewById = () => {
  const pContext = useContext(productContext);
  const { getAllReviews } = pContext;




  // const [productId, setProductId] = useState("");

  const { id } = useParams();

  const [review, setReview] = useState({
    reviews: [],
  });
  console.log("review", review);
  useEffect(() => {
    const fetchOrder = async () => {
      const reviewData = await getAllReviews(id);
      setReview(reviewData);
    };
    fetchOrder();
    // eslint-disable-next-line
  }, []);

  // const pageLimit = 5;

  // const [offset, setOffset] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [currentData, setCurrentData] = useState([]);

  // const productReviewsSubmitHandler = (e) => {
  //   e.preventDefault();
  //   getAllReviews(productId);
  // };

  // useEffect(() => {
  //   if (productId.length === 24) {
  //     getAllReviews(productId);
  //   }
  // }, []);

  return (
    <>
      <Navbar />
      <header id="main-header" className="py-2 bg-warning text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-users" /> Bình Luận
              </h1>
            </div>
          </div>
        </div>
      </header>


      <section className="h-100 gradient-custom">
        <div className="container-full py-5">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-10 col-xl-8">
              <div className="card" style={ { borderRadius: "10px" } }>
                <div className="card-header px-4 py-5">
                  {/* <h5 className="text-muted mb-0">
                    Đơn hàng của,
                    <span style={ { color: "#a8729a" } }>{ order.user?.name }</span>
                    !
                  </h5> */}
                </div>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p
                      className="lead fw-normal mb-0"
                      style={ { color: "#a8729a" } }
                    >
                      Danh sách bình luận của sản phẩm
                    </p>
                    <p className="small text-muted mb-0">
                      ID : <b>{ id }</b>
                    </p>
                  </div>

                  { review.reviews && review.reviews.map((orderItem) => (
                    <div
                      key={ orderItem._id }
                      className="card shadow-0 border mb-4"
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-3">
                            <p>Tên người bình luận</p>
                            <span>{ orderItem.name }</span>
                          </div>
                          <div className="col-3">
                            <p>Nội dung bình luận</p>
                            <span>{ orderItem.comment }</span>
                          </div>
                          <div className="col-3">
                            <p>
                              Đánh giá *
                            </p>
                            <span>{ orderItem.rating }</span>
                          </div>
                          <div className="col-3">
                            <p>
                              Ngày bình luận
                            </p>
                            <span>{ new Date(orderItem.createdAt).toLocaleString() }</span>
                          </div>
                        </div>
                        <hr
                          className="mb-4"
                          style={ { backgroundColor: "#e0e0e0", opacity: 1 } }
                        />
                      </div>
                    </div>
                  )) }

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReviewById;