
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'
// import { Dropdown, DropdownButton } from 'react-bootstrap';
export default function Card(props) {
  let data = useCart();

  let navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const priceRef = useRef();
  // const [btnEnable, setBtnEnable] = useState(false);
  // let totval = 0
  // let price = Object.values(options).map((value) => {
  //   return parseInt(value, 10);
  // });
  let options = props.options;
  let priceOptions = Object.entries(options);
  let foodItem = props.item;
  const dispatch = useDispatchCart();
  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
  }
  const handleQty = (e) => {
    setQty(e.target.value);
  }
  const handleOptions = (e) => {
    setSize(e.target.value);
  }
  

  const handleAddToCart = async () => {
    // let food = []
    // for (const item of data) {
    //   if (item.id === foodItem._id) {
    //     food = item;

    //     break;
    //   }
    // }
    // console.log(food)
    // console.log(new Date())
    // if (food !== []) {
    //   if (food.size === size) {
    //     await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
    //     return
    //   }
    //   else if (food.size !== size) {
    //     await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
    //     console.log("Size different so simply ADD one more to the list")
    //     return
    //   }
    //   return
    // }

    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price:finalPrice, qty: qty, size: size })
console.log(data)
  }
  
  useEffect(() => {
    if (priceRef.current) {
      setSize(priceRef.current.value)
    }
  }, [])  //This is where Price is changing
  let finalPrice = qty * parseInt(options[size]); 
  return (
    <div>
      <div className="card mt-3" style={{ width: "20rem", maxHeight: "500px" }}>
        <img src={foodItem.img} className="card-img-top" alt="..." style={{ height: "150px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{foodItem.name}</h5>
          <div className='container w-100 h-100 p-0 d-flex' style={{ height: "40px" }}>
            <select className="m-1 h-90 w-20 bg-success rounded" style={{ select: "#FF0000" }} onClick={handleClick} onChange={handleQty} value={qty}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>)
              })}
            </select>

            <select className="m-1 h-90 w-20 bg-success rounded" ref={priceRef} style={{ select: "#FF0000" }} onClick={handleClick} onChange={handleOptions} value={size}>
            {priceOptions.map(([key,value]) => {
                return <option key={key} value={value}>{key}</option>
              })}
            </select>
            <div className=' d-inline h=100 fs-5'>₹{finalPrice}/- </div></div>
          <hr></hr>
          <button className={`btn btn-success  ms-1 `} onClick={handleAddToCart}>Add to Cart</button>
          {/* <button className={`btn btn-danger justify-center ms-2 ${btnEnable ? "" : "disabled"}`} onClick={handleRemoveCart}>Remove</button> */}
        </div>
      </div>
    </div>

  )
}
