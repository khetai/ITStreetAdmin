import React from 'react'
import { useState } from 'react'
import style from './index.module.scss'
import { useNavigate } from 'react-router-dom'
// import second from '../../assets/imgs/'

function Card_v1({ product_name, price, id, img_url, description }) {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/${id}`)
  }
  const [transformed, setTransformed] = useState(false)

  const handleButtonClick = () => {
    setTransformed(!transformed)
  }

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div
          style={{ backgroundImage: `url(${img_url})` }}
          className={style.top} onClick={handleClick}
        ></div>
        <div className={`${style.bottom} ${transformed ? style.clicked : ''}`}>
          <div className={style.left}>
            <div className={style.details}>
              <h1 >{product_name}</h1>
              <p>£{price}</p>
            </div>
            <div className={style.buy} onClick={handleButtonClick}>
              <i
                className="fa-solid fa-cart-plus"
                style={{ color: '#254053' }}
              />
            </div>
          </div>
          <div className={style.right}>
            <div className={style.done}>
              <i className="fa-solid fa-check" style={{ color: '#fff' }}></i>
            </div>
            <div className={style.details}>
              <h1>{product_name}</h1>
              <p>Added to your cart</p>
            </div>
            <div className={style.remove} onClick={handleButtonClick}>
              <i className="fa-solid fa-xmark" style={{ color: '#fff' }}></i>
            </div>
          </div>
        </div>
      </div>
      <div className={style.inside}>
        <div className={style.icon}>
          <i className="fa-solid fa-info" style={{ color: '#fff' }}></i>
        </div>
        <div
          className={style.contents}
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
      </div>
    </div>
  )
}

export default Card_v1
