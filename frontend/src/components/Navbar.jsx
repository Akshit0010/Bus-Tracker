import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        
            <nav className="Navbar flex justify-around bg-transparent items-center p-4 ">
                <span className="logo mx-6 text-2xl text-blue-400"><h2>Janseva</h2></span>
            <ul className="flex flex-1 gap-3 mx-6 text-white text-sm">
                <Link to={'/'}><li>Bus ticket</li></Link>
                <Link to={'/bustracking'}><li>Bus tracking</li></Link>
                <Link to={'/'}><li>Contact Us</li></Link>
                
            </ul>
            <div>
                <button className="text-black bg-yellow-300 font-bold text-[11px] px-5 py-2.5"><span className="hover:text-white"><Link to={'/login'}>LOGIN</Link></span>/<span className="hover:text-white"><Link to={'/register'}>REGISTER</Link></span></button>
            </div>
            </nav>
            
        
    )
}

export default Navbar