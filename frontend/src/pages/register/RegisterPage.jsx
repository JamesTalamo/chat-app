import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { toast } from 'react-hot-toast'

import { useAuthStore } from '../../store/useAuthStore.js'

const RegisterPage = () => {
    let { registerAuth } = useAuthStore()

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    let submitForm = (e) => {
        e.preventDefault()
        registerAuth(formData)

    }

    let handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className='w-screen h-dvh bg-[#8BABD8] relative flex items-center justify-center'>

            <div className='w-[370px] z-[10]  flex items-center justify-center flex-col p-5'>
                <div className='font-bold text-black text-[25px] z-10'>Create Your Account</div>
                <div className="absolute w-full h-full  bg-[url('/authAssets/bg_print.png')] bg-cover bg-center"></div> {/*Background image */}


                <form type='submit' className='w-[100%]  flex items-center justify-center flex-col gap-4 pt-5 z-10' onSubmit={submitForm}>
                    <input type="text" placeholder="Username" className="input input-bordered w-full max-w-xs bg-white text-black" name='username' onChange={handleInputChange} />
                    <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs bg-white text-black" name='password' onChange={handleInputChange} />

                    <button className="btn btn-neutral bg-black w-[97%]">Register</button>
                </form>
                <div className='text-black text-[16px]'> Already have an account? Login! </div>

                <div className='z-10'>
                    <Link to='/login'>
                    <button className="btn btn-soft btn-sm text-black ">Login</button>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default RegisterPage