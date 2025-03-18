import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";
import { Icon } from "@iconify/react/dist/iconify.js";

const INITIAL_CENTER = [-0.187, 5.6037];
const INITIAL_ZOOM = 12.12;

const DATA_URL = "http://localhost:8000/foundry-ecosytem"; // API endpoint

function App() {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const [center, setCenter] = useState(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoia3dhc2ktMSIsImEiOiJjbThkNG15anAyYXF2MmtzOGJneW55cmVnIn0.uRUn_veAFyZ8u1CxkRGnWg";
  
    // Initialize Map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/kwasi-1/cm8de1mok00pz01s323ie2s7f",
      center: center,
      zoom: zoom,
    });
  
    mapRef.current.on("load", () => {
      // Fetch businesses from API
      fetch(DATA_URL)
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched data:", data);
          setBusinesses(data["foundry-ecosytem"]);
  
          // Convert data to GeoJSON format
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
  
          // Add a symbol layer to use Mapbox built-in icons
          mapRef.current.addLayer({
            id: "business-icons",
            type: "symbol",
            source: "businesses",
            layout: {
              "icon-image": ["get", "icon"], // Use the icon property
              "icon-size": 2.2,
              "text-field": ["get", "name"], // Display business name
              "text-offset": [0, 1.5],
              "text-anchor": "top",
            },
            paint: {
              "text-color": "#000",
            },
          });
        })
        .catch((error) => console.error("Error fetching data:", error));
    });
  
    mapRef.current.addControl(new mapboxgl.NavigationControl());
  
    return () => {
      mapRef.current.remove();
    };
  }, []);
  
  // Function to calculate the total transaction amount
  const calculateTotalTransactions = (transactions = []) => {
    return transactions.reduce((total, t) => total + (t.amount || 0), 0);
  };

  // Function to add markers dynamically
  const addMarkers = (data) => {
    data.wholesalers.forEach((business) => {
      createMarker(business, "blue");
    });

    data.microfinance.forEach((business) => {
      createMarker(business, "green");
    });

    data.market_businesses.forEach((business) => {
      createMarker(business, "red");
    });
  };

  // Function to create markers with name & transaction amount always visible
  const createMarker = (business, color) => {
    const { location, name } = business;
    const totalAmount = calculateTotalTransactions(
      business.transactions || business.loans || business.financial_transactions
    );

    const markerDiv = document.createElement("div");
    markerDiv.className = "marker";
    markerDiv.innerHTML = `<strong>${name}</strong><br/>💰 $${totalAmount} <Icon icon="flat-color-icons:factory" />`;
    markerDiv.style.color = color;
    markerDiv.style.background = "white";
    markerDiv.style.padding = "5px";
    markerDiv.style.borderRadius = "5px";
    markerDiv.style.boxShadow = "0px 2px 5px rgba(0, 0, 0, 0.3)";
    markerDiv.style.fontSize = "12px";

    const marker = new mapboxgl.Marker({ element: markerDiv })
      .setLngLat([location.lng, location.lat])
      .addTo(mapRef.current);

    markerDiv.addEventListener("click", () => {
      setSelectedBusiness(business);
    });
  };

  return (
    <div className="app">
      <div className="sidebar">
        <p>
          Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} | Zoom: {zoom.toFixed(2)}
        </p>

        {/* Show business details when a marker is clicked */}
        {selectedBusiness && (
          <div className="business-info">
            <h2>{selectedBusiness.name}</h2>
            <p><strong>Location:</strong> {selectedBusiness.location.lat}, {selectedBusiness.location.lng}</p>
            <p><strong>Total Transactions:</strong> ${calculateTotalTransactions(selectedBusiness.transactions || selectedBusiness.loans || selectedBusiness.financial_transactions)}</p>

            {/* Display additional details dynamically */}
            {selectedBusiness.products && (
              <p><strong>Products:</strong> {selectedBusiness.products.join(", ")}</p>
            )}
            {selectedBusiness.inventory && (
              <p><strong>Inventory:</strong> {selectedBusiness.inventory.map(i => `${i.product} (${i.quantity})`).join(", ")}</p>
            )}
            {selectedBusiness.loans && (
              <p><strong>Loans:</strong> {selectedBusiness.loans.map(l => `To: ${l.to} - $${l.amount} (${l.status})`).join(", ")}</p>
            )}
          </div>
        )}
      </div>

      <div id="map-container" ref={mapContainerRef} />
    </div>
  );
}

export default App;
