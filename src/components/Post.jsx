import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { IoGitCompare } from "react-icons/io5";

const Post = ({ allPage, filterShow, listItem}) => {
  //console.log(allPage);
  // console.log(filterShow);
  //console.log(listItem);
 let [cateFilterShow,setCateFilterShow] = useState([])
 let [show , setShow]= useState(true)



 useEffect(()=>{
    let cateall = filterShow.slice(0,5)
    setCateFilterShow(cateall)
 },[filterShow])

 let handleShow = ()=>{
  setCateFilterShow(filterShow)
  setShow(false)
 }

 let handleLess = ()=>{
  let cateall = filterShow.slice(0,5)
  setCateFilterShow(cateall)
  setShow(true)
 }


  return (
    <>
      <div className="">
        {cateFilterShow.length > 0 ? 
        <div>
         <div className="flex flex-wrap justify-between" >
         { cateFilterShow.map((item) => (
          <div className="w-[32%]" >
            <div className=" shadow-xl bg-[#ee9696] border-1 rounded-[5px] mb-4">
              <div className="relative gap-3 group bg-[#f1eded]  py-2 rounded-t-[5px] shadow-1px '>">
                <Link to={`/product/${item.id}`}>
                  <img className="bg-[#D8D8D8]" src={item.thumbnail} alt="" />
                </Link>
                <div className=" absolute bottom-0 left-0 w-full opacity-0 group hover:opacity-100">
                  <ul className="bg-[rgba(124,120,120,0.7)] pr-3 pt-4 pb-4 py-2 shadow-lg">
                    <li className="flex justify-end items-center gap-4">
                      <span className="text-white hover:text-[#f77272] font-dm">Add to Wish List</span>
                      <FaHeart className="text-[red]" />
                    </li>
                    <li className="flex justify-end items-center gap-4">
                      <span className="text-white hover:text-[#f0f089] font-dm ">Compare</span>
                      <IoGitCompare className="text-[yellow]" />
                    </li>
                    <li className="flex justify-end items-center gap-4">
                      <span className="text-white hover:text-[#82f182] font-dm ">Add to Cart</span>
                      <FaShoppingCart className="text-[green]" />
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-between mx-auto">
                <div className="pl-4 pb-2 pt-4">
                  <h3>{item.title}</h3>
                  <p>Black</p>
                </div>
                <div className="pr-3 pb-4 pt-4">
                  <h3 className="">${item.price}</h3>
                  <p className="text-[red]">Stock {item.stock}</p>
                </div>
              </div>
            </div>
            </div>
          ))}
        </div>
        {filterShow.length > 5 &&
         show ?
         <h2 onClick={handleShow} className="cursor-pointer px-3 py-1 border-1 border-[#262626] inline-block bg-[#f77272] font-dm rounded-[5px] mt-5" >Show All</h2>
         : filterShow.length > 5 &&
         <h2 onClick={handleLess } className="cursor-pointer px-5 py-1 border-1 border-[#262626] inline-block bg-[#f77272] font-dm rounded-[5px] mt-5 " >Less</h2>
        }
      </div>
        : 
         <div className={`${listItem == 'active' ? 'w-full' :'w-full flex justify-between flex-wrap'} `}>
            {allPage.map((item) => (
               <div className="w-[32%] mb-4 rounded-[5px] shadow-2xl border-2 border-[rgba(12,12,12,0.14)] bg-white">
                <div className="relative group  rounded-t-[5px] shadow-1px">
                  <Link to={`/product/${item.id}`}>
                    <img className="bg-[#D8D8D8]" src={item.thumbnail} alt="" />
                  </Link>
                  <div className="absolute bottom-0 left-0 w-full transform translate-y-full opacity-0 transition-all duration-900 group-hover:translate-y-0 group-hover:opacity-100 ">
                    <ul className="bg-[rgba(39,37,37,0.7)] pr-3 pt-4 pb-4 py-2">
                      <li className="flex justify-end items-center gap-4">
                        <span className="text-white  hover:text-[#f77272] font-dm ">Add to Wish List</span>
                        <FaHeart className="text-[red]" />
                      </li>
                      <li className="flex justify-end items-center gap-4">
                        <span className="text-white hover:text-[#f0f089] font-dm  ">Compare</span>
                        <IoGitCompare className="text-[yellow]" />
                      </li>
                      <li className="flex justify-end items-center gap-4">
                        <span className="text-white hover:text-[#82f182] font-dm ">Add to Cart</span>
                        <FaShoppingCart className="text-[green]" />
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex justify-between mx-auto shadow-xl bg-[#ee9696]">
                   <div className="pl-4 pb-2 pt-4">
                    <h3 className="text-[12px] font-dm">{item.title}</h3>
                    <p className="text-[12px]" >Black</p>
                  </div>
                  <div className="pr-3 pb-4 pt-4">
                    <h3 className="text-[green] text-[12px] font-dm">${item.price}</h3>
                    <p className="text-[red] text-[12px] font-dm">Stock {item.stock}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </>
  );
};

export default Post;
