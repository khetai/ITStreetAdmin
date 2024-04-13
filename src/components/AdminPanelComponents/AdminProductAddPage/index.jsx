import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "./index.module.scss";
import PropertyPopUps from "../AdminPropertyPopUps";
import { getCookie } from "../../../helpers/cookie";
import ClipLoader from "react-spinners/ClipLoader";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAxiosPrivate2 from "./../../../ServicesRequest/useAxiosPrivate2";
function AdminProductAddPage() {
  const { sendRequest } = useAxiosPrivate2();
  const url = useSelector(state => state.store.url);
  const navigate = useNavigate();
  const from = "/adminpanel/products";
  const location = useLocation();
  const token = getCookie("token");
  // const[form ,setForm] = useState(initialFormData);
  const [modalVisible, setModalVisible] = useState(false);
  const [properties, setProperties] = useState();
  const [details, setDetails] = useState();
  let { id } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [activeLang, setActiveLang] = useState(1);
  const [language, setLanguage] = useState();
  const [keywords, setKeywords] = useState();
  const [catalogue, setCatalogue] = useState([]);
  const [selectedcatalogue, setselectedCatalogue] = useState();
  const [catalogId, setcatalogId] = useState();
  const [subcatalog, setSubcategories] = useState([]);
  const [price, setPrice] = useState();
  const [DiscountPrice, setDiscountPrice] = useState();
  const [brands, setBrands] = useState([]);
  const [brandId, setBrandId] = useState();
  const [InStock, setInStock] = useState(false);
  const getProduct = async () => {
    var res = await sendRequest("GET", "/Product/Getsetttings", null, null);
    console.log("res", res);
    if (res.status === 200) {
      setLanguage(res.data.language);
      setDetails(
        res.data.language?.map((language, index) => ({
          languageId: language.id,
          name: "",
          description: "",
        }))
      );
      setKeywords(res.data.property);
      const processedData = res.data.catalogs.reduce(
        (acc, item) => {
          if (item.parentId === null) {
            // If parentId is null, it's a main category
            acc.mainCategories.push(item);
          } else {
            // If parentId is not null, it's a sub-category
            // Grouping sub-categories by parentId
            if (!acc.subCategories[item.parentId]) {
              acc.subCategories[item.parentId] = [];
            }
            acc.subCategories[item.parentId].push(item);
          }
          return acc;
        },
        { mainCategories: [], subCategories: {} }
      );

      // Update your state variables here
      setCatalogue(processedData.mainCategories);
      setSubcategories(processedData.subCategories);
      setBrands(res.data.brand);
    }
    // fetch(`${url}Languages`)
    //   .then(res => res.json())
    //   .then(data => {
    //     setLanguage(data);
    //     setDetails(
    //       data?.map((language, index) => ({
    //         languageId: language.id,
    //         name: "",
    //         description: "",
    //       }))
    //     );
    //   })
    //   .then(() => {
    //     fetch(`${url}PropertyKeywords`)
    //       .then(res => res.json())
    //       .then(data => {
    //         setKeywords(data);
    //       });
    //   })
    //   .then(() => {
    //     fetch(`${url}Catalogs`)
    //       .then(res => res.json())
    //       .then(data => {
    //         // Processing the data
    //         console.log(data);
    //         const processedData = data.reduce(
    //           (acc, item) => {
    //             if (item.parentId === null) {
    //               // If parentId is null, it's a main category
    //               acc.mainCategories.push(item);
    //             } else {
    //               // If parentId is not null, it's a sub-category
    //               // Grouping sub-categories by parentId
    //               if (!acc.subCategories[item.parentId]) {
    //                 acc.subCategories[item.parentId] = [];
    //               }
    //               acc.subCategories[item.parentId].push(item);
    //             }
    //             return acc;
    //           },
    //           { mainCategories: [], subCategories: {} }
    //         );

    //         // Update your state variables here
    //         setCatalogue(processedData.mainCategories);
    //         setSubcategories(processedData.subCategories);
    //       })
    //       .then(() => {
    //         fetch(`${url}Brand`)
    //           .then(res => res.json())
    //           .then(data => {
    //             setBrands(data);
    //           });
    //       });
    //   });
  };
  useEffect(() => {
    console.log(id);
    // ProductsServices.getProductsById(id).then((x) => setDatum(x))
    getProduct();
    console.log(catalogue);
    console.log(subcatalog);
    // setLoaded(true);
  }, []);

  const handleAddProperty = () => {
    console.log(properties);
    console.log(details);
    if (properties != null) {
      setProperties([
        ...properties,
        {
          propertyKeywordId: 0,
          productPropertyLanguages: language?.map((x, index) => ({
            languageId: x.id,
            name: "",
          })),
        },
      ]);
    } else {
      setProperties([
        {
          propertyKeywordId: 0,
          productPropertyLanguages: language?.map((x, index) => ({
            languageId: x.id,
            name: "",
          })),
        },
      ]);
    }
    console.log(properties);
  };
  const handleDeleteProperty = index => {
    const updatedProperties = [...properties];
    updatedProperties.splice(index, 1);
    setProperties(updatedProperties);
  };

  const handleKeywordChange = (index, event) => {
    const updatedProperties = [...properties];
    updatedProperties[index].propertyKeywordId = event.target.value;
    setProperties(updatedProperties);
  };

  const handleNameChange = (index, langIndex, event) => {
    const updatedProperties = [...properties];
    updatedProperties[index].productPropertyLanguages[langIndex].name =
      event.target.value;
    setProperties(updatedProperties);
  };
  const handleSubmit = async event => {
    setLoaded(true);
    event.preventDefault();
    const FormData = {
      catalogId: catalogId,
      brandId: brandId,
      price: price,
      discountPrice: DiscountPrice,
      isActive: InStock,
      properties: properties,
      details: details,
    };
    console.log(FormData);
    // Here, you can use a fetch or axios to make a POST request with the properties data
    fetch(`${url}Product`, {
      method: "POST",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(FormData),
    })
      .then(data => {
        if (data.status === 201) {
          setLoaded(false);
          navigate(from, { replace: true });
        } else {
          setLoaded(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleDetailChange = (e, languageIndex) => {
    const { name, value } = e.target;
    setDetails(prevDetails => {
      const updatedDetails = [...prevDetails];
      updatedDetails[languageIndex] = {
        ...updatedDetails[languageIndex],
        [name]: value,
      };

      return updatedDetails;
    });
  };

  return (
    <div className={style.addproduc_main}>
      <PropertyPopUps
        modalVisible={modalVisible}
        setKeywords={setKeywords}
        setModalVisible={setModalVisible}
        language={language}
      />
      <div className={style.addproduc_body}>
        <div className={style.addproduc_body_head}>
          <ul>
            <li className={style.activesect}>Məhsulu əlavə et</li>
          </ul>
        </div>
        <div
          style={{ display: "block" }}
          className={style.addproduc_body_addproduct}
        >
          <form onSubmit={handleSubmit}>
            <div className={style.product_newdetails}>
              <div className={style.product_catalog}>
                {catalogue ? (
                  <select onChange={e => setselectedCatalogue(e.target.value)}>
                    <option value="" disabled selected>
                      Catalogsec
                    </option>
                    {catalogue?.map(x => (
                      <option key={x.id} value={x.id}>
                        {x.catalogLanguages[0].name}
                      </option>
                    ))}
                  </select>
                ) : (
                  ""
                )}

                {subcatalog ? (
                  <select onChange={e => setcatalogId(e.target.value)}>
                    <option value="" disabled selected>
                      Catalogsec
                    </option>
                    {subcatalog[selectedcatalogue]?.map(x => (
                      <option key={x.id} value={x.id}>
                        {x.catalogLanguages[0].name}
                      </option>
                    ))}
                  </select>
                ) : (
                  ""
                )}

                {brands ? (
                  <select onChange={e => setBrandId(e.target.value)}>
                    <option value="" disabled selected>
                      Brand
                    </option>
                    {brands?.map(x => (
                      <option key={x.id} value={x.id}>
                        {x.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  ""
                )}
              </div>
              <div className={style.newbody}>
                <div>
                  <label htmlFor={`price`}>
                    Price:
                    <input
                      type="text"
                      id="price"
                      name="price"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor={`DiscountPrice`}>
                    DiscountPrice:
                    <input
                      type="text"
                      id="DiscountPrice"
                      name="DiscountPrice"
                      value={DiscountPrice}
                      onChange={e => setDiscountPrice(e.target.value)}
                    />
                  </label>
                </div>
                <div className={style.InStock}>
                  <label htmlFor={`InStock`}>InStock: </label>
                  <label htmlFor={`Yes`}>
                    Yes:
                    <input
                      type="radio"
                      id="Yes"
                      name="InStock"
                      value={InStock}
                      onChange={e => setInStock(true)}
                    />
                  </label>
                  <label htmlFor={`No`}>
                    No:
                    <input
                      type="radio"
                      id="No"
                      name="InStock"
                      value={InStock}
                      onChange={e => setInStock(false)}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className={style.product_name}>
              <h3>Product adı</h3>
              <div className={style.langmenu}>
                <ul className={style.langmenuul}>
                  <li style={{ marginRight: "10px" }}>Diller:</li>
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
                        activeLang == language.languageId ? "block" : "none",
                    }}
                  >
                    <div>
                      <label htmlFor={`details[${index}].name`}>
                        Name:
                        <input
                          type="text"
                          id={`details[${index}].name`}
                          name="name"
                          value={details[index].name}
                          onChange={e => handleDetailChange(e, index)}
                        />
                      </label>
                    </div>
                    <div>
                      <label htmlFor={`details[${index}].description`}>
                        Description:
                        <input
                          type="text"
                          id={`details[${index}].description`}
                          name="description"
                          value={details[index].description}
                          onChange={e => handleDetailChange(e, index)}
                          //    disabled={language.languageId === 1}
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={style.product_property}>
              <div className={style.product_title}>
                <h3>Product Xususiyyetler</h3>
                <span
                  className={style.product_keywords}
                  onClick={() => setModalVisible(!modalVisible)}
                >
                  Add Property
                </span>
              </div>
              <div className={style.product_properties}>
                {properties?.map((property, index) => (
                  <div key={index} className={style.product_properties_item}>
                    <select
                      value={property.propertyKeywordId}
                      onChange={e => handleKeywordChange(index, e)}
                    >
                      <option value="">Select</option>
                      {keywords?.map(e => (
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
                              activeLang == lang.languageId ? "block" : "none",
                            width: "100%",
                          }}
                        >
                          <label
                            htmlFor={`details[${index}].name[${langIndex}]`}
                          >
                            Name:
                            <span>
                              {
                                language.filter(x => x.id == lang.languageId)[0]
                                  .name
                              }
                            </span>
                            <input
                              type="text"
                              id={`details[${index}].name[${langIndex}]`}
                              name={`details[${index}].name[${langIndex}]`}
                              value={lang.name}
                              style={{ width: "85%" }}
                              onChange={e =>
                                handleNameChange(index, langIndex, e)
                              }
                            />
                          </label>
                        </div>
                      )
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

            <button className={style.product_properties_submit}>
              {loaded ? (
                <ClipLoader
                  color="#36d7b7"
                  cssOverride={{}}
                  loading={loaded}
                  size={18}
                  speedMultiplier={1}
                />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminProductAddPage;
