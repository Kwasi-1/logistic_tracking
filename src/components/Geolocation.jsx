import { useState, useEffect } from "react";

const Geolocation = ({ onLocationFound }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        onLocationFound({ lat: latitude, lng: longitude });
      },
      (error) => console.error("Geolocation error:", error),
      { enableHighAccuracy: true }
    );
  }, [onLocationFound]);

  return null; // This component only handles logic
};

export default Geolocation;
