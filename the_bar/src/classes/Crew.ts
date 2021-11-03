
import { TABLES_IDS } from "../constants/constants";
import { IMission, ICrew } from "../interfaces";
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
        GOING_OUT: 6,
        IN_A_MISSION: 7,
        HEALING: 8,
    }

    timers = {
        SITTING: 1500,
        SEARCHING_MISION: 1500,
        GOING_OUT: 2000,
    }

    id: number = 0;
    heroNum: number;
    heros: IHero[] = [];
    status: number = this.crewStatus.WAITING_TO_ENTER;
    tableId: number | null = null;
    areSitted: boolean = false;
    onMission: boolean = false;
    // missionId: number | null = null;
    mission: IMission | null = null;
    hasEntered: boolean = false;

    assignMission: () => IMission;
    liberateTableFromCrew: (tableId: number) => void;
    setCrewAtMission: any;
    timer: NodeJS.Timeout | number = 0;

    constructor(
        { 
            heroNum, 
            id, 
            assignMission,
            liberateTableFromCrew,
            setCrewAtMission,
            
        }: ICrew) {
        this.heroNum = heroNum;
        for (let i = 0; i < heroNum; i++) {
            this.heros.push(createRandomHero());
        }
        this.id = id;
        this.assignMission = assignMission;
        this.liberateTableFromCrew = liberateTableFromCrew;
        this.setCrewAtMission = setCrewAtMission;
    }

    asignTableByTableId = (tableId: number | null) => {
        if (!TABLES_IDS.includes(tableId as number)) throw new Error(
            `Error assigning tables. Id: ${tableId} is not contained in the tables register.`
        );
        //asigno mesa
        this.tableId = tableId;
        //ahora estan sentados.
        this.setState(this.crewStatus.SITTED)


    }


    setState = (state: number) => {

        switch (state) {
            case this.crewStatus.WAITING_TO_ENTER:
                this.areSitted = false;
                this.hasEntered = false;
                this.onMission = false;
                break;

            case this.crewStatus.ENTERING:

                this.areSitted = false;
                this.hasEntered = false;
                this.onMission = false;
                break;

            case this.crewStatus.SITTING:
                this.areSitted = false;
                this.hasEntered = true;
                this.onMission = false;
                break;

            case this.crewStatus.SITTED:
                this.areSitted = true;
                this.hasEntered = true;
                this.onMission = false;
                console.log(`crew id-${this.id} is now Sitted.`);

                this.wait({
                    callback: () => this.setState(this.crewStatus.SEARCHING_MISION),
                    time: this.timers.SITTING
                });

                break;

            case this.crewStatus.SEARCHING_MISION:
                this.areSitted = true;
                this.hasEntered = true;
                this.onMission = false;
                console.log(`crew id-${this.id} is now Searching Mission.`);

                this.wait({
                    callback: () => {
                        let newMission = this.assignMission();
                        this.mission = newMission;
                        //liberar mesa y liberar grid.

                        

                        this.setState(this.crewStatus.GOING_OUT);
                    },
                    time: this.timers.SEARCHING_MISION
                });

               
                break;

            case this.crewStatus.GOING_OUT:
                this.areSitted = false;
                this.hasEntered = true;
                this.onMission = true;

                console.log(`crew id-${this.id} is going out.`);
                this.liberateTableFromCrew(this.tableId as number);
                this.wait({
                    callback: () => {
                        //CODIGO PARA LIBERAR LAS MESAS.
                        this.setCrewAtMission(this);
                        console.log("equipo fuera");
                    },
                    time: this.timers.GOING_OUT
                });
                break;
            case this.crewStatus.IN_A_MISSION:
                this.areSitted = true;
                this.hasEntered = true;
                this.onMission = true;
                break;

            case this.crewStatus.HEALING:
                this.areSitted = true;
                this.hasEntered = true;
                this.onMission = false;
                break;
        }

        this.status = state;

    }

    wait = ({ callback, time }: { callback: any, time: number }) => {
        clearTimeout(this.timer as number);
        this.timer = setTimeout(() => {

            //tras esperar, pasan a estar buscando mision.
            callback()
            //tiempo que estaran sentados.
        }, time);
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