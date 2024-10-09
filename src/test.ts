import { Comparator } from "./index";

interface Item {
    id: string;
    price: number;
    qnt: number;
}

let arrLeft = [];
let arrRight = [];

// for(let i = 4000000; i > 0; i--) {
//     if(Math.random() > 0.1) {
//         arrLeft.push({
//             id: i+"-ml",
//             price: Math.round(1000 * Math.random())/100,
//             qnt: Math.round(10 * Math.random())
//         })
//     } 
//     if(Math.random() > 0.1) {
//         arrRight.push({
//             id: i+"-ml",
//             price: Math.round(1000 * Math.random())/100,
//             qnt: Math.round(10 * Math.random())
//         })
//     }
// }


arrLeft.push({ id: 1, price: 100, qnt: 3 });
arrLeft.push({ id: 2, price: 150, qnt: 4 });
arrLeft.push({ id: 89, price: 200, qnt: 3 });
arrLeft.push({ id: 92, price: 200, qnt: 3 });


arrRight.push({ id: 1, price: 100, qnt: 3 });
arrRight.push({ id: 2, price: 150, qnt: 4 });
arrRight.push({ id: 3, price: 200, qnt: 3 });
arrRight.push({ id: 90, price: 100, qnt: 1 });
arrRight.push({ id: 92, price: 100, qnt: 1 });

// new Comparator<Item>()
//     .setNewArray(arrLeft)
//     .setOldArray(arrRight)
//     .setIndex("id")
//     .setCompareFunction((l, r) => {
//         console.log(`${l.price} == ${r.price} && ${l.qnt} == ${r.qnt}`)
//         return l.price == r.price && l.qnt == r.qnt
//     })
//     .sortNewArray()
//     .sortOldArray()
//     .softCompare()
//     .afterComare((r) => {
//         console.log({
//             name: "soft",
//             add: r.add.length,
//             empty: r.empty.length,
//             delete: r.delete.length,
//             update: r.update.length,
//             left: arrLeft.length,
//             right: arrRight.length
//         });

//         console.log(r);
//     })


arrLeft = [];
arrRight = [];
arrLeft.push({ id: 1, id2: 1, price: 100, qnt: 3 });
arrLeft.push({ id: 2, id2: 1, price: 150, qnt: 4 });
arrLeft.push({ id: 89, id2: 1, price: 200, qnt: 3 });
arrLeft.push({ id: 92, id2: 1, price: 200, qnt: 3 });


arrRight.push({ id: 1, id2: 1, price: 100, qnt: 3 }); 
arrRight.push({ id: 2, id2: 2, price: 150, qnt: 4 });
arrRight.push({ id: 3, id2: 1, price: 200, qnt: 3 });
arrRight.push({ id: 90, id2: 1, price: 100, qnt: 1 });
arrRight.push({ id: 92, id2: 1, price: 100, qnt: 1 });
arrRight.push({ id: 2, id2: 1, price: 150, qnt: 4 });

new Comparator<Item>()
    .setNewArray(arrLeft)
    .setOldArray(arrRight)
    .setIndexes(["id","id2"])
    .setCompareFunction((l, r) => {
        console.log(`${l.price} == ${r.price} && ${l.qnt} == ${r.qnt}`)
        return l.price == r.price && l.qnt == r.qnt
    })
    .sortNewArray()
    .sortOldArray()
    .softCompare()
    .afterComare((r) => {
        console.log({
            name: "hard",
            add: r.add.length,
            empty: r.empty.length,
            delete: r.delete.length,
            update: r.update.length,
            left: arrLeft.length,
            right: arrRight.length
        });

        console.log(r);
    })
