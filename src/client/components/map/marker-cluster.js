import React from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Marker from "./marker";

const MarkerCluster = ({key, position}) => (
    <MarkerClusterGroup disableClusteringAtZoom={17}>
        <Marker key={key} position={position} />
    </MarkerClusterGroup>
);

export default MarkerCluster;
