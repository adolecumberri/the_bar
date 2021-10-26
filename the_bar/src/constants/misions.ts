import { IMision } from "../interfaces";

//grado 0 hasta el 4.
// desde MISIONS[0] hasta MISIONS[4]
const MISIONS: IMision[][] = [
    [{
        title: "Those dam birdos!",
        details: "Can you take off those birds from my backyard?",
        fights: [
            {
                exp: 0,
                monsters: [52, 52, 52]
            }
        ],
        grade: 0,
        unique: false,
    }],
    [

    ],
    [{
        title: "A bigger one!",
        details: "A stronger birdo has appeared in front of my house, can you help me?",
        fights: [
            {
                exp: 0,
                monsters: [52, 52]
            },
            {
                exp: 0,
                monsters: [52, 53, 52]
            }
        ],
        grade: 2,
        unique: true,
    }],
    [

    ],
    [{
        title: "Zowac's ghost",
        details: "...",
        fights: [
            {
                exp: 0,
                monsters: [59]
            }
        ],
        grade: 4,
        unique: true,
    }]
]

export default MISIONS;