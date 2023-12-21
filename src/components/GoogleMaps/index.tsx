import { useState, useEffect, useMemo } from "react";
import { GoogleMap, DirectionsService, DirectionsRenderer, Marker } from "@react-google-maps/api";
import { Button, Typography, CircularProgress } from "@mui/material";
import { fetchGetSteps, fetchPostSteps } from "../../utils/fetchAPI";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { Steps } from "../../interfaces/interface";
import { grey } from "@mui/material/colors";
import "./index.css";

const GoogleMaps = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<any | null>(null);
  const [markers, setMarkers] = useState<Array<any>>([]);
  const [userPosition, setUserPosition] = useState<any | null>(null);
  const [loadingUserLocation, setLoadingUserLocation] = useState(true);
  const [distanceInMeters, setDistanceInMeters] = useState<number | null>(null);
  const [todaysSteps, setTodaysSteps] = useState<number | null>(0);
  const [expanded, setExpanded] = useState(false);

  const origin = markers[0] || userPosition;
  const destination = markers[1];

  const directionsOptions = useMemo(
    () => ({
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.WALKING,
    }),
    [origin, destination]
  );

  const directionsCallback = (result: any, status: any) => {
    if (status === "OK") {
      const newDistanceValue = result.routes[0].legs[0].distance.value;
      if (newDistanceValue !== distanceInMeters) {
        setDistanceInMeters(newDistanceValue);
        setResponse(result);
      }
    } else {
      console.error(`Error fetching directions: ${status}`);
    }
  };

  const handleMapClick = (event: any) => {
    const clickedPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    if (markers.length < 2) {
      setMarkers((prevMarkers) => [...prevMarkers, clickedPosition]);
    }
  };

  const handleDeleteMarkers = () => {
    setMarkers([]);
    setResponse(null);
    setDistanceInMeters(null);
    setTodaysSteps(0);
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoadingUserLocation(false);
        },
        (error) => {
          console.error("Error getting user location:", error);
          setLoadingUserLocation(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLoadingUserLocation(false);
    }
  };

  useEffect(() => {
    if (loadingUserLocation) {
      getUserLocation();
    } else {
      setLoading(false);
    }
  }, [loadingUserLocation]);

  useEffect(() => {
    if (distanceInMeters !== null) {
      console.log(`Distance: ${distanceInMeters} meters`);
    }
  }, [distanceInMeters]);

  fetchGetSteps()
    .then((data) => {
      if (data.success === true) {
        setTodaysSteps(data.data.stepsActual);
        console.log(todaysSteps);
      } else if (data.success === false) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: `${data.message}`,
          confirmButtonText: "OK",
          confirmButtonColor: "#005792",
        });
      }
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: `${error.message}`,
        confirmButtonText: "OK",
        confirmButtonColor: "#005792",
      });
    });

  const handleSubmit = () => {
    setLoading(true);

    const stepsData: Steps = {
      stepsActual: distanceInMeters !== null ? distanceInMeters + (todaysSteps || 0) : 0,
    };

    console.log("Step data :", stepsData);

    fetchPostSteps(stepsData)
      .then((data) => {
        if (data.success === true)
          Swal.fire({
            icon: "success",
            title: "Submit successful!",
            text: `${data.message}`,
            confirmButtonText: "OK",
            confirmButtonColor: "#005792",
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: `${error.message}`,
          confirmButtonText: "OK",
          confirmButtonColor: "#005792",
        });
      })
      .finally(() => {
        setLoading(false);
        fetchGetSteps();
      });
  };

  const handleExpandClick = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <>
      <img
        src='public\footsteps-silhouette-variant-svgrepo-com.svg'
        alt='calories burn icon'
        style={{ width: "50px" }}
      ></img>
      <Typography variant='h6'>Steps</Typography>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className='map-border'>
              <GoogleMap
                mapContainerStyle={{ height: "400px", width: "100%" }}
                zoom={10}
                center={origin}
                onClick={handleMapClick}
              >
                {!loadingUserLocation && <Marker position={origin} label='A' />}
                {markers.map((marker, index) => (
                  <Marker key={index} position={marker} label={String.fromCharCode(65 + index)} />
                ))}
                <DirectionsService options={directionsOptions} callback={directionsCallback} />
                {response && <DirectionsRenderer directions={response} />}
              </GoogleMap>
            </div>
            <Typography variant='body1'>
              Current steps :{" "}
              <span style={{ fontWeight: 800 }}>{distanceInMeters !== null ? distanceInMeters : 0} steps </span>
            </Typography>
            <Typography variant='body1'>
              You've walked :{" "}
              <span style={{ fontWeight: 800 }}>{todaysSteps !== 0 || null ? todaysSteps : 0} steps </span>
            </Typography>
            <Button
              variant='outlined'
              color='error'
              onClick={handleDeleteMarkers}
              size='small'
              style={{ margin: "0 5px" }}
            >
              <Typography variant='body1'>Reset Marker</Typography>
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={handleSubmit}
              disabled={loading}
              size='small'
              style={{ margin: "0 5px" }}
            >
              <Typography variant='body1'>Submit</Typography>
              {loading && <CircularProgress size={17} sx={{ marginLeft: 1, color: grey }} />}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <Button onClick={handleExpandClick} variant='outlined' color='primary' className='small-button'>
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Button>
    </>
  );
};

export default GoogleMaps;
