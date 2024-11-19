import React from 'react'
import { Link } from 'react-router-dom'
import { useState,useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
<ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"

/>
const Login = () => {
  const [form,setform]=useState({username:'',password:''})
  const Navigate=useNavigate()
  const handlechange=(e)=>{
    setform({...form,[e.target.name]:e.target.value})
  }
  const userlogin=async()=>{
    const response=await fetch("http://localhost:3000/login",{ method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form }) })
    if(response.ok){
      toast.success('You are active!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        
        });
        Navigate('/')
    }
    else{
      toast.error('Username or password is incorrect!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        
        });
    }
  }
  return (
    <div style={{ backgroundColor: '#0a0e27' }} className='min-h-screen flex'>

      <div className='w-1/2 m-auto h-96 backdrop-blur-lg bg-white flex text-white'>
        <div className='w-1/2 text-black'>
          <div className='h-32 text-center flex items-center justify-center'>
            <h2 className='text-3xl underline font-bold'>Login</h2>
          </div>
          <div className='flex flex-col gap-5 '>
            <input type="text" value={form.username} onChange={handlechange} className='=border-none  border-black bg-gray-100 w-72 mx-5 py-1.5 px-2 rounded-full' placeholder='Enter username' name='username' />
            <input type="text" value={form.password} onChange={handlechange} className='border-black bg-gray-100 w-72 mx-5 py-1.5 px-2 rounded-full' placeholder='Enter password' name='password' />
          </div>
          <div className='text-center mt-3'>
          <button style={{ backgroundColor: '#0a0e40' }}
          onClick={()=>{userlogin()}}
                            type="button"
                            className="text-white    font-medium rounded-full w-72 text-sm px-5 py-2.5 text-center mt-5 me-5 mb-2"
                        >
                            Login
                        </button>
          </div>
          <span className='mx-8'>Want to <span className='text-blue-400 underline cursor-pointer'>Login</span> as Admin?</span>
          
        </div>
        <div className='w-1/2 flex justify-center items-center' style={{ backgroundColor: '#0a0e32' }}>
          <div className='flex flex-col gap-3'>
            <h2 className='font-bold text-3xl'>Welcome To Login</h2>
            <div className='flex flex-col justify-center items-center gap-2'>
              <span>Dont't have an account?</span>
              <span className='text-center'><Link to={'/register'}><button
                type="button"
                className="text-white bg-transparent border-2  font-medium rounded-full hover:bg-white hover:text-black text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Register
              </button></Link></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
