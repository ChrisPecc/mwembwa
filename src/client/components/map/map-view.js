/* eslint-disable no-console */
import React, {useState} from "react";
import {Map, TileLayer} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Marker from "./marker/marker";
// import axiostree from "./data/tree.json";
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
            .get("http://localhost/api/trees/all", {
                params: {
                    coordinateCenterMap,
                },
            })
            .then(response => {
                setTrees(response.data.message);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const positionActuel = e => {
        coordinateCenterMap = e.center;
        getTreesByCoordinateCenterMap(coordinateCenterMap);
        // console.log(e.center);
    };

    const wrapperSetTrees = treesUpdated => {
        setTrees(treesUpdated);
    };
    console.log(trees);

    return (
        <>
            <Map
                center={[coordinateCenterMap.lat, coordinateCenterMap.lng]}
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
                            key={tree._id}
                            id={tree._id}
                            position={[
                                tree.location.coordinates[1],
                                tree.location.coordinates[0],
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
