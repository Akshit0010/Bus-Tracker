import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
const Register = () => {
  const Navigate = useNavigate()
  const [form, setform] = useState({ username: '', email: '', phone: '', start: '', end: '', password: '', busno: '' })
  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  const registeruser = async () => {
    if (form.username.length === 0 || form.email.length === 0 || form.phone.length === 0 || form.start.length === 0 || form.end.length === 0 || form.password.length === 0 || form.busno.length === 0) {
      toast.error('Please fill all the fields!', {
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
    else {
      if (form.username.length >= 5) {
        const response = await fetch("http://localhost:3000/register-username", { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: form.username }) })
        const data=await response.json()
        console.log(data)
        if (data === true) {
          if (form.email.includes("@gmail.com")) {
            const response = await fetch("http://localhost:3000/register-email", { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.email }) })
            const data=await response.json()
            if (data === true) {
              if (form.phone.length === 10) {
                const response = await fetch("http://localhost:3000/register-phone", { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ phone: form.phone }) })
                const data=await response.json()
                if (data === true) {
                  if (form.password.length >= 8) {
                    if (form.busno.length >= 5) {
                      const response = await fetch("http://localhost:3000/register-busno", { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ busno: form.busno }) })
                      const data=await response.json()
                      if (data === true) {
                        const response = await fetch("http://localhost:3000/register", { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form }) })
                        console.log("i")
                        if (response.ok) {
                          console.log("done")
                          toast('Registered!', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",

                          });

                          Navigate('/login')
                          setform({ username: '', email: '', phone: '', start: '', end: '', password: '', busno: '' })
                        }
                      }
                      else {
                        toast.error('Bus number already exists!', {
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
                    else {
                      toast.error('Invalid bus number', {
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
                  else {
                    toast.error('Password should have 8 characters', {
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
                else {
                  toast.error('Phone number already exists', {
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
              else {
                toast.error('Invalid phone number', {
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
            else {
              toast.error('Email already exists', {
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
          else {
            toast.error('Invalid email', {
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
        else {
          toast.error('Username already exists', {
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
      else {
        toast.error('Username should have 5 characters', {
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


    
  }
  return (
    <div style={{ backgroundColor: '#0a0e27' }} className='min-h-screen flex'>

      <div className='w-1/2 m-auto h-[500px] backdrop-blur-lg bg-white flex text-white'>

        <div className='w-1/2 flex justify-center items-center' style={{ backgroundColor: '#0a0e32' }}>
          <div className='flex flex-col gap-3'>
            <h2 className='font-bold text-3xl'>Welcome to Register</h2>
            <div className='flex flex-col justify-center items-center gap-2'>
              <span>Already have an account?</span>
              <span className='text-center'><Link to={'/login'}><button
                type="button"
                className="text-white bg-transparent border-2  font-medium rounded-full hover:bg-white hover:text-black text-sm px-5 py-2  text-center me-2 mb-2"
              >
                Login
              </button></Link></span>
            </div>
          </div>
        </div>
        <div className='w-1/2 text-black'>
          <div className='h-10 my-3 text-center flex items-center justify-center'>
            <h2 className='text-3xl underline font-bold'>Register</h2>
          </div>
          <div className='flex flex-col gap-4 '>
            <input type="text" value={form.username} onChange={handlechange} className=' border-none  text-sm border-black bg-gray-100 w-72 mx-5 py-2 px-2 rounded-full' placeholder='Enter username' name='username' />
            <input type="text" value={form.email} onChange={handlechange} className='border-none text-sm border-black bg-gray-100 w-72 mx-5 py-2  px-2 rounded-full' placeholder='Enter email' name='email' />
            <input type="text" value={form.phone} onChange={handlechange} className='border-none text-sm border-black bg-gray-100 w-72 mx-5 py-2  px-2 rounded-full' placeholder='Enter phone number' name='phone' />
            <input type="text" value={form.start} onChange={handlechange} className='border-none text-sm border-black bg-gray-100 w-72 mx-5 py-2  px-2 rounded-full' placeholder='Enter starting point' name='start' />
            <input type="text" value={form.end} onChange={handlechange} className='border-none text-sm border-black bg-gray-100 w-72 mx-5 py-2  px-2 rounded-full' placeholder='Enter ending point' name='end' />
            <input type="password" value={form.password} onChange={handlechange} className='border-none text-sm border-black bg-gray-100 w-72 mx-5 py-2  px-2 rounded-full' placeholder='Enter password i.e min 8 characters' name='password' />
            <input type="text" value={form.busno} onChange={handlechange} className='border-none text-sm border-black bg-gray-100 w-72 mx-5 py-2  px-2 rounded-full' placeholder='Enter bus number' name='busno' />
          </div>
          <div className='text-center'>
            <button style={{ backgroundColor: '#0a0e40' }} onClick={() => { registeruser() }}
              type="button"
              className="text-white    font-medium rounded-full w-72 text-sm px-5 py-2  text-center mt-5 me-5 mb-2"
            >
              Register
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Register