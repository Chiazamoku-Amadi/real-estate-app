import { Button } from "@/components/ui/button";
import { Bath, BedDouble, MapPin, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MarkerListingItem = ({ item, closeHandler }) => {
  return (
    <div className="flex flex-col bg-white rounded-lg cursor-pointer w-[180px]">
      <X className="self-end h-5 w-5" onClick={() => closeHandler()} />
      <Image
        src={item.listingImages[0]?.url}
        width={800}
        height={150}
        className="rounded-lg object-cover h-[120px] w-[180px]"
        alt="listingImage"
      />

      <div className="flex flex-col gap-2 mt-2 p-2">
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
        </div>
        <Link href={`/view-listing/${item.id}`} className="w-full">
          <Button size="sm">View Detail</Button>
        </Link>
      </div>
    </div>
  );
};

export default MarkerListingItem;
