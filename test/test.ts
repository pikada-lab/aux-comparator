import { Comparator } from "../src";

interface Item {
  id: number | string;
  id2?: number | string;
  price: number;
  qnt: number;
}

let arrLeft: Item[] = [];
let arrRight: Item[] = [];

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
  .setVerbose()
  .setNewArray(arrLeft)
  .setOldArray(arrRight)
  .setIndexes(["id", "id2"])
  .setCompareFunction((l, r) => {
    return l.price === r.price && l.qnt === r.qnt;
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
      right: arrRight.length,
    });
  });

interface Price {
  id: string;
  price: number;
  qnt: number;
}

let arrLeft1: Price[] = [];
let arrRight1: Price[] = [];

// for (let i = 400000; i > 0; i--) {
for (let i = 0; i < 4000000; i++) {
  if (Math.random() > 0.1) {
    arrLeft1.push({
      id: i + "-ml",
      price: Math.round(1000 * Math.random()) / 100,
      qnt: Math.round(10 * Math.random()),
    });
  }
  if (Math.random() > 0.1) {
    arrRight1.push({
      id: i + "-ml",
      price: Math.round(1000 * Math.random()) / 100,
      qnt: Math.round(10 * Math.random()),
    });
  }
}

console.log("total old", arrLeft1.length, "total new", arrRight1.length);
const result = new Comparator<Price>()
  .setVerbose()
  .setNewArray(arrLeft1)
  .setOldArray(arrRight1)
  .setIndex("id")
  .setCompareFunction((l, r) => {
    return l.price === r.price && l.qnt === r.qnt;
  })
  .softCompare()
  .getResult();

console.log(
  "add:",
  result.add.length,
  "delete:",
  result.delete.length,
  "update:",
  result.update.length,
  "do nothing:",
  result.empty.length
);

let arrLeft2: Price[] = [];
let arrRight2: Price[] = [];

for (let i = 4000000; i > 0; i--) {
  if (Math.random() > 0.1) {
    arrLeft2.push({
      id: i + "-ml",
      price: Math.round(1000 * Math.random()) / 100,
      qnt: Math.round(10 * Math.random()),
    });
  }
  if (Math.random() > 0.1) {
    arrRight2.push({
      id: i + "-ml",
      price: Math.round(1000 * Math.random()) / 100,
      qnt: Math.round(10 * Math.random()),
    });
  }
}

console.log("total old", arrLeft2.length, "total new", arrRight2.length);
const result2 = new Comparator<Price>()
  .setVerbose()
  .setNewArray(arrLeft2)
  .setOldArray(arrRight2)
  .setIndex("id")
  .setCompareFunction((l, r) => {
    return l.price === r.price && l.qnt === r.qnt;
  })
  .unsortedCompare()
  .getResult();

console.log(
  "add:",
  result2.add.length,
  "delete:",
  result2.delete.length,
  "update:",
  result2.update.length,
  "do nothing:",
  result2.empty.length
);
