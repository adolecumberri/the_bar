export interface IMision {
    title: string;
    details: string;
    fights: IMonsterFight[];
    grade: number;
    unique: boolean;
}

export interface IMonsterFight{
    exp: number;
    monsters: number[];
};