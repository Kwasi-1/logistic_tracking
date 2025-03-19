import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

const DATA_URL = "http://localhost:8000/features"; // Ensure this API returns the correct GeoJSON

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [businesses, setBusinesses] = useState([]);

  const center = [-0.2100, 5.5600]; // Default center point
  const zoom = 12;

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoia3dhc2ktMSIsImEiOiJjbThkNG15anAyYXF2MmtzOGJneW55cmVnIn0.uRUn_veAFyZ8u1CxkRGnWg";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/kwasi-1/cm8de1mok00pz01s323ie2s7f",
      pitch: 60,
      bearing: -20,
      antialias: true,
      center: center,
      zoom: zoom,
    });

    mapRef.current.on("load", async () => {
      try {
        const response = await fetch(DATA_URL);
        const data = await response.json();

        console.log("Fetched GeoJSON data:", data); // Debugging

        if (!data || !data.features) {
          console.error("Invalid GeoJSON format:", data);
          return;
        }

        setBusinesses(data.features);
        
        setTimeout(() => {
          addMarkers(data.features);
          addCustomBuildingLayer(mapRef.current, data);
        }, 500);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl());

    return () => mapRef.current.remove();
  }, []);

  /** Function to add markers to the map */
  const addMarkers = (features) => {
    features.forEach((feature) => {
      const { coordinates } = feature.geometry;
      const { name, type } = feature.properties;

      const marker = new mapboxgl.Marker()
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${name}</h3><p>Type: ${type}</p>`))
        .addTo(mapRef.current);

      console.log("Added marker:", name, coordinates);
    });
  };

  /** Example function to add a custom layer (modify as needed) */
  const addCustomBuildingLayer = (map, data) => {
    if (!map.getSource("businesses")) {
      map.addSource("businesses", {
        type: "geojson",
        data: data,
      });

      map.addLayer({
        id: "business-layer",
        type: "circle",
        source: "businesses",
        paint: {
          "circle-radius": 6,
          "circle-color": "#ff0000",
        },
      });
    }
  };

  return <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />;
};

export default MapComponent;
