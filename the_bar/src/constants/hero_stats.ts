import { IHeroStats } from "../interfaces/Hero.Interface";

const HERO_STATS: IHeroStats[] = [
  {
    "id_class": null,
    "className": null,
    "hp": 70,
    "dmg": 10,
    "def": 7,
    "crit": 0.1,
    "critDmg": 1.0,
    "accuracy": 0.9,
    "evasion": 0.1,
    "att_interval": 12,
    "reg": 0.6
  },
  {
    "id_class": 1,
    "className": "Archer",
    "hp": 18,
    "dmg": 13,
    "def": -1,
    "crit": 0.3,
    "critDmg": 0.3,
    "accuracy": -0.05,
    "evasion": 0.24,
    "att_interval": -5,
    "reg": 0.0
  },
  {
    "id_class": 2,
    "className": "Berserker",
    "hp": 70,
    "dmg": 25,
    "def": -2,
    "crit": 0.05,
    "critDmg": 0.0,
    "accuracy": -0.05,
    "evasion": 0.05,
    "att_interval": -1,
    "reg": 0.2
  },
  {
    "id_class": 3,
    "className": "Deffender",
    "hp": 42,
    "dmg": 6,
    "def": 31,
    "crit": -0.1,
    "critDmg": 0.0,
    "accuracy": 0.04,
    "evasion": -0.05,
    "att_interval": 3,
    "reg": 0.2
  },
  {
    "id_class": 4,
    "className": "Fencer",
    "hp": 34,
    "dmg": 16,
    "def": 11,
    "crit": 0.1,
    "critDmg": 0.0,
    "accuracy": -0.05,
    "evasion": 0.1,
    "att_interval": 0,
    "reg": 0.0
  },
  {
    "id_class": 5,
    "className": "Ninja",
    "hp": -28,
    "dmg": 14,
    "def": -2,
    "crit": 0.4,
    "critDmg": 0.25,
    "accuracy": 0.0,
    "evasion": 0.33,
    "att_interval": -2,
    "reg": 0.0
  },
  {
    "id_class": 6,
    "className": "Paladin",
    "hp": 50,
    "dmg": 19,
    "def": 21,
    "crit": 0.1,
    "critDmg": 0.0,
    "accuracy": 0.0,
    "evasion": 0.0,
    "att_interval": -1,
    "reg": 0.2
  },
  {
    "id_class": 7,
    "className": "Sniper",
    "hp": 5,
    "dmg": 33,
    "def": -2,
    "crit": 0.7,
    "critDmg": 2.7,
    "accuracy": -0.6,
    "evasion": 0.0,
    "att_interval": 14,
    "reg": -0.2
  },
  {
    "id_class": 8,
    "className": "Soldier",
    "hp": 35,
    "dmg": 21,
    "def": 16,
    "crit": 0.2,
    "critDmg": 0.1,
    "accuracy": 0.0,
    "evasion": 0.1,
    "att_interval": 0,
    "reg": 0.0
  },
  {
    "id_class": 9,
    "className": "Thieve",
    "hp": 25,
    "dmg": 14,
    "def": 3,
    "crit": 0.42,
    "critDmg": 0.24,
    "accuracy": -0.19,
    "evasion": 0.22,
    "att_interval": -1,
    "reg": 0.3
  }
]


export default HERO_STATS;