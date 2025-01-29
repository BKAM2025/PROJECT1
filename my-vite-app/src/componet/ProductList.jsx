import React from "react";
import ProductDetails from "./ProductDetails"
    



    const ProductList = ({ProductList,handleOneProduct}) =>{
        console.log("allPosts",ProductList);
        
        
        return(
       
            ProductList.map((element,i) =>(
       
                <ProductDetails  handleOnePost={handleOneProduct} element={element} key={i}/>
            )))}
      


            

export default  ProductList