import { Archer, Berserker, Defender, Fencer, Ninja, Paladin, Sniper, Soldier, Thieve } from "../classes/hero_classes";
import { VARIATION, HERO_STATS } from "../constants";
import { IHeroCreated, IImageContext } from "../interfaces";
import { IHero, IHeroStats } from "../interfaces/Hero.Interface";
import { defaultImageContext } from "./context";
import { rand, randName } from "./Utility";


let calculateFinalStats = (baseStats: IHeroStats, classState: IHeroStats) => {
    // debugger;
    delete baseStats.id_class;
    delete baseStats.className;

    let finalStat: any = {};
    Object.keys(baseStats).forEach((a: string) => {
        let value = (baseStats[a as keyof IHeroStats] as number) + (classState[a as keyof IHeroStats] as number) + Number.EPSILON;
        finalStat[a] =
            Math.round((Math.random() * (value * (1 + VARIATION) - value * (1 - VARIATION)) + value * (1 - VARIATION)) * 100) /
            100;
    });

    // finalStat['className'] = classState['className'];
    return finalStat;
};

// const createMonsterStats = () => {
//     const baseStats = HERO_STATS[0]
//     const monsterCommon = HERO_STATS
//     const solution = {}

//     monsterCommon.forEach(
//         ({
//             accuracy,
//             att_interval,
//             className,
//             crit,
//             critDmg,
//             def,
//             dmg,
//             evasion,
//             hp,
//             reg
//         }, i) => {
//             if (i > 0) {
//                 solution[className] = {
//                     accuracy: Math.floor((accuracy + baseStats.accuracy) * 1000) / 1000,
//                     att_interval: att_interval + baseStats.att_interval,
//                     crit: Math.floor((crit + baseStats.crit) * 1000) / 1000,
//                     critDmg: critDmg + baseStats.critDmg,
//                     def: def + baseStats.def,
//                     dmg: dmg + baseStats.dmg,
//                     evasion: Math.floor((evasion + baseStats.evasion) * 1000) / 1000,
//                     hp: hp + baseStats.hp,
//                     reg: Math.floor((reg + baseStats.reg) * 1000) / 1000
//                 }
//             } else {
//                 // Parche para añadir las estadisticasbases como una categoría

//                 solution.None = {
//                     accuracy: Math.floor((accuracy) * 1000) / 1000,
//                     att_interval: att_interval,
//                     crit: Math.floor((crit) * 1000) / 1000,
//                     critDmg: critDmg,
//                     def: def,
//                     dmg: dmg,
//                     evasion: Math.floor((evasion) * 1000) / 1000,
//                     hp: hp,
//                     reg: Math.floor((reg) * 1000) / 1000

//                 }
//             }
//         }
//     )

//     return solution
// }


export const createRandomStats = () => {
    let basicStats = HERO_STATS[0];
    let classStats = HERO_STATS.slice(1);

    let id_class = rand(0, classStats.length - 1); //ES EL INDICE -> el valor es id_class + 1
    let choosedClassStats = classStats[id_class];
    let currGender = rand(0, 1);
    let name = randName(Number(currGender));
    let randHero: IHeroCreated = {
        ...calculateFinalStats(basicStats, choosedClassStats),
        id_class: id_class + 1,
        className: choosedClassStats.className,
        gender: currGender,
        name: name[0],
        surname: name[1],
    };
    randHero["hp"] = Math.round(randHero["hp"]);
    //randHero['currentHp'] = randHero.hp;
    // randHero["dmg"] = Math.round(randHero["dmg"]);
    // randHero["def"] = Math.round(randHero["def"]);
    randHero["att_interval"] = Math.round(randHero['att_interval']);

    // añado imagen
    randHero.img = defaultImageContext[(randHero.className.toLocaleLowerCase() as keyof IImageContext)];

    // debugger;
    //console.log(`Random Hero: \n ${JSON.stringify(randHero.name)}`);
    // //console.timeEnd('createHero');
    return randHero as any;
};

export const createRandomHero = () => {
    // if (hero.id < 1 || hero.is > 9) {
    //     throw new Error(
    //         `Error hero Id: ${hero.id} does not represent any hero type id.`
    //     );
    // }
    let id = rand(9);
    let solution: IHero;
    switch (id) {
        case 1:
            solution = new Archer();
            break;
        case 2:
            solution = new Berserker();
            break;
        case 3:
            solution = new Defender();
            break;
        case 4:
            solution = new Fencer();
            break;
        case 5:
            solution = new Ninja();
            break;
        case 6:
            solution = new Paladin();
            break;
        case 7:
            solution = new Sniper();
            break;
        case 8:
            solution = new Soldier();
            break;
        case 9:
            solution = new Thieve();
            break;
        default:
            solution = new Archer();
    }

    return solution;
};

