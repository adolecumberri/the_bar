
import { ICoord, IImgAnimation } from '../interfaces';
import { IHero, IHeroCreated } from '../interfaces/Hero.Interface';
import { createRandomStats } from '../utility/hero.utils';
import { uniqueID } from '../utility/Utility';
import { Chair } from './GridBoxesTypes';
// import { StatsManager } from './fightStatsManager';


export class Hero {
	isDead: boolean = false;
	[x: string]: string | number | IImgAnimation | boolean | any;
    coords: ICoord = {x: 0, y: 0, xCoord: 0, yCoord: 0} //x-y son col-row. xCoord-yCoord son pixeles desplazados.
	constructor() {
		let newData = createRandomStats();
		const keys = Object.keys(newData);

		keys.forEach((key, index) => {
			this[key] = newData[key as keyof IHeroCreated];
		});

		this.curr_att_interval = newData.att_interval;
		this.currentHp = newData.hp;
		this.id = uniqueID();
	}

	// fightStats: StatsManager; //Manager de stats. Easy
	// heroStats: IHero;
	// isDead = false;

	start: () => void = () => { };

	end: () => void = () => { };

	attack = (dmgEf = 0) => {
        let { accuracy, crit, critDmg, dmg, variation } = this;

        let damageApplied = dmg + dmgEf;

        let minVar = 1 - variation;
        let maxVar = 1 + variation;
        let damage = 0;

        if (accuracy > this.getProb()) {
            //golpeo?
            if (crit > this.getProb()) {
                //critico
                damage = this.rand(damageApplied * (critDmg + 1) * maxVar, damageApplied * (critDmg + 1) * minVar);
            } else {
                // normal hit
                damage = this.rand(damageApplied * maxVar, damageApplied * minVar);
            }
        } else {
            // miss
        }
        this.calcNextTurn();
        return damage;
    };


    //enemi es class Monster
    defend = (enemi: IHero) => {
        let { currentHp, def, evasion } = this;
        let finalDamage = 0;

        //Evade o no.
        if (evasion <= this.getProb()) {
            let enemiAttack = enemi.attack();
            let attMultiplier = 40 / (40 + def);
            finalDamage = Math.round(enemiAttack * attMultiplier);

        } else {
            //al no atacar, no calcula el siguiente turno
            enemi.calcNextTurn(enemi.att_interval);
        }

        this.currentHp = currentHp - finalDamage >= 0 ? currentHp - finalDamage : 0; //

        if (currentHp === 0) {
            this.dies();
            enemi.addKill();
        }
    };

    //daño directo sin pasar por armadura
    straightDamage = (damage: number) => {
        let { currentHp } = this;
        this.currentHp = currentHp - damage >= 0 ? currentHp - damage : 0;

        if (currentHp === 0) {
            this.dies();
        }
    };

    //HERO DIES
    dies = () => {
        this.isDead = true;
    };

    //HERO WINS
    addKill = () => {
        this.kills = this.kills + 1;
    };

    revive = () => {
        this.isDead = false;
        this.kills = 0;
        this.curr_att_interval = this.att_interval;
        this.currentHp = this.hp;
    }

    //calculo siguiente turno. Habilidades de velocidad lo sobreescribiran.
    calcNextTurn = (att_intervalEf = 0) => {
        let { curr_att_interval, att_interval } = this;
        let new_att_interval = parseInt(curr_att_interval) + (att_interval + att_intervalEf);

        //no entiendo esta linea. la parte del "else" no tienen sentido.
        this.curr_att_interval =
            new_att_interval > parseInt(curr_att_interval) ? new_att_interval : parseInt(curr_att_interval) + 1;
    };

    rand = (max: number, min = 0) =>
        Math.round(Math.random() * (max - min) + min);

    //function to load probabilities.
    getProb = () => Math.random();

    asignCoords = (c: ICoord) => {
        this.coords = {
            ...c
        }
    }

}

