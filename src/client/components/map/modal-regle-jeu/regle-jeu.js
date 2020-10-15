/* eslint-disable react/no-unescaped-entities */
import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBook, faBookOpen} from "@fortawesome/free-solid-svg-icons";

const ModalRegleJeu = () => {
    const [changeIcon, setChangeIcon] = useState(1);
    const [show, setShow] = useState(false);

    const bookOpen = () => {
        setChangeIcon(2);
    };

    const bookClose = () => {
        setChangeIcon(1);
    };

    let iconBook;

    if (changeIcon === 1) {
        iconBook = faBook;
    } else {
        iconBook = faBookOpen;
    }

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        setShow(true);
    };

    return (
        <>
            <div className={"regle_de_jeu"}>
                <FontAwesomeIcon
                    icon={iconBook}
                    className={"icon_regle_de_jeu"}
                    size={"3x"}
                    onMouseEnter={bookOpen}
                    onMouseLeave={bookClose}
                    onClick={handleShow}
                />
            </div>
            <Modal show={show} onHide={handleClose} size={"lg"}>
                <Modal.Header closeButton>
                    <Modal.Title>{"Règle du jeu"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {
                            "Sur une carte de Liège, il y aura des arbres. Chaque on une valeur."
                        }
                    </p>
                    <p>
                        {
                            "Lorsqu'un joueur entre dans le jeu, il doit créer un compte, choisir une couleur et recevra trois arbres aléatoires et gratuits (et quelques feuilles bonus)"
                        }
                    </p>
                    <p>
                        {
                            "Toutes les quinze minutes dans la vraie vie , chaque joueur recevra un nombre de feuilles égal au total de chacun de ses arbres. Chaque heure dans la vraie vie, chaque joueur perd la moitié de ses feuilles."
                        }
                    </p>
                    <p>
                        {
                            "Chaque fois qu'il le souhaite, un joueur peut acheter un arbre."
                        }
                    </p>
                    <p>
                        {
                            "Chaque fois qu'il veut, un joueur peut verrouiller un arbre en payant. Un arbre verrouillé ne peut pas être acheté par un autre joueur."
                        }
                    </p>
                    <p>
                        {
                            "À tout moment, un joueur peut consulter le classement, voir le score de chaque joueur, le nombre d'arbres, etc."
                        }
                    </p>
                    <p>
                        {
                            "À tout moment, un joueur peut consulter le gamelog, qui enregistre toutes les actions du jeu."
                        }
                    </p>
                    <p>
                        {
                            "En cliquant sur un arbre, un joueur peut voir sa valeur, son nom, son propriétaire, l'historique des achats et un lien vers l'article de wikipedia relatif à l'espèce de cet arbre cet arbre (le cas échéant). Tout joueur peut également laisser un commentaire sur un arbre."
                        }
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant={"Default"}
                        className={"btn btn-outline-danger"}
                        onClick={handleClose}>
                        {"Close"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalRegleJeu;
