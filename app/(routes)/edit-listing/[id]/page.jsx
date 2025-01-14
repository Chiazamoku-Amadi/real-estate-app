"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, use, useState } from "react";
import { toast } from "sonner";
import FileUpload from "../_components/FileUpload";
import { Loader } from "lucide-react";

const EditListing = (props) => {
  const params = use(props.params);
  const { user } = useUser();
  const router = useRouter();

  const [listing, setListing] = useState({});
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user && verifyUserRecord();
  }, [user]);

  // To ensure user only accesses listings he created
  const verifyUserRecord = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*, listingImages(listing_id, url)") // Selects data from the "listing" table and also pulls in related records from a referenced table called listingImages
      .eq("createdBy", user?.primaryEmailAddress.emailAddress) // Filters the query to return only listings created by the currently logged-in user
      .eq("id", params.id); // Adds a second filter to the query, to fetch only listings with an id matching the params.id

    if (data) {
      setListing(data[0]);
    }

    // Redirects the user to the home page if no matching records are found.
    if (data?.length <= 0) {
      router.replace("/");
    }
  };

  // On form submission, the listing table rows are updated
  // The images are also uploaded. For each image upload, its URL is constructed and inserted into the listingImages table along with the listing_id to associate it with the specific listing
  const onSubmitHandler = async (formValue) => {
    setLoading(true);

    // Updates matching rows in the "listing" table
    const { data, error } = await supabase
      .from("listing") // Targets the "listing" table
      .update(formValue) // Updates the table with the form values passed to the function
      .eq("id", params.id) // Only updates the row where the "id" matches the provided "params.id"
      .select(); // Retrieves the updated data after the update operation

    if (data) {
      toast("Listing updated!");
      setLoading(false);
    }

    for (const image of images) {
      const file = image;
      const fileExt = file.name.split(".").pop(); // Extracts the file extension from the file name
      const fileName = `${Date.now()}.${fileExt}`; // Appends the extension

      setLoading(true);

      // Uploads each image to the "listingImages" storage bucket
      const { data, error } = await supabase.storage
        .from("listingImages") // Targets the "listingImages" storage bucket
        .upload(`${fileName}`, file, {
          contentType: `image/${fileExt}`, // Specifies the content type for the image
          upsert: false, // Do not overwrite an existing file with the same name
        });

      if (data) {
        // Constructing image url
        const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}/${fileName}`;

        // Inserts the image URL into the "listingImages" table with its associated listing ID
        const { data, error } = await supabase
          .from("listingImages") // Target the "listingImages" table
          .insert([{ url: imageUrl, listing_id: params.id }]) // Inserts the URL and associate it with the listing using "listing_id"
          .select(); // Retrieves the inserted data for confirmation.

        // If an error occurs while inserting the url
        if (error) {
          setLoading(false);
        }
        // If an error occurs while uploading multiple images
      } else if (error) {
        toast("Error while uploading images");
        setLoading(false);
      }

      setLoading(false);
    }
  };

  const publishBtnHandler = async () => {
    setLoading(true);

    // To update the "active" row
    const { data, error } = await supabase
      .from("listing") // Targets the "listing" table in the database
      .update({ active: true }) // Updates the "active" column, setting its value to "true"
      .eq("id", params?.id) // Applies the update only to the row where the "id" matches "params?.id"
      .select(); // Fetches and returns the updated row(s) after the update operation

    if (data) {
      setLoading(false);
      toast("Listing updated and published!");
    }
  };

  return (
    <div className="mt-28 px-10 md:px-36 my-10">
      <h2 className="font-bold text-2xl">
        Enter some more details about your listing
      </h2>

      <Formik
        initialValues={{
          type: "",
          propertyType: "",
          profileImage: user?.imageUrl,
          fullName: user?.fullName,
        }}
        onSubmit={(values) => {
          onSubmitHandler(values);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <div className="grid gap-7 border rounded-lg shadow-md p-5 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg text-slate-500">Rent or Sell?</h2>

                    <RadioGroup
                      onValueChange={(v) => (values.type = v)}
                      defaultValue={listing?.type}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Rent" id="Rent" />
                        <Label htmlFor="Rent">Rent</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Sell" id="Sell" />
                        <Label htmlFor="Sell">Sell</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg text-slate-500">Property Type</h2>

                    <Select
                      onValueChange={(e) => (values.propertyType = e)}
                      name="propertyType"
                      defaultValue={listing?.propertyType}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue
                          placeholder={
                            listing?.propertyType
                              ? listing?.propertyType
                              : "Select Property Type"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single Family House">
                          Single Family House
                        </SelectItem>
                        <SelectItem value="Town House">Town House</SelectItem>
                        <SelectItem value="Condo">Condo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-gray-500">Bedroom</h2>
                    <Input
                      type="number"
                      placeholder="Ex.2"
                      name="bedroom"
                      defaultValue={listing?.bedroom}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-gray-500">Bathroom</h2>
                    <Input
                      type="number"
                      placeholder="Ex.2"
                      name="bathroom"
                      defaultValue={listing?.bathroom}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-gray-500">Built In</h2>
                    <Input
                      type="number"
                      placeholder="Ex.1900 Sq.ft"
                      name="builtIn"
                      defaultValue={listing?.builtIn}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-gray-500">Parking</h2>
                    <Input
                      type="number"
                      placeholder="Ex.2"
                      name="parking"
                      defaultValue={listing?.parking}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-gray-500">Lot Size (Sq.Ft)</h2>
                    <Input
                      type="number"
                      placeholder=""
                      name="lotSize"
                      defaultValue={listing?.lotSize}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-gray-500">Area (Sq.Ft)</h2>
                    <Input
                      type="number"
                      placeholder="Ex.1900"
                      name="area"
                      defaultValue={listing?.area}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-gray-500">Selling Price ($)</h2>
                    <Input
                      type="number"
                      placeholder="400000"
                      name="price"
                      defaultValue={listing?.price}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-gray-500">HOA (Per Month)</h2>
                    <Input
                      type="number"
                      placeholder="100"
                      name="hoa"
                      defaultValue={listing?.hoa}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-10">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-gray-500">Description</h2>
                    <Textarea
                      placeholder=""
                      name="description"
                      defaultValue={
                        listing?.description ? listing?.description : ""
                      }
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <h2 className="font-lg text-gray-500 my-2">
                    Upload Property images
                  </h2>
                  <FileUpload
                    setImages={(value) => setImages(value)}
                    imageList={listing?.listingImages}
                  />
                </div>

                <div className="flex justify-end gap-7">
                  <Button
                    disabled={loading}
                    variant="outline"
                    className="text-primary border-primary"
                  >
                    {loading ? <Loader className="animate-spin" /> : "Save"}
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button type="button" disabled={loading}>
                        {loading ? (
                          <Loader className="animate-spin" />
                        ) : (
                          "Save & Publish"
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Ready to Publish?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Do you really want to publish the listing?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => publishBtnHandler()}>
                          {loading ? (
                            <Loader className="animate-spin" />
                          ) : (
                            "Continue"
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default EditListing;
