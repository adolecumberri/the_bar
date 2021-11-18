
import { Crew } from "../classes/Crew2";
import { CrewOld } from "../classes/Crew";
import { DelayManager } from "../classes/DelayManager";
import { MALE_NAMES, SURNAMES, WOMAN_NAMES } from "../constants";
import { IMission } from "../interfaces";
import { createCrewData } from "./crew.utils";


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

//TODO: remove.
export const createCrewOld = (
  assignMission: () => IMission, 
  liberateTableFromCrew: (tableId: number) => void,
  sendCrewOnAMission: any,
  delayManager: DelayManager
) => {
  let id = uniqueID();
  let crew = new CrewOld({ heroNum: rand(4, 2), id, assignMission, liberateTableFromCrew, sendCrewOnAMission, delayManager });
  return crew;
}


export const uniqueID = () => {
  return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
};


export const mergeArraysByProp = (arr1: any[],arr2: any[], prop: string) =>{
  return arr1.map((item,i) => { 
    return  item[prop] === arr2[i][prop] &&
        Object.assign({},item,arr2[i])
     
  })
}