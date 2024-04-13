import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import AdminAddPopUps from '../AdminAddPopUps'
import { Link } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";
import { getCookie } from "../../../helpers/cookie";
import { useSelector } from "react-redux";
function AdminTable() {
  const url = useSelector(state => state.store.url);
  const token = getCookie("token");
  const [apiData, setApiData] = useState(null)
  const [datum, setDatum] = useState({})
  const [search, setSearch] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isPageLoading, setIsPageLoading] = useState(false)
  const [activ, setActiv] = useState(true);
  const [actnum,setactnum]=useState({
    isactive : true,
    index: 0
  });
  useEffect(() => {
    fetchData(1) // Initial fetch
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handlePageChange = (newPage) => {
    setIsPageLoading(true) // Set loading state when changing pages
    fetchData(newPage)
  }

  const fetchData = (page) => {
    fetch(`${url}Product/GetAllPaginated?page=${page}&count=10`,)
      .then((res) => res.json())
      .then((data) => {
        setApiData(data)
        setDatum(data.items[0])
      })
      .finally(() => {
        setIsLoading(false)
        setIsPageLoading(false) // Reset loading state when the request is complete
      })
  }

  return (
    <div>
      <br />
      <button  className={style.admin_table_bnt} >
         <Link className={style.admin_table_bnt} to={'/adminpanel/addProduct'}>Add Product</Link>
      </button>
      <br />
      <br />
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <AdminAddPopUps
          {...{ modalVisible, setModalVisible, datum }}
        ></AdminAddPopUps>
      )}

      <div className={style.admin_table_search}>
        <label htmlFor="search">Search by Name:</label>
        <input id="search" type="text" value={search} onChange={handleSearch} />
      </div>
      <br />

      {isLoading || isPageLoading ? (
        <h1>Loading</h1>
      ) : (
        <div>
          <table className={style.admin_table} border={'1'}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Price</th>
                <th>InStock</th>
                <th>Product Name</th>
                <th>Edit/Stock/Delete</th>
              </tr>
            </thead>
            <tbody>
              {apiData?.items?.map((x) => (
                <tr key={x.id}>
                  <td>{x.id}</td>
                  <td>
                    <img
                      width={'60px'}
                      src={x.imageUrl}
                      alt="img"
                      loading="lazy"
                    />
                  </td>
                  <td>{Number(x.price).toFixed(2)}</td>
                  <td>{x.isActive ? "var":"yoxdur"}</td>
                  <td>{x.productLanguages[0].name}</td>
                  <td>
                    <Link to={'/adminpanel/editProduct/' + x.id}>Edit</Link>
                    <button
                             onClick={async () => {
                              setactnum({
                                isactive : false,
                                index: x.id+'s'
                              });
                              console.log(actnum);
                              const response = await fetch(
                                `${url}Product/StockCheck/` + x.id,
                                {
                                  method: 'POST',
                                  headers: {
                                      'accept' : '*/*',
                                     'Authorization': `Bearer ${token}`,
                                      // 'Content-Type': 'application/json', 
                                      
                                    },}
                              )
                              if (response) {
                               setactnum({
                                isactive : true,
                                index: 0
                              });
                               fetchData(apiData?.currentPage);
                                // setApiData(apiData.filter((x) => x.id !== item.id))
                              }setactnum({
                                isactive : true,
                                index: 0
                              });
                             }}
                             style={x.isActive ?{ padding: '10px 15px', borderRadius: '5px',backgroundColor : "green" , marginLeft:"10px"}:{padding: '10px 15px', borderRadius: '5px',backgroundColor : "red" , marginLeft:"10px"}}
                           >
                          {!actnum.isactive && actnum.index === x.id+'s'? (
                              <ClipLoader
                                color="#36d7b7"
                                cssOverride={{}}
                                loading={!actnum.isactive}
                                size={18}
                                speedMultiplier={1}
                              />
                            ) : (
                              <i className="fa-solid fa-recycle"></i>
                            )}
                      </button>
                      <button
                             onClick={async () => {
                              setactnum({
                                isactive : false,
                                index: x.id+'d'
                              });
                              const response = await fetch(
                                `${url}Product/` + x.id,
                                {
                                  method: 'DELETE',
                                  headers: {
                                      'accept' : '*/*',
                                     'Authorization': `Bearer ${token}`,
                                      // 'Content-Type': 'application/json', 
                                      
                                    },}
                              )
                              if (response) {
                                setactnum({
                                  isactive : true,
                                  index: 0
                                });
                               fetchData(apiData?.currentPage);
                                // setApiData(apiData.filter((x) => x.id !== item.id))
                              }
                              setactnum({
                                isactive : true,
                                index: 0
                              });
                             }}
                             style={{padding: '10px 15px', borderRadius: '5px',backgroundColor : "red" , marginLeft:"10px"}}
                           >
                          {!actnum.isactive && actnum.index === x.id+'d' ? (
                              <ClipLoader
                                color="#36d7b7"
                                cssOverride={{}}
                                loading={!actnum.isactive}
                                size={18}
                                speedMultiplier={1}
                              />
                            ) : (
                              <i className="fa-regular fa-trash-can"></i>
                            )}
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={style.pagination}>
            <button
              onClick={() => handlePageChange(apiData.currentPage - 1)}
              disabled={!apiData?.havePrev || isPageLoading}
            >
              Previous
            </button>
            {
              <select
                onChange={(e) => handlePageChange(e.target.value)}
                value={apiData?.currentPage}
                disabled={isPageLoading}
              >
                {Array.from({ length: apiData?.lastPage }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            }
            <button
              onClick={() => handlePageChange(apiData?.currentPage + 1)}
              disabled={!apiData?.haveNext || isPageLoading}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminTable
