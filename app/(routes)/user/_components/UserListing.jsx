import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import { Bath, BedDouble, Loader, MapPin, Ruler, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const UserListing = () => {
  const { user } = useUser();
  const [listing, setListing] = useState();

  useEffect(() => {
    user && GetUserListing();
  }, [user]);

  const GetUserListing = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*, listingImages(url, listing_id)")
      .eq("createdBy", user?.primaryEmailAddress?.emailAddress);

    setListing(data);
  };

  const deleteListing = async (listingId) => {
    try {
      // Delete associated listing images
      const { error: imageError } = await supabase
        .from("listingImages")
        .delete()
        .eq("listing_id", listingId);

      if (imageError) {
        console.error("Error deleting listing images:", imageError.message);
        toast("Error deleting listing images");
        return;
      }

      // Delete the listing itself
      const { error: listingError } = await supabase
        .from("listing")
        .delete()
        .eq("id", listingId);

      if (listingError) {
        console.error("Error deleting listing:", listingError.message);
        toast("Error deleting listing");
        return;
      }

      // Refresh the user's listings
      GetUserListing();
    } catch (err) {
      console.error("Error deleting listing:", err.message);
    }
  };

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold">Manage your Listing</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {listing &&
          listing?.map((item, index) => (
            <div
              key={index}
              className="hover:border hover:border-primary rounded-lg cursor-pointer p-3"
            >
              <h2 className="absolute bg-primary text-white text-sm rounded-lg py-1 px-2 m-1">
                {item.active ? "Published" : "Drafts"}
              </h2>
              <Image
                src={
                  item.listingImages[0]
                    ? item.listingImages[0]?.url
                    : "/placeholder.svg"
                }
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

                <div className="flex justify-between gap-2">
                  <Link href={`/view-listing/${item.id}`} className="w-full">
                    <Button size="sm" variant="outline" className="w-full">
                      View
                    </Button>
                  </Link>

                  <Link href={`/edit-listing/${item.id}`} className="w-full">
                    <Button size="sm" className="w-full">
                      Edit
                    </Button>
                  </Link>

                  <div className="w-full">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="w-full"
                        >
                          <Trash />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Listing</AlertDialogTitle>
                          <AlertDialogDescription>
                            Do you really want to delete the listing?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteListing(item.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserListing;
