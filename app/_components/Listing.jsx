import { Bath, BedDouble, MapPin, Ruler, Search } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import GoogleAddressSearch from "./GoogleAddressSearch";
import { Button } from "@/components/ui/button";
import FilterSection from "./FilterSection";
import Link from "next/link";

const Listing = ({
  listing,
  handleSearch,
  searchedAddress,
  setBedCount,
  setBathCount,
  setParkingCount,
  setPropertyType,
  setCoordinates,
}) => {
  const [address, setAddress] = useState();

  return (
    <div>
      <div className="flex gap-6 p-3">
        <GoogleAddressSearch
          selectedAddress={(v) => {
            searchedAddress(v);
            setAddress(v);
          }}
          setCoordinates={setCoordinates}
        />
        <Button className="flex gap-2" onClick={handleSearch}>
          <Search className="h-4 w-4" />
          Search
        </Button>
      </div>

      <FilterSection
        setBedCount={setBedCount}
        setBathCount={setBathCount}
        setParkingCount={setParkingCount}
        setPropertyType={setPropertyType}
      />

      {address && (
        <div className="px-3 my-5">
          <h2 className="text-xl">
            Found <span className="font-semibold">{listing?.length}</span>
            {` result${listing?.length > 1 ? "s" : ""} for `}
            <span className="text-primary font-semibold">{`${address?.label}`}</span>
          </h2>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {listing.length > 0
          ? listing.map((item, index) => (
              <Link key={index} href={`/view-listing/${item.id}`}>
                <div className="hover:border hover:border-primary rounded-lg cursor-pointer p-3">
                  <Image
                    src={item.listingImages[0]?.url}
                    width={800}
                    height={150}
                    className="rounded-lg object-cover h-[150px]"
                    alt="listingImage"
                  />

                  <div className="flex flex-col gap-2 mt-2">
                    <h2 className="font-bold text-xl">${item?.price}</h2>
                    <h2 className="flex items-center gap-2 text-sm text-gray-400">
                      <MapPin className="h-4 w-4" />
                      {item.address}
                    </h2>

                    <div className="flex justify-between gap-2 mt-2">
                      <h2 className="flex justify-center items-center gap-2 text-sm text-gray-500 bg-slate-200 rounded-md p-2 w-full">
                        <BedDouble className="h-4 w-4" />
                        {item?.bedroom}
                      </h2>
                      <h2 className="flex justify-center items-center gap-2 text-sm text-gray-500 bg-slate-200 rounded-md p-2 w-full">
                        <Bath className="h-4 w-4" />
                        {item?.bathroom}
                      </h2>
                      <h2 className="flex justify-center items-center gap-2 text-sm text-gray-500 bg-slate-200 rounded-md p-2 w-full">
                        <Ruler className="h-4 w-4" />
                        {item?.area}
                      </h2>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
              <div
                key={index}
                className="rounded-lg bg-slate-200 animate-pulse h-48 w-full"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default Listing;
