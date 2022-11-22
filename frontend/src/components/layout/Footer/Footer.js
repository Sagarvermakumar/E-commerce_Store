import React from 'react';
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css"

function Footer() {
  return (
    <footer id="footer" >
        <div className="leftFooter">
            <h4>Download our app</h4>
            <p>Download app for android IOS mobile phone</p>
            <img src={playStore}  alt="playStore" />
            <img src={appStore} alt="appStore" />
        </div>
        <div className="midFooter">
            <h1>Hmright...... Ecommerce</h1>
            <p>High Quality is our first pripority</p>
            <p>Copyright &copy; Sagar</p>
        </div>
        <div className="rightFooter">
            <h4>Follow us</h4>
            <a href='https://google.com'>Instagram</a>
            <a href='https://google.com'>Facebook</a>
            <a href='https://google.com'>Youtube</a>
        </div>
    </footer>
  )
}

export default Footer