/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable no-extra-parens */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-key */
import React, {useState} from "react";
// import {useForm} from "react-hook-form";
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
    ownerId,
    isLock,
    id,
    isLoading,
    comments,
    openPopup,
    userId,
    positionActuel,
}) => {
    // console.log("popup", comments);
    const [stateOnglets, setStateOnglets] = useState(1);
    const [isShown, setIsShown] = useState(false);
    const [lock, setLock] = useState([]);
    // const {registerComment, handleSubmitComment} = useForm();

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

    const data = {user_id: userId};

    const postLock = id => {
        axios
            .post(`http://localhost/api/trees/lock/${id}`, data)
            .then(() => setTimeout(openPopup(id), 2000))
            .catch(err => console.log(err));
    };
    const lockTree = () => {
        setLock(!lock);
        postLock(id);
    };

    const buyTree = id => {
        axios
            .post(`http://localhost/api/trees/buy/${id}`, data)
            .then(
                () => setTimeout(openPopup(id), 2000),
                () => setTimeout(positionActuel(), 5000),
            )
            .catch(err => console.log(err));
    };

    if (isLock === true) {
        iconLock = faLock;
    } else {
        iconLock = faLockOpen;
    }
    // console.log(`username owner popup.js ${ownerUsername}`);
    // console.log(`nickname tree popup.js ${name}`);
    // console.log(postLock);

    // const submitComment = (userId, data) => {
    //     console.log(data);
    //     axios
    //         .post(`/api/users/comment/${userId}`, data)
    //         .then(
    //             // resp => console.log(resp)
    //             () => setTimeout(openPopup(id), 2000),
    //         )
    //         .catch(error => console.log(error));
    // };

    return (
        <>
            <Popup>
                {isLoading === true ? (
                    <div className={"App"}>{"Loading..."}</div>
                ) : (
                    <div className={"popup"}>
                        <div className={"onglets"}>
                            <div
                                onClick={goInfo}
                                className={`onglet ${
                                    stateOnglets === 1 ? "active" : " "
                                }`}>
                                {"Info"}
                            </div>
                            <div
                                onClick={goComment}
                                className={`onglet ${
                                    stateOnglets === 2 ? "active" : " "
                                }`}>
                                {"Comment"}
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
                                            <p>
                                                {"Owner: "}
                                                {ownerUsername}
                                            </p>
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
                                                        {
                                                            "Historique des propriétaires"
                                                        }
                                                    </p>
                                                </div>
                                            )}
                                            <h5>{name}</h5>
                                            <a
                                                target={"_blank"}
                                                rel={"noreferrer"}
                                                href={`https://fr.wikipedia.org/wiki/${completName}`}>
                                                {"wikipedia"}
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
                                                isLock === true ||
                                                ownerId === userId
                                                    ? "lock"
                                                    : " "
                                            }`}
                                            onClick={() => {
                                                buyTree(id);
                                            }}
                                            // eslint-disable-next-line react/button-has-type
                                            type={"submit"}>
                                            {ownerId === userId
                                                ? `It is yours`
                                                : `Buy for ${priceTree}`}
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
                                            {comments.length === 0 ? (
                                                <div>
                                                    <p>{"No comments yet"}</p>
                                                </div>
                                            ) : (
                                                comments.map(eComment => (
                                                    // console.log(
                                                    //     eComment.user.username,
                                                    // );
                                                    <div
                                                        key={eComment._id}
                                                        className={
                                                            "singleComment"
                                                        }>
                                                        <h6>
                                                            {
                                                                eComment.user
                                                                    .username
                                                            }
                                                        </h6>
                                                        <p>
                                                            {eComment.comment}
                                                        </p>
                                                        <hr />
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                    <div className={"submit"}>
                                        <form
                                        // onSubmit={handleSubmitComment(
                                        //     submitComment,
                                        // )}
                                        // eslint-disable-next-line react/jsx-closing-bracket-location
                                        >
                                            <textarea
                                                className={"textArea"}
                                                // ref={registerComment}
                                            />
                                            <button
                                                className={"submitComment"}
                                                // eslint-disable-next-line react/button-has-type
                                                type={"submit"}>
                                                {"Submit"}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            ) : (
                                <div className={"propriétaires"}>
                                    <h6>{"Historique des propriétaires"}</h6>
                                    <hr />
                                    <div className={"content"}>
                                        <div className={"userProprio"}>
                                            <p>{"User"}</p>
                                            <p>{"Date"}</p>
                                        </div>
                                        <div className={"userProprio"}>
                                            <p>{"User"}</p>
                                            <p>{"Date"}</p>
                                        </div>
                                        <div className={"userProprio"}>
                                            <p>{"User"}</p>
                                            <p>{"Date"}</p>
                                        </div>
                                        <div className={"userProprio"}>
                                            <p>{"User"}</p>
                                            <p>{"Date"}</p>
                                        </div>
                                        <div className={"userProprio"}>
                                            <p>{"User"}</p>
                                            <p>{"Date"}</p>
                                        </div>
                                        <div className={"userProprio"}>
                                            <p>{"User"}</p>
                                            <p>{"Date"}</p>
                                        </div>
                                        <div className={"userProprio"}>
                                            <p>{"User"}</p>
                                            <p>{"Date"}</p>
                                        </div>
                                        <div className={"userProprio"}>
                                            <p>{"User"}</p>
                                            <p>{"Date"}</p>
                                        </div>
                                        <div className={"userProprio"}>
                                            <p>{"User"}</p>
                                            <p>{"Date"}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Popup>
        </>
    );
};
export default SinglePopup;
