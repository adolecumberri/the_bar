import { IDelays } from "../interfaces/IDelays"
import { rand } from "../utility/Utility";




class DelayManager {

    // isStopped: boolean: false;
    setIsStopped: any;
    getIsStopped: any;

    constructor( [getter, setter]: [getter: () => boolean, setter: React.Dispatch<React.SetStateAction<boolean>>]){
        this.getIsStopped = getter;
        this.setIsStopped = setter;
    }
    DEFAULT_DELAYS: IDelays = {
        MIN_CREW_CREATION_DELAY: 500,
        MAX_CREW_CREATION_DELAY: 700,
        CREW_CREATION_DELAY: rand( 700,500 ),
        ENTER_DELAY: 300,
        MISSION_CREATION_DELAY: 500,
        MISSION_DELAY: 500,
        SITTING: 1500,
        SEARCHING_MISSION: 1500,
        GOING_OUT: 2000,
    }

    /* DELAYS */
    delays: IDelays = { ...this.DEFAULT_DELAYS }




    startDelay = (delayName: keyof IDelays) => {
        //si estan parados los timers nada. return void.
        if (this.getIsStopped()) return;
        //si el timer es CREW_CREATION_DELAY, genero numero random.
        if (delayName === "CREW_CREATION_DELAY") {
            this.delays[delayName] = rand(
                this.DEFAULT_DELAYS.MAX_CREW_CREATION_DELAY,
                this.DEFAULT_DELAYS.MIN_CREW_CREATION_DELAY
            );
        } else {
            this.delays[delayName] = this.DEFAULT_DELAYS[delayName];
        }
    }

    stopDelay = (delayName: keyof IDelays) => {
        //si estan parados los timers nada. return void.
        if (this.getIsStopped()) return;
        //paro el timer que sea.
        this.delays[delayName] = 0;
    }

    // //CREW CREATION DELAY starts
    // newCreationDelay = () => {c
    //     this.delays.CREW_CREATION_DELAY = rand(
    //         this.DEFAULT_DELAYS.MAX_CREW_CREATION_DELAY, 
    //         this.DEFAULT_DELAYS.MIN_CREW_CREATION_DELAY
    //     );
    // }   

    //CREW CREATION DELAY stops
    // stopsCreationDelay = () => {
    //     this.delays.CREW_CREATION_DELAY = 0;
    // }

    // //ENTER_DELAY started
    // startEnterDelay = () => {
    //     this.delays.ENTER_DELAY = this.DEFAULT_DELAYS.ENTER_DELAY;
    // }

    // //Stops ENTER_DELAY
    // stopsEnterDelay = () => {
    //     this.delays.ENTER_DELAY = 0;
    // }

    //  //Start all delays
    // startMissionCreationDelay = () => {
    //     this.delays.MISSION_CREATION_DELAY = this.DEFAULT_DELAYS.MISSION_CREATION_DELAY;
    // }
    //  //Stops ENTER_DELAY
    //  stopsMissionCreationDelay = () => {
    //      this.delays.MISSION_CREATION_DELAY = 0;
    // }



    //Start all delays
    startDelays = () => {
        // //reinicio timers.
        // this.delays = { ...this.DEFAULT_DELAYS }

//TODO: comprobar porque el codigo de arriba no re-renderiza

        // saco keys
        let keys = Object.keys(this.DEFAULT_DELAYS);
        // itero por keys, vaciando valores.
        keys.forEach(key => {
            this.delays[key as keyof IDelays] = this.DEFAULT_DELAYS[key as keyof IDelays];
        });
        this.delays = { ...this.delays };

        //reinicio el delayManager.
        this.setIsStopped(false);
    }

    //stop all delays
    stopDelays = () => {
        // saco keys
        let keys = Object.keys(this.delays);
        // itero por keys, vaciando valores.
        keys.forEach(key => {
            this.delays[key as keyof IDelays] = 0;
        });

        //destructuro para lanzar trigger en los hooks
        this.delays = { ...this.delays };

        //paro timers.
        this.setIsStopped(true)
    }




}


export {
    DelayManager
}