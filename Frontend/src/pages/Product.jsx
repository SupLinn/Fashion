import React from 'react'
import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'
const Product = () => {

  const {productId} = useParams();
  const {products, currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState();
  const [image, setImage] = useState();
  const [size, setSize] = useState('');
  
  const fetchProductData = async () => {
    
    products.map((item)=>{
      //console.log(item._id);
      if(item._id=== productId){
        setProductData(item);
        //console.log("hello");
        return null;
      }
    })
  }
  useEffect(() => {
    setSize()
  },[productId])
  useEffect(() => {
    const fetchData = async () => { 
      await fetchProductData();
    }
    fetchData();
  },[productId])

  useEffect(() => {
    if(productData){
      setImage(productData.image[0]);
    }
  },[productData])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
     {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'> 
        {/* Product Images */}

       <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
        <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full' >
           { productData.image.map((item, index) => (
                <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'></img>
             ))
           }
        </div>

        <div className='w-full sm:w-[80%]'>
          <img className='w-full h-auto' src={image}/>
        </div>
       </div>

       {/* Product Info */}
       <div className='flex-1'>
         <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
         <div className='flex items-center gap-1 mt-2'>
           <img src={assets.star_icon} alt="" className='w-3 5'/>
           <img src={assets.star_icon} alt="" className='w-3 5'/>
           <img src={assets.star_icon} alt="" className='w-3 5'/>
           <img src={assets.star_icon} alt="" className='w-3 5'/>
           <img src={assets.star_dull_icon} alt="" className='w-3 5'/>
           <p className='pl-2'>(122)</p>
         </div>
         <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
         <p className='mt-5 text-gray-400 md:w-4/5'>{productData.description}</p>
         <div className='flex flex-col gap-4 my-8'>
           <p>Select size</p>
           <div className='flex gap-2 h-auto w-auto p-2 justify-start items-center'> 
              {
                productData.sizes.map((item, index) => (
                  <button onClick={()=>setSize(item)} className={`${item === size ? 'bg-orange-500' : ''} border text-center py-2 px-2`} key={index}>{item}</button>
                ))
              }
           </div>
         </div>
         <button onClick= {()=>{addToCart(productData._id,size)}}className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
         <hr className='mt-8 sm:w-4/5 '></hr>
         <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
          <p>100% Original Product</p>
          
          <p>Easy 30 days return</p>

          <p>Free Shipping</p>

         </div>
       </div>
     </div>

     {/* Description and Review Status */}
     <div className='mt-10'>
       <div className='flex'>
          <b className='border px-5 py-3 text-sm'> 
            Description
          </b>
          <p className='border px-5 py-3 text-sm'>Reviews (122) </p>
       </div>
       <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae porro, consectetur maiores reprehenderit distinctio aliquid, fugit tempora recusandae, adipisci culpa nihil cum voluptatum aliquam. Veritatis tempore omnis eveniet sunt ab?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam saepe, impedit similique fugiat dolorem a nihil tempore omnis obcaecati magni explicabo praesentium repellat modi repellendus veniam quasi at id cupiditate.</p>
       </div>
     </div>

     {/* Display Related Products */}
     <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product