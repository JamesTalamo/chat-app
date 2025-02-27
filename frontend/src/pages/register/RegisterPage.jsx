import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { toast } from 'react-hot-toast'

import { useAuthStore } from '../../store/useAuthStore.js'

const RegisterPage = () => {
    let { registerAuth, isSigningUp, errorMsg } = useAuthStore()

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    useEffect(() => {
        if (isSigningUp) {
            toast.success('User has been created')
            navigate('/')
        }
    }, [isSigningUp])

    useEffect(() => {
        toast.error({ errorMsg })
    }, [errorMsg])

    let submitForm = (e) => {
        e.preventDefault()
        registerAuth(formData)

        console.log(errorMsg)
    }

    let handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className='w-screen h-dvh bg-white relative flex items-center justify-center'>

            <div className='w-[370px] z-[10]  flex items-center justify-center flex-col p-5'>
                <div className='font-bold text-black'>Create Your Account</div>

                <form type='submit' className='w-[100%]  flex items-center justify-center flex-col gap-4 pt-5' onSubmit={submitForm}>
                    <input type="text" placeholder="Username" className="input input-bordered w-full max-w-xs bg-white text-black" name='username' onChange={handleInputChange} />
                    <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs bg-white text-black" name='password' onChange={handleInputChange} />

                    <button className="btn btn-neutral bg-black w-[97%]">Register</button>
                </form>
                <div className='text-red-500 mt-5'>{errorMsg}</div>
                <div className='pt-5 text-black'> Already have an account? Login! </div>

                <Link to='/login'>
                    <button className="btn btn-sm" >Login</button>
                </Link>

            </div>
        </div>
    )
}

export default RegisterPage