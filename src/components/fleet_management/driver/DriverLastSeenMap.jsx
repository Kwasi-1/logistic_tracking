import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia3dhc2ktMSIsImEiOiJjbThkNG15anAyYXF2MmtzOGJneW55cmVnIn0.uRUn_veAFyZ8u1CxkRGnWg";

const DriverLastSeenMap = ({ lastSeenLocation }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!lastSeenLocation) return;
    if (map.current) return; // Prevent re-initialization

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/",
      center: lastSeenLocation, // Center map at last seen location
      zoom: 12,
    });

    // Add Last Seen Marker
    new mapboxgl.Marker({ color: "red" })
      .setLngLat(lastSeenLocation)
      .setPopup(new mapboxgl.Popup().setText("Last Seen Here"))
      .addTo(map.current);

    return () => {
      if (map.current) map.current.remove();
    };
  }, [lastSeenLocation]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-[250px] rounded-md border"
      style={{ minHeight: "250px" }}
    />
  );
};

export default DriverLastSeenMap;
