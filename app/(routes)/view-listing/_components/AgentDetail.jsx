import { Button } from "@/components/ui/button";
import Image from "next/image";

const AgentDetail = ({ listingDetail }) => {
  return (
    <div className="flex justify-between items-center gap-5 p-5 rounded-lg shadow-md border">
      <div className="flex items-center gap-5">
        <Image
          src={listingDetail?.profileImage}
          alt="profile-image"
          width={60}
          height={60}
          className="rounded-full"
        />

        <div>
          <h2 className="text-lg font-bo\">{listingDetail?.fullName}</h2>
          <h2 className="text-gray-500">{listingDetail?.createdBy}</h2>
        </div>
      </div>

      <Button>Send Message</Button>
    </div>
  );
};

export default AgentDetail;
