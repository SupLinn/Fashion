import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
const Add = ({token}) => {

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [subCategory, setSubcategory] = useState('')
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try
    {
       const formData = new FormData()
       formData.append("name", name);
       formData.append("description", description);
       formData.append("price", price);
       formData.append("category", category);
       formData.append("subCategory", subCategory);
       formData.append("bestseller", bestseller);
       formData.append("sizes", JSON.stringify(sizes));

       image1 && formData.append("image1", image1)
       image2 && formData.append("image2", image2)
       image3 && formData.append("image3", image3)
       image4 && formData.append("image4", image4)

       const response = await axios.post(backendUrl + "/api/product/add", formData, {headers:{token}})
       
       if(response.data.success)
       {toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
       }
       else{
        toast.error(response.data.message)
       }
       
       
    }
    catch(error)
    {
       console.log(error)
       toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2 font-medium text-xl'>Upload Images</p>
        <div className='flex gap-4'>
          <label htmlFor="image1">
            <img className='w-20'src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}></img>
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>

          <label htmlFor="image2">
            <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}></img>
            <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>

          <label htmlFor="image3">
            <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}></img>
            <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>

          <label htmlFor="image4">
            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}></img>
            <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className='mt-2 w-full'>
        <p className='font-medium text-xl mb-2'>Product Name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full max-w-[500px] border border-gray-300 rounded-md px-3 py-2' placeholder='Type Here' required />
      </div>

      <div className='mt-2 w-full'>
        <p className='font-medium text-xl mb-2'>Product Description</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description} type="text" className='w-full max-w-[500px] border border-gray-300 rounded-md px-3 py-2' placeholder='Type Here' required />
      </div>

      <div className='flex flex-col sm:flex-row sm:gap-4 gap-2 w-full'>
        <div className='mb-3'>
          <p className='font-medium text-xl mb-2'>Product Category</p>
          <select onChange={(e)=>setCategory(e.target.value)} className='px-3 py-2 border border-gray-300 rounded-md'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className='mb-3'>
          <p className='font-medium text-xl mb-2'>Product Subcategory</p>
          <select onChange={(e)=>setSubcategory(e.target.value)} className='px-3 py-2 border border-gray-300 rounded-md'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div className='mb-3'>
          <p className='font-medium text-xl mb-2'>Product Price</p>
          <input onChange={(e)=>setPrice(e.target.value)} value={price} className='px-3 py-2 border border-gray-300 rounded-md' type="number" placeholder='Type Here' required />
        </div>
      </div>

      <div className='mb-3'>
        <p className='font-medium text-xl mb-2'>Product Sizes</p>
        <div className='flex flex-row gap-3'>
          <div onClick={()=>setSizes(prev => prev.includes("S") ? prev.filter((item) => item!=="S") : [...prev, "S"])}>
            <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-300" } px-3 py-1 cursor-pointer`}>S</p>
          </div>

          <div onClick={()=>setSizes(prev => prev.includes("M") ? prev.filter((item) => item!=="M") : [...prev, "M"])}>
            <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-300" } px-3 py-1 cursor-pointer`}>M</p>
          </div>

          <div onClick={()=>setSizes(prev => prev.includes("L") ? prev.filter((item) => item!=="L") : [...prev, "L"])}>
            <p className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-300" } px-3 py-1 cursor-pointer`}>L</p>
          </div>

          <div onClick={()=>setSizes(prev => prev.includes("XL") ? prev.filter((item) => item!=="XL") : [...prev, "XL"])}>
            <p className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-300" } px-3 py-1 cursor-pointer`}>XL</p>
          </div>

          <div onClick={()=>setSizes(prev => prev.includes("XXL") ? prev.filter((item) => item!=="XXL") : [...prev, "XXL"])}>
            <p className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-300" } px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div>

      <div className='flex gap-2 items-center'>
        <input onChange={()=>setBestseller(prev => !prev)} checked={bestseller} className='w-5 h-5'type="checkbox" id="bestseller"/>
        <label className=' cursor-pointer font-medium text-xl' htmlFor="bestseller">Add to Bestsellers</label>
      </div>

      <button type="submit" className='w-1/3 py-2 px-3 mt-4 bg-black text-white rounded-md'>ADD PRODUCT</button>
    </form>
  )
}

export default Add