import React from "react";
import {Map, TileLayer} from "react-leaflet";
import SingleMarker from "./marker";
import arbres from "./data/arbres.json";

const MainMap = () => {
    const coordinateCenterMap = {lat: 50.65145, lng: 5.57739};
    return (
        <Map
            center={[coordinateCenterMap.lat, coordinateCenterMap.lng]}
            zoom={17}
            minZoom={12}>
            <TileLayer
                url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                attribution={
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }
            />
            {arbres.map(arbre => (
                <SingleMarker
                    key={arbre.y_lambert72}
                    position={[arbre.y_phi, arbre.x_lambda]}
                    name={arbre.nom_complet}
                />
            ))}
            ;
        </Map>
    );
};

export default MainMap;
