
import { useContext } from "react";
import { ImagesContext } from ".";
import { Crew } from "../classes/Crew";
import { HERO_STATS, MALE_NAMES, SURNAMES, VARIATION, WOMAN_NAMES } from "../constants";
import { IImageContext } from "../interfaces";
import { IHeroCreated } from "../interfaces/Hero.Interface";
import { defaultImageContext } from "./context";


export class Counter {
  public data: { [name: string]: number } = {};

  public count(label: string = "default"): void {
    if (!(label in this.data)) {
      this.clear(label);
    }
    this.data[label]++;
    // console.log(`${label}.renders: ${this.data[label]}`);
  }

  public get(label: string = "default"): number | undefined {
    if (label in this.data) {
      return this.data[label];
    }
    return undefined;
  }
  public clear(label: string = "default"): void {
    this.data[label] = 0;
  }
  public clearAll(): void {
    this.data = {};
  }
}

export const loadBoxDimensions = ({ t_width, cols, t_height, rows, topMargin = 0 }: {
  t_width: number;
  cols: number;
  t_height: number;
  rows: number;
  topMargin: number;
}) => {
  if (t_width % cols || t_height % (rows + topMargin))
    throw new Error(
      "Error creating game grid: Please ensure that the desired column and row counts divide evenly into the total width and height of the level!"
    );

  let width = t_width / cols;
  let height = t_height / (rows + topMargin);

  return { width, height }
}

export function rand(max: number, min: number = 0) {
  return Math.round(Math.random() * (max - min) + min);
}

export function randName(gender: number) {
  return [
    gender === 1 ? MALE_NAMES[rand(0, MALE_NAMES.length)] : WOMAN_NAMES[rand(0, WOMAN_NAMES.length)],
    SURNAMES[rand(0, SURNAMES.length - 1)],
  ];
};

let calculateFinalStats = (baseStats: any, classState: any) => {
  let finalStat: any = {};
  Object.keys(baseStats).forEach((a: string | any) => {
    let value = baseStats[a] + classState[a] + Number.EPSILON;
    finalStat[a] =
      Math.round((Math.random() * (value * (1 + VARIATION) - value * (1 - VARIATION)) + value * (1 - VARIATION)) * 100) /
      100;
  });

  finalStat['className'] = classState['className'];
  return finalStat;
};


export const createHero = () => {
  let basicStats = HERO_STATS[0];
  let classStats = HERO_STATS.slice(1);

  let id_class = rand(0, classStats.length - 1); //ES EL INDICE -> el valor es id_class + 1
  let choosedClassStats = classStats[id_class];
  let currGender = rand(0, 1);
  let name = randName(Number(currGender));
  let randHero: IHeroCreated = {
    ...calculateFinalStats(basicStats, choosedClassStats),
    id_class: id_class + 1,
    gender: currGender,
    name: name[0],
    surname: name[1],
  };
  randHero["hp"] = Math.round(randHero["hp"]);
  //randHero['currentHp'] = randHero.hp;
  randHero["dmg"] = Math.round(randHero["dmg"]);
  randHero["def"] = Math.round(randHero["def"]);

  // añado imagen
  randHero.img = defaultImageContext[(randHero.className.toLocaleLowerCase() as keyof IImageContext)]
  //console.log(`Random Hero: \n ${JSON.stringify(randHero.name)}`);
  // //console.timeEnd('createHero');
  return randHero as IHeroCreated;
};

export const createCrew = () => {
  let crew = new Crew(rand(4, 2));
  return crew;
}

export const uniqueID = (() => {
  return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
})();
