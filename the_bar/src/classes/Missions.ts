import { MISSIONS } from "../constants";
import { DELAYS, MISSION_LOCATION } from "../constants/constants";
import MONSTERS from "../constants/monsters";
import { ICoord, IMission } from "../interfaces";
import { rand, uniqueID } from "../utility/Utility";
import { Monster } from "./Monster";



class MissionManager {

    // grade0: IMission[] = [];
    // grade1: IMission[] = [];
    // grade2: IMission[] = [];
    // grade3: IMission[] = [];
    // grade4: IMission[] = [];
    [x: string]: IMission[] | number | any;

    MAX_NUMBER_OF_MISSIONS_DISPLAYED: number = 7;

    //max grado de mission permitido.
    current_mission_grade_allowed: number = 4;
    //exp para que el mission Manager suba de nivel.
    expToNextLvl: number = 0;

    monsters = MONSTERS;

    //delay para aparicion de missiones.
    mission_creation_delay: number = DELAYS.MISSION_APPEARING_DELAY;
    default_mission_creation_delay: number = DELAYS.MISSION_APPEARING_DELAY;

    //delay para hacer las missiones. (lo que tarda en hacerse)
    mission_delay: number = DELAYS.MISSION_DELAY;

    //Array de missiones disponibles.
    missions_allowed: IMission[] = [];

    //missiones mostradas en el bar
    missions_displayed: IMission[] = [];

    //missiones activas.
    missions_executing: IMission[] = [];

    mission_location_available: ICoord[] = MISSION_LOCATION;
    mission_location_used: ICoord[] = [];

    missionsDisplayed: number = 0;
    constructor() {

        this.grade0 = MISSIONS[0];
        this.grade1 = MISSIONS[1];
        this.grade2 = MISSIONS[2];
        this.grade3 = MISSIONS[3];
        this.grade4 = MISSIONS[4];

        this.expToNextLvl = this.calcNextLvl(0);
        this.updateMISSIONSAllowed();

    }

    calcNextLvl = (lvl: number) => ((lvl + 1)) * 60

    //cuando missionManager sube de nivel, se meten nuevas misiones.
    updateMISSIONSAllowed = () => {
        // debugger;
        this.missions_allowed = [];
        for(let i = 0; i <= this.current_mission_grade_allowed; i++){
            let grade = `grade${i}` as keyof typeof MissionManager;
            this.missions_allowed.push(...this[grade] as any );
        }

        // let grade = `grade${this.current_mission_grade_allowed}` as keyof typeof MissionManager;
        // this.missions_allowed.push(...this[grade] as IMission[]);

    }

    //genera una mision para desplegar.
    displayMission = () => {
        // "controlo error, que en realidad no funciona" porque no salta
        if(this.missions_displayed.length > this.MAX_NUMBER_OF_MISSIONS_DISPLAYED) new Error( `not more than ${this.MAX_NUMBER_OF_MISSIONS_DISPLAYED} missions displayed at the same time allowed`);
        //Uso spread operator para duplicar el objeto. Sino todas la localizaciones comparten referencia.
      
        let selectedMission = { ...this.missions_allowed.splice(
            Math.floor(rand(this.missions_allowed.length - 1)),
            1
        )[0] };
    


        selectedMission.id = uniqueID();
        //add missionDisplayed value to selectedMission.missionNumber, and later missionDisplayed + 1
        selectedMission.missionNumber = this.missionsDisplayed++;
        this.addLocationToMission(selectedMission);
// debugger;

        let a = selectedMission.fights.map(f => {
            return {
                exp: f.exp,
                monsters: f.monsters.map(m => new Monster(m as number)),
            }
        });

        console.log("DISPLAY MISSION :" + this.missions_displayed.length);
        selectedMission.fights = a;
        // this.missions_displayed.push(selectedMission);
        this.missions_displayed = [...this.missions_displayed, selectedMission];
    }

    stopMissionCreationDelay = () => {
        this.mission_creation_delay = 0;
    }

    restartMissionCreationDelay = () => {
        this.mission_creation_delay = this.default_mission_creation_delay;
    }

    addLocationToMission = (mission: IMission) => {
        // debugger;

        let locationSelected = this.mission_location_available.splice(
            Math.floor(rand(this.mission_location_available.length - 1)),
            1
        )[0];

        // let locationSelected = this.mission_location_available.shift() as ICoord;
        this.mission_location_used.push(locationSelected);
        mission.location = locationSelected;
    }

    removeLocationFromMission = (mission: IMission) => {
        debugger;
        let missionSelectedIndex = this.mission_location_used.findIndex(coord => coord.id === mission.location?.id);
        let missionSelected = this.mission_location_used.splice(missionSelectedIndex, 1)[0];
        this.mission_location_available.push(missionSelected);

        mission.location = undefined;

    }

    getMissionDisplayed = () => {
        // debugger;
        let selectedMission = this.missions_displayed.splice(
            Math.floor(rand(this.missions_displayed.length - 1)),
            1
        )[0];

        if(!selectedMission) debugger;
        if(!selectedMission.location) debugger;
        
        //elimino la localizacion en el bar como "usada"
        this.mission_location_used = [...this.mission_location_used.filter( (m) => m.id !== selectedMission.location?.id )];

        //meto la localizacion en el bar como "disponible"
        this.mission_location_available.push(selectedMission.location as ICoord);
        
        //elimino la localizacion. Se van a hacerla.
        selectedMission.location = undefined;

        //Reestructuro mission_displayed para repintarla.
        this.missions_displayed = [...this.missions_displayed];
//    debugger;
        return selectedMission;
    }
    // crewTomission = () =>{

    // }    

}


export { MissionManager };