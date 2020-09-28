import React from "react";
import {Map, TileLayer} from "react-leaflet";

const MainMap = () => {
    const coordinateCenterMap = {lat: 50.62978, lng: 5.575254};
    return (
        <Map
            center={[coordinateCenterMap.lat, coordinateCenterMap.lng]}
            zoom={18}
            minZoom={17}>
            <TileLayer
                url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                attribution={
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }
            />
        </Map>
    );
};

export default MainMap;
