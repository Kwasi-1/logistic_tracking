import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import BusinessLayer from "./BusinessLayer";
import GeocoderComponent from "./GeocoderComponent";
import TruckSimulation from "./TruckSimulation";
import DeliveryInfo from "./DeliveryInfo";
import Navbar from "./Navbar";

const INITIAL_CENTER = [-0.187, 5.6037];
const INITIAL_ZOOM = 12.12;
const DATA_URL = "http://localhost:8000/foundry-ecosytem";

const MapComponent = () => {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const geocoderContainerRef = useRef();
  const [businesses, setBusinesses] = useState([]);
  const [showGeocoder, setShowGeocoder] = useState(false); // 🔹 State to toggle Geocoder

  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1Ijoia3dhc2ktMSIsImEiOiJjbThkNG15anAyYXF2MmtzOGJneW55cmVnIn0.uRUn_veAFyZ8u1CxkRGnWg";

    // Initialize Map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/kwasi-1/cm8de1mok00pz01s323ie2s7f",
      pitch: 60,
      bearing: -20,
      antialias: true,
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl());

    mapRef.current.on("load", () => {
      fetch(DATA_URL)
        .then((response) => response.json())
        .then((data) => {
          setBusinesses([...data.wholesalers, ...data.microfinance, ...data.market_businesses]);
        })
        .catch((error) => console.error("Error fetching data:", error));
    });

    return () => mapRef.current.remove();
  }, []);

  return (
    <div className="h-screen">
      {/* Pass Search Toggle Function to Navbar */}
      <Navbar onSearchClick={() => setShowGeocoder(!showGeocoder)} />

      <div className="h-[75vh] mx-10 relative">
        {/* Show Geocoder when 'showGeocoder' is true */}
        {showGeocoder && (
          <GeocoderComponent 
            mapRef={mapRef} 
            businesses={businesses} 
            geocoderContainerRef={geocoderContainerRef} 
          />
        )}

        <BusinessLayer mapRef={mapRef} businesses={businesses} />
        <TruckSimulation mapRef={mapRef} />
        <div id="map-container" ref={mapContainerRef} className="h-[75vh] my-auto mt" />
      </div>
      <DeliveryInfo />

    </div>
  );
};

export default MapComponent;
