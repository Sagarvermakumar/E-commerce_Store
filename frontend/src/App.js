import React, { useEffect } from 'react';
import './App.css';
import WebFont from "webfontloader"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Footer from './components/layout/Footer/Footer'
import Home from "./components/Home/Home";
// import Products from "./components/Product/Product";

 // <Route exact path="/products" component={Products} />


function App() {
  //load google fonts
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
       
      </Switch>
      <Footer/>
    </Router>
  );
}
export default App;
