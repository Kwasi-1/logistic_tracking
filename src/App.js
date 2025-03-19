import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"; // Ensure styles load

const INITIAL_CENTER = [-0.187, 5.6037];
const INITIAL_ZOOM = 12.12;
const DATA_URL = "http://localhost:8000/foundry-ecosytem";

function App() {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const geocoderContainerRef = useRef();
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

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
        })
        .catch((error) => console.error("Error fetching data:", error));
    });

    return () => mapRef.current.remove();
  }, []);

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
      mapRef.current.flyTo({ center: coords, zoom: 17 });
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
