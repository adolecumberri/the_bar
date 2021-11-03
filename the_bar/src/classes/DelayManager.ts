import { IDelays } from "../interfaces/IDelays"




class DelayManager {

    DEFAULT_DELAYS: IDelays = {
        MIN_CREW_CREATION_DELAY: 500,
        MAX_CREW_CREATION_DELAY: 700,
        ENTER_DELAY: 300,
        MISSION_CREATION_DELAY: 500,
        MISSION_DELAY: 500,
        SITTING: 1500,
        SEARCHING_MISION: 1500,
        GOING_OUT: 2000,
    }
    
    /* DELAYS */
    delays: IDelays = { ...this.DEFAULT_DELAYS }
    // {
    //     MIN_CREW_CREATION_DELAY: this.DEFAULT_DELAYS.MIN_CREW_CREATION_DELAY,
    //     MAX_CREW_CREATION_DELAY: this.DEFAULT_DELAYS.MAX_CREW_CREATION_DELAY,
    //     ENTER_DELAY: this.DEFAULT_DELAYS.ENTER_DELAY,
    //     MISSION_APPEARING_DELAY: this.DEFAULT_DELAYS.MISSION_APPEARING_DELAY,
    //     MISSION_DELAY: this.DEFAULT_DELAYS.MISSION_DELAY,
    // }
    
    
    
    startDelays = () => {
        this.delays = { ...this.DEFAULT_DELAYS }
    }

    stopDelays = () => {
        let keys = Object.keys(this.delays);
        keys.forEach( key => {
            this.delays[key as keyof IDelays] = 0;
        })
    }
   


}


export {
    DelayManager
}