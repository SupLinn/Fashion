import React, { useContext } from 'react'
import { useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
const PlaceOrder = () => {
//just adding some useless code here
  const a= useState(0);
  //using navigate to set the path to orders page
  const {navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, deliveryCharge, products} = useContext(ShopContext)
  const [method, setMethod]= useState('cod')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setFormData(data => ({...data, [name]: value}))
      
  }

  const onSubmitHandler = async (e) => {
     e.preventDefault();
     
     try{
          let orderItems= []
          for(const items in cartItems)
          {
            for(const item in cartItems[items])
            {
              if(cartItems[items][item]>0)
              {
                const itemInfo = structuredClone(products.find( product => product._id === items))
                if(itemInfo)
                {
                  itemInfo.size = item;
                  itemInfo.quantity = cartItems[items][item]
                  orderItems.push(itemInfo)
                }
              }
            }
          }
          //console.log(orderItems)

          let orderData = {
            address: formData,
            items: orderItems,
            amount: getCartAmount() + deliveryCharge
          }
          console.log("payment method: ", method)
          switch(method)
          {
            case 'cod' : 
            const response = await axios.post(backendUrl+'/api/order/place', orderData, {headers: {token}})
            console.log("api response: ", response.data)
            if( response.data.success)
            {
              setCartItems({})
              navigate('/orders')
            }
            else
            {
              toast.error(response.data.message)
            }
            break;

            case 'stripe': 
             const responseStripe = await axios.post(backendUrl+'/api/order/stripe', orderData, {headers: {token}})
             if(responseStripe.data.success)
             {
               const {session_url} = responseStripe.data
               window.location.replace(session_url)
             }
             else
             {
               toast.error(responseStripe.data.message)
             }
             break;

            default:
              break;
          }
     }
     catch(e)
     {
        console.log(e)
        toast.error(e.message)
     }
  }
  
  return (
    //adding code for palce order page
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
        {/* Left Side */}
      <div className='flex flex-col gap-4 sm:max-w-[480px]'>
         <div className='text-xl sm:text-2xl my-3'>
            <Title text1={'DELIVERY'} text2={'INFORMATION'} />
         </div>

         <div className='flex gap-3'>
            <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} placeholder='First Name' className='border border-gray-300 rounded py-1.5 px-1.5 w-full' type="text"  id="" />
            <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} placeholder='Last Name' className='border border-gray-300 rounded py-1.5 px-1.5 w-full' type="text"  id="" />
            </div> 
            
            <input required onChange={onChangeHandler} name='email' value={formData.email} placeholder='Email' className='border border-gray-300 rounded py-1.5 px-1.5 w-full' type="email"  id="" />
            <input required onChange={onChangeHandler} name='street' value={formData.street} placeholder='Street' className='border border-gray-300 rounded py-1.5 px-1.5 w-full' type="text"  id="" />
           
            <div className='flex gap-3'>
            <input required onChange={onChangeHandler} name='city' value={formData.city} placeholder='City' className='border border-gray-300 rounded py-1.5 px-1.5 w-full' type="text"  id="" />
            <input required onChange={onChangeHandler} name='state' value={formData.state} placeholder='State' className='border border-gray-300 rounded py-1.5 px-1.5 w-full' type="text"  id="" />
            </div> 

            <div className='flex gap-3'>
            <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} placeholder='Pincode' className='border border-gray-300 rounded py-1.5 px-1.5 w-full' type="text"  id="" />
            <input required onChange={onChangeHandler} name='country' value={formData.country} placeholder='Country' className='border border-gray-300 rounded py-1.5 px-1.5 w-full' type="text"  id="" />
            </div> 

            
            <input required onChange={onChangeHandler} name="phone" value={formData.phone} className='border border-gray-300 rounded py-1.5 px-1.5 w-full' type="number" placeholder='Phone Number' id="" />
           
           
         
      </div>
         {/* Right Side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
         <CartTotal/>
        </div>

        <div className='mt-12 text-2xl'>
          <Title text1={'PAYMENT'} text2={'METHODS'}/>
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={()=>setMethod('stripe')} className={`${method==='stripe' ? 'bg-green-200' : ''} flex items-center gap-3 border p-2 px-3 cursor-pointer`}>
              
              <img src={assets.stripe_logo} className='h-5 mx-4'/>
            </div>

            <div onClick={()=>setMethod('razorpay')} className={`${method==='razorpay' ? 'bg-green-200' : ''} flex items-center gap-3 border p-2 px-3 cursor-pointer`}>
             
              <img src={assets.razorpay_logo} className='h-5 mx-4'/>
            </div>

            <div onClick={()=>setMethod('cod')} className={`${method==='cod' ? 'bg-green-200' : ''} flex items-center gap-3 border p-2 px-3 cursor-pointer`}>
              
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
 
            <div className='w-full text-end mt-10'>
             <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
            </div>

        </div>
      </div>
    </form>
  )
}

export default PlaceOrder