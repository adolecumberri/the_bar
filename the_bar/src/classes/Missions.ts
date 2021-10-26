import { MISSIONS } from "../constants";
import { DELAYS } from "../constants/constants";
import { IMission } from "../interfaces";
import { rand } from "../utility/Utility";



class MissionManager {

    // grade0: IMission[] = [];
    // grade1: IMission[] = [];
    // grade2: IMission[] = [];
    // grade3: IMission[] = [];
    // grade4: IMission[] = [];
    [x: string]: IMission[] | number | any;

    //max grado de mission permitido.
    current_mission_grade_allowed: number = 0;
    //exp para que el mission Manager suba de nivel.
    expToNextLvl: number = 0;
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

    
    constructor() {        

        this.grade0 = MISSIONS[0];
        this.grade1 = MISSIONS[1];
        this.grade2 = MISSIONS[2];
        this.grade3 = MISSIONS[3];
        this.grade4 = MISSIONS[4];

        this.expToNextLvl = this.calcNextLvl(0); 
        this.updateMISSIONSAllowed();
        
    }

    calcNextLvl = (lvl: number) => ( (lvl + 1)) * 60

    updateMISSIONSAllowed = () => {

        // this.current_missions_allowed = [];
        // for(let i = 0; i <= this.current_mission_grade_allowed; i++){
        //     let grade = `grade${i}` as keyof typeof MissionManager;
        //     this.current_missions_allowed.push([...this[grade]] as any );
        // }

        let grade = `grade${this.current_mission_grade_allowed}` as keyof typeof MissionManager;
        this.missions_allowed.push(...this[grade] as IMission[] );

    }
 
    displayMission = () => {
        this.missions_displayed.push( this.missions_allowed[rand(this.missions_allowed.length)] );
    }

    stopMissionCreationDelay = () => {
        this.mission_creation_delay = 0;
    }

    restartMissionCreationDelay = () => {
        this.mission_creation_delay = this.default_mission_creation_delay;
    }

    // crewTomission = () =>{

    // }    

}


export { MissionManager };