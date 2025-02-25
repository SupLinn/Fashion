import React from 'react'

const NewsletterBox = () => {
    const onSubmit = (e) => {
        e.preventDefault();
    }
  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off!</p>
      <p className='text-gray-400 mt-3 mb-2'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia cupiditate similique corporis ab labore reiciendis veritatis vel. Omnis dolorem ipsa dolorum at fugit totam officia, explicabo, aliquid ea sapiente cumque?
      </p>

      <form onSubmit={onSubmit} className='w-fit md:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input type='email' placeholder='Enter your email address' className=' sm:flex-1 w-full ' required />
        <button className='bg-black text-white p-2  text-xs px-10 py-4' type='submit'>Subscribe</button>
      </form>
    </div>
  )
}

export default NewsletterBox