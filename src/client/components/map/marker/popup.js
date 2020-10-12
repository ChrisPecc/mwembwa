/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable no-extra-parens */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-key */
import React, {useState} from "react";
import {Popup} from "react-leaflet";
import IMG from "../imgmarker/marker.png";
import feuille from "../imgmarker/feuille.png";
import "../css/popup.css";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faInfoCircle,
    faLockOpen,
    faLock,
} from "@fortawesome/free-solid-svg-icons";

const SinglePopup = ({
    name,
    priceTree,
    completName,
    ownerUsername,
    isLock,
    id,
    isLoading,
    comments,
}) => {
    const [stateOnglets, setStateOnglets] = useState(1);
    const [isShown, setIsShown] = useState(false);
    const [lock, setLock] = useState([]);

    let iconLock;

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

    const postLock = (id, lock) => {
        axios
            .post(`/api/tree/lock/${id}/${lock}`)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const lockTree = () => {
        setLock(!lock);
        postLock(id, lock);
    };

    const buyTree = id => {
        axios({
            method: "post",
            url: `http://localhost/api/trees/buy/${id}`,
            data: {
                buyOneTree: true,
            },
        });
    };

    if (isLock === true) {
        iconLock = faLock;
    } else {
        iconLock = faLockOpen;
    }
    // console.log(`username owner popup.js ${ownerUsername}`);
    // console.log(`nickname tree popup.js ${name}`);
    return (
        <>
            <Popup>
                {isLoading === true ? (
                    <div className={"App"}>Loading...</div>
                ) : (
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
                                            <p>Owner: {ownerUsername}</p>
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
                                                        Historique des
                                                        propriétaires
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
                                                onClick={() => {
                                                    lockTree(id);
                                                }}
                                                size={"lg"}
                                            />
                                        </div>
                                    </div>
                                    <div className={"button_prix"}>
                                        <button
                                            className={`buy ${
                                                isLock === true ? "lock" : " "
                                            }`}
                                            onClick={() => {
                                                buyTree(id);
                                            }}
                                            // eslint-disable-next-line react/button-has-type
                                            type={"submit"}>
                                            Buy for {priceTree}
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
                                            {comments === "No comments yet" ? (
                                                <div>
                                                    <p>No comments yet</p>
                                                </div>
                                            ) : (
                                                comments.map(e => {
                                                    <div
                                                        className={
                                                            "singleComment"
                                                        }>
                                                        <h6>
                                                            {e.user.username}
                                                        </h6>
                                                        <p>{e.comment}</p>
                                                        <hr />
                                                    </div>;
                                                })
                                            )}
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
                )}
            </Popup>
            ;
        </>
    );
};
export default SinglePopup;
