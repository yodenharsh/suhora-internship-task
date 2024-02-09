import "./App.css";

import "leaflet/dist/leaflet.css";
import "./App.css";
import Map from "./components/Map";
import { FC } from "react";

const App: FC = () => {
  return (
    <div className="bg-cover bg-[url('../public/SatVu+EAP_Suhora_2.jpg')]  mx-auto bg-center bg-opacity-5 bg-no-repeat w-full h-screen">
      <Map />
    </div>
  );
};

export default App;
