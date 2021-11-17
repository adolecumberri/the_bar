
import { TABLES_IDS, CREW_STATUS } from "../constants/constants";
import { IMission, ICrew } from "../interfaces";
import { ICrewOld, ICrewStatus } from "../interfaces/Crew.interface";
import { IHero } from "../interfaces/Hero.Interface";
import { createRandomHero } from "../utility/hero.utils";
import { DelayManager } from "./DelayManager";
import { Table } from "./GridBoxesTypes";
// import { createHero } from "../utility/Utility";

export class Crew {
    //tipado global para cualquier cosa.
    [x: string]: any;

    crewStatus = CREW_STATUS;


    id: number = 0;
    heroNum: number;
    heros: IHero[] = [];
    status: ICrewStatus = this.crewStatus.WAITING_TO_ENTER as ICrewStatus;
    tableId: number | null = null;
    areSitted: boolean = false;
    onMission: boolean = false;
    // missionId: number | null = null;
    mission: IMission | null = null;
    hasEntered: boolean = false;

    timer: NodeJS.Timeout | number = 0;
    DelayManager: DelayManager;

    coords = {x: 0, y: 0, xCoord: 0, yCoord: 0} //x-y son col-row. xCoord-yCoord son pixeles desplazados.
    constructor(
        { 
            heroNum, 
            id, 
            delayManager,
        }: ICrew) {
        this.heroNum = heroNum; 
        for (let i = 0; i < heroNum; i++) {
            this.heros.push(createRandomHero());
        }
        this.id = id;
        this.DelayManager = delayManager;
    }

    asignTableByTableId = (tableId: number | null) => {
        if (!TABLES_IDS.includes(tableId as number)) throw new Error(
            `Error assigning tables. Id: ${tableId} is not contained in the tables register.`
        );
        //asigno mesa
        this.tableId = tableId;
        //ahora estan sentados.
        this.setState(this.crewStatus.SITTED as ICrewStatus)


    }

    asignTableCoordinates = (table: Table) => {
            this.coord = {
                x: table.x,
                y: table.y, 
                xCoord: table.xCoord, 
                yCoord: table.yCoord
            };

            this.heros.forEach((hero, i) => {
                //añadir coordenadas al heroe.
                let chair = table.chairs[i];
                let coords = {
                    x: chair.x,
                    y: chair.y,
                    xCoord: chair.xCoord,
                    yCoord: chair.yCoord
                }
                hero.asignCoords( coords );
            })
    }


    setState = (status: ICrewStatus) => {

        switch (status) {
            case "WAITING_TO_ENTER":
                this.areSitted = false;
                this.hasEntered = false;
                this.onMission = false;
                break;

            case "SITTING":
                this.areSitted = false;
                this.hasEntered = true;
                this.onMission = false;
                break;

            case "SITTED":
                this.areSitted = true;
                this.hasEntered = true;
                this.onMission = false;
                // console.log(`crew id-${this.id} is now Sitted.`);

                // this.wait({
                //     callback: () => this.setState(this.crewStatus.SEARCHING_MISION),
                //     time: this.DelayManager.delays.SITTING
                // });

                break;

            case "SEARCHING_MISION":
                this.areSitted = true;
                this.hasEntered = true;
                this.onMission = false;
                // console.log(`crew id-${this.id} is now Searching Mission.`);

                // this.wait({
                //     callback: () => {
                //         let newMission = this.assignMission();
                //         this.mission = newMission;
                //         //liberar mesa y liberar grid.

                        

                //         this.setState(this.crewStatus.GOING_OUT);
                //     },
                //     time: this.DelayManager.delays.SEARCHING_MISION
                // });

               
                break;

            case "GOING_OUT":
                this.areSitted = false;
                this.hasEntered = true;
                this.onMission = true;

                // console.log(`crew id-${this.id} is going out.`);
                // this.liberateTableFromCrew(this.tableId as number);
                // this.wait({
                //     callback: () => {
                //         //CODIGO PARA LIBERAR LAS MESAS.
                //         this.sendCrewOnAMission(this);
                //         // console.log("equipo fuera");
                //     },
                //     time: this.DelayManager.delays.GOING_OUT
                // });
                break;
            case "IN_A_MISSION":
                this.areSitted = true;
                this.hasEntered = true;
                this.onMission = true;
                break;

            case "HEALING":
                this.areSitted = true;
                this.hasEntered = true;
                this.onMission = false;
                break;
        }

        this.status = this.crewStatus[status] as ICrewStatus;

    }

    // wait = ({ callback, time }: { callback: any, time: number }) => {
    //     clearTimeout(this.timer as number);
    //     this.timer = setTimeout(() => {

    //         //tras esperar, pasan a estar buscando mision.
    //         callback()
    //         //tiempo que estaran sentados.
    //     }, time);
    // }
  
}