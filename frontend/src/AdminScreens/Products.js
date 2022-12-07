import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddProductModal from "../AdminComponents/AddProductModal";
import Navbar from "../AdminComponents/Navbar";
import productContext from "../context/product/productContext";
// import Footer from '../AdminComponents/Footer'

const Products = () => {
  // for product context
  const pContext = useContext(productContext);
  const { getProducts, products } = pContext;

  const limit = 8;
  const [skip, setSkip] = useState(0);
  const [keyWord, setKeyWord] = useState("");
  // const [category, setCategory] = useState('')
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const populateProducts = async () => {
      setTotalResults(await getProducts(limit, skip, keyWord));
    };
    populateProducts();
    // eslint-disable-next-line
  }, [skip, limit]);

  const handlePreviousClick = async () => {
    if (skip > 0) {
      setSkip(skip - limit);
    }
  };

  const handleNextClick = async () => {
    setSkip(skip + limit);
  };

  const handleChange = (e) => {
    setKeyWord(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const populateProducts = async () => {
      setTotalResults(await getProducts(limit, skip, keyWord));
    };
    setSkip(0);
    populateProducts();
  };

  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
  });

  return (
    <>
      <Navbar />
      {/* HEADER */}
      <header id="main-header" className="py-2 bg-primary text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-pencil-alt" /> Sản phẩm
              </h1>
            </div>
          </div>
        </div>
      </header>
      {/* SEARCH */}
      <section id="search" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <a
                href="/"
                className="btn btn-primary btn-block"
                data-toggle="modal"
                data-target="#addProductModal">
                <i className="fas fa-plus" /> Thêm sản phẩm
              </a>
              <AddProductModal />
            </div>
            <div className="col-md-6 ml-auto">
              <form onSubmit={handleSearchSubmit}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={keyWord}
                    onChange={handleChange}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="submit">
                      Tìm kiếm
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* Products */}
      <section id="posts">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <h4>Sản phẩm mới nhất</h4>
                </div>

                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Tên</th>
                      <th>Giá</th>
                      <th>Ngày</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, i) => (
                      <tr key={product._id}>
                        <td>{i + 1}</td>
                        <td>{product.name}</td>
                        <td>
                        {formatter.format(product.price)}
                        </td>
                        <td>
                          {new Date(product.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <Link
                            to={`/productDetailsAdmin/${product._id}`}
                            className="btn btn-secondary bg-primary text-white">
                            <i className="fas fa-angle-double-right" /> Chi tiết
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="row mx-3">
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
                        Trang-{skip / limit + 1},
                        <span className="text-muted">
                          {' '}
                          Hiển thị {products.length} hết {totalResults}{' '}
                          sản phẩm.
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
            </div>
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </>
  );
};

export default Products;
