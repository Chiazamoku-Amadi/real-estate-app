"use client";

import { useUser } from "@clerk/nextjs";
import ListingMapView from "./_components/ListingMapView";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-28 px-10">
      {isSignedIn ? (
        <ListingMapView type="Sell" />
      ) : (
        <p>Redirecting to Sign In...</p>
      )}
    </div>
  );
}
