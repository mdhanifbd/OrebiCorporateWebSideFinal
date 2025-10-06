import React from 'react'
import Container from '../components/Container'
import { Link, NavLink } from 'react-router'
import { IoClose } from 'react-icons/io5'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { increment, productRemove } from '../components/slice/productSlice'
import { decrement } from '../components/slice/productSlice'

const Cart = () => {
let data = useSelector((state)=> state.product.cartItem)
//console.log(data);
let dispatch = useDispatch()

let handleIncrement =(i)=> {
 dispatch(increment(i))
}
let handledecrement =(i)=> {
 dispatch(decrement(i))
 console.log(handledecrement);
}

let {totalPrice, totalQuantity} = data.reduce((acc,item)=>{
 acc.totalPrice += item.price * item.qun
 acc.totalQuantity += item.qun
 return acc;
},{totalPrice:0, totalQuantity:0})

// console.log(totalPrice);
// console.log(totalQuantity);




  return (
    <section>
      <Container>
        <div className='pb-10' >
        <h2 className='font-dm text-[49px] text-[#262626] font-bold' >Cart</h2>
        <ul className='flex items-center mb-5'>
            <li>
              <NavLink  to={"/"}
                className={({ isActive }) => `text-[14px] font-dms font-bold ${isActive ? "text-[#f16262]" : "text-[#262626]"}`}>
                Home
              </NavLink>
             <span className='mt-2'>/</span>
            </li>
            <li className=''>
              <NavLink to={"/cart"}
                className={({ isActive }) => `text-[14px] font-dms font-bold ${isActive ? "text-[#f16262]" : "text-[#262626]"}`}>
                Cart
              </NavLink>
            </li>
        </ul>   
        </div>
         {data.length >0 ?  
        
         <>
       {data.map((item,i)=>(
        <div className='' >
        <div className='bg-[#F5F7F7] py-7 rounded-t-2xl grid grid-cols-5 pl-7'  >
           <div className='col-span-2' >
            <h2 className='text-[16px] text-[#262626] font-dm font-bold' >Product</h2>
           </div>
            <div>
            <h2 className='text-[16px] text-[#262626] font-dm font-bold' >Price</h2>
           </div>
            <div>
            <h2 className='text-[16px] text-[#262626] font-dm font-bold' >Quantity</h2>
           </div>
            <div>
            <h2 className='text-[16px] text-[#262626] font-dm font-bold' >Total</h2>
           </div>
          </div> 
        <div className='border-1 border-[#F0F0F0] py-7 ' >
           <div className='grid grid-cols-5' >
            <div className='flex items-center gap-5 col-span-2 pl-3' >
             <div onClick={()=>dispatch(productRemove(i))} className='flex items-center justify-center gap-3' >
               <IoClose className='text-[#f81010] cursor-pointer' />
              <h2  className='text-[16px] text-[#f81010] font-dm font-bold cursor-pointer' >Remove</h2>
              </div> 
              <div>
                <img src={item.thumbnail} alt='#'/>
              </div> 
              <div className='pl-4' >
                <h2>{item.title}</h2>
              </div>
             </div>
             <div className='flex items-center' >
              <h3>${item.price}</h3>
            </div>
           <div className='flex items-center gap-3' >
                  <button onClick={()=>handledecrement(i)} className='cursor-pointer'>
                    <FaMinus />
                  </button>
                  <h4 className='text-lg font-bold'>{item.qun}</h4>
                  <button onClick={()=>handleIncrement(i)} className='cursor-pointer'>
                    <FaPlus />
                  </button>
           </div>  
         <div className='flex items-center gap-9' >
         <p>${(item.price * item.qun).toFixed(2)}</p>
         </div>
          </div>
          </div>
        </div>
       ))}
       
       <div className='' >
       <h2 className=' text-end text-[20px] text-[#262626] font-dm font-bold mb-9 ' >Cart totals</h2>
       <div className='flex justify-end' >
       <div className='text-end border-2 border-[#f8f3f3] w-[30%]' >
       <div className=' flex justify-between mt-3 ' >
         <div>
          <h2>Sub Total</h2>
          </div>   
         <div>
          <h3>${totalPrice.toFixed(2)}</h3>
          </div>   
       </div>
       <div className='flex justify-between mt-3 ' >
         <div>
          <h2>Total Quantity</h2>
          </div>   
         <div>
          <h3>{totalQuantity}</h3>
          </div>   
       </div>
        <div className='flex justify-between mt-3 ' >
         <div>
          <h2>Total Price</h2>
          </div>   
         <div>
          <h3>${totalPrice.toFixed(2)}</h3>
          </div>   
       </div>
       </div>
       </div>
       <div className='text-end py-5' >
       <button className='' ><Link className='text-[14px] text-[#fff] font-dm font-bold border-2 bg-black py-2 px-2 inline-block '>Proceed to Checkout</Link></button>
       </div>
    </div>
     </>
   :
  <h2  className='font-dm text-[140px]'>No Item Select </h2>
       
      }
 </Container>
</section>
  )
}

export default Cart