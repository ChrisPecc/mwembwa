import React from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Marker from "./marker";
import MarkerPopup from "./popup";

const MarkerCluster = ({key, position, name}) => (
    <MarkerClusterGroup disableClusteringAtZoom={17}>
        <Marker key={key} position={position}>
            <MarkerPopup name={name} />
        </Marker>
    </MarkerClusterGroup>
);

export default MarkerCluster;
