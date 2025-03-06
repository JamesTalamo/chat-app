import React from 'react'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

import { useAuthStore } from '../../store/useAuthStore.js'

const ProfilePage = () => {

  const { authUser, updateUser, isUpdatingProfile } = useAuthStore()

  const [formData, setFormData] = useState({
    username: "",
    profile: ""
  })

  let handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  let handleSubmit = (e) => {
    e.preventDefault()

    updateUser(formData)
  }

  useEffect(() => {
    if (isUpdatingProfile) {
      toast.success('user has been updated.')
    }
  }, [isUpdatingProfile])

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, profile: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='w-[100%] h-[100%]   flex items-center justify-center'>

      <div className='h-[100%] w-[100%]   flex items-center justify-start flex-col     bg-red-500 '>

        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src={authUser.profile !== '' ? authUser.profile : './avatar.jpg'} />
          </div>
        </div>



        <form type='submit' onSubmit={handleSubmit}>


          <input type="file" className="file-input file-input-ghost w-full max-w-xs text-white" name='profile' onChange={handleImgChange} />

          <label className="input input-bordered flex items-center gap-2 mt-[5px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input type="text" className="grow" placeholder={authUser.username} name='username' onChange={handleInputChange} />
          </label>

          <button className="btn btn-active btn-neutral w-[100%]">Submit</button>

        </form>

      </div>

    </div >
  )
}

export default ProfilePage