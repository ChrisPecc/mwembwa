import React, {useState} from "react";
import {Popup} from "react-leaflet";
import IMG from "../imgmarker/marker.png";
import feuille from "../imgmarker/feuille.png";
import "../css/popup.css";
// import axiosTree from "../data/tree.json";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faInfoCircle,
    faLockOpen,
    faLock,
} from "@fortawesome/free-solid-svg-icons";

const SinglePopup = ({id, name, price, lock, completName}) => {
    const [stateOnglets, setStateOnglets] = useState(1);
    const [isShown, setIsShown] = useState(false);
    const [isLock, setIsLock] = useState(lock);

    const goInfo = () => {
        setStateOnglets(1);
    };

    const goComment = () => {
        setStateOnglets(2);
    };

    const openModal = () => {
        setStateOnglets(3);
        setIsShown(false);
    };

    const showHover = () => {
        setIsShown(true);
    };

    const closeHover = () => {
        setIsShown(false);
    };

    const lockTree = () => {
        setIsLock(!isLock);
    };

    let iconLock;

    if (isLock === true) {
        iconLock = faLock;
    } else {
        iconLock = faLockOpen;
    }

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
                                        {/* <p>Owner: {ownerName}</p> */}
                                        <p>{id}</p>
                                    </div>
                                    <div className={"name"}>
                                        <FontAwesomeIcon
                                            icon={faInfoCircle}
                                            className={"iconInfo"}
                                            onClick={openModal}
                                            onMouseEnter={showHover}
                                            onMouseLeave={closeHover}
                                        />
                                        {isShown && (
                                            <div className={"hover"}>
                                                <p>
                                                    Historique des propriétaires
                                                </p>
                                            </div>
                                        )}
                                        <h5>{name}</h5>
                                        <a
                                            target={"_blank"}
                                            rel={"noreferrer"}
                                            href={`https://fr.wikipedia.org/wiki/${completName}`}>
                                            wikipedia
                                        </a>
                                        <FontAwesomeIcon
                                            icon={iconLock}
                                            className={"iconLock"}
                                            onClick={lockTree}
                                            size={"lg"}
                                        />
                                    </div>
                                </div>
                                <div className={"button_prix"}>
                                    <button
                                        className={`buy ${
                                            isLock === true ? "lock" : " "
                                        }`}
                                        // eslint-disable-next-line react/button-has-type
                                        type={"submit"}>
                                        Buy for {price}
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
                                        {/* {trees.map(treeComment => ( */}
                                        {/* <div className={"singleComment"}>
                                            <h6>
                                                {
                                                    axiosTree.message.comments
                                                        .user.username
                                                }
                                            </h6>
                                            <p>
                                                {
                                                    axiosTree.message.comments
                                                        .comment
                                                }
                                            </p>
                                            <hr />
                                        </div> */}
                                        {/* ))} */}
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
                                <h6>Historique des propriétaires</h6>
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
