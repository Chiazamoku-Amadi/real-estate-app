"use client";

import { supabase } from "@/utils/supabase/client";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import Slider from "../_components/Slider";
import Details from "../_components/Details";

const ViewListing = (props) => {
  const [listingDetail, setListingDetail] = useState();
  const params = use(props.params);

  useEffect(() => {
    GetListingDetails();
  }, []);

  const GetListingDetails = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*, listingImages(url, listing_id)")
      .eq("id", params.id)
      .eq("active", true);

    if (data) {
      setListingDetail(data[0]);
    }

    if (error) {
      toast("Server side error!");
    }
  };

  return (
    <div className="mt-28 px-4 md:px-32 lg:px-56 py-5">
      <Slider imageList={listingDetail?.listingImages} />
      <Details listingDetail={listingDetail} />
    </div>
  );
};

export default ViewListing;
