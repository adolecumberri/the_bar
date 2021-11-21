import { IImgAnimation } from ".";

type IGrades = 0 | 1 | 2 | 3 | 4;

type IMonsterTypes = "CREATURES" | "ANGEL" | "SPECTRUM" | "GIANT" | "GHOST" | "CREATURE" | "INSECT";

export interface IMonterStats {
    name: string,
    evolution: boolean,
    type: IMonsterTypes,
    grade: IGrades,
    id: number,
    img: IImgAnimation;
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

// stats directos de la constante de monstruos.
export interface IMonterRawStats {
    name: string;
    evolution: boolean;
    type: string;
    grade: number;
    id: number;
    accuracy: number;
    att_interval: number;
    crit: number;
    critDmg: number;
    def: number;
    dmg: number;
    evasion: number;
    hp: number;
    reg: number;
    img?: IImgAnimation;
    
}
