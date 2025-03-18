import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";

const INITIAL_CENTER = [-0.187, 5.6037]; // Default center
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

    mapRef.current.addControl(new mapboxgl.NavigationControl());

    // Get user location
    getUserLocation();

    // Fetch businesses from API
    fetch(DATA_URL)
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

  // Get user location and show marker
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

          setCenter(userLocation);
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Function to add markers with custom icons
  const addMarkers = (data) => {
    const bounds = new mapboxgl.LngLatBounds();

    // Helper function to add markers with icons
    const addBusinessMarkers = (businessList, imageId) => {
      businessList.forEach((business) => {
        const { location, name } = business;
        const iconSize = [40, 40]; // Adjust size as needed

        // Create a custom marker element
        const el = document.createElement("div");
        el.style.backgroundImage = `url(https://picsum.photos/id/${imageId}/${iconSize[0]}/${iconSize[1]})`;
        el.style.width = `${iconSize[0]}px`;
        el.style.height = `${iconSize[1]}px`;
        el.style.backgroundSize = "cover";
        el.style.borderRadius = "50%";
        el.style.cursor = "pointer";

        // Click event to show business name
        el.addEventListener("click", () => {
          setSelectedBusiness(business);
        });

        // Add marker to map
        new mapboxgl.Marker(el)
          .setLngLat([location.lng, location.lat])
          .addTo(mapRef.current);

        bounds.extend([location.lng, location.lat]);
      });
    };

    // Add different categories with icons
    addBusinessMarkers(data.wholesalers, 1011); // Image ID for wholesalers
    addBusinessMarkers(data.microfinance, 870); // Image ID for microfinance
    addBusinessMarkers(data.market_businesses, 837); // Image ID for market businesses

    if (!bounds.isEmpty()) {
      mapRef.current.fitBounds(bounds, { padding: 50, maxZoom: 14 });
    }
  };

  return (
    <div className="app">
      <div className="sidebar">
        <p>
          Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} | Zoom: {zoom.toFixed(2)}
        </p>

        {selectedBusiness && (
          <div className="business-info">
            <h2>{selectedBusiness.name}</h2>
            <p>
              <strong>Location:</strong> {selectedBusiness.location.lat}, {selectedBusiness.location.lng}
            </p>
            <p>
              <strong>Total Transactions:</strong> $
              {selectedBusiness.transactions || selectedBusiness.loans || selectedBusiness.financial_transactions
                ? selectedBusiness.transactions.reduce((sum, t) => sum + (t.amount || 0), 0)
                : 0}
            </p>
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
          </div>
        )}
      </div>

      <div id="map-container" ref={mapContainerRef} />
    </div>
  );
}

export default App;
