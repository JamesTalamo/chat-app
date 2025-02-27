
import { useAuthStore } from "../../store/useAuthStore"

import { Link } from "react-router-dom"

import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaSignOutAlt } from "react-icons/fa";


const Sidebar = () => {

    let { authUser, logoutAuth } = useAuthStore()

    let handleLogout = () => {
        logoutAuth()
    }


    return (
        <div className=' h-[90px] w-[100%] fixed left-0 bottom-0 z-10 flex flex-row  items-center justify-start bg-gray-800'>


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


        </div>
    )
}

export default Sidebar