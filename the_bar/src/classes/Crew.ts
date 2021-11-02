
import { TABLES_IDS } from "../constants/constants";
import { ICrewStatus } from "../interfaces/Crew.interface";
import { IHero } from "../interfaces/Hero.Interface";
import { createRandomHero } from "../utility/hero.utils";
// import { createHero } from "../utility/Utility";

export class Crew {

    crewStatus = {
        WAITING_TO_ENTER: 1,
        ENTERING: 2,
        SITTING: 3,
        SITTED: 4,
        SEARCHING_MISION: 5,
        IN_A_MISSION: 6,
        HEALING: 7,
    }

    heroNum: number;
    heros: IHero[] = [];
    status: number = this.crewStatus.WAITING_TO_ENTER;
    tableId: number | null = null;
    areSitted: boolean = false;
    onMission: boolean = false;
    missionId: number | null = null;
    hasEntered: boolean = false;
   
    constructor(heroNum: number){
        this.heroNum = heroNum;
        for(let i = 0; i < heroNum; i++){
            this.heros.push(createRandomHero());
        }
    }

    asignTableByTableId = (tableId: number | null) =>{
        if(!TABLES_IDS.includes(tableId as number))   throw new Error(
            `Error assigning tables. Id: ${tableId} is not contained in the tables register.`
          );
        this.tableId = tableId;
        this.areSitted = true;
        this.status = "sitted";
        this.hasEntered = true;
    }

    // asignTable = ({tableId, isOccupied}: Table) =>{
    //     if(!TABLES_IDS.includes(tableId as number))   throw new Error(
    //         `Error assigning tables. Id: ${tableId} is not contained in the tables register.`
    //       );
    //     this.status = "sitted";
    //     this.tableId = tableId;
    //     this.areSitted = true;
    // }

}