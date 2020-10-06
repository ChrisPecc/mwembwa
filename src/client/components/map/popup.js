/* eslint-disable react/jsx-max-depth */
import React, {useState} from "react";
import {Popup} from "react-leaflet";
import IMG from "./imgmarker/marker.png";
import feuille from "./imgmarker/feuille.png";
import "./css/popup.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";

const SinglePopup = ({name, circonf}) => {
    const [stateOnglets, setStateOnglets] = useState(1);

    const goInfo = () => {
        setStateOnglets(1);
    };

    const goComment = () => {
        setStateOnglets(2);
    };

    const openModal = () => {
        setStateOnglets(3);
    };
    return (
        <>
            <Popup>
                <div className={"popup"}>
                    <div className={"onglets"}>
                        <div
                            onClick={goInfo}
                            className={`onglet ${
                                stateOnglets === 1 ? "active" : " "
                            }`}>
                            Info
                        </div>
                        <div
                            onClick={goComment}
                            className={`onglet ${
                                stateOnglets === 2 ? "active" : " "
                            }`}>
                            Comment
                        </div>
                    </div>
                    <div className={"container"}>
                        {stateOnglets === 1 ? (
                            <div className={"contentInfo"}>
                                <div className={"info"}>
                                    <div className={"arbre"}>
                                        <img
                                            src={IMG}
                                            width={"70px"}
                                            height={"70px"}
                                        />
                                    </div>
                                    <div className={"name"}>
                                        <FontAwesomeIcon
                                            icon={faInfoCircle}
                                            className={"iconInfo"}
                                            onClick={openModal}
                                        />
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
                                    <button
                                        className={"buy"}
                                        // eslint-disable-next-line react/button-has-type
                                        type={"submit"}>
                                        Buy for {circonf}
                                        <img
                                            src={feuille}
                                            width={"20px"}
                                            height={"20px"}
                                        />
                                    </button>
                                </div>
                            </div>
                        ) : stateOnglets === 2 ? (
                            <div className={"contentComment"}>
                                <div className={"comment"}>
                                    <div className={"comments"}>
                                        <div className={"singleComment"}>
                                            <h4>User</h4>
                                            <p>comment</p>
                                            <hr />
                                        </div>
                                        <div className={"singleComment"}>
                                            <h4>User</h4>
                                            <p>comment</p>
                                            <hr />
                                        </div>
                                        <div className={"singleComment"}>
                                            <h4>User</h4>
                                            <p>comment</p>
                                            <hr />
                                        </div>
                                        <div className={"singleComment"}>
                                            <h4>User</h4>
                                            <p>comment</p>
                                            <hr />
                                        </div>
                                        <div className={"singleComment"}>
                                            <h4>User</h4>
                                            <p>comment</p>
                                            <hr />
                                        </div>
                                        <div className={"singleComment"}>
                                            <h4>User</h4>
                                            <p>comment</p>
                                            <hr />
                                        </div>
                                        <div className={"singleComment"}>
                                            <h4>User</h4>
                                            <p>comment</p>
                                            <hr />
                                        </div>
                                    </div>
                                </div>
                                <div className={"submit"}>
                                    <textarea className={"textArea"} />
                                    <button
                                        className={"submitComment"}
                                        // eslint-disable-next-line react/button-has-type
                                        type={"submite"}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className={"propriétaires"}>
                                <h3>Historique des propriétaires</h3>
                                <hr />
                                <div className={"content"}>
                                    <div className={"userProprio"}>
                                        <p>User</p>
                                        <p>Date</p>
                                    </div>
                                    <div className={"userProprio"}>
                                        <p>User</p>
                                        <p>Date</p>
                                    </div>
                                    <div className={"userProprio"}>
                                        <p>User</p>
                                        <p>Date</p>
                                    </div>
                                    <div className={"userProprio"}>
                                        <p>User</p>
                                        <p>Date</p>
                                    </div>
                                    <div className={"userProprio"}>
                                        <p>User</p>
                                        <p>Date</p>
                                    </div>
                                    <div className={"userProprio"}>
                                        <p>User</p>
                                        <p>Date</p>
                                    </div>
                                    <div className={"userProprio"}>
                                        <p>User</p>
                                        <p>Date</p>
                                    </div>
                                    <div className={"userProprio"}>
                                        <p>User</p>
                                        <p>Date</p>
                                    </div>
                                    <div className={"userProprio"}>
                                        <p>User</p>
                                        <p>Date</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Popup>
            ;
        </>
    );
};
export default SinglePopup;
