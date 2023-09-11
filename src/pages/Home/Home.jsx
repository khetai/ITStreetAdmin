import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../../layouts/Navbar/Navbar";
import MainSlider from "../../components/MainSlider/MainSlider";
import Footer from "../../layouts/Footer/Footer";
import TopSlickSlider from "../../components/TopSlickSlider";
import Logo from "../../assets/imgs/Logo.jpg";
function Home() {
  return (
    <>
      <Helmet>
        <title>IT STREET</title>
        <link rel="shortcut icon" href={Logo} type="image/x-icon" />
        <link rel="shortcut icon" href="https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/IMG_Academy_Logo.svg/640px-IMG_Academy_Logo.svg.png" type="image/x-icon" />
      </Helmet>
      <Navbar></Navbar>
      <main className="container">
        <MainSlider></MainSlider>
        <TopSlickSlider header={"Ən çox tövsiye edilən"}></TopSlickSlider>
        <TopSlickSlider header={"Ən çox baxılan"}></TopSlickSlider>
        <TopSlickSlider header={"Ən çox satılan"}></TopSlickSlider>
        <TopSlickSlider header={"Ən sevimlilər"}></TopSlickSlider>
      </main>
      <Footer></Footer>
    </>
  );
}

export default Home;
