import React, { useEffect, useState, useContext } from 'react'
import style from './index.module.scss'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { setCookie } from '../../helpers/cookie'
import { useNavigate, useLocation } from 'react-router-dom'
import { MainContext } from '../../contexts/mainContextProvider'
import { useSelector } from "react-redux";
const handleInputChange = (e, stateChangerCb) => {
  const { name, value } = e.target
  stateChangerCb((prevFormData) => ({
    ...prevFormData,
    [name]: value,
  }))
}

function LogInPopUp() {
  const url = useSelector(state => state.store.url);
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [loginFormData, setLoginFormData] = useState({
    usernameOrEmail: '',
    password: '',
  })
  const [requested, setRequested] = useState(false)
  const [error, setError] = useState(false)
  const { setUser ,role} = useContext(MainContext)

  const handleLoginSubmit = async (e, data) => {  
    e.preventDefault()
    console.log("start:",data);
    try {
      setRequested(true)
      const response = await fetch(`${url}Auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      )

      if (response.ok) {
        const result = await response.json()
        setCookie('token', result.token, result.expires)
        setCookie(
          'refresh_token',
          result.refreshToken,
          result.refreshTokenExpires,
        )
        setUser(result.username)
        setRequested(false)
        document.body.style.opacity = '1'
        document.body.style.pointerEvents = 'all'
        navigate('/')
        console.log('gelen result', result)
        console.log('gelen role', role)
      } else {
        setRequested(false)
        setError(true)
        console.error('Login failed:', response)
      }
    } catch (error) {
      console.error('There was an error submitting the form:', error)
      setRequested(false)
      setError(true)
    }
  }
  useEffect(() => {
    document.body.style.opacity = requested ? '0.6' : '1'
    document.body.style.pointerEvents = requested ? 'none' : 'all'
  }, [requested])

  return (
    <form
      className={style.loginForm}
      onSubmit={(e) => handleLoginSubmit(e, loginFormData)}
    >
      {error && (
        <span className={style.errorMessage}>
          {t('usernameOrPasswordIncorrect')}
        </span>
      )}
      <h1 className={style.title}>{t('Login')}</h1>
      <label htmlFor="email">
        <i className="fa-solid fa-envelope"></i>
        <input
          placeholder={t('email')}
          type="text"
          name="usernameOrEmail"
          id="email"
          value={loginFormData.usernameOrEmail}
          onChange={(e) => {
            handleInputChange(e, setLoginFormData)
          }}
        />
      </label>
      <label htmlFor="password">
        <i className="fa-solid fa-key"></i>
        <input
          placeholder={t('password')}
          type="password"
          name="password"
          id="password"
          value={loginFormData.password}
          onChange={(e) => {
            handleInputChange(e, setLoginFormData)
          }}
        />
      </label>
      <button type="submit">
        {requested ? (
          <i className="fa-solid fa-spinner fa-spin-pulse"></i>
        ) : (
          t('Login')
        )}
      </button>
      <p onClick={() => setLogin(false)}>{t('noAccount?')}</p>
    </form>
  )
}


function Login() {

  
  const location = useLocation()
   console.log("salam");
  window.onpopstate = function (event) {
    if (
      location.pathname === '/login' &&
      window.location.pathname === '/order'
    ) {
      window.location.href = '/'
    }
  }

  return (
    <>
      <Helmet>
        <title>ITStreet</title>
      </Helmet>
      <section className={style.container}>
        <LogInPopUp></LogInPopUp>
      </section>
    </>
  )
}

export default Login
