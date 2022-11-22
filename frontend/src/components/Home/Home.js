import React, { Fragment , useEffect } from 'react'
// import { CgMouse } from "react-icons/all";   <CgMouse />
// import Loader from "./components/layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import Product from "./Product"
import "./Home.css"

import {getProduct} from "../../actions/productAction";
import {useSelector , useDispatch} from "react-redux"


const product = {
  name: "Black T-shirt",
  images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
  price: "₹ 3000",
  _id: "1"
};

function Home() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getProduct())
  },[dispatch])
  return (
    <Fragment>
      <MetaData title="ECOMMERCE" />

      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>
            Scroll
          </button>
        </a>
      </div>

      <h2 className="homeHeading">Featured Products</h2>

      <div className="container" id="container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </Fragment>
  );
}

export default Home;