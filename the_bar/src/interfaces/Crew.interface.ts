import { IMission } from ".";


export interface ICrew { 
    heroNum: number, 
    id: number, 
    assignMission: () => IMission ,
    liberateTableFromCrew: (tableId: number) => void,
    setCrewAtMission: any //react setState function.
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


export type ICrewStatus =
    "WAITING_TO_ENTER" |
    "ENTERING" |
    "SITTING" |
    "SITTED" |
    "SEARCHING_MISION" |
    "IN_A_MISSION" |
    "HEALING";
