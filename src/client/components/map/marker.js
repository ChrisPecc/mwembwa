import React from "react";
import {Marker} from "react-leaflet";
import L from "leaflet";
import iconArbre from "./imgmarker/marker.png";
import SinglePopup from "./popup";

const SingleMarker = ({key, position, name}) => {
    const icon = L.icon({
        iconUrl: iconArbre,
        iconAnchor: [10, 0],
        popupAnchor: [16, 0],
        iconSize: [50, 50],
    });
    return (
        <Marker key={key} icon={icon} position={position}>
            <SinglePopup name={name} />
        </Marker>
    );
};
export default SingleMarker;
