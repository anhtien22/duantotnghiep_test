import { Rating } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import CategoryContext from "../context/category/categoryContext";
import productContext from "../context/product/productContext";
import usePagination from "../helpers/Pagination";
import { Pagination } from "@material-ui/lab";
import { useToasts } from "react-toast-notifications";

const FeaturedProducts = () => {
  const pContext = useContext(productContext);
  const { getProducts, products } = pContext;
  console.log(products);
  // for category context
  const cContext = useContext(CategoryContext);
  const { getCategories } = cContext;

  const [skip, setSkip] = useState(0);
  const [keyWord, setKeyWord] = useState("");
  const [category, setCategory] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const { addToast } = useToasts();


  const [page, setPage] = useState(1);
  const PER_PAGE = 3;
  const count = Math.ceil(products.length / PER_PAGE);
  const data = usePagination(products, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    data.jump(p);
  };
  useEffect(() => {
    const populateProducts = async () => {
      setTotalResults(await getProducts(skip, keyWord, category));
    };
    populateProducts();
    getCategories();
    // eslint-disable-next-line
  }, [skip, category]);

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
          <div className="row mb-5" id="featuredproducts">
            {
              products.map((product) => (
                <>
                  { product.ratings >= 3 ? (
                    <>
                      <div className="col-sm-6 col-lg-4 mb-4" data-aos="fade-up" key={product._id} >
                        <div className="block-4 text-center border">
                          <div className="product-img">
                            <Link to={`/shopSingle/${product._id}`}>
                              <img src={product.image} alt=""/>
                            </Link>
                            <div className="btn">                               
                            <i class="icon" onClick={() => { let item = {  ...product, id: product._id,}; if (addToast) {
                                addToast("Đã thêm vào giỏ hàng", { appearance: "success", autoDismiss: true });
                              }
                              addItem(item, quantity);
                                }}>Mua Ngay
                              </i>
                            </div>
                          </div>
                          <div className="block-4-text p-4">
                            <p id="name"><Link to={`/shopSingle/${product._id}`}>{product.name}</Link></p>
                            <p className="text-black font-weight-bold"><Rating name="half-rating-read" defaultValue={ product.ratings } precision={ 0.5 } readOnly /></p>
                            <p id="price">{formatter.format(product.price)}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : "" }
                </>
              )
              ) }
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
