import React from "react";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
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
const Navbar = () => {
    const [loginuser, setloginuser] = useState({})
    const [session, setsession] = useState(false)
    const [dropdown,setdropdown]=useState(false)
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Animations for all elements on every reload
            tl.from(".logo", {
                y: 100,
                duration: 1,
                opacity: 0,
            });

            tl.from(".list li", {
                y: 100,
                duration: 0.6,
                opacity: 0,
                stagger: 0.3,
            });

            // Conditionally animate session-related elements
            if (session) {
                tl.from(".profile, .logout", {
                  
                    duration: 0.6,
                    opacity: 0,
                    stagger: 0.2,
                });
            } else {
                tl.from(".login", {
                   
                    duration: 0.6,
                    opacity: 0,
                });
            }
        });

        return () => ctx.revert(); // Cleanup animations on unmount
    }, [session]); // Rerun animation whenever `session` changes

    const userlogout = async () => {
        try {
            let alert = confirm("Do you really want to logout?")
            if (alert) {

                const response = await fetch('http://localhost:3000/logout', {
                    method: 'GET',
                    credentials: 'include', // Include cookies in the request
                });
                if (response.ok) {

                    toast.success('You are inactive!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",

                    });

                    setsession(false)
                }
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        getuser()

    }, [])
    const changedropdown=()=>{
        console.log(dropdown)
        setdropdown(dropdown?false:true)
    }

    const getTokenData = (token) => {
        try {
            return jwtDecode(token)
        }
        catch (error) {
            console.log(error)
        }
    }
    const getuser = async () => {
        const token = Cookies.get('token');
        if (!token) {
            console.log('No token')
        }
        else {
            setsession(true)
            const data = getTokenData(token)
            const { username, email } = data

            const response = await fetch("http://localhost:3000/login-detail", { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: username }) })
            const { user } = await response.json()
            setloginuser(user)


        }// Reads the token from cookies
    }
    return (

        <nav className="Navbar flex justify-around bg-transparent items-center p-4 ">
            <span className="logo mx-6 text-2xl text-blue-400"><h2>Janseva</h2></span>
            <ul className="list flex flex-1 gap-3 mx-6 text-white text-sm">



                <Link to={'/'}><li>Bus ticket</li></Link>
                <Link to={'/bustracking'}><li>Bus tracking</li></Link>
                <Link to={'/'}><li>Contact Us</li></Link>


            </ul>
            {!session ? <div>
                <button className="text-black login bg-yellow-300 font-bold text-[11px] px-5 py-2.5"><span className="hover:text-white"><Link to={'/login'}>LOGIN</Link></span>/<span className="hover:text-white"><Link to={'/register'}>REGISTER</Link></span></button>
            </div> :
                <>
                    <div className="text-blue-400 mr-16 underline text-2xl">

                        <button id="dropdownDefaultButton" onClick={()=>{changedropdown()}} data-dropdown-toggle="dropdown" class=" profile text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-14 py-3 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" style={{}}>Profile <svg class=" w-2.5 h-2.5 ms-3  " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                        </svg>
                        </button>

                        
                        {dropdown && <div id="dropdown" classname="z-10 hidden bg-blue-400 rounded-lg shadow dark:bg-blue-700" style={{background:"#3c3c97",position:"fixed",width:"175px",textAlign:"center",borderBottomLeftRadius:"10px",borderBottomRightRadius:"10px",color:"white"}}>
                            <ul classname="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                <li style={{margin:"10px",fontSize:"15px"}}>
                                    Username:  {loginuser.username}
                                </li>
                                <li style={{margin:"10px",fontSize:"15px"}}>
                                Start  :{loginuser.start}
                                </li>
                                
                            
                                <li style={{margin:"10px",fontSize:"15px"}}>
                                End :{loginuser.end}
                                </li>
                            
                                <li style={{margin:"10px",fontSize:"15px"}}>
                                Bus :{loginuser.busno}
                                </li>
                                <li style={{margin:"10px",fontSize:"15px"}}>
                                Phone  :{loginuser.phone}
                                </li>
                            </ul>
                        </div>}

                    </div>
                    <div>
                        <button className="text-black logout bg-yellow-300 font-bold text-[13px] px-5 py-2.5"><span className="hover:text-white"><Link onClick={userlogout} to={'/'}>Logout</Link></span></button>
                    </div></>}

        </nav>


    )
}

export default Navbar

