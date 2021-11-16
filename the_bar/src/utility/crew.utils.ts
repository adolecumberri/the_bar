import { createRandomHero } from ".";
import { DelayManager } from "../classes/DelayManager";



// TODO: eliminar.
//! no estoy usandolo. he replanteado la clase de los crews.
export const createCrewData = (
    {
        heroNum,
        id,
        delayManager
    }:
        {
            heroNum: number,
            id: number,
            delayManager: DelayManager
        }
) => {
    let solution: any = {
        heroNum,
        id,
        delayManager
    }
    //cargo heroes random.
    for (let i = 0; i < heroNum; i++) {
        solution['heros'].push(createRandomHero());
    }
    

}