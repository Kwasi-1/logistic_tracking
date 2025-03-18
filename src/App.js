import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";

const INITIAL_CENTER = [-0.187, 5.6037];
const INITIAL_ZOOM = 10.12;

function App() {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const [center, setCenter] = useState(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoia3dhc2ktMSIsImEiOiJjbThkNG15anAyYXF2MmtzOGJneW55cmVnIn0.uRUn_veAFyZ8u1CxkRGnWg";

    // Initialize Map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/traffic-day-v2",
      center: center,
      zoom: zoom,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl());

    // Fetch businesses from API
    fetch("http://localhost:8000/foundry-ecosytem")
      .then((response) => response.json())
      .then((data) => {
        setBusinesses(data);
        addMarkers(data);
      })
      .catch((error) => console.error("Error fetching data:", error));

    return () => {
      mapRef.current.remove();
    };
  }, []);

  // Function to add markers dynamically
  const addMarkers = (data) => {
    data.wholesalers.forEach(({ location, name }) => {
      createMarker(location, name, "blue");
    });

    data.microfinance.forEach(({ location, name }) => {
      createMarker(location, name, "green");
    });

    data.market_businesses.forEach(({ location, name }) => {
      createMarker(location, name, "red");
    });
  };

  // Function to create markers
  const createMarker = (location, title, color) => {
    new mapboxgl.Marker({ color })
      .setLngLat([location.lng, location.lat])
      .setPopup(new mapboxgl.Popup().setText(title))
      .addTo(mapRef.current);
  };

  return (
    <>
      <div className="sidebar">
        Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} | Zoom: {zoom.toFixed(2)}
      </div>
      <div id="map-container" ref={mapContainerRef} />
    </>
  );
}

export default App;
