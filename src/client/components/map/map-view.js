import React from "react";
import {Map, TileLayer} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Marker from "./marker";
import arbres from "./data/arbres.json";

const MainMap = () => {
    const coordinateCenterMap = {lat: 50.65145, lng: 5.57739};
    return (
        <Map
            center={[coordinateCenterMap.lat, coordinateCenterMap.lng]}
            zoom={18}
            minZoom={15}>
            <TileLayer
                url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                attribution={
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }
            />
            {arbres.map(arbre => (
                // eslint-disable-next-line react/jsx-key
                <MarkerClusterGroup disableClusteringAtZoom={18}>
                    <Marker
                        key={arbre.y_lambert72}
                        position={[arbre.y_phi, arbre.x_lambda]}
                        name={arbre.nom_complet}
                        circonf={arbre.circonf}
                    />
                </MarkerClusterGroup>
            ))}
            ;
        </Map>
    );
};

export default MainMap;
