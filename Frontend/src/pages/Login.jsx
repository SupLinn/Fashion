import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const [currState, setCurrState] = useState('Login')
  const {token, setToken, navigate, backendUrl} = useContext(ShopContext)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const onSubmitHandler = async (e) => {
    //console.log("sign up button clicked")
    e.preventDefault()
    try{
          if(currState==='Sign Up')
          {  //console.log("sign up api now being called")
             const response = await axios.post(backendUrl+'/api/user/register', {name, email, password})
             //console.log(response.data)
             if(response.data.success)
              {setToken(response.data.token)
              localStorage.setItem('token', response.data.token)}
             else
             {
               toast.error(response.data.message)
             } 
          }
          else
          {
            
                 const response = await axios.post(backendUrl+'/api/user/login', {email, password})
                 //console.log(response.data)
                 if(response.data.success)
                  {setToken(response.data.token)
                  localStorage.setItem('token', response.data.token)}
                 else
                 {
                   toast.error(response.data.message)
                 } 
          }
    }
    catch(e)
    {
       console.log(e)
       toast.error(e.message)
    }
  }

  useEffect(()=>
  {
    if(token)
      navigate('/')
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 '>
      <div className='inline-flex gap-2 mb-2 mt-10 items-center'>
        <p className='prata-regular text-3xl'>{currState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'></hr>
      </div>
      
      {currState ==='Login' ? '' : <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required></input>}
      <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required></input>
      <input onChange={(e)=>setPassword(e.target.value)} value={password} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required></input>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
      {currState ==='Login' ? <p className='cursor-pointer'>Forgot your password?</p> : ''}  
      {currState ==='Login' ? <p onClick={()=>setCurrState('Sign Up')} className='cursor-pointer'>Create an account</p> : <p onClick={()=>setCurrState('Login')} className='cursor-pointer'>Already have an account?</p>}
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default  Login