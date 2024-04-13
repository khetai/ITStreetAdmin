import React, { useState, useEffect } from 'react'
import style from './index.module.scss';
function PopUps({
  modalVisible,
  setModalVisible,
  orderItems
}) {
//  const [orderItems ,setOrderItems] = useState();

  useEffect(() => {
 console.log(orderItems)
  }, [orderItems])

  const formatDate = (timestamp) => {
    if (!timestamp) {
      return ''; // or some default value if date is not available
    }
  
    const dateObject = new Date(timestamp);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };

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
        <div style={{padding: "35px 5px"}}>
          <div style={{display:'flex', justifyContent:"space-between", padding:"0 10px"}}>
               <span>User: {orderItems?.fullName}</span>
               <span>Phone: {orderItems?.phone}</span>
               <span>Total: {orderItems?.totalPrice}AZN</span>
               <span>Date: {formatDate(orderItems?.date)}</span>
            </div>
            <div style={{display:'flex', justifyContent:"space-between", padding:"0 10px", marginTop:"10px"}}>
               <span>Address: {orderItems?.address}</span>
            </div>
          
          <div style={{padding :"20px 0"}}>
            <table style={{width:"100%"}} >
              <thead>
               <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Quantity</th>
                <th >Price</th>
              </tr>
              </thead>
              <tbody>
              {orderItems && orderItems?.orderItems?.map((x, index)=>{
              return (
                <tr key={index} style={{textAlign:"center"}}>
                   <td><img style={{width:"60px", height:"60px"}} src={x.attachmentUrl}/></td>
                   <td>{x.product?.productLanguages ? x.product?.productLanguages[0].name:"yoxdu"}</td>
                   <td>{x.quantity}</td>
                   <td>{x.pricePerUnit}</td>
                </tr>
              );
            })}
              </tbody>
            </table>
           
          
          </div>
        </div>
       
      </div>
    </div>
  )
}

export default PopUps
