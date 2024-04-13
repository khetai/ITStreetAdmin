import React from 'react'
import ReactDOM from 'react-dom/client'
import './i18n';
import App from './App'
import { Provider } from "react-redux";
import store from "./contexts/Store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { AuthProvider } from "./context/AuthProvider";
import { MainContextProvider } from './contexts/mainContextProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <BrowserRouter>
    <MainContextProvider>
      <Routes>
          <Route path="/*" element={<App />} />
       </Routes>
    </MainContextProvider>
     </BrowserRouter>
   </Provider>
)
