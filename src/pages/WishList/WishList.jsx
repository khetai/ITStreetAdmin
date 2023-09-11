import React from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../../layouts/Navbar/Navbar'
import Footer from '../../layouts/Footer/Footer'
import WishListContainer from '../../components/WishListContainer'

function WishList() {
  return (
    <>
      <Helmet>
        <title>IT STREET</title>
      </Helmet>
      <Navbar></Navbar>
      <main className="container">
       <WishListContainer></WishListContainer>
      </main>
      <Footer></Footer>
    </>
  )
}

export default WishList