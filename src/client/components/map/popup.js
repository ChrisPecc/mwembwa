import React from "react";
import {Popup} from "react-leaflet";

const SinglePopup = ({name}) => (
    <Popup>
        <strong>Name :</strong> {name} <br />
        {/* <strong>Hauteur :</strong> {arbre.hauteur_totale} <br />
        <strong>Diametre :</strong> {arbre.diametre_cime} <br />
        <strong>Circonférence :</strong> {arbre.circonf} */}
    </Popup>
);
export default SinglePopup;
