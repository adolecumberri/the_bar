
import { HERO_STATS, VARIATION } from '../constants';
import { IImageContext, IImgAnimation } from '../interfaces';
import { IHero, IHeroCreated } from '../interfaces/Hero.Interface';
import { defaultImageContext } from '../utility/context';
import { rand, randName, uniqueID } from '../utility/Utility';
import { AnyHero, Archer, Berserker, Defender, Fencer, Ninja, Paladin, Sniper, Soldier, Thieve } from './hero_classes';
// import { StatsManager } from './fightStatsManager';


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
  
  
  export const createRandomHero = () => {
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
	randHero.img = defaultImageContext[(randHero.className.toLocaleLowerCase() as keyof IImageContext)];

	let newHero = switchClass(randHero);
	//console.log(`Random Hero: \n ${JSON.stringify(randHero.name)}`);
	// //console.timeEnd('createHero');
	return newHero as any;
  };

let switchClass = (hero: any) => {
	if(hero.id < 1 || hero.is > 9){
		throw new Error(
            `Error hero Id: ${hero.id} does not represent any hero type id.`
          );
	}
	let solution: Archer | Berserker | Defender | Fencer | Ninja | Paladin | Sniper | Soldier | undefined = undefined;
	switch (hero.id_class) {
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
	}

	return solution as Archer | Berserker | Defender | Fencer | Ninja | Paladin | Sniper | Soldier;
};


export class Hero {
	isDead:boolean = false;
	[x:string]: string | number | IImgAnimation | boolean | any;
	constructor() {
		let newData = createRandomHero();
		const keys = Object.keys(newData);

        keys.forEach((key, index) => {
            this[key] = newData[key as keyof IHeroCreated];
        });

		this.curr_att_interval = newData.att_interval;
        this.currentHp = newData.hp;
        this.id = uniqueID;
		// this.heroStats = { ...data, curr_att_interval: data.att_interval };
		// this.fightStats = new StatsManager(data.id);
	}
	
	// fightStats: StatsManager; //Manager de stats. Easy
	// heroStats: IHero;
	// isDead = false;

	start: () => void = () => {};

	end: () => void = () => {};

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
