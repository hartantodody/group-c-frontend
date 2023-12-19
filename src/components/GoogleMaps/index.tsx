// import { useState } from "react";
// import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

const GoogleMaps = () => {
  // const [response, setResponse] = useState<any | null>(null);
  // const origin = { lat: -6.2088, lng: 106.8456 };
  // const destination = { lat: -6.9271, lng: 107.6028 };
  // const directionsOptions = {
  //   origin: origin,
  //   destination: destination,
  //   travelMode: google.maps.TravelMode.WALKING,
  // };
  // const directionsCallback = (result: any, status: any) => {
  //   if (status === "OK") {
  //     const distanceInMeters = result.routes[0].legs[0].distance.value;
  //     console.log(`Distance: ${distanceInMeters} meters`);
  //     setResponse(result);
  //   } else {
  //     console.error(`Error fetching directions: ${status}`);
  //   }
  // };
  // return (
  //   <LoadScript googleMapsApiKey='YOUR_GOOGLE_MAPS_API_KEY'>
  //     <GoogleMap mapContainerStyle={{ height: "400px", width: "100%" }} zoom={10} center={origin}>
  //       <DirectionsService options={directionsOptions} callback={directionsCallback} />
  //       {response && <DirectionsRenderer directions={response} />}
  //     </GoogleMap>
  //   </LoadScript>
  // );
};

export default GoogleMaps;
