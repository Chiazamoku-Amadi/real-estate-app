"use client";

import { useEffect, useState } from "react";
import Listing from "./Listing";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";
import GoogleMapSection from "./GoogleMapSection";

const ListingMapView = ({ type }) => {
  const [listing, setListing] = useState([]);
  const [searchedAddress, setSearchedAddress] = useState();
  const [bedCount, setBedCount] = useState(0);
  const [bathCount, setBathCount] = useState(0);
  const [parkingCount, setParkingCount] = useState(0);
  const [propertyType, setPropertyType] = useState();
  const [coordinates, setCoordinates] = useState(null);

  // Ensures that listing data is fetched when the component mounts
  useEffect(() => {
    getLatestListing();
  }, []);

  const getLatestListing = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select(
        `*, listingImages(
            url,
            listing_id
            )`
      ) // Fetch all columns (*) from "listing" and the related "listingImages" table with specified fields
      .eq("active", true) // Filter for rows where the "active" column is true
      .eq("type", type) // Filter for rows where the "type" column matches the `type` prop
      .order("id", { ascending: false }); // Sort by the "id" column in descending order

    if (data) {
      setListing(data);
    }

    if (error) {
      toast("Server side error!");
    }
  };

  const handleSearch = async () => {
    const searchTerm =
      searchedAddress?.value?.structured_formatting?.main_text || "";

    let query = supabase
      .from("listing")
      .select(`*, listingImages(url, listing_id)`)
      .eq("active", true)
      .eq("type", type)
      .gte("bedroom", bedCount)
      .gte("bathroom", bathCount)
      .gte("parking", parkingCount)
      .like("address", "%" + searchTerm + "%") // To search for listings where the address includes the "searchTerm"
      .order("id", { ascending: false });

    if (propertyType) {
      query = query.eq("propertyType", propertyType);
    }

    const { data, error } = await query;

    if (data) {
      setListing(data);
    }

    if (error) {
      toast("Server side error!");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <Listing
          listing={listing}
          handleSearch={handleSearch}
          searchedAddress={(v) => setSearchedAddress(v)}
          setBedCount={setBedCount}
          setBathCount={setBathCount}
          setParkingCount={setParkingCount}
          setPropertyType={setPropertyType}
          setCoordinates={setCoordinates}
        />
      </div>

      <div className="fixed right-10 h-full md:w-[350px] lg:w-[450px] xl:w-[650px] mt-5">
        <GoogleMapSection listing={listing} coordinates={coordinates} />
      </div>
    </div>
  );
};

export default ListingMapView;
