import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-4 text-center py-2 mb-12' >
      
      <div>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5' />
        <p className='text-lg font-semibold'>Easy Exchange Policy</p>
        <p className='text-sm text-gray-600'>Hassle free exchanges.</p>
      </div>

      <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5' />
        <p className='text-lg font-semibold'>30 Days Return</p>
        <p className='text-sm text-gray-600'>Hassle free returns.</p>
      </div>

      <div>
        <img src={assets.support_img} className='w-12 m-auto mb-5' />
        <p className='text-lg font-semibold'>Best Customer Support</p>
        <p className='text-sm text-gray-600'>Hassle free customer support.</p>
      </div>
    </div>
  )
}

export default OurPolicy