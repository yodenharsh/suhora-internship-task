import "./App.css";

import "leaflet/dist/leaflet.css";
import "./App.css";
import Map from "./components/Map";
import { FC } from "react";

const App: FC = () => {
  return (
    <div>
      <Map />
    </div>
  );
};

export default App;
