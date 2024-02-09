import Card from "./layout/Card";

const HowTo: React.FC = () => {
  return (
    <div>
      <Card>
        <div className="flex-none text-left pl-32">
          <h1 className="text-3xl font-semibold">Instructions</h1>
          <hr />
          <h3 className="text-xl">Using the Map</h3>
          <p>
            <b>To Zoom in and out: </b>Use mouse scroll
          </p>
          <p>
            <b>To Pan: </b> Hold left click on mouse and move your mouse
          </p>
          <p>
            <b>To check coordinates of a point on map: </b> left click on the
            location
          </p>
          <h3 className="text-xl">Using the Search bar</h3>
          <p>
            <b>For forward geocoding: </b>Start typing on the search bar and
            wait for the map to point to given address
          </p>
          <h3 className="text-xl">Using the Layer Select box</h3>
          <p>
            <b>Select desired layer</b> using the select box. The two available
            layers are:
            <ul className="ml-4">
              <li className="list-disc">OpenStreetMaps</li>
              <li className="list-disc">Google Satellite</li>
            </ul>{" "}
          </p>
          <h3 className="text-xl">Uploading your GeoJSON</h3>
          <p>
            <b>Upload multiple GeoJSON: </b> by uploading all of them one by one
          </p>
          <p>
            <b>Select which to display: </b>by using the checkboxes that are
            visible after uploading
          </p>
        </div>
      </Card>
    </div>
  );
};

export default HowTo;
