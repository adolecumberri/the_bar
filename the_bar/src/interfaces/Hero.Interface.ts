import { IImgAnimation } from ".";
import { Hero } from "../classes/Hero";
import { Archer, Berserker, Defender, Fencer, Ninja, Paladin, Sniper, Soldier } from "../classes/hero_classes";

export interface IHeroStats{
    id_class?: null  | number;
    className?: null | string;
    hp: number;
    dmg: number;
    def: number;
    crit: number;
    critDmg: number;
    accuracy: number;
    evasion: number;
    att_interval: number;
    reg: number;
}

export interface IHeroCreated extends IHeroStats {
    name: string;
    surname: string;
    gender: string;
    className: string;
    img: IImgAnimation;
} 

export interface IHeroBase { 
    id? : number,
    name : string,
    surname: string,
    gender: boolean | undefined,
    id_class: number | undefined,
    isAlive: boolean | undefined,
    kills : number,
    kidnaped : number
}


// export interface IHero {
//     id : number,
//     name : string,
//     surname: string,
//     gender: boolean,
//     id_class: number,
//     id_crew: number,
//     hp: number,
//     currentHp: number,
//     dmg: number,
//     def: number,
//     crit: number,
//     critDmg: number,
//     accuracy: number,
//     evasion: number,
//     att_interval: number,
//     curr_att_interval ?: number,
//     reg: number,
//     isAlive: boolean,
//     kills : number,
//     kidnaped : number
// }

export interface IHeroEfects {
    att_interval : number,
    dmg : number, 
    def : number
}


export type IHero = Archer | Berserker | Defender | Fencer | Ninja | Paladin | Sniper | Soldier | Hero;