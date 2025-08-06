import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./App.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const App = () => {
  const mapContainer = useRef(null);
  const geocoderContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/rocalder/cmdz2j5yx008e01rycq9325pm",
      center: [-74.006, 40.7128],
      zoom: 9,
      attributionControl: false, // hide default Mapbox attribution
    });

    // Add navigation
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Add geocoder
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      countries: "us",
      bbox: [-124.848974, 24.396308, -66.885444, 49.384358],
      proximity: { longitude: -95.7129, latitude: 37.0902 },
      marker: false,
      placeholder: "Search U.S. locations...",
    });

    if (geocoderContainer.current) {
      geocoderContainer.current.innerHTML = "";
      geocoderContainer.current.appendChild(geocoder.onAdd(map));
    }

    // Add custom attribution
    map.addControl(
  new mapboxgl.AttributionControl({
    compact: true,
    customAttribution: "Source: U.S. Census Bureau (ACS 5-Year Estimates) <br/>",
  }),
  "bottom-left"
);
    return () => map.remove();
  }, []);

  return (
    <div className="app">
      <div className="info-box">
        <a href="https://calder.so" target="_blank" rel="noopener noreferrer">
        <img
        src={`${import.meta.env.BASE_URL}calder-logo.png`}
        alt="Calder Logo"
        style={{ maxWidth: "25px" }}
        />
        </a>
        <h1>U.S. Wealth Map</h1>
        <p>
          An interactive map of U.S. household income, offering a detailed look at regional wealth distribution.
        </p>
      </div>
      <div className="legend">
  <div className="legend-label">Median Household Income (USD)</div>
  <div className="legend-bar">
     <span style={{ background: "#f03b20" }}></span>  {/* red-orange */}
    <span style={{ background: "#fd8d3c" }}></span>  {/* orange */}
    <span style={{ background: "#fecc5c" }}></span>  {/* yellow-orange */}
    <span style={{ background: "#c7e9c0" }}></span>  {/* light green */}
    <span style={{ background: "#74c476" }}></span>  {/* medium green */}
    <span style={{ background: "#006d2c" }}></span>  {/* dark green */}
  </div>
  <div className="legend-values">
    <span>$30k</span>
    <span>$60k</span>
    <span>$100k</span>
    <span>$170k</span>
    <span>$250k+</span>
  </div>
</div>

      <div className="geocoder" ref={geocoderContainer} />
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default App;