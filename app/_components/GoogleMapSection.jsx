import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { googleMapsLoaderConfig } from "../utils/googleMapsLoader";
import MarkerItem from "./MarkerItem";

const containerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: 10,
};

const GoogleMapSection = ({ listing, coordinates }) => {
  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });

  const { isLoaded } = useJsApiLoader(googleMapsLoaderConfig);

  const [map, setMap] = React.useState(null);

  useEffect(() => {
    coordinates && setCenter(coordinates);
  }, [coordinates]);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
      gestureHandling="greedy"
    >
      {/* Child components, such as markers, info windows, etc. */}
      {listing.map((item, index) => (
        <MarkerItem key={index} item={item} map={map} />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default GoogleMapSection;
