import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card_v2 from "../Card_v2";
import style from "./index.module.scss";

function TopSlickSlider({ header }) {
  const [prodcuts, setProdcuts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        setProdcuts(data)
        setLoading(false)
      })
  }, []);


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    draggable: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <h2 className={style.header}>{header}</h2>
      {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <Slider {...settings}>
        {prodcuts.map((data) => (
          <Card_v2 key={data.id} {...data} />
        ))}
      </Slider>}
      
    </>
  );
}

export default TopSlickSlider;
