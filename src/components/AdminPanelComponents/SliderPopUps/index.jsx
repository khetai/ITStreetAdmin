import React, { useState,useEffect } from "react";
import style from "./index.module.scss";
import { useSelector } from "react-redux";
function SliderPopUps({modalVisible, setModalVisible,form, onFormChange,setForm,setApiData ,initialFormData,action,language}) {
  const url = useSelector(state => state.store.url);
  const submitForm =(e)=>{
   e.preventDefault();
   console.log(action);
   console.log(form);
   
   
   const formData = new FormData();
   for (const key in form) {
     formData.append(key, form[key]);
    }
      fetch(action.url, {
         method: action.method,
         headers: {
           'accept' : '*/*',
          'Authorization': 'Bearer YOUR_TOKEN_HERE',
          //  'Content-Type': 'multipart/form-data', 
           
         },
         body: formData,
       })
         .then((res) => {
          if(res.status === 201 || res.status===200){
            fetch(`${url}Sliders`)
            .then((res) => res.json())
            .then((data) => {
              setModalVisible(!modalVisible);
              setForm(initialFormData);
              setApiData(data);
            })
            .catch((err) => console.log(err));
          }
         })
    .catch((error) => console.log(error));
  }
  return (
   <div className={style.wrapper}  style={!modalVisible ? {display:"none"}:null}>
     <div className={style.popupBody}>
      <div className={style.cancelIcon} onClick={()=>setModalVisible(!modalVisible)} >
        <i className="fa-regular fa-circle-xmark "></i>
        
      </div>
      <form  onSubmit={submitForm}>
      {Object.keys(form).map((key) => (
        <div className="fr-div" key={key}>
            <label htmlFor={key}>{key}:</label>
            {key === "Background" ? (
                  <input type="file" id={key} name={key} onChange={onFormChange} />
                ) : key === "LanguageId" ? (
                  // Render a select element for "languageId"
                  <select id={key} name={key} value={form[key]} onChange={onFormChange}>
                    <option value={0}>Sec</option>
                  {language && language.map((e) => (
                    <option key={e.id} value={e.id} selected={e.id === form[key]}>
                      {e.name}
                    </option>
                  ))}
                </select>
                
                ) : (
                  // Render a text input for other keys
                  <input type="text" id={key} name={key} value={form[key]} onChange={onFormChange} />
                )}
          </div>
        ))}
        {/* <label htmlFor="name">Name:</label>
        <input type="text"  placeholder="Hp Victus ..."/>
        <label htmlFor="UnitPrice">Unit Price:</label>
        <input type="text" placeholder="100..." />
        <label htmlFor="name" >Img Url:</label>
        <input type="text"placeholder="https://elements-cover-images-0.imgix.net/..." /> */}
        <button className={style.formBtn}>Confrim</button>
      </form>
    </div>
   </div>
  );
}

export default SliderPopUps;
