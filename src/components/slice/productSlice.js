import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
  name: 'product',
  initialState: {
  // value:0,
  // for new set for local storage with condition
  cartItem : localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
  }, 
  reducers: {
    addTocart: (state,action) => {
   
 let findProduct = state.cartItem.findIndex((item)=>
  item.id == action.payload.id
 )
    // console.log(findProduct);    // it will give value -1
    // after condition we will see in redux 
  if (findProduct !== -1){
    state.cartItem[findProduct].qun +=1
    localStorage.setItem("cart",JSON.stringify(state.cartItem))
  } else{
    state.cartItem = [...state.cartItem, action.payload]
    localStorage.setItem("cart",JSON.stringify(state.cartItem))
   } 
 },
 decrement: (state,action) => {
  let dec = state.cartItem[action.payload].qun
  if( dec > 1) {
 state.cartItem[action.payload].qun -= 1
 localStorage.setItem("cart",JSON.stringify(state.cartItem))
  }
},

 increment: (state,action) => {
 state.cartItem[action.payload].qun += 1
 localStorage.setItem("cart",JSON.stringify(state.cartItem))
},

productRemove:(state,action)=>{
   state.cartItem.splice(action.payload,1) 
   localStorage.setItem("cart",JSON.stringify(state.cartItem))
}  

},

})


export const {addTocart,increment,decrement,productRemove} = productSlice.actions

export default productSlice.reducer