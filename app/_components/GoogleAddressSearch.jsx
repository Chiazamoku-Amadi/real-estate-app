"use client";

import { MapPin } from "lucide-react";
import { useJsApiLoader } from "@react-google-maps/api";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import { googleMapsLoaderConfig } from "../utils/googleMapsLoader";

const GoogleAddressSearch = ({ selectedAddress, setCoordinates }) => {
  const { isLoaded } = useJsApiLoader(googleMapsLoaderConfig);

  return isLoaded ? (
    <div className="flex items-center w-full">
      <MapPin className="rounded-l-lg text-primary bg-purple-200 p-2 h-10 w-10" />
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
        selectProps={{
          placeholder: "Search Property Address",
          isClearable: true,
          className: "w-full",
          onChange: (place) => {
            selectedAddress(place);
            geocodeByAddress(place?.label)
              .then((results) => getLatLng(results[0]))
              .then(({ lat, lng }) => {
                setCoordinates({ lat, lng });
              });
          },
        }}
      />
    </div>
  ) : (
    <></>
  );
};

export default GoogleAddressSearch;
