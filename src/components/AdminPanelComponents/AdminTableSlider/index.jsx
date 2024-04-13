import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useSort } from "@table-library/react-table-library/sort";
import { usePagination } from "@table-library/react-table-library/pagination";
import { Link } from "react-router-dom";
import LogoImg from "../../../assets/imgs/Logo.jpg";
import SliderPopUps from "../SliderPopUps";
import { useSelector } from "react-redux";
const initialFormData = {
  Name: '',
  Link: '',
  LanguageId:'',
  Background: null, // Assuming Background is a file
};
const actions = {
  url:'',
  method:''
}
function AdminTableSliders() {
  const url = useSelector(state => state.store.url);
  const urladd = `${url}Sliders`
  const [apiData, setApiData] = useState([]);
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState(initialFormData);
  const [action , setAction] = useState(actions);
  const [language ,setLanguage] = useState();
  useEffect(() => {
    // ProductsServices.getProducts().then((x) => setApiData(x));
    fetch(`${url}Sliders`)
      .then((res) => res.json())
      .then((data) => {
        setApiData(data);
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
  //filter
  const data = {
    nodes: apiData.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    ),
  };
  //sort
  const sort = useSort(
    apiData,
    {
      onChange: onSortChange,
    },
    {
      sortFns: {
        name: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
       
      },
    }
  );

  function onSortChange(action, state) {
    console.log(action, state);
  }


  const fetchData = (id) => {
    fetch(`${url}Sliders/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Map the fetched data to match the structure of initialFormData
        const mappedData = {
          Name: data.name || '',
          Link: data.link || '',
          LanguageId: data.languageId || '',
          Background: null,
        };

        // Update your form or state with the mapped data
        setForm(mappedData);
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
        // Handle the error as needed
      });
  };
  const handleButtonClick = (id) => {
    setForm(initialFormData);
    console.log(id);
    console.log(language);
    if(id != 0){
      fetchData(id);
      const act = {
        url: url+"Sliders/"+ id,
        method:'PUT',
      };
       setAction(act)
    }else{
      const act = {
        url: urladd,
        method:'POST',
      };
       setAction(act)
    }
    setModalVisible(!modalVisible);
  };
  //columns
  const COLUMNS = [
    {
      label: "name",
      renderCell: (item) => item.name,
      sort: { sortKey: "name" },
    },
    {
      label: "link",
      renderCell: (item) => item.link,
    },
    {
      label: "Language",
      renderCell: (item) => {
        const matchingLanguage = Array.isArray(language)
          ? language.find((e) => e.id === item.languageId)
          : null;
    
        return matchingLanguage ? matchingLanguage.name : "";
      },
    },
    {
      label: "backgroundUrl",
      renderCell: (item) => (
        <img
          width={40}
          height={40}
          src={item.backgroundUrl ? item.backgroundUrl : LogoImg}
        />
      ),
      // sort: { sortKey: "attachmentUrl" },
    },
    {
      label: "",
      renderCell: (item) => (
        <>
            <button style={{ padding: "10px", borderRadius: "5px" }} onClick={() => handleButtonClick(item.id)}>
              Edit
            </button>
        </>
      ),
    },
    {
      label: "",
      renderCell: (item) => (
        <button
          style={{
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "red",
          }}
          onClick={() => {
            fetch(`${url}Sliders/` + item.id, {
              method: "DELETE",
              headers: {
                'Authorization': 'Bearer YOUR_TOKEN_HERE',
                'Content-Type': 'application/json', 
              },
            })
              .then((res) => {
                if(res.ok){
                  const a = apiData.filter(x => x.id != item.id);
                  setApiData(a);
                }
              })
          }}
        >
          Delete
        </button>
      ),
    },
  ];

  // pagination
  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 10,
    },
  });

  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;
    // If the input is a file input, set Background to the selected file
    const updatedForm = type === 'file' ? { ...form, [name]: files[0] } : { ...form, [name]: value };
  
    setForm(updatedForm);
  };
 
  return (
    <div>
      <button
        className={style.admin_table_bnt}
        //onClick={() => setModalVisible(!modalVisible)
          onClick={() => handleButtonClick(0)}
      >
        Add Slider
      </button>
      <br />
      <br />
      <br />
      <SliderPopUps action={action} initialFormData={initialFormData} language={language} modalVisible={modalVisible} setModalVisible={setModalVisible} setApiData={setApiData} setForm={setForm} form={form} onFormChange={handleFormChange}/>
      <div className={style.admin_table_search}>
        <label htmlFor="search">Search by Name:</label> 

        <input id="search" autoComplete="off" name="search" type="text" value={search} onChange={handleSearch} />

      </div>
      <br />
      <br />
      <CompactTable
        columns={COLUMNS}
        data={data}
        theme={theme}
        sort={sort}
        pagination={pagination}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <span>Total Pages: {pagination.state.getTotalPages(data.nodes)}</span>

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
        </span>
      </div>
    </div>
  );
}

export default AdminTableSliders;
