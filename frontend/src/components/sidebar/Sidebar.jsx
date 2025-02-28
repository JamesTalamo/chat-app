
import { useAuthStore } from "../../store/useAuthStore"

import { Link } from "react-router-dom"

import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaSignOutAlt } from "react-icons/fa";


const Sidebar = () => {

    let { authUser, logoutAuth } = useAuthStore()

    let handleLogout = () => {
        logoutAuth()
        window.location.reload()
    }


    return (
        <div className=' h-[70px] w-[100%] fixed left-0 bottom-0 z-10 flex flex-row  items-center justify-start bg-gray-800'>


            <Link to='/' className='w-[150px] h-[50px] bg-gray-600 rounded-xl flex items-center justify-around cursor-pointer mx-[5px]'>
                <FaHome color='white' size={20} />
                <div className='text-white font-bold'>HOME</div>
            </Link>

            <Link to='/profile' className='w-[150px] h-[50px] bg-gray-600 rounded-xl flex items-center justify-around cursor-pointer mx-[5px]'>
                <CgProfile color='white' size={20} />
                <div className='text-white font-bold'>PROFILE</div>
            </Link>



            <div className='w-[150px] h-[50px] bg-gray-600 rounded-xl flex items-center justify-around cursor-pointer mx-[5px]' onClick={handleLogout}>
                <FaSignOutAlt color='white' size={20} />
                <div className='text-white font-bold'>LOGOUT</div>

            </div>

            <div className='absolute right-[5%] w-[150px] h-[100%] flex items-center justify-around'>
                <div className='font-bold text-white'>{authUser?.username}</div>

                <div className="avatar">
                    <div className="w-10 rounded-full">
                        <img src={authUser.profile !== '' ? authUser.profile : './mypic.jpg'} />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Sidebar