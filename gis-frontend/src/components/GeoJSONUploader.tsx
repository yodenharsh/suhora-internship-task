import { FC, useState, useEffect } from "react";
import { GeoJSONFeatureCollection } from "../types";

interface GeoJSONProps {
  onGeoJSONLoad: (data: GeoJSONFeatureCollection[]) => void;
}

/**
 * GeoJSONUploader component for handling GeoJSON file upload.
 * @component
 * @param {Object} props - Component props.
 * @param {Function} props.onGeoJSONLoad - Callback function called when GeoJSON data is loaded.
 * @returns {JSX.Element} GeoJSONUploader component.
 */
const GeoJSONUploader: FC<GeoJSONProps> = ({ onGeoJSONLoad }) => {
  /**
   * State to store the parsed GeoJSON data.
   * @type {GeoJSONFeatureCollection[] | null}
   */
  const [geojsonData, setGeojsonData] = useState<GeoJSONFeatureCollection[]>(
    []
  );

  const [filenames, setfilenames] = useState<string[]>([]);

  /**
   * Function to handle file upload event.
   * @param {React.ChangeEvent<HTMLInputElement>} event - Change event from file input.
   */
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files == null || event.target.files[0] == null) return;
    const files = event.target.files;

    const newGeoJSONData: GeoJSONFeatureCollection[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      setfilenames([...filenames, file.name]);
      reader.onload = () => {
        try {
          const data: GeoJSONFeatureCollection = JSON.parse(
            reader.result as string
          );
          data.checked = true;
          newGeoJSONData.push(data);
          setGeojsonData([...geojsonData, data]);
        } catch (error) {
          console.error("Error parsing GeoJSON file:", error);
        }
      };
      reader.readAsText(file);
    });
  };

  /**
   * Function to handle checkbox change event.
   * @param {number} index - index of the item changed inside array.
   */
  const handleCheckboxChange = (index: number) => {
    setGeojsonData((prevState) =>
      prevState.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  useEffect(() => {
    onGeoJSONLoad(geojsonData);
  }, [geojsonData, onGeoJSONLoad]);

  return (
    <div>
      <input type="file" accept=".geojson" onChange={handleFileUpload} />
      <div className="flex flex-wrap items-center space-x-2">
        {geojsonData.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="bg-gray-200 rounded-full px-2 py-1">
              {filenames[index]}{" "}
              <input
                type="checkbox"
                checked={!!item.checked}
                onChange={() => handleCheckboxChange(index)}
                className="ml-2"
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeoJSONUploader;
