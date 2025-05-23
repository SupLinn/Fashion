import React from 'react'
import {Routes, Route} from 'react-router-dom'
import  Home  from './pages/Home'
import  About  from './pages/About'
import  Collection  from './pages/Collection'
import  Contact  from './pages/Contact'
import  Product  from './pages/Product'
import  Cart  from './pages/Cart'
import  Login  from './pages/Login'
import  PlaceOrder  from './pages/PlaceOrder'
import Navbar  from './components/Navbar'
import Footer from './components/Footer'
import SearchBox from './components/SearchBox'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Orders from './pages/Orders'
import Verify from './pages/Verify'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar/>
      <SearchBox/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/collection' element={<Collection/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/product/:productId' element={<Product/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/placeOrder' element={<PlaceOrder/>} />
        <Route path='/verify' element={<Verify/>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App