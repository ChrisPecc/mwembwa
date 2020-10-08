/* eslint-disable no-console */
import React from "react";
import {Map, TileLayer} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Marker from "./marker/marker";
// import arbres from "./data/arbres.json";
import axiostree from "./data/tree.json";
import "./css/map-view.css";
import ModalRegleJeu from "./modal-regle-jeu/regle-jeu";

const MainMap = () => {
    console.log(axiostree.basicTreeValue);
    console.log(axiostree.message.is_lockede);
    // const coordinateCenterMap = {lat: 50.65145, lng: 5.57739};
    const positionActuel = e => {
        const zoom = e.zoom;
        const geoloc = e.center;
        console.log(zoom);
        console.log(geoloc[0]);
        console.log(geoloc[1]);
    };
    return (
        <>
            <Map
                center={[
                    axiostree.message.location.coordinates[1],
                    axiostree.message.location.coordinates[0],
                ]}
                zoom={18}
                minZoom={15}
                onViewportChanged={e => positionActuel(e)}>
                <TileLayer
                    url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                    attribution={
                        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    }
                />
                <MarkerClusterGroup disableClusteringAtZoom={18}>
                    {/* {arbres.map(arbre => ( */}
                    <Marker
                        id={axiostree.message._id}
                        position={[
                            axiostree.message.location.coordinates[1],
                            axiostree.message.location.coordinates[0],
                        ]}
                    />
                    {/* ))}
                ; */}
                </MarkerClusterGroup>
                <ModalRegleJeu />
            </Map>
        </>
    );
};
export default MainMap;
