import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card_v2 from "../Card_v2";
import style from "./index.module.scss";
const productlar =  [
  {
    "id": 1,
    "product_name": "Laptop Computer",
    "price": 799.99,
    "img_url":"https://images.pexels.com/photos/18096279/pexels-photo-18096279/free-photo-of-laptop-standing-on-a-wooden-table-at-a-terrace.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    "id": 2,
    "product_name": "Hiking Backpack",
    "price": 69.99,
    "img_url":"https://images.pexels.com/photos/18047302/pexels-photo-18047302/free-photo-of-man-in-hat-and-backpack-hiking-in-forest.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
   
  },
  {
    "id": 3,
    "product_name": "Dining Table Set",
    "price": 499.0,
    "img_url":"https://images.pexels.com/photos/5638639/pexels-photo-5638639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    
  },
  {
    "id": 5,
    "product_name": "Desk Organizer",
    "price": 12.99,
    "img_url":"https://images.pexels.com/photos/5797908/pexels-photo-5797908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
 
  },
  {
    "id": 4,
    "product_name": "Running Shorts",
    "price": 24.5,
    "img_url":"https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
   
  }
]
function TopSlickSlider({ header }) {
  const [prodcuts, setProdcuts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch("http://localhost:3000/products")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setProdcuts(data)
    //   })
      setLoading(false)
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
        {/* {prodcuts.map((data) => (
          <Card_v2 key={data.id} {...data} />
        ))} */}
         {productlar.map((data) => (
          <Card_v2 key={data.id} {...data} />
        ))}
      </Slider>}
      
    </>
  );
}

export default TopSlickSlider;
