import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

const truckRoute = [
  [-0.187, 5.6037],
  [-0.190, 5.6050],
  [-0.195, 5.6070],
  [-0.200, 5.6090],
  [-0.205, 5.6105],
  [-0.210, 5.6120],
  [-0.215, 5.6140],
  [-0.220, 5.6160],
];

const TruckSimulation = ({ mapRef }) => {
  const [truckIndex, setTruckIndex] = useState(0);

  useEffect(() => {
    if (!mapRef.current) return; // Ensure map exists

    const map = mapRef.current;
    const truckMarker = new mapboxgl.Marker({ color: "red" });

    map.on("load", () => {
      truckMarker.setLngLat(truckRoute[0]).addTo(map); // Only add marker when the map is ready

      const interval = setInterval(() => {
        setTruckIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= truckRoute.length) return 0;

          truckMarker.setLngLat(truckRoute[nextIndex]); // Move truck
          map.flyTo({ center: truckRoute[nextIndex], zoom: 14 });

          return nextIndex;
        });
      }, 2000);

      return () => clearInterval(interval);
    });

    return () => truckMarker.remove();
  }, [mapRef]);

  return null;
};

export default TruckSimulation;
