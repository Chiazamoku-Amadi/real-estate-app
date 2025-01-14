"use client";

import { UserButton, UserProfile } from "@clerk/nextjs";
import { Building2 } from "lucide-react";
import UserListing from "../_components/UserListing";

const User = () => {
  return (
    <div className="md:px-10 lg:px-32 mt-28 mb-6">
      <h2 className="text-2xl font-bold py-3">Profile</h2>
      <UserProfile>
        <UserButton.UserProfilePage
          label="My Listing"
          labelIcon={<Building2 className="h-5 w-5" />}
          url="my-listing"
        >
          <UserListing />
        </UserButton.UserProfilePage>
      </UserProfile>
    </div>
  );
};

export default User;
