const MONSTERS = {
    "52": {
        name: 'birdo',
        evolution: false,
        type: 'CREATURE',
        grade: 0,
        id: 52,
        accuracy: 0.82,
        att_interval: 10,
        crit: 0.06,
        critDmg: 1,
        def: 4.6,
        dmg: 4,
        evasion: 0.02,
        hp: 74,
        reg: 0.44
    },
    "53": {
        name: 'birdo +',
        evolution: true,
        type: 'CREATURE',
        grade: 2,
        id: 53,
        accuracy: 0.85,
        att_interval: 7,
        crit: 0.32,
        critDmg: 1.17,
        def: 6.3,
        dmg: 16.1,
        evasion: 0.3,
        hp: 123,
        reg: 0.78
    },
    "59": {
        name: 'dimitri',
        evolution: true,
        type: 'GHOST',
        grade: 4,
        id: 59,
        accuracy: 0.97,
        att_interval: 8,
        crit: 0.36,
        critDmg: 1.5,
        def: 26.25,
        dmg: 42,
        evasion: 0.27,
        hp: 282,
        reg: 1.28
    }
};


export default MONSTERS;