import { FC, useEffect } from "react";
import { useMap } from "react-leaflet";

interface props {
  position: [number, number];
}

const MapRecenterAuto: FC<props> = (props) => {
  const map = useMap();
  const lat = props.position[0];
  const lng = props.position[1];

  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng]);
  return null;
};

export default MapRecenterAuto;
