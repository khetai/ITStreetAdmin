import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import style from './index.module.scss'
import PropertyPopUps from '../AdminPropertyPopUps'
import { getCookie } from "../../../helpers/cookie";
import ClipLoader from "react-spinners/ClipLoader";
// import { getCookie } from "./";
import { useSelector } from "react-redux";
function AdminProductEditPage() {
  const url = useSelector(state => state.store.url);
  const token = getCookie("token");
  // const[form ,setForm] = useState(initialFormData);
  const [modalVisible, setModalVisible] = useState(false)
  const [properties, setProperties] = useState()
  const [details, setDetails] = useState()
  let { id } = useParams()
  const [loaded, setLoaded] = useState(false)
  const [datum, setDatum] = useState()
  const [activesect, setActivesect] = useState(1)
  const [activeLang, setActiveLang] = useState(1)
  const [language, setLanguage] = useState()
  const [keywords, setKeywords] = useState()
  const [selectedPhotos, setSelectedPhotos] = useState([])
  const [selecteMainPhotos, setSelecteMainPhotos] = useState()
  const [catalogue, setCatalogue] = useState([])
    const [selectedcatalogue, setselectedCatalogue] = useState()
    const [catalogId, setcatalogId] = useState()
    const [subcatalog, setSubcategories] = useState([])
    const [price, setPrice] = useState();
    const [DiscountPrice, setDiscountPrice] = useState();
    const [brands, setBrands] = useState([]);
    const [brandId, setBrandId] = useState();
    const [InStock, setInStock] = useState();
    const [activ, setActiv] = useState(true);
  const getProduct = () => {
    setSelectedPhotos([])
    fetch(`${url}Product/` + id)
      .then((x) => x.json())
      .then((x) => {
        console.log('data', x)
        setDatum(x)
        setcatalogId(x.catalogId)
        setBrandId(x.brandId);
        setInStock(x.isActive);
        setPrice(x.price);
        setDiscountPrice(x.discountPrice);

        fetch(`${url}Languages`)
          .then((res) => res.json())
          .then((data) => {
            setLanguage(data)
            console.log('language', data)
            setDetails(
              data?.map((language, index) => ({
                languageId: language.id,
                name: x.productLanguages[index]?.name || '',
                description: x.productLanguages[index]?.description || '',
              })),
            )
            setProperties(
              x.productProperties.map((e, index) => ({
                id: e.id,
                propertyKeywordId: e.propertyKeywordId,
                productPropertyLanguages: e.productPropertyLanguages,
              })),
            )
          }) .then(() => {
            fetch(`${url}PropertyKeywords`)
              .then((res) => res.json())
              .then((data) => {
                setKeywords(data)
              })
          }).then(()=>{
            fetch(`${url}Catalogs`)
            .then((res) => res.json())
            .then((data) => {
               // Processing the data
          const processedData = data.reduce(
            (acc, item) => {
              if (item.parentId === null) {
                // If parentId is null, it's a main category
                acc.mainCategories.push(item)
              } else {
                // If parentId is not null, it's a sub-category
                // Grouping sub-categories by parentId
                if (!acc.subCategories[item.parentId]) {
                  acc.subCategories[item.parentId] = []
                }
                acc.subCategories[item.parentId].push(item)
                if(item.id === x.catalogId){
                  setselectedCatalogue(item.parentId)
                }
              }
              return acc
            },
            { mainCategories: [], subCategories: {} },
          )
    
          // Update your state variables here
          setCatalogue(processedData.mainCategories)
          setSubcategories(processedData.subCategories)
    
            }).then(()=>{
              fetch(`${url}Brand`)
              .then((res) => res.json())
              .then((data) => {
                 setBrands(data);
              })
            })
          
          })
      })
     
  }

  useEffect(() => {
    console.log(id)
    // ProductsServices.getProductsById(id).then((x) => setDatum(x))
    getProduct()

    // setLoaded(true);
  }, [])

  const handleAddProperty = () => {
    console.log(properties)
    console.log(details)
    if (properties != null) {
      setProperties([
        ...properties,
        {
          propertyKeywordId: 0,
          productPropertyLanguages: language?.map((x, index) => ({
            languageId: x.id,
            name: '',
          })),
        },
      ])
    } else {
      setProperties([
        {
          propertyKeywordId: 0,
          productPropertyLanguages: language?.map((x, index) => ({
            languageId: x.id,
            name: '',
          })),
        },
      ])
    }
    console.log(properties)
  }
  const handleDeleteProperty = (index) => {
    const updatedProperties = [...properties]
    updatedProperties.splice(index, 1)
    setProperties(updatedProperties)
  }

  const handleKeywordChange = (index, event) => {
    const updatedProperties = [...properties]
    updatedProperties[index].propertyKeywordId = event.target.value
    setProperties(updatedProperties)
  }

  const handleNameChange = (index, langIndex, event) => {
    const updatedProperties = [...properties]
    updatedProperties[index].productPropertyLanguages[langIndex].value =
      event.target.value
    setProperties(updatedProperties)
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    setActiv(false);
    const FormData = {
      price: price,
      discountPrice:DiscountPrice,
      isActive:InStock,
      //
      catalogId: catalogId,
      brandId: brandId,
      productProperties: properties,
      productLanguages: details,
    }
    console.log(FormData);
    // Here, you can use a fetch or axios to make a POST request with the properties data
    fetch(`${url}Product/Update/${id}`, {
      method: 'PUT',
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(FormData),
    }).then((res) => {
      console.log(res)
      if (res.status === 200) {
        setActiv(true);
      }else{
        setActiv(true);
      }
    }).catch((err) => {
      setActiv(true);
      console.log(err)
    })
  }

  const handleDetailChange = (e, languageIndex) => {
    const { name, value } = e.target
    setDetails((prevDetails) => {
      const updatedDetails = [...prevDetails]
      updatedDetails[languageIndex] = {
        ...updatedDetails[languageIndex],
        [name]: value,
      }

      return updatedDetails
    })
  }
  const handlePhotoChange = (event) => {
    const files = event.target.files
    console.log(files );
    if (files.length > 0) {
      setSelectedPhotos([...selectedPhotos, ...files])
    }
  }
  const handleMainPhotoChange = (event) => {
    const file = event.target.files
    console.log(file[0]);
    setSelecteMainPhotos(file[0])
   
  }
  const handleRemovePhoto = (index) => {
    const newPhotos = [...selectedPhotos]
    newPhotos.splice(index, 1)
    setSelectedPhotos(newPhotos)
  }
  const handledeletePhoto = (e) => {
    console.log(e)
    fetch(`${url}Product/DeletePhoto/${e}`, {
      method: 'DELETE',
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          getProduct()
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handlePhotoSubmit = (e) => {
    setActiv(false);
    console.log(selecteMainPhotos);
    e.preventDefault()
    const files = new FormData()
    selectedPhotos.map((photo, index) => {
      files.append(`files`, photo)
    })
    files.append("file", selecteMainPhotos)
    console.log("files",selectedPhotos);
    console.log(files);
    fetch(`${url}Product/UpdateImages/${id}`, {
      method: 'POST',
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
      body: files,
    })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          getProduct()
          setActiv(true);
        }else{
          setActiv(true);
        }
      })
      .catch((err) => {
        setActiv(true);
        console.log(err)
      })
  }

  return (
    <div className={style.addproduc_main}>
      <PropertyPopUps
        modalVisible={modalVisible}
        setKeywords={setKeywords}
        setModalVisible={setModalVisible}
        language={language}
      />
      <div className={style.addproduc_head}>
        <img
          width={'120px'}
          src={datum?.imageUrl}
          alt="img"
          loading="lazy"
        />
        <article>
          <h3>
            {datum?.productLanguages ? datum?.productLanguages[0]?.name : ''}
          </h3>
          <p>{datum?.price}</p>
        </article>
      </div>
      <div className={style.addproduc_body}>
        <div className={style.addproduc_body_head}>
          <ul>
            <li
              className={activesect == 1 && style.activesect}
              onClick={() => setActivesect(1)}
            >
              Məhsulu əlavə et
            </li>
            <li
              className={activesect == 2 && style.activesect}
              onClick={() => setActivesect(2)}
            >
              Məhsulun şəkillərini əlavə et
            </li>
          </ul>
        </div>
        <div
          style={activesect === 1 ? { display: 'block' } : { display: 'none' }}
          className={style.addproduc_body_addproduct}
        >
          <form onSubmit={handleSubmit}>
          <div className={style.product_newdetails}>
                   <div  className={style.product_catalog}>
                     {catalogue ?  <select onChange={(e)=> setselectedCatalogue(e.target.value)}>
                        <option value="" disabled selected>Catalogsec</option>
                         {catalogue?.map((x)=>(

                          <option key={x.id} value={x.id} selected={selectedcatalogue == x.id}>{x.catalogLanguages[0].name}</option>
                          )
                        )}
                      </select> : ""}
            
                {subcatalog?  <select onChange={(e)=> setcatalogId(e.target.value)}>
                      <option value="" disabled selected>Catalogsec</option>
                      { subcatalog[selectedcatalogue]?.map((x)=>(
                        <option key={x.id} value={x.id} selected={catalogId == x.id}>{x.catalogLanguages[0].name}</option>
                        )
                      )}
                    </select> : ""}
               
                     {brands?  <select onChange={(e)=> setBrandId(e.target.value)}>
                        <option value="" disabled selected>Brand</option>
                         {brands?.map((x)=>(
                          <option key={x.id} selected={brandId == x.id} value={x.id} >{x.name}</option>
                          )
                        )}
                      </select> : ""}
                    </div>
                   <div className={style.newbody}>
                          <div >
                          <label htmlFor={`price`}>Price:
                             <input
                                 type="text"
                                 id="price"
                                 name="price"
                                 value={price}
                                 onChange={(e) => setPrice(e.target.value)}
                              /></label>
                          </div>
                          <div>
                          <label htmlFor={`DiscountPrice`}>DiscountPrice:
                             <input
                                 type="text"
                                 id="DiscountPrice"
                                 name="DiscountPrice"
                                 value={DiscountPrice}
                                 onChange={(e) => setDiscountPrice(e.target.value)}
                              /></label>
                          </div>
                          <div className={style.InStock}>
                          <label htmlFor={`InStock`}>InStock: </label>
                          <label htmlFor={`Yes`}>Yes: 
                             <input
                                 type="radio"
                                 id="Yes"
                                 name="InStock"
                                 value={InStock}
                                 checked={InStock}
                                 onChange={(e) => setInStock(true)}
                                 />
                                 </label>
                                 <label htmlFor={`No`}>No:
                               <input
                                 type="radio"
                                 id="No"
                                 name="InStock"
                                 value={InStock}
                                 checked={!InStock}
                                 onChange={(e) => setInStock(false)}
                                 />
                                 </label>
                             
                          </div>
                   </div>
                </div>
            <div className={style.product_name}>
              <h3>Product adi</h3>
              <div className={style.langmenu}>
                <ul className={style.langmenuul}>
                  {language &&
                    language.map((x, index) => (
                      <li
                        className={`${style.langulli} ${
                          activeLang == x.id && style.langActive
                        }`}
                        onClick={() => setActiveLang(x.id)}
                        key={x.id}
                      >
                        {x.name}
                      </li>
                    ))}
                </ul>
              </div>
              <div className={style.langbody}>
                {details?.map((language, index) => (
                  <div
                    key={index}
                    id={language.languageId}
                    style={{
                      display:
                        activeLang == language.languageId ? 'flex' : 'none',
                    }}
                  >
                    <label htmlFor={`details[${index}].name`}>
                      Name
                      <input
                        type="text"
                        id={`details[${index}].name`}
                        name="name"
                        value={details[index].name}
                        onChange={(e) => handleDetailChange(e, index)}
                        //    disabled={language.languageId === 1}
                      />
                    </label>
                    <label htmlFor={`details[${index}].description`}>
                      Description
                      <input
                        type="text"
                        id={`details[${index}].description`}
                        name="description"
                        value={details[index].description}
                        onChange={(e) => handleDetailChange(e, index)}
                        //    disabled={language.languageId === 1}
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className={style.product_property}>
              <div className={style.product_title}>
                <h3>Product Xususiyyetler</h3>
                <button
                  className={style.product_keywords}
                  onClick={() => setModalVisible(!modalVisible)}
                >
                  Add Property
                </button>
              </div>
              <div className={style.product_properties}>
                {properties?.map((property, index) => (
                  <div key={index} className={style.product_properties_item}>
                    <select
                      value={property.propertyKeywordId}
                      onChange={(e) => handleKeywordChange(index, e)}
                    >
                      <option value="">Select</option>
                      {keywords?.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.languages[0].value}
                        </option>
                      ))}
                    </select>

                    {property?.productPropertyLanguages?.map(
                      (lang, langIndex) => (
                        <div
                          key={langIndex}
                          style={{
                            display:
                              activeLang == lang.languageId ? 'block' : 'none',
                            width: '100%',
                          }}
                        >
                          <label
                            htmlFor={`details[${index}].name[${langIndex}]`}
                          >
                            Name:
                            <span>
                              {
                                language.filter(
                                  (x) => x.id == lang.languageId,
                                )[0].name
                              }
                            </span>
                            <input
                              type="text"
                              id={`details[${index}].name[${langIndex}]`}
                              name={`details[${index}].name[${langIndex}]`}
                              value={lang.value}
                              style={{ width: '85%' }}
                              onChange={(e) =>
                                handleNameChange(index, langIndex, e)
                              }
                            />
                          </label>
                        </div>
                      ),
                    )}

                    <button
                      type="button"
                      className={style.product_properties_minus}
                      onClick={() => handleDeleteProperty(index)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                ))}
                <button
                  className={style.product_properties_button}
                  type="button"
                  onClick={handleAddProperty}
                >
                  +
                </button>
              </div>
            </div>
            <button className={style.product_properties_submit} disabled={!activ}>  {!activ ? (
                <ClipLoader
                  color="#36d7b7"
                  cssOverride={{}}
                  loading={!activ}
                  size={18}
                  speedMultiplier={1}
                />
              ) : (
                "Submit"
              )}</button>
          </form>
        </div>
        <div
          style={activesect === 2 ? { display: 'block' } : { display: 'none' }}
          className={style.addproduc_body_addphoto}
        >
          <form onSubmit={handlePhotoSubmit}>
            <div>
            <label htmlFor='mainphoto'>
              <input
                onChange={handleMainPhotoChange}
                id='mainphoto'
                name="file"
                style={{ display:"none" }}
                type="file"
                placeholder="add Main Photo"
              />
                <img style={{width:"100px", height:"100px", cursor:"pointer"}} src={selecteMainPhotos ? URL.createObjectURL(selecteMainPhotos):datum?.imageUrl} alt="Change photo" />
              </label>
              <p>Main photo</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
             
          
              <input
                onChange={handlePhotoChange}
                multiple
                name="files"
                style={{ width: '100%', padding: '10px' }}
                type="file"
                placeholder="addPhoto"
              />
               <button style={{ padding: '5px 10px',borderRadius:"10px" }} disabled={!activ}>
              {!activ ? (
                <ClipLoader
                  color="#36d7b7"
                  cssOverride={{}}
                  loading={!activ}
                  size={18}
                  speedMultiplier={1}
                />
              ) : (
                "Submit"
              )}
            </button>
              {/* <button style={{ padding: '5px 10px' }}>Submit</button> */}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}
            >
              {selectedPhotos.map((photo, index) => (
                <div
                  key={index}
                  style={{
                    width: '15%',
                    height: '150px',
                    margin: '0 10px 10px 0',
                    position: 'relative',
                  }}
                >
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Selected ${index + 1}`}
                    style={{ width: '100%', height: '100%', marginTop: '10px' }}
                  />
                  <span
                    onClick={() => handleRemovePhoto(index)}
                    style={{
                      cursor: 'pointer',
                      color: 'red',
                      backgroundColor: 'white',
                      borderRadius: '100%',
                      padding: '0 5px',
                      position: 'absolute',
                      right: '0px',
                      top: '0px',
                    }}
                  >
                    &#x2715; {/* Delete icon (multiplication symbol) */}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
              }}
            >{datum?.productImages ? <h3>Hal hazirdaki sekiller</h3>:""}
              
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}
              >
                {datum?.productImages?.map((photo, index) => (
                  <div
                    key={index}
                    style={{
                      width: '15%',
                      height: '150px',
                      margin: '0 10px 10px 0',
                      position: 'relative',
                    }}
                  >
                    <img
                      src={`${photo.imageUrl}`}
                      alt={`Selected ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        marginTop: '10px',
                      }}
                    />
                    <span
                      onClick={() => handledeletePhoto(photo.imageId)}
                      style={{
                        cursor: 'pointer',
                        color: 'red',
                        backgroundColor: 'white',
                        borderRadius: '100%',
                        padding: '0 5px',
                        position: 'absolute',
                        right: '0px',
                        top: '0px',
                      }}
                    >
                      &#x2715; {/* Delete icon (multiplication symbol) */}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminProductEditPage
