import { useEffect, useState } from "react";
import ReactWeather, { useVisualCrossing } from "react-open-weather";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "./index.css";
import { customStyles } from "./style";
import { Button } from "@mui/material";

const Weather = () => {
  const [userLocation, setUserLocation] = useState({ lat: null as number | null, lon: null as number | null });
  const [locationName, setLocationName] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });

        try {
          const apiKey = "b276b18495104566b7d18e6f8358d1cf";
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=${apiKey}`
          );
          const result = await response.json();

          const town = result?.results[0]?.components?.town;
          const county = result?.results[0]?.components?.county;

          console.log("OpenCage response:", result);

          if (town && county) {
            setLocationName(`${town}, ${county}`);
          } else {
            console.warn("No town and county found in the response:", result);
          }
        } catch (error) {
          console.error("Error getting location name:", error);
        }

        setLoadingLocation(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        setLoadingLocation(false);
      }
    );
  }, []);

  const { data, isLoading, errorMessage } = useVisualCrossing({
    key: "XG2RLQGVDVUEJU5RA76ZNSJ3U",
    lat: userLocation.lat,
    lon: userLocation.lon,
    lang: "en",
    unit: "metric",
  });

  const handleExpandClick = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div style={{ margin: "10px" }}>
      {loadingLocation ? (
        <p>Loading location...</p>
      ) : (
        <div
          className='weather-container'
          style={{ padding: 0, background: "transparent", overflow: "hidden", height: expanded ? "" : "60px" }}
        >
          <ReactWeather
            isLoading={isLoading}
            errorMessage={errorMessage}
            data={data}
            lang='en'
            locationLabel={`${locationName || "unknown"}`}
            unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
            showForecast={false}
            current={true}
            theme={customStyles}
          />
        </div>
      )}
      <Button onClick={handleExpandClick} variant='text' color='secondary' className='button-header'>
        {!expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </Button>
    </div>
  );
};

export default Weather;
