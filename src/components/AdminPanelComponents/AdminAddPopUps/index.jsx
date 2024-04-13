import React, { useState } from 'react'
import style from './index.module.scss'

function AdminAddPopUps({ modalVisible, setModalVisible, datum }) {
  const [nameAZ, setNameAZ] = useState(datum?.productLanguages[0]?.name || '')
  const [nameENG, setNameENG] = useState(datum?.productLanguages[1]?.name || '')
  const [nameRU, setNameRU] = useState(datum?.productLanguages[2]?.name || '')
  const [unitPrice, setUnitPrice] = useState(
    Number(datum.pricePerUnit).toFixed(2),
  )
  const [quantity, setQuantity] = useState(parseInt(datum?.quantity) || 0)

  const handleConfirm = async () => {
    const updatedData = {
      ...datum,
      productLanguages: [
        { languageId: 1, name: nameAZ, description: 'string' },
        { languageId: 2, name: nameENG, description: 'string' },
        { languageId: 3, name: nameRU, description: 'string' },
      ],
      pricePerUnit: unitPrice,
      quantity: quantity.toString(),
    }

    try {
      const response = await fetch(
        `https://apistreet.aimtech.az/api/Product/Update/${datum.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        },
      )

      if (response.ok) {
        console.log('Data updated successfully')
      } else {
        console.error('Failed to update data')
      }
    } catch (error) {
      console.error('Error updating data:', error)
    }
  }

  return (
    <div
      className={style.wrapper}
      style={!modalVisible ? { display: 'none' } : null}
    >
      <div className={style.popupBody}>
        <div
          className={style.cancelIcon}
          onClick={() => setModalVisible(!modalVisible)}
        >
          <i className="fa-regular fa-circle-xmark "></i>
        </div>
        <form action="#">
          <img
            width={'120px'}
            src={datum?.attachmentUrl}
            alt="img"
            loading="lazy"
          />
          <label>
            Name AZ:
            <input
              type="text"
              value={nameAZ}
              onChange={(e) => setNameAZ(e.target.value)}
            />
          </label>

          <label>
            Name ENG:
            <input
              type="text"
              value={nameENG}
              onChange={(e) => setNameENG(e.target.value)}
            />
          </label>

          <label>
            Name RU:
            <input
              type="text"
              value={nameRU}
              onChange={(e) => setNameRU(e.target.value)}
            />
          </label>

          <label htmlFor="UnitPrice">Unit Price:</label>
          <input
            type="text"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
          />

          <label htmlFor="Quantity">Quantity:</label>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <button className={style.formBtn} onClick={handleConfirm}>
            Confirm
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminAddPopUps
