import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import { CompactTable } from '@table-library/react-table-library/compact'
import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'
import { useSort } from '@table-library/react-table-library/sort'
import { usePagination } from '@table-library/react-table-library/pagination'
import { Link } from 'react-router-dom'
import LogoImg from '../../../assets/imgs/Logo.jpg'
import CategoryPopUpsAdd from '../CategoryPopUps'
import { Az_flag, Eng_flag, Ru_flag } from '../../../assets/icons'
import { useSelector } from "react-redux";

const actions = {
  url: '',
  method: '',
}
function AdminTableCategories() {
  const url = useSelector(state => state.store.url);
  const [catalogue, setCatalogue] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [catalogueId, setCatalogueId] = useState(null)
  const [parentId, setParentId] = useState(null)
  const [search, setSearch] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [action, setAction] = useState(actions)
  const [language, setLanguage] = useState([])
  const [form, setForm] = useState()

  const getcat =()=>{
    fetch(`${url}Catalogs`)
    .then((res) => res.json())
    .then((data) => {
     console.log("sss")
      setCatalogue((prev) => {
        return data.map((x) => {
          if (x.parentId === null) {
            return { ...x }; // Assuming you want to create a new object with the same properties
          }
        });
      });
      setSubcategories((prev) => {
        return data.map((x) => {
          if (x.parentId !== null) {
            return { ...x }; // Assuming you want to create a new object with the same properties
          }
        });
      });
      const mainCategories = data.filter(item => item.parentId === null);
      const subCategories = data.reduce((acc, item) => {
        if (item.parentId !== null) {
          if (!acc[item.parentId]) {
            acc[item.parentId] = [];
          }
          acc[item.parentId].push(item);
        }
        return acc;
      }, {});
      setParentId(null)
      setCatalogue(mainCategories);
      setSubcategories(subCategories);
      
    })
  }
 
  useEffect(() => {
    getcat();
    console.log("catrender2");
    fetch(`${url}Languages`)
      .then((res) => res.json())
      .then((data) => {
        setLanguage(data)
      })
  }, [])
  const handleSearch = (event) => {
    setSearch(event.target.value)
    
  }
  const fetchData = (id,parent_id) => {
    console.log(id);
    fetch(`${url}Catalogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("cta",data)
        setModalVisible(!modalVisible)
        const act = {
          url: urladd+'/'+id,
          method: 'PUT',
        }
        setAction(act)
        console.log('parentid1',parent_id)
        const FormData = {
          id: id,
          parentId: parent_id,
          catalogLanguages: language?.map((language, index) => ({
             id:data.catalogLanguages[index]?.id,
            languageId: language.id,
            catalogId:id,
            name: data.catalogLanguages[index]?.name || '',
          })),
        }
        setForm(FormData)
      })
      .catch((error) => {})
  }
  const addcategory = () => {
     console.log(form);
     const act = {
       url: url+"Catalogs",
       method: 'POST',
      }
      setForm()
      setAction(act)
      const FormData = {
         parentId:null,
         catalogLanguages: language?.map((language, index) => ({
          languageId: language.id,
          name: '',
        })),
      }
      setForm(FormData)
      setModalVisible(!modalVisible)
  }
  const handleButtonClick = (id= null, parent_id = null) => {
  if(id !== null){
    console.log('catid',id)
    console.log('parid',parent_id)
    setParentId(parent_id)
    fetchData(id , parent_id)
  }else{
    addcategory();
  }
  }
  const handleCheckSearch = (name) => {
    if(search !==null){

      const search_ = search.toLowerCase()
      let name_ = name?.toLowerCase()
      return name_ && search_ && name_.includes(search_)
    }else{
      addcategory();
    }
  }
  const handleCheckSub = (id) => {
    const search_ = search.toLowerCase()
    let arr_ = subcategories[id]?.filter((item) => {
      return (
        search_ &&
        (item.catalogLanguages[0]?.name.toLowerCase().includes(search_) ||
          item.catalogLanguages[1]?.name.toLowerCase().includes(search_) ||
          item.catalogLanguages[2]?.name.toLowerCase().includes(search_))
      )
    })
    const result = arr_?.length == 0 || arr_ == undefined ? false : arr_
    return result
  }
  const handleDelete=(id)=>{
    fetch(`${url}Catalogs/${id}`, {
      method: 'DELETE',
      headers: {
          'accept' : '*/*',
         'Authorization': 'Bearer YOUR_TOKEN_HERE',
          // 'Content-Type': 'application/json', 
          
        },
    }).then((res) => {
      if(res.status === 200){
        getcat();
      }
      console.log(res.status);
    });
  }





  return catalogue && subcategories ? (
    <div>
      <br />
      <br />
      <button
        className={style.admin_table_bnt}
        onClick={() => handleButtonClick()}
      >
        Add Category
      </button>
      <br />
      <CategoryPopUpsAdd
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setCatalogue={setCatalogue}
        setSubcategories={setSubcategories}
        catalogue={catalogue}
        subcategories={subcategories}
        parentId={parentId}
        setParentId={setParentId}
        action={action}
        form={form}
        setForm={setForm}
        getcat={getcat}
      />
      <label className={style.admin_table_search} htmlFor="search23">
        <input id="search23" type="text" value={search} onChange={handleSearch} />
        <i className="fa-solid fa-magnifying-glass"></i>
      </label>
      <br />
      <br />
      <div className={style.admin_table}>
        <ul>
          <li>{Az_flag}</li>
          <li>{Eng_flag}</li>
          <li>{Ru_flag}</li>
          <li>
            <i className="fa-solid fa-gear"></i>
          </li>
        </ul>
        <div className={style.body}>
          {catalogue && catalogue.map((item, i) => {
            return (
              (!search ||
                handleCheckSearch(item.catalogLanguages[0]?.name) ||
                handleCheckSearch(item.catalogLanguages[0]?.name) ||
                handleCheckSearch(item.catalogLanguages[0]?.name) ||
                handleCheckSub(item.id)) && (
                <div key={item.id}>
                  <p>
                    <span
                      style={
                        handleCheckSearch(item.catalogLanguages[0]?.name)
                          ? {
                              color: '#5757eb',
                            }
                          : {}
                      }
                    >
                      {item.catalogLanguages[0]?.name}
                    </span>
                    <span
                      style={
                        handleCheckSearch(item.catalogLanguages[1]?.name)
                          ? {
                              color: '#5757eb',
                            }
                          : {}
                      }
                    >
                      {item.catalogLanguages[1]?.name}
                    </span>
                    <span
                      style={
                        handleCheckSearch(item.catalogLanguages[2]?.name)
                          ? {
                              color: '#5757eb',
                            }
                          : {}
                      }
                    >
                      {item.catalogLanguages[2]?.name}
                    </span>
                    <span>
                      <i
                        onClick={() => handleButtonClick(item.id)}
                        className="fa-solid fa-pen-to-square"
                      />
                      <i
                        onClick={() =>
                          catalogueId === item.id
                            ? setCatalogueId(null)
                            : setCatalogueId(item.id)
                        }
                        style={
                          subcategories[item.id]?.length > 0
                            ? { opacity: 1 }
                            : { opacity: 0.3, cursor: 'not-allowed' }
                        }
                        className="fa-solid fa-caret-down"
                      />
                       <button style={{ padding: "10px", borderRadius: "5px",marginLeft:"5px",backgroundColor:"darkred" }} onClick={() => handleDelete(item.id)}>
                          Delete
                           </button> 
                    </span>
                  </p>
                  {(catalogueId === item.id || handleCheckSub(item.id)) && (
                    <ul>
                      {handleCheckSub(item.id)
                        ? handleCheckSub(item.id)?.map((subitem, i) => {
                            return (
                              <li>
                                <span
                                  style={
                                    handleCheckSearch(
                                      subitem.catalogLanguages[0]?.name,
                                    )
                                      ? {
                                          color: '#5757eb',
                                        }
                                      : {}
                                  }
                                >
                                  {subitem.catalogLanguages[0]?.name}
                                </span>
                                <span
                                  style={
                                    handleCheckSearch(
                                      subitem.catalogLanguages[1]?.name,
                                    )
                                      ? {
                                          color: '#5757eb',
                                        }
                                      : {}
                                  }
                                >
                                  {subitem.catalogLanguages[1]?.name}
                                </span>
                                <span
                                  style={
                                    handleCheckSearch(
                                      subitem.catalogLanguages[2]?.name,
                                    )
                                      ? {
                                          color: '#5757eb',
                                        }
                                      : {}
                                  }
                                >
                                  {subitem.catalogLanguages[2]?.name}
                                </span>
                                <span>
                                  <i
                                    onClick={() =>
                                      handleButtonClick(
                                        subitem.id,
                                        item.id,
                                      )
                                    }
                                    className="fa-solid fa-pen-to-square"
                                  />
                                </span>
                              </li>
                            )
                          })
                        : subcategories[item.id]?.map((subitem, i) => {
                            return (
                              <li>
                                <span
                                  style={
                                    handleCheckSearch(
                                      subitem.catalogLanguages[0]?.name,
                                    )
                                      ? {
                                          color: '#5757eb',
                                        }
                                      : {}
                                  }
                                >
                                  {subitem.catalogLanguages[0]?.name}
                                </span>
                                <span
                                  style={
                                    handleCheckSearch(
                                      subitem.catalogLanguages[1]?.name,
                                    )
                                      ? {
                                          color: '#5757eb',
                                        }
                                      : {}
                                  }
                                >
                                  {subitem.catalogLanguages[1]?.name}
                                </span>
                                <span
                                  style={
                                    handleCheckSearch(
                                      subitem.catalogLanguages[2]?.name,
                                    )
                                      ? {
                                          color: '#5757eb',
                                        }
                                      : {}
                                  }
                                >
                                  {subitem.catalogLanguages[2]?.name}
                                </span>
                                <span>
                                  <i
                                    onClick={() =>
                                      handleButtonClick(
                                        subitem.id,
                                        subitem.parentId,
                                      )
                                    }
                                    className="fa-solid fa-pen-to-square"
                                  />
                                  <button style={{ padding: "10px", borderRadius: "5px",marginLeft:"5px",backgroundColor:"darkred" }} onClick={() => handleDelete(subitem.id)}>
                                   Delete
                                   </button> 
                                </span>
                              </li>
                            )
                          })}
                    </ul>
                  )}
                </div>
              )
            )
          })}
        </div>
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  )
}

export default AdminTableCategories
