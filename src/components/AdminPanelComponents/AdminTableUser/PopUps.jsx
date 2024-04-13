import React, { useState, useEffect } from 'react'
import style from '../AdminAddPopUps/index.module.scss'

function PopUps({
  modalVisible,
  setModalVisible,
  editedData,
  birthDay = '2023-11-22T15:58:19.475Z',
}) {
  const [name, setName] = useState(editedData?.name || '')
  const [surname, setSurname] = useState(editedData?.surname || '')
  const [profileImageUrl, setProfileImageUrl] = useState(
    editedData?.profileImageUrl || '',
  )

  useEffect(() => {
    setName(editedData?.name || '')
    setSurname(editedData?.surname || '')
    setProfileImageUrl(editedData?.profileImageUrl || '')
  }, [editedData])

  const handleConfirm = async (event) => {
    event.preventDefault()
    const updatedData = {
      name,
      surname,
      birthDay,
      profileImageUrl,
    }
    try {
      const response = await fetch(
        `https://apistreet.aimtech.az/api/Users/${editedData.userName}`,
        {
          method: 'PUT',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        },
      )
      if (response.ok) {
        setModalVisible(false)
        editedData.name = updatedData.name
        editedData.surname = updatedData.surname
        editedData.profileImageUrl = updatedData.profileImageUrl
      } else {
        console.error('Failed to update data')
      }
    } catch (error) {
      console.error('Error updating data:', error)
    }
  }

  return (
    <div className={style.wrapper}>
      <div className={style.popupBody}>
        <div
          className={style.cancelIcon}
          onClick={() => setModalVisible(!modalVisible)}
          aria-label="Close"
        >
          <i className="fa-regular fa-circle-xmark " />
        </div>
        <form onSubmit={handleConfirm}>
          <label>Name :</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="Name"
          />

          <label>Surname :</label>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            aria-label="Surname"
          />

          <label>Profile Image Url :</label>
          <input
            type="text"
            value={profileImageUrl}
            onChange={(e) => setProfileImageUrl(e.target.value)}
            aria-label="Profile Image URL"
          />

          <button type="submit" className={style.formBtn}>
            Confirm
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopUps
