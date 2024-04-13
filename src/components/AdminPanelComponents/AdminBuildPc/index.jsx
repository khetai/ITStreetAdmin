import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
const olmamaliCategoryaIDleri = [5, 21, 29, 49, 48, 50, 51, 52, 53, 109];

function AdminBuildPc() {
  // const url = useSelector(state => state.store.url);
  const url = useSelector(state => state.store.url);
  const { t } = useTranslation();
  const [catalogue, setCatalogue] = useState([]);
  const [selectedCategoryId_products, setselectedCategoryId_products] =
    useState({
      id: 0,
      products: [],
    });
  const [selectedCategoryId_products2, setselectedCategoryId_products2] =
    useState({
      id: 0,
      products: [],
    });
  const [clickedCategory, setClickedCategory] = useState(null);
  const [spin, setSpin] = useState(null);
  const [spin2, setSpin2] = useState(null);
  const [selectedPcParts, setSelectedPcParts] = useState([]);
  const [selectedPcParts2, setSelectedPcParts2] = useState([]);
  useEffect(() => {
    getCatalogue();
  }, []);
  async function getCatalogue() {
    const res = await fetch(`${url}Catalogs`);
    const data = await res.json();
    setCatalogue(data);
    console.log(data);
  }
  async function getProduct(id) {
    console.log(id);
    if (id === selectedCategoryId_products.id) return;
    setSpin(id);
    const res = await fetch(
      `${url}Search/Search?parentCatalogIds=${id}&limit=30&page=1&order=desc`
    );
    const data = await res.json();
    if (selectedCategoryId_products2.id === id) {
      setselectedCategoryId_products({
        id: 0,
        products: [],
      });
    } else {
      setselectedCategoryId_products({
        id,
        products: data.items,
      });
    }
    setSpin(null);
  }
  async function getProduct2(id) {
    console.log(
      `${url}Search/Search?parentCatalogIds=${id}&limit=30&page=1&order=desc`
    );
    console.log(id);
    if (selectedCategoryId_products2.id == id) return;
    setSpin2(id);
    setClickedCategory(id);
    const res = await fetch(
      `${url}Search/Search?parentCatalogIds=${id}&limit=20&page=1&order=desc`
    );
    const data = await res.json();
    console.log("cat dataaa", data);
    setselectedCategoryId_products2({
      id,
      products: data.items,
    });
    setSpin2(null);
  }
  function handleDropDown(x) {
    setSelectedPcParts([]);
    getProduct(x.id);
    if (selectedPcParts2[0]?.id !== undefined) {
      fetch(`${url}Product/GetProductConnections/${x.id}`, {
        method: "POST",
        headers: {
          accept: "*/*",
          Authorization: "Bearer YOUR_TOKEN_HERE",
          "Content-Type": "application/json",
        },
        body: JSON.stringify([selectedPcParts2[0].id]),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data !== null) {
            setSelectedPcParts(prevSelectedPcParts => [
              ...prevSelectedPcParts,
              ...data,
            ]);
          }
        })
        .catch(response => response.json())
        .then(response => {
          console.log(response);
        });
    }
  }
  function handleDropDown2(x) {
    getProduct2(x.id);
  }
  function handleAddSelectedPcParts2(x) {
    const catId = selectedPcParts.find(item => item.catalogId === x.catalogId);
    setSelectedPcParts([]);

    if (catId) {
      return;
    }
    fetch(`${url}Product/GetProductConnectionsAdmin/${x.id}`, {
      method: "POST",
      headers: {
        accept: "*/*",
        Authorization: "Bearer YOUR_TOKEN_HERE",
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data !== null) {
          console.log("connec data", data);
          setSelectedPcParts(prevSelectedPcParts => [
            ...prevSelectedPcParts,
            ...data,
          ]);
        }
      })
      .catch(response => response.json())
      .then(response => {
        console.log(response);
      });
    setSelectedPcParts2([x]);
  }
  function handleAddSelectedPcParts(x) {
    console.log(x);
    const producid = selectedPcParts.find(item => item.id === x.id);
    const catId = selectedPcParts2.find(item => item.catalogId === x.catalogId);

    if (catId) {
      return;
    }
    if (producid) {
      return;
    }
    setSelectedPcParts([...selectedPcParts, x]);
  }
  function submitFunc() {
    const parentid = selectedPcParts2[0].id;
    const ids = selectedPcParts.map(part => part.id);
    console.log(parentid);
    console.log(ids);
    fetch(`${url}Product/CreateProductConnection/${parentid}`, {
      method: "POST",
      headers: {
        accept: "*/*",
        Authorization: "Bearer YOUR_TOKEN_HERE",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then(res => {
        console.log(res.status);
      })
      .catch(response => response.json())
      .then(response => {
        console.log(response);
      });
  }
  return catalogue.length ? (
    <section className={`container ${style.section}`}>
      <h1>{t("HomePageBuildYourPC_button")}</h1>
      <div className={style.container}>
        <div className={style.categories}>
          {catalogue.map(x => {
            if (
              x.parentId === null &&
              olmamaliCategoryaIDleri.some(item => item === x.id)
            ) {
              return (
                <div
                  className={style.category}
                  onClick={() => handleDropDown2(x)}
                >
                  <p className={clickedCategory == x.id && style.ready}>
                    {x.catalogLanguages[0].name}
                  </p>

                  {spin2 == x.id ? (
                    <div className={style.spinner}>
                      <i className="fa-solid fa-spinner fa-spin fa-spin-reverse" />
                    </div>
                  ) : selectedCategoryId_products2.id === x.id ? (
                    <ul>
                      {selectedCategoryId_products2?.products?.map(x => (
                        <li
                          className={
                            selectedPcParts2.some(s => s.id === x.id) &&
                            style.active_item
                          }
                          onClick={() => {
                            handleAddSelectedPcParts2(x);
                          }}
                        >
                          <img
                            src={x.attachmentUrl ? x.attachmentUrl : ""}
                            style={{ width: "80px", marginRight: "5px" }}
                          />
                          {x.productLanguages[0]?.name}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              );
            }
          })}
        </div>
        <div className={style.choosen}>
          <h3>{t("selected")}</h3>
          <button className="btn" onClick={submitFunc}>
            Submit
          </button>
          <ol type="I" className={style.choosen_category}>
            {selectedPcParts2.map(x => (
              <li>
                {x.productLanguages[0]?.name}
                {/* <i
                  onClick={() => {
                    setSelectedPcParts2(
                      selectedPcParts2.filter((item) => item.id !== x.id),
                    )
                    setSelectedPcParts([])
                  }}
                  className="fa-regular fa-circle-xmark"
                  style={{ color: '#ff0000' }}
                ></i> */}
              </li>
            ))}
          </ol>
          <ol type="I">
            {selectedPcParts.map(x => (
              <li
                className={
                  selectedCategoryId_products?.products?.some(
                    s => s.id === x.id
                  ) && style.exist_item
                }
              >
                {x.productLanguages[0]?.name}
                <i
                  onClick={() =>
                    fetch(
                      `https://apistreet.aimtech.az/api/Product/DeleteProductConnection/${selectedPcParts2[0].id}/${x.id}`,
                      {
                        method: "DELETE",
                        headers: {
                          accept: "*/*",
                          Authorization: "Bearer YOUR_TOKEN_HERE",
                          "Content-Type": "application/json",
                        },
                      }
                    )
                      .then(
                        setSelectedPcParts(
                          selectedPcParts.filter(item => item.id !== x.id)
                        )
                      )
                      .then(res => {
                        console.log(res);
                      })
                      .catch(response => response.json())
                      .then(data => {
                        console.log(data);
                      })
                  }
                  className="fa-regular fa-circle-xmark"
                  style={{ color: "#ff0000" }}
                ></i>
              </li>
            ))}
          </ol>
        </div>
        <div className={style.categories}>
          {catalogue.map(x => {
            if (
              x.parentId === null &&
              olmamaliCategoryaIDleri.some(item => item === x.id)
            ) {
              return (
                <div className={style.category}>
                  <p
                    onClick={() => handleDropDown(x)}
                    className={clickedCategory == x.id && style.disabled}
                  >
                    {x.catalogLanguages[0].name}
                  </p>

                  {spin == x.id ? (
                    <div className={style.spinner}>
                      <i className="fa-solid fa-spinner fa-spin fa-spin-reverse" />
                    </div>
                  ) : selectedCategoryId_products.id === x.id ? (
                    <ul>
                      {selectedCategoryId_products?.products?.map(x => (
                        <li
                          className={
                            selectedPcParts.some(s => s.id === x.id) &&
                            style.selected_item
                          }
                          onClick={() => {
                            handleAddSelectedPcParts(x);
                          }}
                        >
                          <img
                            src={x.attachmentUrl ? x.attachmentUrl : ""}
                            style={{ width: "80px", marginRight: "5px" }}
                          />
                          {x.productLanguages[0]?.name}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              );
            }
          })}
        </div>
      </div>
    </section>
  ) : (
    <section>
      <h1>Loading...</h1>
    </section>
  );
}

export default AdminBuildPc;
