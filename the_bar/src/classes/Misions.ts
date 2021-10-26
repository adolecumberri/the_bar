import { MISIONS } from "../constants";
import { DELAYS } from "../constants/constants";
import { IMision } from "../interfaces";



class MissionManager {

    // grade0: IMision[] = [];
    // grade1: IMision[] = [];
    // grade2: IMision[] = [];
    // grade3: IMision[] = [];
    // grade4: IMision[] = [];
    [x: string]: IMision[] | number | any;

    current_mission_grade_allowed: number = 0;
    expToNextLvl: number = 0;

    current_missions_allowed: IMision[] = [];
    mision_delay: number = DELAYS.MISION_DELAY;

    constructor() {        

        this.grade0 = MISIONS[0];
        this.grade1 = MISIONS[1];
        this.grade2 = MISIONS[2];
        this.grade3 = MISIONS[3];
        this.grade4 = MISIONS[4];

        this.expToNextLvl = this.calcNextLvl(0); 

        
    }

    calcNextLvl = (lvl: number) => ( (lvl + 1)) * 60

    updateMisionsAllowed = () => {
        // this.currentMissionsAllowed;

        for(let i = 0; i <= this.current_mission_grade_allowed; i++){
            let grade = `grade${this.current_mission_grade_allowed}` as keyof typeof MissionManager;
            this.current_missions_allowed.push([...this[grade]] as any );
        }

    }

}


export { MissionManager };