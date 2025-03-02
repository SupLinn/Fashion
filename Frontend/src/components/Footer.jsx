import React from 'react'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-row sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div className='flex flex-col gap-4'>
                <h1 className='text-xl font-bold'>About Us</h1>
                <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.</p>
            </div>
            <div className='flex flex-col gap-4'>
                <h1 className='text-xl font-bold'>Contact Us</h1>
                <p className='text-gray-600'>123 Main Street</p>
                <p className='text-gray-600'>City, State 12345</p>
                <p className='text-gray-600'></p>
           </div>
        </div>
        <div>
          <hr />
          <p className='py-5 text-sm text-center'>Copyright 2025@ fashion.com - All Right Reserved.</p>
        </div>   

    </div>
  )
}

export default Footer