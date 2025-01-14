import { MarkerF, OverlayView } from "@react-google-maps/api";
import { useState } from "react";
import MarkerListingItem from "./MarkerListingItem";

const MarkerItem = ({ item }) => {
  const [selectedListing, setSelectedListing] = useState();

  return (
    <div>
      <MarkerF
        position={item.coordinates}
        onClick={() => setSelectedListing(item)}
        icon={{
          url: "/material-symbols--home-pin.svg",
          scaledSize: { width: 40, height: 40 },
        }}
      >
        {selectedListing && (
          <OverlayView
            position={selectedListing.coordinates}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div>
              <MarkerListingItem
                item={selectedListing}
                closeHandler={() => setSelectedListing(null)}
              />
            </div>
          </OverlayView>
        )}
      </MarkerF>
    </div>
  );
};

export default MarkerItem;
