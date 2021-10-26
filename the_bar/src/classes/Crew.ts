
import { TABLES_LOCATIONS } from "../constants";
import { TABLES_IDS } from "../constants/constants";
import { IHeroCreated, ICrewStatus, ITable } from "../interfaces";
import { createHero } from "../utility/Utility";
import { Table } from "./GridBoxesTypes";

export class Crew {
    heroNum: number;
    heros: IHeroCreated[] = [];
    status: ICrewStatus = "waiting_to_enter";
    tableId: number | null = null;
    areSitted: boolean = false;
    onMission: boolean = false;
    missionId: number | null = null;
    hasEntered: boolean = false;
    constructor(heroNum: number){
        this.heroNum = heroNum;
        for(let i = 0; i < heroNum; i++){
            this.heros.push(createHero());
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