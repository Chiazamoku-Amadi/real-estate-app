export const googleMapsLoaderConfig = {
  id: "google-map-script",
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY,
  libraries: ["places"], // Include all libraries you might use
};
