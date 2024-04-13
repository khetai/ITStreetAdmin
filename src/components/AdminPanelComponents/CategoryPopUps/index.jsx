import React, { useState, useEffect } from 'react'
import style from './index.module.scss'
import { forwardRef } from 'react'
import { Az_flag, Eng_flag, Ru_flag } from '../../../assets/icons'

function CategoryPopUps({
  modalVisible,
  setModalVisible,
  setCatalogue,
  setSubcategories,
  parentId,
  setParentId,
  catalogue,
  subcategories,
  form,
  action,
  setForm,
  getcat,
}) {
  const flags = [Az_flag, Eng_flag, Ru_flag]
  const submitForm = (e) => {
   console.log(form)
    e.preventDefault()
    const formData = new FormData()
    for (const key in form) {
      formData.append(key, form[key])
    }
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
        if (res.status === 201) {
         
          getcat();
          // if (parentId) {
          //   const newSubCategories = subcategories[parentId].filter(
          //     (c) => c.id !== form.id,
          //   )
          //   console.log(catalogue);
          //   const newitem = subcategories[parentId].find((c) => c.id == form.id)
          //   newitem.catalogLanguages = form.catalogLanguages
          //   const rest = subcategories
          //   delete rest[parentId]
          //   setSubcategories({
          //     ...rest,
          //     [parentId]: [newitem, ...newSubCategories],
          //   })
          // } else {
          //   const newCatalogs = catalogue.filter((c) => c.id !== form.id)
          //   const newitem = catalogue.find((c) => c.id == res.id)
          //   newitem.catalogLanguages = form.catalogLanguages
          //   setCatalogue([newitem, ...newCatalogs])
          // }
          setParentId(null)
          setModalVisible(!modalVisible)
        }
      })
      .catch((error) => console.log(error))
  }
const handlecatChange =(e)=>{
  const { name, value } = e.target
  setForm((prevFormData) => {
    return {
      ...prevFormData,
      parentId : value,
    }

  })
}
  const handleFormChange = (e, languageIndex) => {
    const { name, value } = e.target
    setForm((prevFormData) => {
      const updatedLanguages = [...prevFormData.catalogLanguages]
      updatedLanguages[languageIndex] = {
        ...updatedLanguages[languageIndex],
        [name]: value,
      }

      return {
        ...prevFormData,
        catalogLanguages: updatedLanguages,
      }
    })
  }

  return (
    <div
      className={style.wrapper}
      style={!modalVisible ? { display: 'none' } : null}
    >
      <div className={style.popupBody}>
        <div
          className={style.cancelIcon}
          onClick={() =>{ setModalVisible(!modalVisible),setParentId(null)}}
        >
          <i className="fa-regular fa-circle-xmark"></i>
        </div>
        <form onSubmit={submitForm}>
        {catalogue?  <select name='parentId' onChange={(e) => handlecatChange(e)}>
                        <option value=""  selected={null === parentId}>Catalogsec</option>
                         {catalogue?.map((x)=>(

                          <option key={x.id} value={x.id} selected={x.id === parentId} >{x.catalogLanguages[0].name}</option>
                          )
                        )}
                      </select> : ""}
          {form?.catalogLanguages?.map((language, index) => (
            <div key={index} id={language.languageId}>
              <label htmlFor={`languages[${index}].name`}>
                {flags[language.languageId - 1]}

                <input
                  type="text"
                  id={`languages[${index}].name`}
                  name="name"
                  value={language.name}
                  onChange={(e) => handleFormChange(e, index)}
                 
                />
              </label>
            </div>
          ))}
          <button className={style.formBtn}>Confrim</button>
        </form>
      </div>
    </div>
  )
}

export default CategoryPopUps
