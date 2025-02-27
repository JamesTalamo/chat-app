import React from 'react'
import { useState } from 'react'
import { Link } from "react-router-dom";

import { useAuthStore } from '../../store/useAuthStore.js';

import { toast } from 'react-hot-toast'

const LoginPage = () => {

  const { loginAuth } = useAuthStore()

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })



  let submitForm = async (e) => {
    e.preventDefault()
    const res = await loginAuth(formData)
    { res.message?.success && toast.success(res.message?.success) }
    { res.message?.error && toast.error(res.message?.error) }
  }

  let handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }



  return (
    <div className='w-screen h-dvh bg-gray-800 relative flex items-center justify-center'>

      <div className='w-[370px] z-[10]  flex items-center justify-center flex-col p-5'>
        <div className='font-bold text-black text-[25px] text-white'>Log in with your account</div>

        <form type='submit' className='w-[100%]  flex items-center justify-center flex-col gap-4 pt-5' onSubmit={submitForm}>
          <input type="text" placeholder="Username" className="input input-bordered w-full max-w-xs bg-white text-black" name='username' onChange={handleInputChange} />
          <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs bg-white text-black" name='password' onChange={handleInputChange} />
          <button className="btn btn-neutral bg-black w-[97%]">Login</button>
        </form>
        <div className='pt-10 text-black'>Don't have an account? Register!</div>

        <Link to='/register'>
          <button className="btn btn-sm text-black">Register</button>
        </Link>

      </div>
    </div>
  )
}

export default LoginPage