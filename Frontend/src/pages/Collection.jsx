import React, { useEffect } from 'react'
import { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collections = () => {
  const {products, search, showSearch} = useContext(ShopContext);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevance');


  const applyFilters = () => {
    let tempProducts = [...products];

    if(category.length>0)
    {
      tempProducts = tempProducts.filter( item => category.includes(item.category))
    }

    if(subCategory.length>0)
      {
        tempProducts = tempProducts.filter( item => subCategory.includes(item.subCategory))
      }

    // if( search.length>0)
    //     {
    //       tempProducts = tempProducts.filter( item => item.name.toLowerCase().includes(search.toLowerCase()))
    //     }  

    setFilteredProducts(tempProducts)
  }

  const sortProducts = (e) => {
    let tempProducts2 = [...filteredProducts]
    switch(sortType){
       case 'low-high':
         setFilteredProducts(tempProducts2.sort((a,b)=>(a.price - b.price)))
          break;
       case 'high-low':
          setFilteredProducts(tempProducts2.sort((a,b)=>(b.price - a.price)))
            break;
       default:
          applyFilters()        
          break;
    }
    //setFilteredProducts(tempProducts2)
  }

  useEffect(() => {
    applyFilters();
    sortProducts();
  },[category, subCategory, search, products])

  useEffect(() => {
    applyFilters();
    sortProducts();
  },[sortType, category, subCategory])

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)){
      setCategory(category.filter(item => item !== e.target.value))
  }
  else{
    setCategory([...category, e.target.value])
  }
}

const toggleSubCategory = (e) => {
  if(subCategory.includes(e.target.value)){
    setSubCategory(subCategory.filter(item => item !== e.target.value))
}
else{
  setSubCategory([...subCategory, e.target.value])
}
}
  return (
    <div className='flex flex-col sm:flex-row  gap-1 sm:gap-10 pt-10 border-t'>

      {/* Filter Options */}
      <div className='min-w-60 '>
         <div className='flex flex-row items-center cursor-pointer '>
           <p onClick={()=>setShowFilters(!showFilters)} className='my-2 text-xl flex flex-row items-center cursor-pointer gap-2'>FILTERS</p>
           <img onClick={()=>setShowFilters(!showFilters)} className={`h-3 ml-2 sm:hidden cursor-pointer ${showFilters ? '-rotate-90' : 'rotate-90' }`} src={assets.dropdown_icon}/>
         </div>
         
          
          {/* Category Filter */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilters ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
              <input type='checkbox' value={"Men"} onChange={toggleCategory} className='mr-2'/>Men
              </p>

              <p className='flex gap-2'>
              <input type='checkbox' value={"Women"} onChange={toggleCategory} className='mr-2'/>Women
              </p>

              <p className='flex gap-2'>
              <input type='checkbox' value={"Kids"} onChange={toggleCategory} className='mr-2'/>Kids
              </p>
            </div>
          </div> 

          {/* Sub-category Filter */}
          <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilters ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>TYPES</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
              <input type='checkbox' value={"Topwear"} onChange={toggleSubCategory} className='mr-2'/>Topwear
              </p>

              <p className='flex gap-2'>
              <input type='checkbox' value={"Bottomwear"} onChange={toggleSubCategory} className='mr-2'/>Bottomwear
              </p>

              <p className='flex gap-2'>
              <input type='checkbox' value={"Winterwear"} onChange={toggleSubCategory} className='mr-2'/>Winterwear
              </p>
            </div>
          </div> 
      </div>

      {/* Products */}
      <div className='flex-1'>
        
        {/* Title */}
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title  text1={'ALL'} text2={'COLLECTIONS'}/>
          {/* Product Sorting */}
          <select onChange= {(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value='relevance'>Sort By Relevance</option>
            <option value='low-high'>Sort As Low to High</option>
            <option value='high-low'>Sort As High to Low</option>
          </select>
        </div>

        {/* Product Items */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filteredProducts.map((item, index) => (
              <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collections