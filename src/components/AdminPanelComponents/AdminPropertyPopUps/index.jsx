import React, { useState, useEffect } from 'react'
import style from './index.module.scss'
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";
function PropertyPopUps({
  modalVisible,
  setModalVisible,
  language,
  setKeywords,
}) {
  const url = useSelector(state => state.store.url);
  const [activeLang, setActiveLang] = useState(1)
  const [form, setForm] = useState()
  const [activ, setActiv] = useState(true);
  useEffect(() => {
    const FormData = {
      languageAndValues: language?.map((language, index) => ({
        languageId: language.id,
        name: '',
      })),
    }
    setForm(FormData, 'popup')
  }, [language])
  const submitForm = (e) => {
    e.preventDefault()
    setActiv(false);
    console.log(form)
    fetch(`${url}PropertyKeywords`, {
      method: 'POST',
      headers: {
        accept: '*/*',
        Authorization: 'Bearer YOUR_TOKEN_HERE',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((res) => {
        console.log(res)
        if (res.status === 201) {
          setActiv(true);
          fetch(`${url}PropertyKeywords`)
            .then((res) => res.json())
            .then((data) => {
              setModalVisible(!modalVisible)
              //  setForm(initialFormData);
              setKeywords(data)
            })
            .catch((err) => console.log(err))
        }else{
          setActiv(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setActiv(true);
      })
    // console.log();
  }

  const handleFormChange = (e, languageIndex) => {
    const { name, value } = e.target
    setForm((prevFormData) => {
      const updatedLanguages = [...prevFormData.languageAndValues]
      updatedLanguages[languageIndex] = {
        ...updatedLanguages[languageIndex],
        [name]: value,
      }

      return {
        ...prevFormData,
        languageAndValues: updatedLanguages,
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
                          color: activeLang == x.id ? '#fff' : '',
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
                {form?.languageAndValues?.map((language, index) => (
                  <div
                    key={index}
                    id={language.languageId}
                    style={{
                      display:
                        activeLang == language.languageId ? 'flex' : 'none',
                    }}
                  >
                    <label htmlFor={`languages[${index}].name`}>Name:</label>
                    <input
                      type="text"
                      id={`languages[${index}].name`}
                      name="name"
                      required
                      value={language.name}
                      onChange={(e) => handleFormChange(e, index)}
                      // disabled={language.languageId === 1}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button className={style.formBtn} disabled={!activ}>
              {!activ ? (
                <ClipLoader
                  color="#36d7b7"
                  cssOverride={{}}
                  loading={!activ}
                  size={18}
                  speedMultiplier={1}
                />
              ) : (
                "Confrim"
              )}
            </button>
        </form>
      </div>
    </div>
  )
}

export default PropertyPopUps
