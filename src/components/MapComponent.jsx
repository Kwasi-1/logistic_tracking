import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import BusinessLayer from "./BusinessLayer";
import GeocoderComponent from "./GeocoderComponent";
import TruckSimulation from "./TruckSimulation";
import DeliveryInfo from "./DeliveryInfo";
import Navbar from "./Navbar";
import Geolocation from "./Geolocation";
import Directions from "./Directions";

const INITIAL_CENTER = [-0.187, 5.6037];
const INITIAL_ZOOM = 12.12;
const DATA_URL = "http://localhost:8000/foundry-ecosytem";

const MapComponent = () => {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const geocoderContainerRef = useRef();
  const [businesses, setBusinesses] = useState([]);
  const [showGeocoder, setShowGeocoder] = useState(false); // 🔹 Toggle Geocoder
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // 🔹 Toggle Theme & Save to Local Storage
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  // 🔹 Apply Theme Class to `html`
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Handle Location Found
  const handleLocationFound = (location) => {
    if (mapRef.current) {
      mapRef.current.setCenter([location.lng, location.lat]);
      new mapboxgl.Marker().setLngLat([location.lng, location.lat]).addTo(mapRef.current);
    }
  };

  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1Ijoia3dhc2ktMSIsImEiOiJjbThkNG15anAyYXF2MmtzOGJneW55cmVnIn0.uRUn_veAFyZ8u1CxkRGnWg";

    // Initialize Map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: isDarkMode
        ? "mapbox://styles/mapbox/dark-v11"
        : "mapbox://styles/mapbox/light-v11",
      pitch: 60,
      bearing: -20,
      antialias: true,
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl());

    mapRef.current.on("load", () => {
      mapRef.current.addLayer({
        id: "3d-buildings",
        source: "composite",
        "source-layer": "building",
        type: "fill-extrusion",
        minzoom: 15, // 🔹 Only show buildings at zoom level 15+
        paint: {
          "fill-extrusion-color": "#aaa",
          "fill-extrusion-height": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0,
            16,
            ["get", "height"],
          ],
          "fill-extrusion-base": ["case", ["has", "min_height"], ["get", "min_height"], 0],
          "fill-extrusion-opacity": 0.6,
        },
      });

      fetch(DATA_URL)
        .then((response) => response.json())
        .then((data) => {
          setBusinesses([...data.wholesalers, ...data.microfinance, ...data.market_businesses]);
        })
        .catch((error) => console.error("Error fetching data:", error));
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [isDarkMode]); // 🔹 Reinitialize map on theme change

  return (
    <div className={`h-screen ${isDarkMode ? "dark bg-black/80 text-gray-200" : "bg-white text-gray-900"}`}>
      <Navbar 
        onSearchClick={() => setShowGeocoder(!showGeocoder)} 
        onToggleTheme={toggleTheme} 
        isDarkMode={isDarkMode} 
      />

      {/* Geolocation Component Moved Here */}
      <Geolocation onLocationFound={handleLocationFound} />

      {/* <Directions mapRef={mapRef} /> */}

      <div className="h-[75vh] mx-10 relative">
        {showGeocoder && (
          <GeocoderComponent 
            mapRef={mapRef} 
            businesses={businesses} 
            geocoderContainerRef={geocoderContainerRef} 
          />
        )}

        <BusinessLayer mapRef={mapRef} businesses={businesses} />
        <TruckSimulation mapRef={mapRef} />
        <div id="map-container" ref={mapContainerRef} className="h-[75vh] my-auto rounded-xl" />
      </div>

      <DeliveryInfo />
    </div>
  );
};

export default MapComponent;
