import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Feature, Layer } from "react-mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const Map = dynamic(() => import("../../lib/Map"), {
  ssr: false,
});

function MapComponent() {
  const [zoomLevel, setZoomLevel] = useState(12);
  return (
    <div className="flex items-center justify-center w-full ">
      <Map
        center={[36.7324, -1.2378]}
        style="mapbox://styles/mapbox/streets-v11"
        containerStyle={{
          height: "350px",
          width: "100%",
        }}
        onStyleLoad={() => setZoomLevel(12.001)}
        zoom={[zoomLevel]}
      >
        <Layer
          type="circle"
          id="marker"
          paint={{
            "circle-radius": 20,
            "circle-color": "#ff5200",
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff",
            "circle-stroke-opacity": 1,
          }}
        >
          <Feature coordinates={[36.802715, -1.296791]} />
        </Layer>
      </Map>
    </div>
  );
}

export default MapComponent;
