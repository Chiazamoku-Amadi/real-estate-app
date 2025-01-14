import GoogleMapSection from "@/app/_components/GoogleMapSection";
import { Button } from "@/components/ui/button";
import {
  Bath,
  BedDouble,
  CarFront,
  Drill,
  Home,
  LandPlot,
  MapPin,
  Share,
} from "lucide-react";
import AgentDetail from "./AgentDetail";

const Details = ({ listingDetail }) => {
  return (
    listingDetail && (
      <div>
        <div className="flex flex-col gap-2 my-6">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">${listingDetail?.price}</h2>
              <h2 className="flex gap-2 text-gray-500 text-lg">
                <MapPin />
                {listingDetail?.address}
              </h2>
            </div>
            <Button className="flex gap-2">
              <Share />
              Share
            </Button>
          </div>
          <hr></hr>
          <div className="flex flex-col gap-3 mt-4">
            <h2 className="text-2xl font-bold">Key features</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <h2 className="flex justify-center items-center gap-2 bg-purple-100 rounded-lg text-primary p-3">
                <Home />
                {listingDetail?.propertyType}
              </h2>
              <h2 className="flex justify-center items-center gap-2 bg-purple-100 rounded-lg text-primary p-3">
                <Drill />
                Built In {listingDetail?.builtIn}
              </h2>
              <h2 className="flex justify-center items-center gap-2 bg-purple-100 rounded-lg text-primary p-3">
                <LandPlot />
                {listingDetail?.area}
              </h2>
              <h2 className="flex justify-center items-center gap-2 bg-purple-100 rounded-lg text-primary p-3">
                <BedDouble />
                {listingDetail?.bedroom} Bed
              </h2>
              <h2 className="flex justify-center items-center gap-2 bg-purple-100 rounded-lg text-primary p-3">
                <Bath />
                {listingDetail?.bathroom} Bath
              </h2>
              <h2 className="flex justify-center items-center gap-2 bg-purple-100 rounded-lg text-primary p-3">
                <CarFront />
                {listingDetail?.parking} Parking
              </h2>
            </div>
          </div>

          <div className="space-y-1 my-4">
            <h2 className="text-2xl font-bold">What's Special</h2>
            <p className="text-gray-600">{listingDetail?.description}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Find On Map</h2>
            <GoogleMapSection
              listing={[listingDetail]}
              coordinates={listingDetail?.coordinates}
            />
          </div>

          <div className="space-y-2 my-6">
            <h2 className="text-2xl font-bold">Contact Agent</h2>
            <AgentDetail listingDetail={listingDetail} />
          </div>
        </div>
      </div>
    )
  );
};

export default Details;
