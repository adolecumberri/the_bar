
import { IImageContext, IImgAnimation } from '../interfaces';
import { IHero, IHeroCreated } from '../interfaces/Hero.Interface';
import { defaultImageContext } from '../utility/context';
import { createRandomStats } from '../utility/hero.utils';
import { rand, randName, uniqueID } from '../utility/Utility';
import { AnyHero, Archer, Berserker, Defender, Fencer, Ninja, Paladin, Sniper, Soldier, Thieve } from './hero_classes';
// import { StatsManager } from './fightStatsManager';


export class Hero {
	isDead: boolean = false;
	[x: string]: string | number | IImgAnimation | boolean | any;
	constructor() {
		let newData = createRandomStats();
		const keys = Object.keys(newData);

		keys.forEach((key, index) => {
			this[key] = newData[key as keyof IHeroCreated];
		});

		this.curr_att_interval = newData.att_interval;
		this.currentHp = newData.hp;
		this.id = uniqueID();
		// this.heroStats = { ...data, curr_att_interval: data.att_interval };
		// this.fightStats = new StatsManager(data.id);
	}

	// fightStats: StatsManager; //Manager de stats. Easy
	// heroStats: IHero;
	// isDead = false;

	start: () => void = () => { };

	end: () => void = () => { };

	attack: (dmgEf?: number) => number = (dmgEf = 0) => {
		let { id, name, surname, accuracy, crit, critDmg, dmg } = this.heroStats;
		let damage = 0;

		if (accuracy > this.getProb()) {
			//golpeo?
			if (crit > this.getProb()) {
				// this.fightStats.addCrit();
				//critico
				damage = this.rand((dmg + dmgEf) * (critDmg + 1) * 0.85, (dmg + dmgEf) * (critDmg + 1) * 1.15);
			} else {
				// this.fightStats.addHit();
				damage = this.rand((dmg + dmgEf) * 0.85, (dmg + dmgEf) * 1.15);
			}
		} else {
			// this.fightStats.addMiss();
		}
		this.calcNextTurn();
		return damage;
	};

	defend: (enemi: AnyHero) => any = async (enemi) => {
		let { id, hp, currentHp, name, surname, def, evasion } = this.heroStats;
		let finalDamage = 0;

		if (evasion <= this.getProb()) {
			//Evade o no.
			let enemiAttack = enemi.attack();
			let attMultiplier = 40 / (40 + def);
			finalDamage = Math.round(enemiAttack * attMultiplier);

			//Stats
			// enemi.fightStats.set('total_damage', enemi.fightStats.get('total_damage') + finalDamage);
			// this.fightStats.addHitReceived();
		} else {
			enemi.calcNextTurn(enemi.heroEfects.att_interval);

			//stats
			// this.fightStats.addEvasion();
		}

		this.heroStats.currentHp = currentHp - finalDamage >= 0 ? currentHp - finalDamage : 0; //
		//stats
		// this.fightStats.set('currhp', this.heroStats.currentHp);
		if (this.heroStats.currentHp === 0) {
			this.isDead = true;
		}
	};

	//does hero dies after straightDamage?
	straightDamage: (damage: number) => void = (damage) => {
		let { id, hp, name, surname } = this.heroStats;
		this.heroStats.currentHp = this.heroStats.currentHp - damage >= 0 ? this.heroStats.currentHp - damage : 0;

		//stats
		// this.fightStats.addHitReceived();
		// this.fightStats.set('currhp', this.heroStats.currentHp);
		if (this.heroStats.currentHp === 0) {
			this.isDead = true;
		}
	};

	//HERO DIES
	heroDies: () => Promise<unknown> = async () => {
		// console.log('entro en muerte');
		// if (this.heroStats.id_class === 2) {
		// 	console.log('Berserk dies');
		// } else {
		// 	console.log('Archer dies');
		// }
	};

	//HERO WINS
	heroKills: () => Promise<unknown> = async () => {
		// if (this.heroStats.id_class === 2) {
		// 	console.log('Berserk kills');
		// } else {
		// 	console.log('Archer kills');
		// }
		// console.log('entro en victoria');
		// 
	};

	//calculo siguiente turno. Habilidades de velocidad lo sobreescribiran.
	calcNextTurn: (att_intervalEf?: number) => void = (att_intervalEf = 0) => {
		let { curr_att_interval, att_interval } = this.heroStats;
		let new_att_interval = (curr_att_interval as number) + (att_interval + att_intervalEf);
		this.heroStats.curr_att_interval =
			new_att_interval > Number(this.heroStats.curr_att_interval) ? new_att_interval : Number(curr_att_interval) + 1;
	};

	//function to generate rand numbers
	rand: (min: number, max: number) => number = (min: number, max: number) =>
		Math.round(Math.random() * (max - min) + min);

	//function to load probabilities.
	getProb: () => number = () => Math.random();
}

