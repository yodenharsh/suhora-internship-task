import { FC } from "react";
import { useMapEvents } from "react-leaflet";

const MapClickHandler: FC<{
  setPopupPosition: React.Dispatch<
    React.SetStateAction<[number, number] | null>
  >;
  setMarkerPosition: React.Dispatch<
    React.SetStateAction<[number, number] | null>
  >;
}> = ({ setPopupPosition, setMarkerPosition }) => {
  useMapEvents({
    click: (event) => {
      setPopupPosition([event.latlng.lat, event.latlng.lng]);
      setMarkerPosition([event.latlng.lat, event.latlng.lng]);
    },
  });

  return null;
};

export default MapClickHandler;
