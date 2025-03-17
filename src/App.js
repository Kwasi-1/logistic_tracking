import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";

const INITIAL_CENTER = [-0.187, 5.6037];
const INITIAL_ZOOM = 14.12;

// Sample locations for markers
const MARKERS = [
  { lng: -0.187, lat: 5.6037, title: "Marker 1" },
  { lng: -0.190, lat: 5.6100, title: "Marker 2" },
  { lng: -0.185, lat: 5.6000, title: "Marker 3" }
];

function App() {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const [center, setCenter] = useState(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoia3dhc2ktMSIsImEiOiJjbThkNG15anAyYXF2MmtzOGJneW55cmVnIn0.uRUn_veAFyZ8u1CxkRGnWg";

    // Initialize Map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
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

    // Fetch the route from Marker 1 to Marker 3
    const getRoute = async () => {
      const start = MARKERS[0]; // Marker 1
      const end = MARKERS[2];   // Marker 3
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.lng},${start.lat};${end.lng},${end.lat}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

      const response = await fetch(url);
      const data = await response.json();
      const route = data.routes[0].geometry;

      // Add the route to the map
      mapRef.current.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: route,
        },
      });

      mapRef.current.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-color": "#ff0000", "line-width": 4 },
      });
    };

    mapRef.current.on("load", getRoute);

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
