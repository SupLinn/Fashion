import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
       <div className='text-center text-2xl pt-10 border-t'>
         <Title text1={'CONTACT'} text2={'US'}/>
       </div>
       
        <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
          <img className='w-full md:max-w-[480px]' src={assets.contact_img} />
          <div className='flex flex-col justify-center items-start gap-4 md:w-1/2 text-gray-600'>
            <p className='text-xl font-semibold text-gray-600'>Our Store</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptate.</p>
            <p>Phone: +123 456 789</p>
            <p>Email: jkl@gmail.com</p>
            <p>Address: 123 Main St, New York, NY 10001</p>
            <p className='font-semibold text-xl text-gray-600'>Careers at Forever</p>
            <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white'>Explore Jobs</button>
          </div>
        </div>  
        <NewsletterBox/>
    </div>
  )
}

export default Contact