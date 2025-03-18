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
      style: "mapbox://styles/mapbox/traffic-day-v2",
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

  // Function to calculate total transactions
  const calculateTotalTransactions = (transactions = []) => {
    return transactions.reduce((total, t) => total + (t.amount || 0), 0);
  };

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

  // Function to animate dots moving along transaction routes
  const animateDot = (start, end) => {
    const dot = new mapboxgl.Marker({ color: "yellow" }) // Animated dot color
      .setLngLat(start)
      .addTo(mapRef.current);

    let progress = 0;
    const duration = 3000; // Time in milliseconds
    const startTime = performance.now();

    function moveDot(timestamp) {
      const elapsedTime = timestamp - startTime;
      progress = Math.min(elapsedTime / duration, 1);

      const newLng = start[0] + (end[0] - start[0]) * progress;
      const newLat = start[1] + (end[1] - start[1]) * progress;

      dot.setLngLat([newLng, newLat]);

      if (progress < 1) {
        requestAnimationFrame(moveDot);
      } else {
        dot.remove(); // Remove dot after reaching destination
      }
    }

    requestAnimationFrame(moveDot);
  };

  // Function to add markers and animate transactions
  const addMarkers = (data) => {
    const bounds = new mapboxgl.LngLatBounds();
    const businessLocations = {};

    // Helper function to add markers
    const addBusinessMarkers = (businessList, color) => {
      businessList.forEach((business) => {
        const { location, name, id } = business;
        businessLocations[id] = [location.lng, location.lat];

        new mapboxgl.Marker({ color })
          .setLngLat([location.lng, location.lat])
          .setPopup(new mapboxgl.Popup().setText(name))
          .addTo(mapRef.current);

        bounds.extend([location.lng, location.lat]);
      });
    };

    addBusinessMarkers(data.wholesalers, "blue");
    addBusinessMarkers(data.microfinance, "green");
    addBusinessMarkers(data.market_businesses, "red");

    // Animate transactions
    const animateTransactions = (businessList) => {
      businessList.forEach((business) => {
        if (business.transactions) {
          business.transactions.forEach((transaction) => {
            if (businessLocations[transaction.to]) {
              animateDot(businessLocations[business.id], businessLocations[transaction.to]);
            }
          });
        }

        if (business.loans) {
          business.loans.forEach((loan) => {
            if (businessLocations[loan.to]) {
              animateDot(businessLocations[business.id], businessLocations[loan.to]);
            }
          });
        }

        if (business.financial_transactions) {
          business.financial_transactions.forEach((transaction) => {
            if (businessLocations[transaction.from]) {
              animateDot(businessLocations[transaction.from], businessLocations[business.id]);
            }
          });
        }
      });
    };

    animateTransactions(data.wholesalers);
    animateTransactions(data.microfinance);
    animateTransactions(data.market_businesses);

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
              <strong>Total Transactions:</strong> ${calculateTotalTransactions(
                selectedBusiness.transactions || selectedBusiness.loans || selectedBusiness.financial_transactions
              )}
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
