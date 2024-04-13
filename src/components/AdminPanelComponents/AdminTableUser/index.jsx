import { getTheme } from '@table-library/react-table-library/baseline'
import { CompactTable } from '@table-library/react-table-library/compact'
import { usePagination } from '@table-library/react-table-library/pagination'
import { useSort } from '@table-library/react-table-library/sort'
import { useTheme } from '@table-library/react-table-library/theme'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LogoImg from '../../../assets/imgs/Logo.jpg'
import PopUps from './PopUps'
import style from './index.module.scss'
import { useSelector } from "react-redux";
function AdminTableUser() {
  const url = useSelector(state => state.store.url);
  const [apiData, setApiData] = useState([])
  const [search, setSearch] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [editedData, setEditedData] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [totalPages, setTotalPages] = useState(100)

  useEffect(() => {
    fetch(`${url}Users?page=${currentPage}&take=10`)
      .then((res) => res.json())
      .then((data) => {
        setApiData(data.items)
        setTotalPages(data.totalCount)
        setLastPage(data.lastPage)
      })
  }, [currentPage]) 
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  //design
  const theme = useTheme(getTheme())
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
        name: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        surname: (array) =>
          array.sort((a, b) => a.surname.localeCompare(b.surname)),
        userName: (array) =>
          array.sort((a, b) => a.userName.localeCompare(b.userName)),
        email: (array) => array.sort((a, b) => a.email.localeCompare(b.email)),
      },
    },
  )

  function onSortChange(action, state) {
    console.log(action, state)
  }
  //columns
  const COLUMNS = [
    {
      label: 'name',
      renderCell: (item) => item.name,
      sort: { sortKey: 'name' },
    },

    {
      label: 'surname',
      renderCell: (item) => item.surname,
      sort: { sortKey: 'surname' },
    },
    {
      label: 'profileImageUrl',
      renderCell: (item) => (
        <img
          width={40}
          height={40}
          src={item.profileImageUrl ? item.profileImageUrl : LogoImg}
        />
      ),
      // sort: { sortKey: "attachmentUrl" },
    },
    {
      label: 'userName',
      renderCell: (item) => item.userName,
      sort: { sortKey: 'userName' },
    },
    {
      label: 'email',
      renderCell: (item) => item.email,
      sort: { sortKey: 'email' },
    },
    {
      label: '',
      renderCell: (item) => (
        <>
          <button
            onClick={() => {
              setModalVisible(true)
              setEditedData(item)
            }}
            style={{ padding: '10px', borderRadius: '5px' }}
          >
            Edit
          </button>
        </>
      ),
    },
    {
      label: '',
      renderCell: (item) => (
        <button
          style={{
            padding: '10px',
            borderRadius: '5px',
            backgroundColor: 'red',
          }}
          onClick={async () => {
            const isConfirmed = window.confirm(
              'Are you sure you want to delete the user?',
            )
            if (isConfirmed) {
              const response = await fetch(
                `${url}Users/` + item.userName,
                {
                  method: 'delete',
                },
              )
              if (response) {
                setApiData(apiData.filter((x) => x.userName !== item.userName))
              }
            }
          }}
        >
          Delete
        </button>
      ),
    },
  ]

  return (
    <div>
      <br />
      <br />
      <br />
      {modalVisible && (
        <PopUps {...{ modalVisible, setModalVisible, editedData }}></PopUps>
      )}
      <div className={style.admin_table_search}>
        <label htmlFor="search">Search by Name:</label>

        <input id="search" type="text" value={search} onChange={handleSearch} />
      </div>
      <br />
      <br />
      <CompactTable
        columns={COLUMNS}
        data={{ nodes: apiData }}
        theme={theme}
        sort={sort}
      />

      <div className={style.admin_pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>

        <span>Page {currentPage}</span>

        <button
          disabled={currentPage === lastPage}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default AdminTableUser
