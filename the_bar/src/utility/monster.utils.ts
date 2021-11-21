import { rand } from "./Utility"

import MONSTERS from "../constants/monsters";
import { MONSTERS_VARIATION } from '../constants';
import { IMonterRawStats } from "../interfaces/IMonster";
import { IImageContext } from "../interfaces";
import { defaultMonsterContext } from ".";

const createStatsVariation = (d: IMonterRawStats) => {
    // console.log({data});

    // variación minima y máxima
    const min = 1 - MONSTERS_VARIATION
    const max = 1 + MONSTERS_VARIATION

    // si hago algoritmica, los precalculo.
    const newCritDmg = Math.floor(rand(d.critDmg * max, d.critDmg * min) * 1000) / 1000
    const newCrit = Math.floor((rand(d.crit * max, d.crit * min) * 1000)) / 1000
    const newAccuracy = Math.floor(rand(d.accuracy * max, d.accuracy * min) * 1000) / 1000
    const newEvasion = Math.floor(rand(d.evasion * max, d.evasion * min) * 1000) / 1000

    // const newImg = defaultImageContext[ d.id as keyof IImageContext ];
    // debugger;
    return {
        ...d,
        accuracy: newAccuracy <= 0 ? 0 : newAccuracy >= 1 ? 1 : newAccuracy,
        att_interval: Math.floor(rand(d.att_interval * max, d.att_interval * min)),
        crit: newCrit <= 0 ? 0 : newCrit >= 1 ? 1 : newCrit,
        critDmg: newCritDmg < 1 ? 1 : newCritDmg,
        def: Math.floor(rand(d.def * max, d.def * min) * 1000) / 1000,
        dmg: Math.floor(rand(d.dmg * max, d.dmg * min) * 1000) / 1000,
        evasion: newEvasion <= 0 ? 0 : newEvasion >= 1 ? 1 : newEvasion,
        hp: Math.floor(rand(d.hp * max, d.hp * min)),
        reg: Math.floor(rand(d.reg * max, d.reg * min) * 1000) / 1000,
        img: defaultMonsterContext[ d.id  as keyof IImageContext] //aqui se cargan las imagenes
    } as IMonterRawStats;
}



export const createMonsterStatsById = (id: string) => {
    let solution;

    solution = createStatsVariation(MONSTERS[id as keyof IMonterRawStats]);

    return solution;
}