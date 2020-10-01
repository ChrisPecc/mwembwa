/* eslint-disable react/button-has-type */
import React from "react";
import {Popup} from "react-leaflet";
import IMG from "./imgmarker/marker.png";
import feuille from "./imgmarker/feuille.png";
import "./css/popup.css";

const SinglePopup = ({name, circonf}) => (
    <Popup>
        <div className={"popup"}>
            <div className={"info"}>
                <div className={"arbre"}>
                    <img src={IMG} width={"70px"} height={"70px"} />
                </div>
                <div className={"name"}>
                    <h2>{name}</h2>
                    <a
                        target={"_blank"}
                        rel={"noreferrer"}
                        href={`https://fr.wikipedia.org/wiki/${name}`}>
                        wikipedia
                    </a>
                </div>
            </div>
            <div className={"button_prix"}>
                <button className={"buy"} type={"submit"}>
                    Buy for {circonf}
                    <img src={feuille} width={"20px"} height={"20px"} />
                </button>
            </div>
        </div>
    </Popup>
);
export default SinglePopup;
