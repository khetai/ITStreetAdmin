import React from 'react'
import './assets/scss/main.scss'
import { MainContextProvider } from './contexts/mainContextProvider'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Login from './pages/Login/Login'
import AdminPanel from './pages/AdminPanel/AdminPanel'
import NotFound from './pages/NotFound/NotFound'
import AdminTableUser from './components/AdminPanelComponents/AdminTableUser'
import AdminTable from './components/AdminPanelComponents/AdminTable'
import AdminTableSlider from './components/AdminPanelComponents/AdminTableSlider'
import AdminTableCategories from './components/AdminPanelComponents/AdminTableCategories'
import AdminTableKeywords from './components/AdminPanelComponents/AdminTableKeywords'
import AdminProductAddPage from './components/AdminPanelComponents/AdminProductAddPage'
import AdminProductEditPage from './components/AdminPanelComponents/AdminProdcutEditPage'
import AdminOrder from './components/AdminPanelComponents/AdminOrder'
import AdminBuildPc from './components/AdminPanelComponents/AdminBuildPc'
import AdminRoute from './routes/AdminRoute'
import AdminTableBrand from './components/AdminPanelComponents/AdminTableBrand'

function App() {
console.log("renderAPp")

  return (
    <>
      <HelmetProvider>
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route element={<AdminRoute />}>
                <Route element={<AdminPanel />}>
                  <Route path="/" element={<AdminTable />} />
                  <Route
                    path="/adminpanel/addProduct"
                    element={<AdminProductAddPage />}
                  />
                  <Route
                    path="/adminpanel/editProduct/:id"
                    element={<AdminProductEditPage />}
                  />
                  <Route
                  path='/adminpanel/brands'
                  element={<AdminTableBrand/>}
                  />
                  <Route
                    path="/adminpanel/users"
                    element={<AdminTableUser />}
                  />
                  <Route path="/adminpanel/orders" element={<AdminOrder />} />
                  <Route
                    path="/adminpanel/category"
                    element={<AdminTableCategories />}
                  />
                  <Route
                    path="/adminpanel/keywords"
                    element={<AdminTableKeywords />}
                  />
                  <Route path="/adminpanel/settings" element={<AdminTable />} />
                  <Route path="/adminpanel/buildPc" element={<AdminBuildPc />} />
                  <Route
                    path="/adminpanel/sliders"
                    element={<AdminTableSlider />}
                  />
                </Route>
              </Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
      </HelmetProvider>
    </>
  )
}

export default App
