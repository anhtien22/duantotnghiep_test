import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../AdminComponents/Navbar";
import OrderContext from "../context/orders/orderContext";
import "./or.css";
// import SweetPagination from "sweetpagination";
import { Form, FormControl } from "react-bootstrap";
import Paginator from 'react-hooks-paginator';

import swal from "sweetalert";
import productContext from "../context/product/productContext";


const Review = () => {
  const pContext = useContext(productContext);
  const { getProducts, products, getAllReviews } = pContext;
  console.log("products", products);

  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");


  const [productId, setProductId] = useState("");

  const [totalResults, setTotalResults] = useState(0);

  const pageLimit = 5;

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  useEffect(() => {
    const populateProducts = async () => {
      setTotalResults(await getProducts());
    };
    populateProducts();
    // eslint-disable-next-line
  }, []);
  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    getAllReviews(productId);
  };

  useEffect(() => {
    if (productId.length === 24) {
      getAllReviews(productId);
    }
  }, []);

  useEffect(() => {
    setCurrentData(products.slice(offset, offset + pageLimit));
  }, [offset, products]);

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/reviews?${keyword}`);
    } else {
      navigate(`/reviews`)
    }
  }

  const handlerSearchChange = (e) => {
    setKeyword(e.target.value);
  }


  return (
    <>
      <Navbar />
      {/* HEADER */ }
      <header id="main-header" className="py-2 bg-info text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-users" /> Đơn hàng
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* SEARCH */ }
      <section id="search" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6 ml-auto">
              <Form className="d-flex" onSubmit={ searchHandler }>
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  minLength={ 3 }
                  size="sm"
                  defaultValue={ keyword } onChange={ handlerSearchChange }
                />
                <button type="submit" className="btn btn-secondary mx-3">
                  Tìm kiếm
                </button>
              </Form>
            </div>
          </div>
        </div>
      </section>

      <section id="users">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <h4>Danh sách bình luận</h4>
                </div>
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>Mã</th>
                      <th>Tên sản phẩm</th>
                      <th>Tổng bình luận</th>
                      <th>Tổng đánh giá</th>
                      <th>Thao tác</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {/* products.reviews && products.reviews.filter((value) => {
                      if (keyword === "") {
                        return value;
                      } else if (value._id.toLowerCase().includes(keyword.toLowerCase())) {
                        return value;
                      }
                    }) */}
                    { currentData && currentData.filter((value) => {
                      if (keyword === "") {
                        return value;
                      } else if (value._id.toLowerCase().includes(keyword.toLowerCase())) {
                        return value;
                      }
                    }).map((product, index) => (
                      <tr key={ product._id }>
                        <td>{ product._id }</td>
                        <td>{ product.name }</td>
                        <td>{ product.numOfReviews }</td>
                        <td>{ product.ratings }</td>
                        <td>
                          <Link
                            to={ `/reviews/${product._id}` }
                            className="btn btn-secondary bg-primary text-white"
                          >
                            <i className="fas fa-angle-double-right" /> Chi tiết
                          </Link>
                        </td>
                      </tr>
                    )) }
                  </tbody>
                </table>
                <Paginator
                  totalRecords={ products.length }
                  pageLimit={ pageLimit }
                  pageNeighbours={ 2 }
                  setOffset={ setOffset }
                  currentPage={ currentPage }
                  setCurrentPage={ setCurrentPage }
                  pageContainerClass="mb-0 mt-0 d-flex "
                  pagePrevText="«"
                  pageNextText="»"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Review;