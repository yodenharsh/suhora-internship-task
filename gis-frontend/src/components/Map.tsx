import {
  MapContainer,
  TileLayer,
  GeoJSON as GeoJSONLeaflet,
} from "react-leaflet";
import { useState } from "react";

import "leaflet/dist/leaflet.css";
import { FC } from "react";
import GeoJSONUploader from "./GeoJSONUploader";
import { GeoJSONFeatureCollection } from "../types";

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

  return (
    <div>
      <GeoJSONUploader onGeoJSONLoad={handleGeoJSONLoad} />

      <select
        title="active-layer"
        value={activeLayer}
        onChange={handleChangeLayer}
      >
        <option value="osm">OpenStreetMap</option>
        <option value="satellite">Satallite Imagery </option>
      </select>
      <MapContainer
        center={[19.07283, 72.88261]}
        zoom={13}
        style={{ height: "75vh", width: "75vw" }}
      >
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
      </MapContainer>
    </div>
  );
};

export default Map;
