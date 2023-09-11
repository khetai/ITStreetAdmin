import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import TopSlickSlider from "../../components/TopSlickSlider";
import Navbar from "../../layouts/Navbar/Navbar";
import Footer from "../../layouts/Footer/Footer";
import BasktContainer from "../../components/BasketContainer";

function Basket() {

  return (
    <>
      <Helmet>
        <title>Basket</title>
      </Helmet>
      <Navbar></Navbar>
      <main className="container">
        <BasktContainer></BasktContainer>
        <TopSlickSlider header={"Ən çox tövsiye edilən"}></TopSlickSlider>
        <TopSlickSlider header={"Ən çox baxılan"}></TopSlickSlider>
        <TopSlickSlider header={"Ən çox satılan"}></TopSlickSlider>
        <TopSlickSlider header={"Ən sevimlilər"}></TopSlickSlider>
      </main>
      <Footer></Footer>
    </>
  );
}

export default Basket;
