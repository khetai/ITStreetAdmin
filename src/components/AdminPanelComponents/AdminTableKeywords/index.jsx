import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useSort } from "@table-library/react-table-library/sort";
import { usePagination } from "@table-library/react-table-library/pagination";
import { Link } from "react-router-dom";
import PropertyPopUps from "../AdminPropertyPopUps";
import PropertyUpdatePopUps from "../AdminPropertyUpdatePopUps"
import { useSelector } from "react-redux";
const initialFormData = {
  languages:[]
  
};
const actions = {
  url:'',
  method:'PUT'
}
function AdminTableKeywords() {
  const url = useSelector(state => state.store.url);
  const [apiData, setApiData] = useState([]);
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [action , setAction] = useState(actions);
  const [language ,setLanguage] = useState();
  const [form, setForm] = useState();

  useEffect(() => {
    // ProductsServices.getProducts().then((x) => setApiData(x));
    fetch(`${url}PropertyKeywords`)
      .then((res) => res.json())
      .then((data) => {
        setApiData(data);
        console.log(data);
      });
      fetch(`${url}Languages`)
      .then((res) => res.json())
      .then((data) => {
        setLanguage(data);
       
      });
  }, []);
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  //design
  const theme = useTheme(getTheme());

  const data = {
    nodes: apiData.filter((item) =>
      item.languages[0].value.toLowerCase().includes(search.toLowerCase())
    ),
  };

  //sort
  const sort = useSort(
    apiData,
    {
      onChange: onSortChange, // onSortChange is a callback function that is triggered when the sorting changes
    },
    {
      sortFns: {
        name: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        // The custom sorting function for the "name" column
      },
    }
  );
  const handleDelete=(id)=>{
    fetch(`${url}PropertyKeywords/${id}`, {
      method: 'DELETE',
      headers: {
          'accept' : '*/*',
         'Authorization': 'Bearer YOUR_TOKEN_HERE',
          // 'Content-Type': 'application/json', 
          
        },
    }).then((res) => {
      if(res.status === 200){
        setApiData(apiData.filter(x=>x.id != id));
      }
      console.log(res.status);
    });
  }

  function onSortChange(action, state) {
    console.log(action, state);
  }
  //columns
  const COLUMNS = [
    ...(language || []).map((lang) => ({
      label: `name${lang.name}`,
      renderCell: (item) => item?.languages?.find((cl) => cl.languageId === lang.id)?.value || "",
    })),
    {
      label: "",
      renderCell: (item) => (
        // Check if it's an array or not
        <> 
          <button style={{ padding: "10px", borderRadius: "5px" }} onClick={() => handleButtonClick(item.id)}>
            Edit
          </button> 
          <button style={{ padding: "10px", borderRadius: "5px",marginLeft:"5px",backgroundColor:"darkred" }} onClick={() => handleDelete(item.id)}>
            Delete
          </button> 
          {/* <CategoryPopUps modalVisible={modalVisible} setModalVisible={setModalVisible} sendForm={sendForm} id={item.id}/> */}
        
        </>
      ),
    },
  ];
  
 

  const fetchData = (id) => {
    const act = {
      url: url + "PropertyKeywords/" + id,
      method:'PUT',
    };
    setAction(act)
    fetch(`${url}PropertyKeywords/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setModalVisible2(!modalVisible2);
        console.log(data.languages)
        const Fata = {
         languages: language.map((language, index) => ({
           id: data.languages[index]?.id,
           languageId: language.id,
           value: data.languages[index]?.value,
         })),
       };
       console.log(form)
       setForm(Fata);
        
      })
      .catch((error) => {
      });
  };
  const handleButtonClick = (id) => {
    console.log(id);
    fetchData(id);
   setModalVisible2(!modalVisible2);
  };
 
 
  return (
    <div>
      <br />
      <br />
      <br />
      <PropertyUpdatePopUps 
       modalVisible={modalVisible2}
       setModalVisible={setModalVisible2} 
       setApiData={setApiData} 
       language={language} 
       action={action} 
       form={form} 
       setForm={setForm} />
      <PropertyPopUps modalVisible={modalVisible} setKeywords={setApiData} setModalVisible={setModalVisible}  language={language} />
      <div className={style.admin_table_search}>
        <div>
          <label htmlFor="search23">Search by Name:</label>
          <input id="search23" type="text" value={search} onChange={handleSearch} />
        </div>
        <button className={style.admin_table_bnt} onClick={() => setModalVisible(!modalVisible)}>
                Add Property
              </button>
      </div>
      <br />
      <br />
      <CompactTable
        columns={COLUMNS}
        data={data}
        theme={theme}
        sort={sort}
        // pagination={pagination}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        {/* <span>Total Pages: {pagination.state.getTotalPages(data.nodes)}</span>

         <span>
          Page:{" "}
          {pagination.state.getPages(data.nodes).map((_, index) => (
            <button
              key={index}
              type="button"
              style={{
                color: "black",
                backgroundColor: "white",
                margin: "15px",
                fontWeight: pagination.state.page === index ? "bold" : "normal",
              }}
              onClick={() => pagination.fns.onSetPage(index)}
            >
              {index + 1}
            </button>
          ))}
        </span> */}
      </div>
    </div>
  );
}

export default AdminTableKeywords;
