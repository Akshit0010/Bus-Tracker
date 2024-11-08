import './App.css';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Map from './components/Map';
// index.js or App.js
import "leaflet/dist/leaflet.css";
import Login from './components/Login';
import Register from './components/Register';


const router=createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <HeroSection />
      
      </>
    ),
  },
  {path:"/bustracking",element:<Map/>},
  {path:"/register",element:<Register/>},
  {path:"/login",element:<Login/>}
])

function App() {
  return (
    <>
    <RouterProvider router={router}/>
      
      
    </>
  );
}

export default App;

