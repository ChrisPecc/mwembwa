import {nameByRace} from "fantasy-name-generator";

const giveRandomName = () => {
    const arrayRaces = [
        "angel",
        "cavePerson",
        "darkelf",
        "demon",
        "dragon",
        "drow",
        "dwarf",
        "elf",
        "fairy",
        "gnome",
        "goblin",
        "halfdemon",
        "halfling",
        "highelf",
        "highfairy",
        "human",
        "ogre",
        "orc",
    ];
    const randomArrayRacesKey = Math.floor(Math.random() * 18);
    const randomRace = arrayRaces[randomArrayRacesKey];

    const gender = ["male", "female"];
    const randomGenderKey = Math.round(Math.random());
    const randomGender = gender[randomGenderKey];

    let randomName;

    if (randomRace === "human") {
        randomName = nameByRace(randomRace, {
            gender: randomGender,
            allowMultipleNames: true,
        });
    }
    // else if (randomRace === "demon" || randomRace === "goblin" || randomRace === "ogre" || randomRace === "orc") {
    //     randomName = nameByRace(randomRace)
    // }
    else {
        randomName = nameByRace(randomRace, {gender: randomGender});
    }

    return randomName;
};

module.exports = {giveRandomName};
