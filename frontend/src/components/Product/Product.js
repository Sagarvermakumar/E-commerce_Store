import React, { Fragment, useEffect, useState } from "react";
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
// import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
// import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
// import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];


const Products = () => {
  return (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider/>

            <Typography>Categories</Typography>
            <ul className="categoryBox">
             <li>1</li>
             <li>1</li>
             <li>1</li>
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              
            </fieldset>
          </div>
         
            <div className="paginationBox">
              <Pagination
                // activePage={currentPage}
                // itemsCountPerPage={resultPerPage}
                // totalItemsCount={productsCount}
                // onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
         
        </Fragment>
      )
};

export default Products;
