import { GeoJsonObject } from "react-leaflet";

export interface GeoJSONFeatureCollection extends GeoJsonObject {
  type: string;
  features: GeoJSONFeature[];
  checked?: boolean;
}

export interface GeoJSONFeature {
  type: string;
  properties: { [key: string]: any };
  geometry: {
    type: string;
    coordinates: number[] | number[][] | number[][][];
  };
}

interface GeoJSONUploaderProps {
  onGeoJSONLoad: (data: GeoJSONFeatureCollection) => void;
}
