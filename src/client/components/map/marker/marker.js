/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
import React, {useState} from "react";
import {Marker} from "react-leaflet";
import L from "leaflet";
import SinglePopup from "./popup";
import axios from "axios";

const SingleMarker = ({id, tree}) => {
    const [ownerUsername, setOwnerUsername] = useState([]);
    const [treeUpdated, setTreeUpdate] = useState([]);
    const [priceTree, setPriceTree] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [ownerId, setOwnerId] = useState([]);
    const [comments, setComments] = useState([]);
    const [isLock, setIsLock] = useState([]);
    const [markerColor, setMarkerColor] = useState([]);
    // const [colorTree, setColorTree] = useState([]);

    const userId = "5f7c68b3942d3e0300ab216f";
    const basicTreeColor = "#8BBC55";

    if (tree.owner) {
        setMarkerColor(tree.owner.color);
    } else {
        setMarkerColor(basicTreeColor);
    }

    const openPopup = id => {
        // const currentUser = localStorage.getItem("currentUser")
        //     ? JSON.parse(localStorage.getItem("currentUser"))
        //     : null;
        axios
            .get(`http://localhost/api/trees/one/${id}/${userId}`)
            .then(response => {
                const responses = response;
                setLoading(false);
                setTreeUpdate(responses.data.message);
                setIsLock(responses.data.message.is_locked);
                setComments(responses.data.message.comments);
                setPriceTree(responses.data.treeValueOwnedByOthers);
                setMarkerColor(responses.data.message.owner.color);

                if (responses.data.message.owner === null) {
                    setOwnerUsername("No owner yet");
                } else {
                    setOwnerUsername(responses.data.message.owner.username);
                    setOwnerId(responses.data.message.owner._id);
                }
                // console.log(`treeValueOwnedByOthers ${response.data.treeValueOwnedByOthers}`);
                // console.log(`basicTreeValue ${response.data.basicTreeValue}`);
                // console.log(`username owner marker.js ${ownerUsername}`);
                // console.log(response.data.message);
            })
            .catch(err => {
                console.log(err);
            });
    };

    // console.log(`username owner marker.js ${ownerUsername}`);
    // console.log(`price tree ${priceTree}`);
    // console.log(treeUpdated);
    // console.log(isLock);
    // console.log(comments);

    const iconSvg = `<?xml version="1.0" encoding="UTF-8"?>
        <svg enable-background="new 0 0 512.001 512.001" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
            <path d="m485.27 240.53c0-35.798-21.77-66.511-52.792-79.623 5.478-10.59 8.592-22.602 8.592-35.348 0-42.561-34.502-77.063-77.063-77.063-12.126 0-23.593 2.809-33.799 7.798-9.068-32.469-38.847-56.296-74.209-56.296s-65.14 23.827-74.209 56.296c-10.206-4.99-21.673-7.798-33.799-7.798-42.561 0-77.063 34.502-77.063 77.063 0 12.746 3.113 24.758 8.592 35.348-31.022 13.113-52.792 43.825-52.792 79.623 0 46.393 36.576 84.196 82.459 86.265 6.397 23.17 31.1 40.443 60.622 40.443 16.732 0 31.91-5.557 43.095-14.581 11.186 9.024 26.364 14.581 43.095 14.581s31.91-5.557 43.095-14.581c11.186 9.024 26.364 14.581 43.095 14.581 29.522 0 54.225-17.273 60.622-40.444 45.883-2.069 82.459-39.871 82.459-86.264z" fill="${markerColor}"/>
            <g fill="black">
                <path d="m251.38 0.153c-0.949 0.057-1.894 0.125-2.833 0.217-0.288 0.028-0.574 0.06-0.86 0.091-1.009 0.109-2.013 0.235-3.01 0.383-0.187 0.027-0.374 0.054-0.56 0.083-1.186 0.185-2.366 0.391-3.534 0.629-2e-3 0-4e-3 1e-3 -6e-3 1e-3 20.23 4.114 39.171 18.204 51.171 35.964 8.498 12.577 23.017 19.827 38.161 18.797 0.101-7e-3 0.201-0.014 0.302-0.021-9.067-32.47-38.846-56.297-74.208-56.297-1.24 0-2.471 0.036-3.696 0.094-0.31 0.015-0.617 0.041-0.927 0.059z"/>
                <path d="m432.48 160.91c5.479-10.59 8.592-22.602 8.592-35.348 0-42.561-34.502-77.063-77.063-77.063-5.282 0-10.438 0.534-15.42 1.548 35.166 7.147 61.633 38.239 61.633 75.515 0 12.746-3.113 24.758-8.592 35.348 31.022 13.113 52.792 43.825 52.792 79.623 0 46.393-36.576 84.195-82.458 86.264-5.243 18.991-22.787 34.012-45.199 38.816 4.933 1.059 10.1 1.627 15.427 1.627 29.522 0 54.225-17.273 60.622-40.444 45.883-2.069 82.458-39.871 82.458-86.264 0-35.797-21.768-66.51-52.792-79.622z"/>
            </g>
            <path d="m200.82 339.9c-6.95 11.788-35.752 24.969-46.433 25.718 1.175 0.252 2.366 0.472 3.567 0.668 0.096 0.016 0.192 0.033 0.289 0.048 1.217 0.193 2.446 0.359 3.688 0.492 0.032 3e-3 0.064 5e-3 0.096 9e-3 1.117 0.118 2.246 0.203 3.381 0.27 0.276 0.016 0.553 0.032 0.831 0.046 1.183 0.057 2.372 0.095 3.572 0.095 15.26 0 29.216-4.633 40.042-12.292l1.898-1.38-9.666-15.859-1.265 2.185z" fill="black"/>
            <path d="m294.53 359.57 33.016-52.099c2.612-4.121 1.821-9.532-1.86-12.734-3.931-3.419-9.842-3.196-13.504 0.511l-24.315 24.617c-3.225 3.265-8.75 0.55-8.136-3.997l7.15-52.976c0.764-5.66-3.42-10.786-9.119-11.171l-6.699-0.453c-5.034-0.34-9.514 3.17-10.389 8.139l-12.763 72.513c-0.71 4.033-5.831 5.363-8.414 2.187l-39.972-49.159c-2.766-3.402-7.444-4.572-11.485-2.873l-6.999 2.941c-5.541 2.329-7.733 9.027-4.641 14.181l41.076 68.467c5.948 9.915 8.401 21.547 6.914 33.014-5.323 41.057-11.936 79.778-38.997 111.32h141.2c-28.968-33.766-36.114-75.757-39.948-120.04-0.981-11.371 1.772-22.754 7.881-32.393z" fill="#BF6101"/>
            <path d="m327.55 307.47c2.612-4.121 1.822-9.532-1.86-12.734-3.931-3.419-9.842-3.196-13.504 0.511l-10.859 10.993-13.456 13.623c-3.225 3.265-8.75 0.55-8.136-3.997l7.15-52.976c0.745-5.517-3.216-10.514-8.694-11.12l-20.105 124.96c-0.338 1.614-0.602 3.243-0.786 4.884-0.383 3.415-0.434 6.878-0.135 10.341 3.836 44.279 10.982 86.27 39.95 120.04h29.488c-28.968-33.766-36.114-75.757-39.948-120.04-0.984-11.37 1.77-22.752 7.878-32.392l33.017-52.099z" fill="#9A4D01"/>
            <path d="m241.33 60.5c-21.621 0-40.232 12.832-48.669 31.29-8.716-6.159-19.346-9.79-30.831-9.79-29.547 0-53.5 23.953-53.5 53.5 0 9.749 2.621 18.881 7.177 26.752-25.656 3.945-45.304 26.115-45.304 52.875 0 29.547 23.953 53.5 53.5 53.5s171.13-125.08 171.13-154.63-23.951-53.5-53.5-53.5z" fill="${markerColor}"/>
        </svg>`;

    const icon = L.icon({
        iconUrl: `data:image/svg+xml;base64,${btoa(iconSvg)}`,
        iconAnchor: [5, 0],
        popupAnchor: [8, 0],
        iconSize: [25, 25],
    });
    // console.log(id);
    return (
        <Marker
            key={id}
            icon={icon}
            position={[
                tree.location.coordinates[1],
                tree.location.coordinates[0],
            ]}
            onClick={() => {
                openPopup(id);
            }}>
            <SinglePopup
                name={treeUpdated.nickname}
                priceTree={priceTree}
                completName={treeUpdated.complete_name}
                ownerUsername={ownerUsername}
                ownerId={ownerId}
                isLock={isLock}
                id={id}
                isLoading={isLoading}
                comments={comments}
                openPopup={openPopup}
                userId={userId}
            />
        </Marker>
    );
};
export default SingleMarker;
