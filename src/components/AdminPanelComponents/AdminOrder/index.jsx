import { getTheme } from "@table-library/react-table-library/baseline";
import { CompactTable } from "@table-library/react-table-library/compact";
import { usePagination } from "@table-library/react-table-library/pagination";
import { useSort } from "@table-library/react-table-library/sort";
import { useTheme } from "@table-library/react-table-library/theme";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoImg from "../../../assets/imgs/Logo.jpg";
import PopUps from "./PopUps";
import style from "./index.module.scss";
import { useSelector } from "react-redux";
import useAxiosPrivate2 from "./../../../ServicesRequest/useAxiosPrivate2";
function AdminOrders() {
  const { sendRequest } = useAxiosPrivate2();
  const url = useSelector(state => state.store.url);
  const [apiData, setApiData] = useState([]);
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [orderItems, setOrderItems] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(100);

  const GetOrders = async () => {
    var res = await sendRequest(
      "GET",
      `/Order?page=${currentPage}&take=10`,
      null,
      null
    );
    console.log(res);
    if (res.status === 200) {
      setTotalPages(res.data.lastPage);
      setApiData(res.data.items);
    }
    // fetch(`${url}Order?page=${currentPage}&take=10`, {
    //   method: "GET",
    //   headers: {
    //     accept: "*/*",
    //     Authorization: "Bearer YOUR_TOKEN_HERE",
    //     // 'Content-Type': 'application/json',
    //   },
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data);
    //     setTotalPages(data.lastPage);
    //     setApiData(data.items);
    //     // setTotalPages()
    //   });
  };

  useEffect(() => {
    GetOrders();
  }, [currentPage]);
  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };
  const handleSearch = event => {
    setSearch(event.target.value);
  };

  //design
  const theme = useTheme(getTheme());
  //filter
  // const data = {
  //   nodes: apiData.filter((item) =>
  //     item.name.toLowerCase().includes(search.toLowerCase()),
  //   ),
  // }
  //sort
  const sort = useSort(
    apiData,
    {
      onChange: onSortChange,
    },
    {
      sortFns: {
        name: array => array.sort((a, b) => a.name.localeCompare(b.fullName)),
        Phone: array => array.sort((a, b) => a.surname.localeCompare(b.Phone)),
      },
    }
  );

  function onSortChange(action, state) {
    console.log(action, state);
  }
  //columns
  const COLUMNS = [
    {
      label: "name",
      renderCell: item => item.fullName,
      sort: { sortKey: "name" },
    },

    {
      label: "Phone",
      renderCell: item => item.phone,
      sort: { sortKey: "Phone" },
    },

    {
      label: "Method",
      renderCell: item => (item.paymentMethod === 1 ? "cash/cart" : "Onlion"),
    },
    {
      label: "paymentResult",
      renderCell: item =>
        item.paymentResult ? (
          <button
            disabled
            style={{
              color: "white",
              borderRadius: "5px",
              backgroundColor: "green",
              padding: "10px",
              width: "80%",
            }}
          >
            Successfull
          </button>
        ) : (
          <button
            disabled
            style={{
              borderRadius: "5px",
              width: "80%",
              color: "white",
              padding: "10px 10px",
              backgroundColor: "red",
            }}
          >
            Failed
          </button>
        ),
    },
    {
      label: "orderResult",
      renderCell: item =>
        item.orderResult ? (
          <button
            disabled
            style={{
              color: "white",
              borderRadius: "5px",
              backgroundColor: "green",
              padding: "10px",
              width: "80%",
            }}
          >
            Successfull
          </button>
        ) : (
          <button
            disabled
            style={{
              borderRadius: "5px",
              width: "80%",
              color: "white",
              padding: "10px 10px",
              backgroundColor: "red",
            }}
          >
            Failed
          </button>
        ), // <i className="fa-solid fa-circle-xmark" style={{color: "#ff0000",}}>failed</i>,
    },
    {
      label: "totalPrice",
      renderCell: item => item.totalPrice + " AZN",
    },
    {
      label: "",
      renderCell: item => (
        <>
          <button
            onClick={() => {
              setModalVisible(true);
              setOrderItems(item);
            }}
            style={{
              padding: "10px 5px",
              borderRadius: "5px",
              backgroundColor: "green",
            }}
          >
            <i className="fa-solid fa-eye" style={{ color: "white" }}></i>
          </button>
          <button
            onClick={async () => {
              const isConfirmed = window.confirm(
                "Are you sure you want to Confirm the Order?"
              );
              if (isConfirmed) {
                const response = await fetch(
                  `${url}Order/confirmOrder/` + item.id,
                  {
                    method: "POST",
                    headers: {
                      accept: "*/*",
                      Authorization: "Bearer YOUR_TOKEN_HERE",
                      // 'Content-Type': 'application/json',
                    },
                  }
                );
                if (response) {
                  GetOrders();
                  // setApiData(apiData.filter((x) => x.id !== item.id))
                }
              }
            }}
            style={{
              padding: "10px 5px",
              borderRadius: "5px",
              backgroundColor: "green",
              marginLeft: "10px",
            }}
          >
            Submit
          </button>
        </>
      ),
    },

    {
      label: "",
      renderCell: item => (
        <button
          style={{
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "red",
          }}
          onClick={async () => {
            const isConfirmed = window.confirm(
              "Are you sure you want to delete the Order?"
            );
            if (isConfirmed) {
              const response = await fetch(`${url}Order/` + item.id, {
                method: "DELETE",
                headers: {
                  accept: "*/*",
                  Authorization: "Bearer YOUR_TOKEN_HERE",
                  // 'Content-Type': 'application/json',
                },
              });
              console.log(response);
              if (response.status === 200) {
                setApiData(apiData.filter(x => x.id !== item.id));
              }
            }
          }}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div>
      <br />
      <br />
      <br />
      {modalVisible && (
        <PopUps {...{ modalVisible, setModalVisible, orderItems }}></PopUps>
      )}
      <div className={style.admin_table_search}>
        <label htmlFor="search23">Search by Name:</label>

        <input
          id="search23"
          type="text"
          value={search}
          onChange={handleSearch}
        />
      </div>
      <br />
      <br />
      {apiData ? (
        <CompactTable
          columns={COLUMNS}
          data={{ nodes: apiData }}
          theme={theme}
          sort={sort}
        />
      ) : (
        ""
      )}

      <div className={style.admin_pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>

        <span>Page {currentPage}</span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AdminOrders;
