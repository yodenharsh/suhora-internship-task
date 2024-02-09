import {
  MapContainer,
  TileLayer,
  GeoJSON as GeoJSONLeaflet,
  Popup,
  Marker,
} from "react-leaflet";
import { useState } from "react";

import "leaflet/dist/leaflet.css";
import { FC } from "react";
import GeoJSONUploader from "./GeoJSONUploader";
import { GeoJSONFeatureCollection } from "../types";
import MapClickHandler from "./MapClickHandler";
import MapRecenterAuto from "./MapRecenterAuto";
import React from "react";

/**
 * Map component renders a Leaflet map with selectable tile layers.
 * @component
 * @returns {JSX.Element} Map component JSX
 */
const Map: FC = () => {
  const [activeLayer, setActiveLayer] = useState("osm");

  /**
   * Handles the change event when the user selects a different tile layer.
   * @param {React.ChangeEvent<HTMLSelectElement>} event - The change event
   */
  const handleChangeLayer = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveLayer(event.target.value);
  };

  const [geojsonData, setGeojsonData] = useState<
    GeoJSONFeatureCollection[] | null
  >(null);

  /**
   * Handles the change event when the user uploads a file.
   * @param {GeoJSONFeatureCollection} data - The file containing the GeoJSON
   */
  const handleGeoJSONLoad = (data: GeoJSONFeatureCollection[]) => {
    setGeojsonData(data);
  };

  const [popupPosition, setPopupPosition] = useState<[number, number] | null>(
    null
  );

  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(
    null
  );

  const [marker, setMarker] = useState<{
    position: [number, number];
    address: string;
  } | null>(null);

  const handleGeocodeAddress = async (address: string) => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          address
        )}&key=ebf54e2c3a1244ef8d653dc8a8db4d3e`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        setMarker({ position: [lat, lng], address });
      } else {
        console.error("No results found");
      }
    } catch (error) {
      console.error("Error geocoding address:", error);
    }
  };

  return (
    <div>
      <GeoJSONUploader onGeoJSONLoad={handleGeoJSONLoad} />
      <input
        type="text"
        placeholder="Enter address"
        onChange={(e) => handleGeocodeAddress(e.target.value)}
      />

      <select
        title="active-layer"
        value={activeLayer}
        onChange={handleChangeLayer}
      >
        <option value="osm">OpenStreetMap</option>
        <option value="satellite">Satallite Imagery </option>
      </select>
      <MapContainer
        center={marker ? marker.position : [19.07283, 72.88261]}
        zoom={13}
        style={{ height: "75vh", width: "75vw" }}
      >
        <MapClickHandler
          setPopupPosition={setPopupPosition}
          setMarkerPosition={setMarkerPosition}
        />

        {activeLayer === "osm" && (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        )}
        {activeLayer === "satellite" && (
          <TileLayer
            attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
            url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            maxZoom={20}
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
          />
        )}
        {geojsonData &&
          geojsonData.map(
            (data, index) =>
              data.checked === true && (
                <GeoJSONLeaflet key={index} data={data} />
              )
          )}
        {popupPosition && (
          <Popup position={popupPosition}>
            Latitude: {popupPosition[0]},<br /> Longitude: {popupPosition[1]}
          </Popup>
        )}
        {markerPosition && <Marker position={markerPosition} />}
        {marker && (
          <React.Fragment>
            <Marker position={marker.position}>
              <Popup>{marker.address}</Popup>
            </Marker>
            <MapRecenterAuto position={marker.position} />
          </React.Fragment>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
