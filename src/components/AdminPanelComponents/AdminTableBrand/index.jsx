import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useSort } from "@table-library/react-table-library/sort";
import { usePagination } from "@table-library/react-table-library/pagination";
import { Link } from "react-router-dom";
import LogoImg from "../../../assets/imgs/Logo.jpg";
import SliderPopUps from "../BrandPopUps";
import { getCookie } from "../../../helpers/cookie";
import ClipLoader from "react-spinners/ClipLoader";

import { useSelector } from "react-redux";
const initialFormData = {
  name: '',
  iconUrl: '', // Assuming Background is a file
};
const actions = {
  url:'',
  method:''
}
function AdminTableBrand() {
  const url = useSelector(state => state.store.url);
  const urladd = `${url}Brand`
  const token = getCookie("token");
  const [actnum,setactnum]=useState({
    isactive : true,
    index: 0
  });
  const [apiData, setApiData] = useState([]);
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState(initialFormData);
  const [action , setAction] = useState(actions);
  const [language ,setLanguage] = useState();
  useEffect(() => {
    // ProductsServices.getProducts().then((x) => setApiData(x));
    fetch(`${url}Brand`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setApiData(data);
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
    fetch(`${url}Brand/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Map the fetched data to match the structure of initialFormData
        const mappedData = {
          name: data.name || '',
          iconUrl: data.IconUrl,
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
    if(id != 0){
      fetchData(id);
      const act = {
        url: urladd +"/"+ id,
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
      label: "iconUrl",
      renderCell: (item) => (
        <img
          width={40}
          height={40}
          src={item.iconUrl ? item.iconUrl : LogoImg}
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
            <button
          style={{
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "red",
            marginLeft:"10px"
          }}
          onClick={() => {
            setactnum({
              isactive : false,
              index: item.id
            });
            fetch("https://apistreet.aimtech.az/api/Brand/" + item.id, {
              method: "DELETE",
              headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${token}`,
                // 'Content-Type': 'application/json', 
              },
            })
              .then((res) => {
                console.log(res)
                if(res.ok){
                  const a = apiData.filter(x => x.id != item.id);
                  setApiData(a);
                }
                setactnum({
                  isactive : true,
                  index: 0
                });
              })
          }}
        >
          {!actnum.isactive && actnum.index === item.id ? (
                              <ClipLoader
                                color="#36d7b7"
                                cssOverride={{}}
                                loading={!actnum.isactive}
                                size={18}
                                speedMultiplier={1}
                              />
                            ) : (
                              <i class="fa-regular fa-trash-can"></i>
                            )}
        </button>
        </>
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
        Add Brand
      </button>
      <br />
      <br />
      <br />
      <SliderPopUps action={action} initialFormData={initialFormData} language={language} modalVisible={modalVisible} setModalVisible={setModalVisible} setApiData={setApiData} setForm={setForm} form={form} onFormChange={handleFormChange}/>
      <div className={style.admin_table_search}>
        <label htmlFor="search">Search by Name:</label> 

        <input id="search"  autoComplete="off" name="search" type="text" value={search} onChange={handleSearch} />

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

export default AdminTableBrand;
