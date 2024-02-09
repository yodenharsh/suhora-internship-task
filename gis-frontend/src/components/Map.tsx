import {
  MapContainer,
  TileLayer,
  GeoJSON as GeoJSONLeaflet,
  Popup,
  Marker,
} from "react-leaflet";
import { useState } from "react";

import { useDebouncedCallback } from "use-debounce";
import "leaflet/dist/leaflet.css";
import { FC } from "react";
import GeoJSONUploader from "./GeoJSONUploader";
import { GeoJSONFeatureCollection } from "../types";
import MapClickHandler from "./MapClickHandler";
import MapRecenterAuto from "./MapRecenterAuto";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
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

  /**
   * Debounce mechanism that sends API call only after 750ms without input change
   * @param {string} address - The address as a string
   */
  const debouncedSearch = useDebouncedCallback((address) => {
    handleGeocodeAddress(address);
  }, 750);

  /**
   * Handles the change event when the user  uses the search bar
   * @param {string} address - The address as a string
   */
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
        toast.error("Couldn't find address");
      }
    } catch (error) {
      console.error("Error geocoding address:", error);
    }
  };

  return (
    <div>
      <GeoJSONUploader onGeoJSONLoad={handleGeoJSONLoad} />

      <div className="relative">
        <input
          type="text"
          placeholder="🔍 Start typing for forward geocoding the location"
          onChange={(e) => debouncedSearch(e.target.value)}
          className="md:w-2/5 w-full  px-4 py-2 pr-10 rounded-2xl border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <select
          title="active-layer"
          className="ml-12 h-9 rounded-xl border-2 border-black"
          value={activeLayer}
          onChange={handleChangeLayer}
        >
          <option value="osm">OpenStreetMap</option>
          <option value="satellite">Satallite Imagery </option>
        </select>
      </div>
      <MapContainer
        center={marker ? marker.position : [19.07283, 72.88261]}
        zoom={5}
        style={{ height: "75vh", width: "100vw", marginTop: "32px" }}
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
      <ToastContainer position="bottom-center" theme="colored" />
    </div>
  );
};

export default Map;
