import React, { useContext, useEffect, useState } from "react";
import Card_v2 from "../Card_v2";
import style from "./index.module.scss";
import { MainContext } from "../../contexts/mainContextProvider";

function BasktContainer() {
  const [basket] = useContext(MainContext);

  return (
    <div>
      {basket.length >0 ? (
        <div className={style.container}>
          {basket.map((x) => (
            <Card_v2 key={x.id} {...x}  ></Card_v2>
          ))}
        </div>
      ) : (
        <h1>Səbət boşdur</h1>
      )}
    </div>
  );
}

export default BasktContainer;
