import { useEffect, useState } from 'react';
import ReactWeather, { useVisualCrossing } from 'react-open-weather';

const Weather = () => {
  const [userLocation, setUserLocation] = useState({ lat: null as number | null, lon: null as number | null });
  const [locationName, setLocationName] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(true);

  useEffect(() => {
    // Get user's current location using Geolocation API
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });

        try {
          const apiKey = 'b276b18495104566b7d18e6f8358d1cf';
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=${apiKey}`
          );
          const result = await response.json();

          const town = result?.results[0]?.components?.town;
          const county = result?.results[0]?.components?.county;

          console.log('OpenCage response:', result);

          if (town && county) {
            setLocationName(`${town}, ${county}`);
          } else {
            console.warn('No town and county found in the response:', result);
          }
        } catch (error) {
          console.error('Error getting location name:', error);
        }

        setLoadingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setLoadingLocation(false);
      }
    );
  }, []);

  const { data, isLoading, errorMessage } = useVisualCrossing({
    key: 'XG2RLQGVDVUEJU5RA76ZNSJ3U',
    lat: userLocation.lat,
    lon: userLocation.lon,
    lang: 'en',
    unit: 'metric',
  });

  return (
    <div>
      {loadingLocation ? (
        <p>Loading location...</p>
      ) : (
        <ReactWeather
          isLoading={isLoading}
          errorMessage={errorMessage}
          data={data}
          lang="en"
          locationLabel={`Current Location: ${locationName || 'unknown'}`}
          unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
          showForecast={false} // Set showForecast to false to hide the forecast
          current={true} // Set current to true to display only the current weather
        />
      )}
    </div>
  );
};

export default Weather;
