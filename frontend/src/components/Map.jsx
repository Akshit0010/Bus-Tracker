import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import Map_details from "./Map_details";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import Navbar from "./Navbar";
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import socket from "./socket/socket";
const Map = () => {
  
  const busIcon = L.icon({
    iconUrl: "/bus.svg", // Path to your bus icon
    iconSize: [16, 16], // Adjust size as needed
    iconAnchor: [16, 32], // Anchor point of the icon (middle bottom)
    popupAnchor: [0, -32], // Popup position relative to the icon
  });
  // Function to create custom cluster icons
const createClusterCustomIcon = (cluster) => {
  const count = cluster.getChildCount(); // Get the number of markers in the cluster
  return new L.DivIcon({
    html: `
      <div style="background-color: #000000; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border: 2px solid white;">
        🚌
      </div>
    `,
    className: "custom-cluster-icon", // Optional: Add custom styling class
    iconSize: [30, 30], // Size of the cluster icon
  });
};
  const [data, setdata] = useState([])
  const [centre, setCentre] = useState({ lat: 27.73, lng: 77.87 });
  const [usercoord,setusercoord]=useState({})
  const[withoutlogin,setwithoutlogin]=useState(true)
  const getlogindata = async () => {
    const response = await fetch("http://localhost:3000/login-user")
    const data = await response.json()
    setdata(data)

  }

  
  const getTokenData = (token) => {
    try {
        return jwtDecode(token)
    }
    catch (error) {
        console.log(error)
    }
}

const getusercoord = async () => {
    const token = Cookies.get('token');
    if (!token) {
        console.log('No token')
    }
    else {
        setwithoutlogin(false)
        const data = getTokenData(token)
        const {username}=data
        const response = await fetch("http://localhost:3000/login-coord", { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: username }) })
        const user=await response.json()
        
        const {busno,latitude,longitude}=user
        setusercoord({busno,latitude,longitude})
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
  
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth's radius in km

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const filteredData = data.filter((item) => {
    const distance = calculateDistance(
      centre.lat,
      centre.lng,
      item.latitude,
      item.longitude
    );
    return distance <= 50; // Include only items within 50 km
  });
  const getcurrentlocation = (onSuccess) => {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCentre({lat:latitude,lng:longitude})
                onSuccess({ latitude, longitude }); // Pass the location to a callback
            },
            (error) => {
                console.error("Error getting location:", error);
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
};

useEffect(() => {
  getlogindata();
  getusercoord();
  
  socket.on("connect", () => {
    console.log("Connected to Socket.IO server:", socket.id);
  });
}, []);


// Watch location changes and update usercoord
useEffect(() => {
  getcurrentlocation((location) => {
    socket.emit("user",location, usercoord);
    setusercoord(location); // Update usercoord state
  });
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
    {withoutlogin===true && 
      <Marker position={centre} >
      <Popup>
      Your location
      </Popup>

    </Marker>
      }
      <MarkerClusterGroup
        iconCreateFunction={createClusterCustomIcon} // Use the custom icon for clusters
      >
    {withoutlogin===true && filteredData.map((item, index) => {
        const mark = [usercoord.latitude, usercoord.longitude];
        return (
            <Marker key={index} position={mark} icon={busIcon}>
                <Popup><li>
                  <ul>Starting:{item.start}</ul>
                  <ul>Destination:{item.end}</ul>
                  <ul>Contact:{item.phone}</ul>
                  <ul>Bus number:{item.busno}</ul>
                  
                  </li></Popup>
            </Marker>
        );
    })}
    </MarkerClusterGroup>
    <MarkerClusterGroup
        iconCreateFunction={createClusterCustomIcon} // Use the custom icon for clusters
      >
    {withoutlogin===false && data.map((item, index) => {
        const mark = [usercoord.latitude, usercoord.longitude];
        return (
            <Marker key={index} position={mark} icon={busIcon}>
                <Popup><li>
                  <ul>Starting:{item.start}</ul>
                  <ul>Destination:{item.end}</ul>
                  <ul>Contact:{item.phone}</ul>
                  <ul>Bus number:{item.busno}</ul>
                  
                  </li></Popup>
            </Marker>
        );
    })}
    </MarkerClusterGroup>
</MapContainer>

    </div>
  </>
  );
};

export default Map;
