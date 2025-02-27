
import { useAuthStore } from "../../store/useAuthStore"

import { Link } from "react-router-dom"

const Sidebar = () => {

    let { logoutAuth } = useAuthStore()

    let handleLogout = () => {
        logoutAuth()
    }


    return (
        <div className=' h-full w-[80px] fixed left-0 top-0 z-10 flex flex-col items-center justify-around bg-gray-800'>
            <div className='w-[100%] h-[60%] flex items-center justify-center flex-col gap-1'>

                <Link to='/' className='w-[50px] h-[50px] bg-black rounded-lg cursor-pointer' />
                <Link to='/profile' className='w-[50px] h-[50px] bg-black rounded-lg cursor-pointer' />


            </div>

            <div className='w-full mb-[30%] flex items-center justify-center '>

                <div className="dropdown dropdown-right dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1  bg-black"></div>

                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow outline outline-[1px] outline-[rgba(0,0,0,0.4)]">
                        <li className='text-red-600 font-bold' onClick={handleLogout}><a>Logout</a></li>
                    </ul>

                </div>

            </div>
        </div>
    )
}

export default Sidebar