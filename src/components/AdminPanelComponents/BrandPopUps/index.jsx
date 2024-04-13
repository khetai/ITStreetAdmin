import React, { useState,useEffect } from "react";
import style from "./index.module.scss";
import { getCookie } from "../../../helpers/cookie";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";
function SliderPopUps({modalVisible, setModalVisible,form, onFormChange,setForm,setApiData ,initialFormData,action,language}) {
  const url = useSelector(state => state.store.url);
  const token = getCookie("token");
  const [active,setActive]=useState(true)

  const submitForm =(e)=>{
   e.preventDefault();
   setActive(false);
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
          'Authorization': `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data', 
           
         },
         body: formData,
       })
         .then((res) => {
          setActive(true);
          if(res.status === 201 || res.status===200){
            fetch(`${url}Brand`)
            .then((res) => res.json())
            .then((data) => {
              setModalVisible(!modalVisible);
              setForm(initialFormData);
              setApiData(data);
              console.log(data);
            })
            .catch((err) => console.log(err));
          }
         })
    .catch((error) => console.log(error.json()));
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
            {key === "iconUrl" ? (
                  <input type="file" id={key} name={key} onChange={onFormChange} />
                ):(
                  // Render a text input for other keys
                  <input type="text" id={key} name={key} value={form[key]} onChange={onFormChange} />
                )}
          </div>
        ))}
        <button className={style.formBtn}> 
        {!active ? (
                              <ClipLoader
                                color="#36d7b7"
                                cssOverride={{}}
                                loading={!active}
                                size={18}
                                speedMultiplier={1}
                              />
                            ) : (
                              'Confrim'
                            )}</button>
      </form>
    </div>
   </div>
  );
}

export default SliderPopUps;
