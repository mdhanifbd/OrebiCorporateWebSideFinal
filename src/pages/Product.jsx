import React, { useContext, useEffect, useState } from 'react'
import Container from '../components/Container'
import { Link, NavLink } from 'react-router'
import { FaListOl } from "react-icons/fa";
import { IoIosArrowForward, IoMdGrid } from "react-icons/io";
import Post from '../components/Post'
import {ApiData} from "../components/ContextApi"
import Pagination from '../components/Pagination';




const Product = () => {
 let info = useContext(ApiData)
  //console.log(info);
  let [perPage, setPerPage] = useState(6)
  let [currentPage, setCurrentPage] = useState(1)
  let[categoryp,setCategoryp] = useState([])
  let [brand,setBrand] = useState([])
  let [filterShow,setFilterShow] = useState([])
  let lastPage = perPage * currentPage
  let firstPage = lastPage - perPage
  let allPage = info.slice(firstPage,lastPage)
  let [listItem,setListItem] = useState("")
  let [low,setLow] = useState({})
  let [high,setHigh] = useState({})
  

  let pageNumber = []
  for(let i=0; i< Math.ceil( filterShow.length >0 ? filterShow :  info.length / perPage);i++){
   pageNumber.push(i)
  }
//  console.log(pageNumber);

let paginate =(index)=>{
  setCurrentPage(index+1);
  
}

let next =()=>{
  if(currentPage < pageNumber.length){
    setCurrentPage((state)=>state+1)
  }
  
}
let previous =()=>{
  if(currentPage > 1){
  setCurrentPage((state)=>state-1)
}
}

let handlePerPageChange =(e)=>{
 // console.log("ami",e.target.value);
  setPerPage(e.target.value)
  
}

useEffect(()=>{
setCategoryp([...new Set(info.map((item)=>item.category))])
setBrand([...new Set(info.map((item)=>item.brand))])
},[info])

let handleCatagory = (citem)=>{
//console.log("ami",citem);
let cateFilter = info.filter((item)=>item.category == citem)
//console.log(cateFilter);
setFilterShow(cateFilter)
}

let handleByPrice =(e)=>{
  //console.log("ami");
// console.log("ami",e);
 console.log("ami",e.target);
  //setPerPage(e.target)  
}

let handleAll = ()=>{
//console.log("ami");
setFilterShow("")
}

let handleListItem = ()=>{
  //console.log("ami");
  setListItem("active")
  //console.log(listItem);
}

let handleBrand = (bitem) =>{
//console.log(bitem);
let BrandFilter = info.filter((item)=>item.brand == bitem)
//console.log(cateFilter);
//console.log(BrandFilter);
setFilterShow(BrandFilter)

}

let handlePrice = (value)=>{
  setLow(value.low);
  setHigh(value.high);
  let priceShow = info.filter((item)=> item.price > value.low && item.price < value.high)
  setFilterShow(priceShow);
}

 
return (
   <section className='py-[50px]' >
    <Container>
      <div className='pb-10' >
        <h2 className='font-dm text-[49px] text-[#262626] font-bold' >Products</h2>
        <ul className='flex items-center mb-5'>
            <li>
              <NavLink to={"/"}
                className={({ isActive }) => `text-[14px] font-dms font-bold ${isActive ? "text-[#f16262]" : "text-[#262626]"}`}>
                Home
              </NavLink>
             <span className='mt-2'>/</span>
            </li>
            <li className=''>
              <NavLink to={"/Product"}
                className={({ isActive }) => `text-[14px] font-dms font-bold ${isActive ? "text-[#f16262]" : "text-[#262626]"}`}>
                Shop
              </NavLink>
            </li>
        </ul>   
       
        <div className='flex justify-between' >
        <div className='w-[24%] py-4 sticky top-0 h-screen overflow-y-auto' >
        <div className='' >
          <div className='pb-2 border-1 border-[#00000064] pt-2 rounded-[5px] mb-4'>
        <h2 className='font-dm text-[24px] text-[#262626] font-bold mt-3 pl-4' >Shop by Category</h2>
        <ul>
         <li onClick={handleAll} className='py-3 hover:bg-gray-200 rounded-[5px] font-dm text-[16px] text-[#262626] font-normal cursor-pointer capitalize pl-8' >All Products</li>    
         {categoryp.map((item)=>(
           <li onClick={()=>handleCatagory(item)} className='py-3 hover:bg-gray-200 rounded-[5px] font-dm text-[16px] text-[#262626] font-normal cursor-pointer capitalize pl-8'>{item}</li>
         ))}
       </ul> 
        </div>
        </div>
        <div className='h-[300px] overflow-y-scroll pb-2 border-1 border-[#00000064] pt-2 rounded-[5px] mb-4' >
         <h2 className='font-dm text-[24px] text-[#262626] font-bold mt-3 pl-4' >Brand</h2>
         <ul>
          {brand.map((item)=>(
          <li onClick={()=>handleBrand(item)} className=' py-3 hover:bg-gray-200 rounded-[5px] font-dm text-[16px] text-[#262626] font-normal cursor-pointer capitalize pl-8' >{item}</li>
          ))}
         </ul>
        </div>
         <div className='pb-2 border-1 border-[#00000064] pt-2 rounded-[5px] mb-4' >
         <h2 className='font-dm text-[24px] text-[#262626] font-bold mt-3 pl-4' >Price</h2>
         <ul className='pl-4' >
         <li onClick={()=>handlePrice({low:0,high:10})} >$0 - $9</li>
         <li onClick={()=>handlePrice({low:10,high:19})} >$10 - $19</li>
         </ul>
        </div>
        </div> 
         
        <div className='w-[74%]'>
        <div className='flex gap-4 mb-4' >
           <div onClick={()=>setListItem("")} className={`${listItem == "active" ? "" : "bg-green-500" } p-3 rounded-[5px]`} >
           <IoMdGrid />
           </div>
          <div onClick={handleListItem} className={`${listItem == "active" ? "bg-green-500": ""} p-3 rounded-[5px]`} >
            <FaListOl />
          </div>
       <div className='flex ml-auto gap-7' >
       <div className='' >
        <label className='mr-3'  htmlFor=''>Sort by:</label>
        <select onChange={handleByPrice} name='' id='' className='py-1 px-4 border-2 border-[#262626]' >
          <h4>Price</h4>
          <option value="Low to High"><h4>Low to High</h4></option>
          <option value="High ti Low"><h4>High ti Low</h4></option>
        </select>
     </div>
     <div className='' >
        <label className='mr-3' htmlFor=''>Show:</label>
         <select onChange={handlePerPageChange} name='' id='' className='py-1 px-4 border-2 border-[#262626]' >
          <option value="3">3</option>
          <option value="6">6</option>
          <option value="9">9</option>
          <option value="12">12</option>
         </select>
      </div>
      </div>
      </div>
       <Post allPage={allPage} filterShow={filterShow} listItem={listItem}  />
        <Pagination pageNumber={pageNumber} paginate={paginate} next={next} previous={previous} currentPage={currentPage}/>
        </div>
      </div>
      </div>
    </Container>
   </section>
  )
}

export default Product
