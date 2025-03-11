import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
// import axios from 'axios';
//import { set } from 'mongoose';

const Orders = () => {

  const {currency, products} = useContext(ShopContext);
  // const [orderData, setOrderData] = useState([])
  // const loadOrderData = async () => {
  //   try{
  //        if(!token)
  //         return null;
  //       else
  //        {
  //          const response= await axios.post(backendUrl+'/api/order/userorders', {}, {headers: {token}})
  //          console.log(response.data)
  //          if(response.data.success)
  //          {
  //           let allOrdersItem= []
  //           response.data.orders.map((order)=>{
  //             order.items.map((item)=>{
  //               item['status'] = order.status
  //               item['payment'] = order.payment
  //               item['paymentMethod'] = order.paymentMethod
  //               item['date'] = order.date
  //               allOrdersItem.push(item)
  //             })
  //           })
  //           console.log(allOrdersItem)
  //           setOrderData(allOrdersItem.reverse())
  //          }
  //        }
  //   }
  //   catch(e)
  //   {
  //       console.log(e)
  //   }
  // }

  // useEffect(()=> {
  //    loadOrderData()
  // }, [token])
  return (
    <div className='broder-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>
      
      <div>
        { 
          products.slice(1,4).map((item, index)=> (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                 <img src={item.image[0]} className='w-16 sm:w-20'/>
                 <div>
                   <p className='sm:text-base font-medium'>{item.name}</p>
                   <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                     <p className='text-lg'>{currency}{item.price}</p>
                     <p>Quantity: 1</p>
                     <p>Size: M</p>
                   </div>
                   <p className='mt-2'>Purchase Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                   {/* <p className='mt-2'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p> */}
                 </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                 <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm text-base'>Ready to ship</p>
                 </div>
                 <button className='text-sm text-gray-700 border border-gray-300 rounded py-1.5 px-3'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
      
    </div>
  )
}

export default Orders