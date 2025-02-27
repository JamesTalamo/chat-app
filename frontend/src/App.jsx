
import { Routes, Route, Navigate } from "react-router-dom"
import Loading from "./pages/loading/Loading.jsx"

import RegisterPage from "./pages/register/RegisterPage.jsx"
import LoginPage from "./pages/login/LoginPage.jsx"

import ProfilePage from "./pages/profilePage/ProfilePage.jsx"

import Sidebar from './components/sidebar/Sidebar.jsx'

import MainPage from './pages/mainPage/MainPage.jsx'

import { useAuthStore } from "./store/useAuthStore.js"

import { useEffect } from "react"

import { Toaster } from "react-hot-toast"


function App() {

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])


  if (isCheckingAuth && !authUser) return (
    <div className='w-full h-[100vh] flex items-center justify-center'>
      <Loading />
    </div>
  )
  return (
    <div className='w-screen h-dvh flex justify-center items-end'>

      {authUser && <Sidebar />}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: '',
          style: {
            border: '1px solid #000000',
            padding: '16px',
            color: '#713200',
          },
        }}
      />

      <Routes>
        <Route path='/' element={authUser ? <MainPage /> : <Navigate to='/login' />} />
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <LoginPage />} />
        <Route path='/register' element={authUser ? <Navigate to='/' /> : < RegisterPage />} />

        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to='/' />} />



      </Routes>
    </div>
  )
}

export default App
