import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer ,useMap,Marker,Popup} from "react-leaflet";
import Map_details from "./Map_details";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
const Map = () => {
  const navigate=useNavigate()
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
  const [centre, setCentre] = useState({ lat: 0, lng: 0 });
  const [marker,setmarker]=useState({lat:0,lng:0});
  const zoom_level = 10;
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCentre({ lat: latitude, lng: longitude });
          setmarker({ lat: latitude, lng: longitude });
          console.log(latitude)
          console.log(longitude)
          
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
  
  <div onClick={()=>{navigate('/')}} className="z-20 absolute top-2 cursor-pointer right-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
    <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg></div>
      <div>
        
        <MapContainer center={centre} zoom={zoom_level} style={{ height: "100vh", width: "100%",zIndex:-1 }}>
        <TileLayer url={Map_details.maptiler.url} attribution={Map_details.maptiler.attribution} />
        <UpdateMapCenter centre={centre} />
        
        <Marker position={marker} >
            <Popup>
                Current location
            </Popup>
        </Marker>
      </MapContainer>
      </div>
      </>
  );
};

export default Map;
