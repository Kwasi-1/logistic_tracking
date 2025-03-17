import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";

const INITIAL_CENTER = [-0.187, 5.6037];
const INITIAL_ZOOM = 14.12;

// Sample locations for markers
const MARKERS = [
  { lng: -0.187, lat: 5.6037, title: "Marker 1" },
  { lng: -0.121, lat: 5.6100, title: "Marker 2" },
  { lng: -0.185, lat: 5.6000, title: "Marker 3" }
];

function App() {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const [center, setCenter] = useState(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoia3dhc2ktMSIsImEiOiJjbThkNG15anAyYXF2MmtzOGJneW55cmVnIn0.uRUn_veAFyZ8u1CxkRGnWg";

    // Initialize Map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/traffic-day-v2", // Traffic view
      center: center,
      zoom: zoom,
    });

    // Add zoom and rotation controls
    mapRef.current.addControl(new mapboxgl.NavigationControl());

    // Add markers
    MARKERS.forEach(({ lng, lat, title }) => {
      new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .setPopup(new mapboxgl.Popup().setText(title)) // Add popup
        .addTo(mapRef.current);
    });

    // Fetch routes
    const getRoutes = async () => {
      const start = MARKERS[0]; // Marker 1
      const end = MARKERS[1];   // Marker 2

      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.lng},${start.lat};${end.lng},${end.lat}?geometries=geojson&alternatives=true&steps=true&access_token=${mapboxgl.accessToken}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.routes.length === 0) {
        console.error("No routes found");
        return;
      }

      setRoutes(data.routes);
      setSelectedRoute(0); // Auto-select best route (shortest)

      data.routes.forEach((route, index) => {
        mapRef.current.addSource(`route-${index}`, {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: route.geometry,
          },
        });

        mapRef.current.addLayer({
          id: `route-${index}`,
          type: "line",
          source: `route-${index}`,
          layout: { "line-join": "round", "line-cap": "round" },
          paint: {
            "line-color": index === 0 ? "#0000ff" : "transparent", // Best route is blue, others hidden
            "line-width": 6,
          },
        });
      });
    };

    mapRef.current.on("load", getRoutes);

    mapRef.current.on("move", () => {
      const mapCenter = mapRef.current.getCenter();
      const mapZoom = mapRef.current.getZoom();
      setCenter([mapCenter.lng, mapCenter.lat]);
      setZoom(mapZoom);
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  const selectRoute = (index) => {
    setSelectedRoute(index);

    routes.forEach((_, i) => {
      mapRef.current.setPaintProperty(`route-${i}`, "line-color", i === index ? "#0000ff" : "transparent");
    });
  };

  return (
    <>
      <div className="sidebar">
        Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} | Zoom: {zoom.toFixed(2)}
        <br />
        {routes.map((_, index) => (
          <button key={index} onClick={() => selectRoute(index)} style={{ margin: "5px", padding: "5px" }}>
            Route {index + 1} {index === 0 ? "(Best)" : ""}
          </button>
        ))}
      </div>
      <div id="map-container" ref={mapContainerRef} />
    </>
  );
}

export default App;
