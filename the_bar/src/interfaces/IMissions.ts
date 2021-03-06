import { ICoord } from ".";
import { Monster } from "../classes/Monster";

export interface IMission {
    id: number;
    title: string;
    details: string;
    fights: IMonsterFight[];
    grade: number;
    unique: boolean;
    location?: ICoord;
    missionNumber?: number;
}

export interface IMonsterFight{
    exp: number;
    monsters: number[] | Monster[];
};