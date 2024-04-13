import React, { useState, useEffect } from 'react'
import style from './index.module.scss'
import { useSelector } from "react-redux";
function PropertyUpdatePopUps({
  modalVisible,
  setModalVisible,
  form,
  language,
  setApiData,
  action,
  setForm,
}) {
  const url = useSelector(state => state.store.url);
  const [activeLang, setActiveLang] = useState(1)

  const submitForm = (e) => {
    e.preventDefault()
    console.log(action)
    console.log(form)

    fetch(action.url, {
      method: action.method,
      headers: {
        accept: '*/*',
        Authorization: 'Bearer YOUR_TOKEN_HERE',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          fetch(`${url}PropertyKeywords`)
            .then((res) => res.json())
            .then((data) => {
              setModalVisible(!modalVisible)
              //  setForm(initialFormData);
              setApiData(data)
            })
            .catch((err) => console.log(err))
        }
      })
      .catch((error) => console.log(error))
  }

  const handleFormChange = (e, languageIndex) => {
    const { name, value } = e.target
    setForm((prevFormData) => {
      const updatedLanguages = [...prevFormData.languages]
      updatedLanguages[languageIndex] = {
        ...updatedLanguages[languageIndex],
        [name]: value,
      }

      return {
        ...prevFormData,
        languages: updatedLanguages,
      }
    })
  }

  const handleLang = (id) => {
    console.log(id)
    setActiveLang(id)
  }

  return (
    <div
      className={style.wrapper}
      style={!modalVisible ? { display: 'none' } : null}
    >
      <div className={style.popupBody}>
        <div
          className={style.cancelIcon}
          onClick={() => setModalVisible(!modalVisible)}
        >
          <i className="fa-regular fa-circle-xmark"></i>
        </div>
        <form onSubmit={submitForm}>
          <div className={style.frdiv}>
            <div className={style.lang}>
              <div className={style.langmenu}>
                <ul className={style.langmenuul}>
                  {language &&
                    language.map((x, index) => (
                      <li
                        className={style.langulli}
                        style={{
                          backgroundColor: activeLang == x.id ? '#5757eb' : '',
                        }}
                        onClick={() => handleLang(x.id)}
                        key={x.id}
                      >
                        {x.name}
                      </li>
                    ))}
                </ul>
              </div>
              <div className={style.langbody}>
                {form?.languages?.map((language, index) => (
                  <div
                    key={index}
                    id={language.languageId}
                    style={{
                      display:
                        activeLang == language.languageId ? 'flex' : 'none',
                    }}
                  >
                    <label htmlFor={`languages[${index}].value`}>Name:</label>
                    <input
                      type="text"
                      id={`languages[${index}].value`}
                      name="value"
                      value={language.value}
                      onChange={(e) => handleFormChange(e, index)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button className={style.formBtn}>Confrim</button>
        </form>
      </div>
    </div>
  )
}

export default PropertyUpdatePopUps
