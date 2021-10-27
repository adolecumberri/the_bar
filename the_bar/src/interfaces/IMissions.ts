import { ICoord } from ".";

export interface IMission {
    id: number;
    title: string;
    details: string;
    fights: IMonsterFight[];
    grade: number;
    unique: boolean;
    location?: ICoord;
}

export interface IMonsterFight{
    exp: number;
    monsters: number[];
};