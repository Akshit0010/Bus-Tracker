import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import Map_details from "./Map_details";
import L from "leaflet";
import Navbar from "./Navbar";
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const Map = () => {
  const busIcon = L.icon({
    iconUrl: "/bus.svg", // Path to your bus icon
    iconSize: [16, 16], // Adjust size as needed
    iconAnchor: [16, 32], // Anchor point of the icon (middle bottom)
    popupAnchor: [0, -32], // Popup position relative to the icon
  });
  const [data, setdata] = useState([])
  const [centre, setCentre] = useState({ lat: 0, lng: 0 });
  const [marker, setmarker] = useState({ lat: 0, lng: 0 });
  const [usercoord,setusercoord]=useState({})
  const getlogindata = async () => {
    const response = await fetch("http://localhost:3000/login-user")
    const data = await response.json()
    setdata(data)

  }
  
  useEffect(() => {
    getlogindata()

  }, [])
  
  const getTokenData = (token) => {
    try {
        return jwtDecode(token)
    }
    catch (error) {
        console.log(error)
    }
}
useEffect(()=>{
  getusercoord()
},[])
const getusercoord = async () => {
    const token = Cookies.get('token');
    if (!token) {
        console.log('No token')
    }
    else {
        const data = getTokenData(token)
        const {username}=data
        const response = await fetch("http://localhost:3000/login-coord", { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: username }) })
        const user=await response.json()
        const {busno,latitude,longitude}=user
        setusercoord({busno,latitude,longitude})
    }
  }
  const updatecoord=async()=>{
    const response = await fetch("http://localhost:3000/update-coord", { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({...usercoord}) })
    if(response.ok){
      return;
    }
  }
  // Dependency on `data`

  const navigate = useNavigate()
  const UpdateMapCenter = ({ centre }) => {
    const map = useMap();

    useEffect(() => {
      if (map) {
        map.setView([centre.lat, centre.lng]); // Update the map center
      }
    }, [centre, map]); // Re-run when `centre` changes

    return null;
  };
  // Custom hook to trigger map update on center change
  const zoom_level = 10;
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCentre({ lat: latitude, lng: longitude });
          setusercoord({longitude:longitude,latitude:latitude})
          updatecoord()
        },
        (error) => {
          console.log("Error:", error.message);
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 } // Optional options
      );

      // Clean up the watchPosition when the component unmounts
      return watchId;
    } else {
      console.log("Geolocation not supported");
    }
  };

  useEffect(() => {
    const watchId = getCurrentLocation();

    // Clean up the watcher on component unmount
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);


  return (<>

    <div
      onClick={() => { navigate('/'); }}
      className="z-30  cursor-pointer"
      style={{
        position: "fixed", // Fixed position relative to the viewport
        top: "10px", // Adjust this to control the distance from the top
        right: "10px", // Adjust this to control the distance from the right
        zIndex: 1000, // Ensure it's above the map
      }}
    ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
        <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg></div>
    <div>

    <MapContainer key={JSON.stringify(data)} center={centre} zoom={zoom_level} style={{ height: "100vh", width: "100%" }}>
    <TileLayer url={Map_details.maptiler.url} attribution={Map_details.maptiler.attribution} />
    <UpdateMapCenter centre={centre} />
    {data.map((item, index) => {
        const mark = [item.latitude, item.longitude];
        return (
            <Marker key={index} position={mark} icon={busIcon}>
                <Popup><li>
                  <ul>Starting:{item.start}</ul>
                  <ul>Contact:{item.phone}</ul>
                  <ul>Bus number:{item.busno}</ul>
                  </li></Popup>
            </Marker>
        );
    })}
</MapContainer>

    </div>
  </>
  );
};

export default Map;
