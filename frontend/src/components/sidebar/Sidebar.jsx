
import { useAuthStore } from "../../store/useAuthStore"

import { Link } from "react-router-dom"

import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaSignOutAlt } from "react-icons/fa";



import ProfilePage from "../../pages/profilePage/ProfilePage";


const Sidebar = () => {

    let { authUser, logoutAuth } = useAuthStore()

    let handleLogout = () => {
        logoutAuth()
        window.location.reload()
    }


    return (
        <div className=' h-[100%] w-[15%] left-0 bottom-0 z-50 flex flex-col gap-[15px]  items-center justify-end bg-white py-[5%]'>


            <Link to='/' className='btn w-[50%] '>
                <FaHome color='black' size={20} />
                <div className=' font-bold text-black'>HOME</div>
            </Link>

            <button className="btn w-[50%]" onClick={() => document.getElementById('my_modal_1').showModal()}>
                <CgProfile color="black" size={20} /> Edit Profile
            </button>

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box w-[50vw] h-[70vh] flex-col flex items-center justify-center">


                    < ProfilePage />

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>

                </div>
            </dialog>

            <div className='btn w-[50%] cursor-pointer mx-[5px]' onClick={handleLogout}>
                <FaSignOutAlt color="black" size={20} />
                logout
            </div>


        </div>
    )
}

export default Sidebar