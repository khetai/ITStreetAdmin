import React from "react";
import navBrand from "../../assets/imgs/navBrand.svg";
import Logo from "../../assets/imgs/Logo.jpg";

import "./index.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="container">
      <div className="social">
        <Link to={"/"}>
          <img src={Logo} alt="navBrand" />
        </Link>
        <nav>
          <Link>
            <div>
              <i className="fa-brands fa-instagram"></i>
            </div>
          </Link>
          <Link>
            <div>
              <i className="fa-brands fa-facebook-f"></i>
            </div>
          </Link>
          <Link>
            <div>
              <i className="fa-solid fa-at"></i>
            </div>
          </Link>
        </nav>
      </div>
      <hr />
      <div className="copyright">
        <div>
          Copyright 2023 © <strong>Market Yandex.</strong>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
