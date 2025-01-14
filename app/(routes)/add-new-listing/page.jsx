"use client";

import GoogleAddressSearch from "@/app/_components/GoogleAddressSearch";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const AddNewListing = () => {
  const [selectedAddress, setSelectedAddress] = useState();
  const [coordinates, setCoordinates] = useState();
  const [loader, setLoader] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const nextHandler = async () => {
    setLoader(true);

    // Insert a single row
    const { data, error } = await supabase
      .from("listing")
      .insert([
        {
          address: selectedAddress.label,
          coordinates: coordinates,
          createdBy: user?.primaryEmailAddress.emailAddress,
        },
      ])
      // "select" ensures that the inserted data is returned after the operation is complete, allowing you to verify what was added to the database
      // since by default "insert" does not return inserted rows
      .select();

    if (data) {
      setLoader(false);
      router.replace(`/edit-listing/${data[0].id}`);
      toast("New address added for listing");
    }

    if (error) {
      setLoader(false);
      toast("Server side error");
    }
  };

  return (
    <div className="mt-10 mx-auto w-[90%] sm:w-4/5 md:w-3/5 lg:w-2/5">
      <div className="flex flex-col gap-5 justify-center items-center py-10 mt-28">
        <h2 className=" font-bold text-2xl">Add New Listing</h2>

        <div className="flex flex-col gap-5 rounded-lg border shadow-md py-8 px-6 sm:p-10 w-full">
          <h2 className="text-gray-500">
            Enter address which you want to list
          </h2>

          <GoogleAddressSearch
            selectedAddress={(value) => setSelectedAddress(value)}
            setCoordinates={(value) => setCoordinates(value)}
          />
          <Button
            disabled={!selectedAddress || !coordinates || loader}
            onClick={nextHandler}
          >
            {loader ? <Loader className="animate-spin" /> : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddNewListing;
