import { IMission } from ".";
import { DelayManager } from "../classes/DelayManager";


export interface ICrew {
    heroNum: number,
    id: number,
    // assignMission: () => IMission ,
    // liberateTableFromCrew: (tableId: number) => void,
    // sendCrewOnAMission: any //react setState function.
    delayManager: DelayManager,
};

export interface ICrewOld {
    heroNum: number,
    id: number,
    assignMission: () => IMission,
    liberateTableFromCrew: (tableId: number) => void,
    sendCrewOnAMission: any //react setState function.
    delayManager: DelayManager,
};
// export interface ICrewStatus {
//     WAITING_TO_ENTER: 1,
//     ENTERING: 2,
//     SITTING: 3,
//     SITTED: 4,
//     SEARCHING_MISION: 5,
//     IN_A_MISSION: 6,
//     HEALING: 7,
// }


export type ICrewStatus = "WAITING_TO_ENTER" |
    "SITTING" |
    "SITTED" |
    "SEARCHING_MISION" |
    "GOING_OUT" |
    "IN_A_MISSION" |
    "HEALING" |
    "GONE" |
    "DEAD";





    // WAITING_TO_ENTER: string;
    // SITTING: string;
    // SITTED: string;
    // SEARCHING_MISION: string;
    // GOING_OUT: string;
    // IN_A_MISSION: string;
    // HEALING: string;
    // GONE: string;
    // DEAD: string;