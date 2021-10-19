import { IHeroCreated } from "../interfaces/Hero.Interface";
import { createHero } from "../utility/Utility";

export class Crew {
    heroNum: number;
    heros: IHeroCreated[] = [];
    constructor(heroNum: number){
        this.heroNum = heroNum;

        for(let i = 0; i < heroNum; i++){
            this.heros.push(createHero());
        }
    }

}