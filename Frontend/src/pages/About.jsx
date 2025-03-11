import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center border-t mt-16'>
        <Title text1={'ABOUT '} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} className='w-full max-w-[450px]'/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, officia? Illum quibusdam amet delectus dolor fugit at voluptatibus architecto reiciendis reprehenderit omnis, rerum qui totam. Nobis officiis architecto nulla totam!</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, officia? Illum quibusdam amet delectus dolor fugit at voluptatibus architecto reiciendis reprehenderit omnis, rerum qui totam. Nobis officiis architecto nulla totam!</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla dolor quisquam non unde, eligendi fugiat maxime minus nobis, ut praesentium vitae ullam, illo assumenda qui facilis sapiente aliquam accusamus doloribus!</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY '} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20 gap-2'>
         <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b className='text-md'>Quality Assurance</b>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam mollitia blanditiis ad non atque eaque qui sequi illum culpa totam dolore ex dicta, dolores voluptate deserunt. Nostrum aut natus numquam.</p>
         </div>

         <div className=' border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b className='text-md '>Convenience</b>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam mollitia blanditiis ad non atque eaque qui sequi illum culpa totam dolore ex dicta, dolores voluptate deserunt. Nostrum aut natus numquam.</p>
         </div>

         <div className=' border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b className='text-md'>Exceptional Customer Service</b>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam mollitia blanditiis ad non atque eaque qui sequi illum culpa totam dolore ex dicta, dolores voluptate deserunt. Nostrum aut natus numquam.</p>
         </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default About