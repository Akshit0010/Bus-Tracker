import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useState } from 'react';

function HeroSection() {
   
    


    const routes = [
        "Avenue Road",
        "Agra Expressway",
        "Lal kuan",
        "Turab nagar",
        "ABES",
        "SECTOR 62",
        "KAUSHAMBI",
        "ANAND VIHAR",
        "HAPUR",
        "Central Avenue",
        "Chandigarh",
    ];
    const [searchroute, setsearchroute] = useState('')
    const [filterroutes, setfilterroutes] = useState([])
    const [showdropdown, setshowdropdown] = useState(false)
    const handlechange = (e) => {
        const input = e.target.value;
        setsearchroute(input)
        const search = routes.filter((routes) => routes.toLowerCase().startsWith(input.toLowerCase()))
        setfilterroutes(search)
        setshowdropdown(true)
    }
    const additem = (item) => {
        setsearchroute(item)
        setfilterroutes([])
        setshowdropdown(false)
    }

    return (
        <>
            <div
                className="relative text-white min-h-screen"
                style={{
                    backgroundImage: "linear-gradient(to right, #0a0e27 25%, transparent 80%), url('/bg.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "right"
                }}
            >
                <Navbar />
                <div className='container mx-20 mt-20'>
                    <div className='flex flex-col '>
                        <span className='mb-2 text-3xl font-bold'>
                            STOP LOOKING.
                        </span>
                        <span className='text-red-500 text-3xl font-bold mb-4'>
                            START TRACKING!
                        </span>
                        <p className='text-[14px] '>Online bus tracking,ticketing platform.</p>

                    </div>
                    <div className='bg-white w-96 h-32 mt-14 flex relative'>
                        <div className='flex flex-col text-black w-48 items-center gap-3'>
                            <span className='pt-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                    <path d="M17 20.5V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M7 20.5V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M4 6.78186C4 6.14251 4 5.82283 4.17387 5.43355C4.34773 5.04428 4.52427 4.88606 4.87736 4.56964C6.03437 3.53277 8.36029 2 12 2C15.6397 2 17.9656 3.53277 19.1226 4.56964C19.4757 4.88606 19.6523 5.04428 19.8261 5.43355C20 5.82283 20 6.14251 20 6.78186V14C20 16.8284 20 18.2426 19.1213 19.1213C18.2426 20 16.8284 20 14 20H10C7.17157 20 5.75736 20 4.87868 19.1213C4 18.2426 4 16.8284 4 14V6.78186Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                    <path d="M4 14C4 14 7.73333 15 12 15C16.2667 15 20 14 20 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M4.5 17.5H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M18 17.5H19.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M11 17.5L13 17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M4 6H20" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                    <path d="M2 9L2 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M22 9L22 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
                            <h3 className='text-2xl text-blue-500 font-bold'>Chandigarh</h3>
                            <span className='font-bold '>From</span>
                        </div>
                        <div className='absolute top-[44%] right-[47%] '>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                <path d="M19 9H6.65856C5.65277 9 5.14987 9 5.02472 8.69134C4.89957 8.38268 5.25517 8.01942 5.96637 7.29289L8.21091 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M5 15H17.3414C18.3472 15 18.8501 15 18.9753 15.3087C19.1004 15.6173 18.7448 15.9806 18.0336 16.7071L15.7891 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div className='flex flex-col text-black w-48 items-center gap-3'>
                            <span className='pt-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                    <path d="M17 20.5V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M7 20.5V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M4 6.78186C4 6.14251 4 5.82283 4.17387 5.43355C4.34773 5.04428 4.52427 4.88606 4.87736 4.56964C6.03437 3.53277 8.36029 2 12 2C15.6397 2 17.9656 3.53277 19.1226 4.56964C19.4757 4.88606 19.6523 5.04428 19.8261 5.43355C20 5.82283 20 6.14251 20 6.78186V14C20 16.8284 20 18.2426 19.1213 19.1213C18.2426 20 16.8284 20 14 20H10C7.17157 20 5.75736 20 4.87868 19.1213C4 18.2426 4 16.8284 4 14V6.78186Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                    <path d="M4 14C4 14 7.73333 15 12 15C16.2667 15 20 14 20 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M4.5 17.5H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M18 17.5H19.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M11 17.5L13 17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M4 6H20" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                    <path d="M2 9L2 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M22 9L22 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
                            <h3 className='text-2xl text-blue-500 font-bold '>Bangalore</h3>
                            <span className='font-bold '>Destination</span>
                        </div>
                    </div>
                    <div className="w-1/2 mx-96 mt-20 flex gap-2 relative">
                        <div className="flex-1 relative">
                            <input
                                value={searchroute}
                                onChange={handlechange}
                                type="text"
                                onBlur={() => setTimeout(() => setshowdropdown(false), 2000)}
                                onFocus={() => searchroute && setshowdropdown(true)}
                                className="text-[15px] py-2.5 px-4 rounded-lg w-full text-black"
                                placeholder="Enter your route"
                            />
                            {/* Dropdown for suggestions */}
                            {showdropdown && searchroute && filterroutes.length > 0 && (
                                <div className="absolute bg-white border border-gray-300 rounded-lg mt-1 w-full max-h-36  overflow-y-auto z-10 text-black">
                                    {filterroutes.map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={() => additem(item)}

                                            className="cursor-pointer p-2 hover:bg-gray-200"
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button
                            type="button"
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br    font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default HeroSection;
