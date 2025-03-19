import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"; // Ensure styles load

const INITIAL_CENTER = [-0.187, 5.6037];
const INITIAL_ZOOM = 12.12;
const DATA_URL = "http://localhost:8000/foundry-ecosytem";

// Truck Route (Simulated GPS Data)
const truckRoute = [
  [-0.187, 5.6037],  // Start position
  [-0.190, 5.6050],  
  [-0.195, 5.6070],  
  [-0.200, 5.6090],  
  [-0.205, 5.6105],  // Midpoint
  [-0.210, 5.6120],  
  [-0.215, 5.6140],  
  [-0.220, 5.6160],  // End position
];

function App() {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const geocoderContainerRef = useRef();
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [truckIndex, setTruckIndex] = useState(0); // Track truck position

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoia3dhc2ktMSIsImEiOiJjbThkNG15anAyYXF2MmtzOGJneW55cmVnIn0.uRUn_veAFyZ8u1CxkRGnWg";

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
          console.log("Fetched data:", data);
          setBusinesses([...data.wholesalers, ...data.microfinance, ...data.market_businesses]);

          // Convert business data to GeoJSON format
          const geojsonData = {
            type: "FeatureCollection",
            features: [
              ...data.wholesalers.map((business) => ({
                type: "Feature",
                properties: { name: business.name, icon: "shop" },
                geometry: { type: "Point", coordinates: [business.location.lng, business.location.lat] },
              })),
              ...data.microfinance.map((business) => ({
                type: "Feature",
                properties: { name: business.name, icon: "bank" },
                geometry: { type: "Point", coordinates: [business.location.lng, business.location.lat] },
              })),
              ...data.market_businesses.map((business) => ({
                type: "Feature",
                properties: { name: business.name, icon: "grocery" },
                geometry: { type: "Point", coordinates: [business.location.lng, business.location.lat] },
              })),
            ],
          };

          // Add GeoJSON source
          mapRef.current.addSource("businesses", {
            type: "geojson",
            data: geojsonData,
          });

          // Add a symbol layer for icons
          mapRef.current.addLayer({
            id: "business-icons",
            type: "symbol",
            source: "businesses",
            layout: {
              "icon-image": ["get", "icon"], // Use Mapbox built-in icons
              "icon-size": 2.2,
              "text-field": ["get", "name"], // Display business name
              "text-offset": [0, 1.5],
              "text-anchor": "top",
            },
            paint: {
              "text-color": "#000",
            },
          });

          addGeocoder([...data.wholesalers, ...data.microfinance, ...data.market_businesses]);
          simulateTruckMovement(); // Start truck simulation
        })
        .catch((error) => console.error("Error fetching data:", error));
    });

    return () => mapRef.current.remove();
  }, []);

  // Truck Simulation Function
  const simulateTruckMovement = () => {
    if (!mapRef.current) return;

    // Create a truck marker
    const truckMarker = new mapboxgl.Marker({ color: "red" })
      .setLngLat(truckRoute[0])
      .addTo(mapRef.current);

    // Move truck every 2 seconds
    const interval = setInterval(() => {
      setTruckIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= truckRoute.length) return 0; // Loop back to start

        // Move marker smoothly
        truckMarker.setLngLat(truckRoute[nextIndex]);

        // Make the map follow the truck
        mapRef.current.flyTo({
          center: truckRoute[nextIndex],
          zoom: 14,
          essential: true,
        });

        return nextIndex;
      });
    }, 2000);

    return () => clearInterval(interval);
  };

  // Add the Geocoder
  const addGeocoder = (businessList) => {
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false, // No default marker, we handle our own markers
      placeholder: "Search for businesses...",
      localGeocoder: (query) => {
        return businessList
          .filter((business) =>
            business.name.toLowerCase().includes(query.toLowerCase())
          )
          .map((business) => ({
            text: business.name,
            place_name: business.name,
            center: [business.location.lng, business.location.lat],
            properties: { name: business.name },
          }));
      },
    });

    geocoder.on("result", (event) => {
      const coords = event.result.center;
      mapRef.current.flyTo({ center: coords, zoom: 17.5 });
    });

    if (geocoderContainerRef.current) {
      geocoderContainerRef.current.appendChild(geocoder.onAdd(mapRef.current));
    }
  };

  return (
    <div className="app">
      {/* Geocoder Container */}
      <div ref={geocoderContainerRef} style={{ position: "absolute", top: "10px", left: "10px", zIndex: 5, width: "300px" }}></div>

      {/* Sidebar to show business details */}
      <div className="sidebar">
        {selectedBusiness && (
          <div className="business-info">
            <h2>{selectedBusiness.name}</h2>
            <p><strong>Location:</strong> {selectedBusiness.location.lat}, {selectedBusiness.location.lng}</p>
          </div>
        )}
      </div>

      {/* Map Container */}
      <div id="map-container" ref={mapContainerRef} style={{ height: "100vh" }} />
    </div>
  );
}

export default App;
