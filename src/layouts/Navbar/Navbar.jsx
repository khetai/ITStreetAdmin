import React, { useContext, useState } from "react";
import style from "./index.module.scss";
import navBrand from "../../assets/imgs/navBrand.svg";
import logo from "../../assets/imgs/Logo.jpg";
import { Link, Navigate } from "react-router-dom";
import { MainContext } from "../../contexts/mainContextProvider";
function Navbar() {
  const [basket,setBasket, wishList] = useContext(MainContext);
  const [toggle, setToggle] = useState(false);
  return (
    <header className={`${style.header} `}>
      <nav className={`container`}>
        <div className={`${style.container} `}>
          <div className={style.NavBrand}>
            <Link to={"/"}>
              <img src={logo} alt="navBrand" />
            </Link>
          </div>
          <button className={` ${style.toggle}`}>
            <div>
              <i className="fa-solid fa-bars"></i>
            </div>
            <div>Kataloq</div>
          </button>
          <div className={`${style.searchContainer}`}>
            <input type="text" placeholder="Mehsul axtar" />
            <button>Axtar</button>
          </div>
          <div className={`${style.list}`}>
            <Link to={"/"}>
              <div>
                <i className="fa-solid fa-cube"></i>
                <div>Sifaris</div>
              </div>
            </Link>
            <Link to={"/wishlist"}>
              <div className={style.wishListIcon}>
                {wishList.length ? <span>{wishList.length}</span> : null}
                <i className="fa-regular fa-heart"></i>
                <div>Sevimliler</div>
              </div>
            </Link>
            <Link to={"/basket"}>
              <div className={style.basketIcon}>
                {basket.length ? <span>{basket.length}</span> : null}
                <i className="fa-solid fa-cart-shopping"></i>
                <div>Sebet</div>
              </div>
            </Link>
            <Link to={"/"}>
              <button className={`${style.login}`}>Daxil ol</button>
            </Link>
          </div>
        </div>
      </nav>
      <nav className={`container`}>
        <ul className={`${style.brands} `}>
          <li>Toshiba</li>
          <li>Samsung</li>
          <li>Hp</li>
          <li>Macbook</li>
          <li>Huawei</li>
          <li>Blackbery</li>
          <li>Hoffman</li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
