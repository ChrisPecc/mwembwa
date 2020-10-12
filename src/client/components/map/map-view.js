/* eslint-disable no-const-assign */
/* eslint-disable no-console */
import React, {useState, useEffect} from "react";
import {Map, TileLayer} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Marker from "./marker/marker";
import axios from "axios";
import "./css/map-view.css";
import ModalRegleJeu from "./modal-regle-jeu/regle-jeu";

const MainMap = () => {
    const coordinateCenterMap = [50.65145, 5.57739];

    const [trees, setTrees] = useState([]);

    const getTreesByCoordinateCenterMap = () => {
        axios
            .get("http://localhost/api/trees/all")
            .then(response => {
                setTrees(response.data.message);
            })
            .catch(err => {
                console.log(err);
            });
    };

    // const positionActuel = e => {
    //     coordinateCenterMap = e.center;
    //     getTreesByCoordinateCenterMap(coordinateCenterMap);
    //     // console.log(e.center);
    // };

    useEffect(() => {
        getTreesByCoordinateCenterMap();
    }, []);

    const wrapperSetTrees = treesUpdated => {
        setTrees(treesUpdated);
    };
    // console.log(trees);

    return (
        <>
            <Map
                center={[coordinateCenterMap[0], coordinateCenterMap[1]]}
                zoom={18}
                minZoom={15}>
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
                        <Marker key={tree._id} id={tree._id} tree={tree} />
                    ))}
                    ;
                </MarkerClusterGroup>
                <ModalRegleJeu />
            </Map>
        </>
    );
};
export default MainMap;
