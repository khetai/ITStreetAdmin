import React from 'react'
import './assets/scss/main.scss'
import { MainContextProvider } from './contexts/mainContextProvider'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Home from './pages/Home/Home'
import Basket from './pages/Basket/Basket'
import PrivateRoute from './routes/PrivateRoute'
import Login from './pages/Login/Login'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import WishList from './pages/WishList/WishList'

function App() {
  return (
    <>
      <HelmetProvider>
        <MainContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path={"/"} element={<Home></Home>}></Route>
              <Route path={"/index"} element={<Home></Home>}></Route>
              <Route
                path="/product/:id"
                element={<ProductDetail></ProductDetail>}
              ></Route>
              <Route path="/login" element={<Login></Login>}></Route>
              <Route element={<PrivateRoute></PrivateRoute>}>
                <Route path="/basket"  element={<Basket></Basket>}></Route>
                <Route path="/wishlist"  element={<WishList></WishList>}></Route>
              </Route>
              <Route path="*" element={<h1>NOT FOUND 404</h1>}></Route>
            </Routes>
          </BrowserRouter>
        </MainContextProvider>
      </HelmetProvider>
    </>
  )
}

export default App
