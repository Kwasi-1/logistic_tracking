import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

const Directions = ({ mapRef }) => {
  useEffect(() => {
    if (!mapRef.current) return;

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/driving",
      alternatives: false,
      geometries: "geojson",
    });

    mapRef.current.addControl(directions, "top-left");

    // 🔹 Hardcoded Locations
    const cepodekWarehouse = [ -0.20408982912293316, 5.665552944172566 ]; // 📍 Cepodek Warehouse
    const cepodek = [ -0.1695, 5.6783 ]; // 📍 Cepodek
    
    // 🔹 Get User Location & Add Route
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = [position.coords.longitude, position.coords.latitude];

        // Set route: user → Cepodek Warehouse → Cepodek
        directions.setOrigin(userLocation);
        directions.setDestination(cepodek);
        directions.setWaypoints([{ coordinates: cepodekWarehouse }]);
      },
      (error) => console.error("Geolocation Error:", error),
      { enableHighAccuracy: true }
    );

    return () => {
      mapRef.current.removeControl(directions);
    };
  }, [mapRef]);

  return null;
};

export default Directions;
