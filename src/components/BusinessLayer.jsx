import { useEffect } from "react";

const BusinessLayer = ({ mapRef, businesses }) => {
  useEffect(() => {
    if (!mapRef.current || businesses.length === 0) return;

    const geojsonData = {
      type: "FeatureCollection",
      features: businesses.map((business) => ({
        type: "Feature",
        properties: { name: business.name, icon: "shop" },
        geometry: { type: "Point", coordinates: [business.location.lng, business.location.lat] },
      })),
    };

    if (mapRef.current.getSource("businesses")) {
      mapRef.current.getSource("businesses").setData(geojsonData);
    } else {
      mapRef.current.addSource("businesses", {
        type: "geojson",
        data: geojsonData,
      });

      mapRef.current.addLayer({
        id: "business-icons",
        type: "symbol",
        source: "businesses",
        layout: {
          "icon-image": ["get", "icon"],
          "icon-size": 2.2,
          "text-field": ["get", "name"],
          "text-offset": [0, 1.5],
          "text-anchor": "top",
        },
        paint: {
          "text-color": "#000",
        },
      });
    }
  }, [mapRef, businesses]);

  return null;
};

export default BusinessLayer;
