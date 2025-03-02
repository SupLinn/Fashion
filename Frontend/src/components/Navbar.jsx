import React,{useContext} from 'react'
import  {useState}  from 'react'
import assets from '../assets/assets'
import { Link,NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'


const Navbar = () => {
  const [visible, setVisible] = useState(false)

  const {setShowSearch} = useContext (ShopContext)
   return (
    <div className='flex items-center justify-between py-5 font-medium'>

       <Link to='/'>
         <img src={assets.logo} className='w-36' alt="" />
       </Link> 

       <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
          <NavLink to='/' className='flex flex-col items-center gap-1'>
             <p>HOME</p>
             <hr className='hidden w-1/2 border-none h-[1.5px] bg-gray-700'/>
          </NavLink>

          <NavLink to='/collection' className='flex flex-col items-center gap-1'>
             <p>COLLECTION</p>
             <hr className='hidden w-1/2 border-none h-[1.5px] bg-gray-700'/>
          </NavLink>

          <NavLink to='/about' className='flex flex-col items-center gap-1'>
             <p>ABOUT</p>
             <hr className='hidden w-1/2 border-none h-[1.5px] bg-gray-700'/>
          </NavLink>

          <NavLink to='/contact' className='flex flex-col items-center gap-1'>
             <p>CONTACT</p>
             <hr className='hidden w-1/2 border-none h-[1.5px] bg-gray-700'/>
          </NavLink>
       </ul>

       <div className='flex items-center gap-6'>
            <img onClick={()=> setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt=""/>

            <div className='group relative'> 
                <img className='w-5 cursor-pointer' src={assets.profile_icon} alt=""/> 
                  <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                  <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-300 text-gray-700 rounded'>
                     <p className='cursor-pointer hover:text-black'>My Profile</p>
                     <p className='cursor-pointer hover:text-black'>Orders</p>
                     <p className='cursor-pointer hover:text-black'>Logout</p>
                  </div>
                </div>
                
            </div>

            <Link to='/cart' className='relative'>
               <img src={assets.cart_icon} className='w-5 min-w-5' alt=""/>
               <p className=' absolute right-[-5px] bottom-[-5px] bg-black w-4 text-center leading-4 rounded-full aspect-square text-white text-[8px]'>15</p>
            </Link>
            <img onClick={()=>setVisible(true)} src={assets.menu_icon} alt="" className='w-5 sm:hidden cursor-pointer'/>
       </div>

       {/* Sidebar menu for small screens */}
       <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${ visible ? 'w-full' : 'w-0'}`}>
            <div className='flex flex-col text-gray-600 '>
               <div onClick={()=> setVisible(false)} className='flex items-center cursor-pointer gap-4 p-3'>
                  <img src={assets.dropdown_icon} alt="" className='h-4 rotate-180'/>
                  <p>Back</p>
               </div>
              
               <NavLink onClick={()=>{setVisible(false)}} to='/' className='py-2 pl-6 border'>HOME</NavLink>
               <NavLink onClick={()=>{setVisible(false)}} to='/collection' className='py-2 pl-6 border'>COLLECTION</NavLink>
               <NavLink onClick={()=>{setVisible(false)}} to='/about' className='py-2 pl-6 border'>ABOUT</NavLink>
               <NavLink onClick={()=>{setVisible(false)}} to='/contact' className='py-2 pl-6 border'>CONTACT</NavLink>
            </div>
       </div>
    </div>
  )
}

export default Navbar