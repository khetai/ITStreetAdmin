import React, { useContext, useEffect } from "react";
import { useState } from "react";
import style from "./index.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { MainContext } from "../../contexts/mainContextProvider";
// import second from '../../assets/imgs/'

function Card_v2({ product_name, price, id, img_url, description }) {
  const [basket, setBasket, wishList, setWishList] = useContext(MainContext);
  const [isFavIcon, setisFavIcon] = useState(false);
  const [isBasket, setIsBasket] = useState(false);

  useEffect(() => {
    if (wishList.find((x) => x.id === id) === undefined) {
      setisFavIcon(true);
    } else {
      setisFavIcon(false);
    }
  }, [wishList, id]);

  useEffect(() => {
    if (basket.find((x) => x.id === id) === undefined) {
      setIsBasket(true);
    } else {
      setIsBasket(false);
    }
  }, [basket, id]);

  const addBasket = (product_name, price, id, img_url, description) => {
    if (basket.find((x) => x.id === id) === undefined) {
      setBasket([
        ...basket,
        { product_name, price, id, img_url, description, count: 1 },
      ]);
    } else {
      setBasket(basket.filter((x) => x.id !== id));
    }
  };

  const addWishList = (product_name, price, id, img_url, description) => {
    if (wishList.find((x) => x.id === id) === undefined) {
      setWishList([
        ...wishList,
        { product_name, price, id, img_url, description, isFaworite: true },
      ]);
    } else {
      setWishList(wishList.filter((x) => x.id !== id));
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.imgContainer}>
        <div
          className={style.iconContainer}
          onClick={() => {
            addWishList(product_name, price, id, img_url, description);
            setisFavIcon(!isFavIcon);
          }}
        >
          <i
            className={`${!isFavIcon ? "fa-solid" : "fa-regular"}  fa-heart`}
          ></i>
        </div>
        <div className="endirim"></div>
        <Link to={"/product/" + id}>
          <img src={img_url} alt="img" />
        </Link>
      </div>
      <div className="container">
        <div className={style.price}>{price} ₽</div>
        <div className={style.starsContainer}>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-regular fa-star"></i>
        </div>
        <div className={style.product_name}>{product_name}</div>
        <button
          onClick={() => {
            addBasket(product_name, price, id, img_url, description);
            setIsBasket(!isBasket);
          }}
        >
          {isBasket ? "Sebete elave et" : <i className="fa-solid fa-xmark"></i>}
        </button>
      </div>
    </div>
  );
}

export default Card_v2;
