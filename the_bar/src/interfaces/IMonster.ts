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
