/* eslint-disable no-console */
import React, {useState} from "react";
import {Map, TileLayer} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Marker from "./marker/marker";
import axiostree from "./data/tree.json";
import axios from "axios";
import "./css/map-view.css";
import ModalRegleJeu from "./modal-regle-jeu/regle-jeu";

const MainMap = () => {
    // console.log(axiostree.basicTreeValue);
    // console.log(axiostree.message.is_lockede);
    let coordinateCenterMap = {lat: 50.65145, lng: 5.57739};

    const [trees, setTrees] = useState([]);

    const getTreesByCoordinateCenterMap = () => {
        axios
            .get("/api/tree/", {
                params: {
                    coordinateCenterMap,
                },
            })
            .then(response => {
                setTrees(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const positionActuel = e => {
        coordinateCenterMap = e.center;
        getTreesByCoordinateCenterMap(coordinateCenterMap);
    };

    const wrapperSetTrees = treesUpdated => {
        setTrees(treesUpdated);
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
                <MarkerClusterGroup
                    disableClusteringAtZoom={18}
                    trees={trees}
                    wrapperSetTrees={wrapperSetTrees}>
                    {trees.map(tree => (
                        <Marker
                            key={tree.message._id}
                            position={[
                                tree.message.location.coordinates[1],
                                tree.message.location.coordinates[0],
                            ]}
                        />
                    ))}
                    ;
                </MarkerClusterGroup>
                <ModalRegleJeu />
            </Map>
        </>
    );
};
export default MainMap;
