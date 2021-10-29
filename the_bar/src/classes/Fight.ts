import { IHero } from "../interfaces/Hero.Interface";



class FightManager {

    pvp: (f1: IHero, f2: IHero) => number = (
        f1,
        f2
    ) => {
        let solution = -1;

        for (let i = 0; !f1.isDead && !f2.isDead; i++) {
            if (f1.curr_att_interval === i) {
                //   debugger;     
                //ataca f1
                f2.defend(f1);
                f2.end();
            }
            if (f2.curr_att_interval === i) {
                // debugger;
                f1.defend(f2);
                f1.end();
            }
        }

        //Guardar en la base de datos
        if (f1.isDead && f2.isDead) {
            // f1.isDead = true;
            // f1.kills++;

            // f2.isDead = true;
            // f2.kills++;
            f1.revive();
            f2.revive();
            solution = 0;
        } else if (f1.isDead) {
            f1.dies();
            f2.addKill();
            solution = 1;
        } else if (f2.isDead) {
            f2.dies();
            f1.addKill();
            solution = 2;
        }

        return solution;
    };

}



// while (monsters.length) {
//     const mon1 = monsters.splice(monsters.length * Math.random() | 0, 1)[0]
//     const mon2 = monsters.splice(monsters.length * Math.random() | 0, 1)[0]

//     // TODO: eliminar. useless.
//     if (!mon1 || !mon2) {
//       debugger
//     }

//     const result = pvp(mon1, mon2)
//     if (result === 0) {
//       // empate. los devuelvo a la cola
//       monsters.push(mon1, mon2)
//     } else {
//       monstersAfterFight.push(mon1, mon2)
//     }
//   }

// const pvp = (
//     f1,
//     f2
// ) => {
//     let solution = -1;

//     for (let i = 0; !f1.isDead && !f2.isDead; i++) {
//         if (f1.curr_att_interval === i) {
//             //   debugger;     
//             //ataca f1
//             f2.defend(f1);
//             // f2.end();
//         }
//         if (f2.curr_att_interval === i) {
//             // debugger;
//             f1.defend(f2);
//             // f1.end();
//         }
//     }

//     //Guardar en la base de datos
//     if (f1.isDead && f2.isDead) {
//         // f1.isDead = true;
//         // f1.kills++;

//         // f2.isDead = true;
//         // f2.kills++;
//         f1.revive();
//         f2.revive();
//         solution = 0;
//     } else if (f1.isDead) {
//         f1.dies();
//         f2.addKill();
//         solution = 1;
//     } else if (f2.isDead) {
//         f2.dies();
//         f1.addKill();
//         solution = 2;
//     }

//     return solution;
// };

export { FightManager };