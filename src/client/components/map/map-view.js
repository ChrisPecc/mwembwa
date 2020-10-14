/* eslint-disable prettier/prettier */
/* eslint-disable no-const-assign */
/* eslint-disable no-console */
import React, {useState /*, useEffect*/} from "react";
import {Map, TileLayer} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Marker from "./marker/marker";
import axios from "axios";
import "./css/map-view.css";
import ModalRegleJeu from "./modal-regle-jeu/regle-jeu";

const MainMap = () => {
    const [coordinateCenterMap, setCoordinateCenterMap] = useState([
        50.651474,
        5.5805,
    ]);
    const [zoomMap, setZoomMap] = useState([18]);
    console.log(coordinateCenterMap);
    console.log(zoomMap);

    const [trees, setTrees] = useState([]);

    // const getTreesByCoordinateCenterMap = () => {
    //     axios
    //         .get("http://localhost/api/trees/all")
    //         .then(response => {
    //             setTrees(response.data.message);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // };

    const positionActuel = () => {

        axios
            .post("http://localhost/api/trees/area", {
                // eslint-disable-next-line object-shorthand
                "coordinateCenterMap": coordinateCenterMap,
                // eslint-disable-next-line object-shorthand
                "zoomMap": zoomMap,
            })
            .then(rep => { 
                setTrees(rep.data.message);
                // console.log(`reponse ${rep}`)
            })
            .catch(err => console.log(err));
        // console.log(e.center);
    };

    // useEffect(() => {
    //     positionActuel();
    // //    getTreesByCoordinateCenterMap();
    // }, []);

    const wrapperSetTrees = treesUpdated => {
        setTrees(treesUpdated);
    };

    return (
        <>
            <Map
                center={[coordinateCenterMap[0], coordinateCenterMap[1]]}
                zoom={18}
                minZoom={15}
                onViewportChanged={p => {
                    positionActuel()
                    setCoordinateCenterMap(p.center);
                    setZoomMap(p.zoom);
                }}>
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
                        <Marker key={tree._id} id={tree._id} tree={tree} positionActuel={positionActuel} />
                    ))}
                    ;
                </MarkerClusterGroup>
                <ModalRegleJeu />
            </Map>
        </>
    );
};
export default MainMap;
