import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";

const INITIAL_CENTER = [-0.187, 5.6037]; // Default center (in case geolocation fails)
const INITIAL_ZOOM = 12.12;

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
      style: "mapbox://styles/mapbox/traffic-day-v2",
      center: center,
      zoom: zoom,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl());

    // Get user's location
    getUserLocation();

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

  // Function to calculate the total transaction amount
  const calculateTotalTransactions = (transactions = []) => {
    return transactions.reduce((total, t) => total + (t.amount || 0), 0);
  };

  // Function to get user location and show marker
  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = [position.coords.longitude, position.coords.latitude];

          // Add user location marker
          new mapboxgl.Marker({ color: "black" })
            .setLngLat(userLocation)
            .setPopup(new mapboxgl.Popup().setText("You are here"))
            .addTo(mapRef.current);

          // Update map center and zoom
          mapRef.current.flyTo({ center: userLocation, zoom: 14 });

          // Update state
          setCenter(userLocation);
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Function to add markers dynamically and adjust zoom to fit them
  const addMarkers = (data) => {
    const bounds = new mapboxgl.LngLatBounds();

    const addBusinessMarkers = (businessList, color) => {
      businessList.forEach((business) => {
        createMarker(business, color);
        bounds.extend([business.location.lng, business.location.lat]); // Extend bounds for each marker
      });
    };

    addBusinessMarkers(data.wholesalers, "blue");
    addBusinessMarkers(data.microfinance, "green");
    addBusinessMarkers(data.market_businesses, "red");

    if (!bounds.isEmpty()) {
      mapRef.current.fitBounds(bounds, { padding: 50, maxZoom: 14 });
    }
  };

  // Function to create markers
  const createMarker = (business, color) => {
    const { location, name } = business;

    const marker = new mapboxgl.Marker({ color })
      .setLngLat([location.lng, location.lat])
      .setPopup(new mapboxgl.Popup().setText(name))
      .addTo(mapRef.current);

    marker.getElement().addEventListener("click", () => {
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
            <p>
              <strong>Location:</strong> {selectedBusiness.location.lat}, {selectedBusiness.location.lng}
            </p>
            <p>
              <strong>Total Transactions:</strong> ${calculateTotalTransactions(
                selectedBusiness.transactions || selectedBusiness.loans || selectedBusiness.financial_transactions
              )}
            </p>

            {/* Display additional details dynamically */}
            {selectedBusiness.products && (
              <p>
                <strong>Products:</strong> {selectedBusiness.products.join(", ")}
              </p>
            )}
            {selectedBusiness.inventory && (
              <p>
                <strong>Inventory:</strong>{" "}
                {selectedBusiness.inventory.map((i) => `${i.product} (${i.quantity})`).join(", ")}
              </p>
            )}
            {selectedBusiness.loans && (
              <p>
                <strong>Loans:</strong>{" "}
                {selectedBusiness.loans.map((l) => `To: ${l.to} - $${l.amount} (${l.status})`).join(", ")}
              </p>
            )}
          </div>
        )}
      </div>

      <div id="map-container" ref={mapContainerRef} />
    </div>
  );
}

export default App;
