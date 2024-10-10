import { Comparator } from "../src";
declare const describe: any;
declare const it: any;
declare const expect: any;

interface Price {
  id: number;
  price: number;
  qnt: number;
}

describe("Проверка корректности выполнения сравнения", () => {
  it("Тест с одним ключём мягкое сравнение", () => {
    const arrOld = [
      { id: 1, price: 100, qnt: 3 },
      { id: 2, price: 110, qnt: 5 },
      { id: 3, price: 1200, qnt: 1 },
    ];
    const arrNew = [
      { id: 1, price: 100, qnt: 3 },
      { id: 2, price: 120, qnt: 5 },
      { id: 4, price: 1200, qnt: 1 },
    ];
    const result = new Comparator<Price>()
      .setVerbose()
      .setNewArray(arrNew)
      .setOldArray(arrOld)
      .setIndex("id")
      .setCompareFunction((l, r) => {
        return l.price === r.price && l.qnt === r.qnt;
      })
      .sortNewArray()
      .sortOldArray()
      .softCompare()
      .getResult();

    expect(result.add.length).toBe(1);
    expect(result.update.length).toBe(1);
    expect(result.delete.length).toBe(1);
    expect(result.empty.length).toBe(1);
    expect(result.add[0]).toEqual({ id: 4, price: 1200, qnt: 1 });
    expect(result.delete[0]).toEqual({ id: 3, price: 1200, qnt: 1 });
    expect(result.empty[0]).toEqual({ id: 1, price: 100, qnt: 3 });
    expect(result.update[0]).toEqual({
      new: { id: 2, price: 120, qnt: 5 },
      old: { id: 2, price: 110, qnt: 5 },
    });
  });

  it("Тест с одним ключём жёсткое сравнение", () => {
    const arrOld = [
      { id: 1, price: 100, qnt: 3 },
      { id: 2, price: 110, qnt: 5 },
      { id: 3, price: 1200, qnt: 1 },
    ];
    const arrNew = [
      { id: 1, price: 100, qnt: 3 },
      { id: 2, price: 120, qnt: 5 },
      { id: 4, price: 1200, qnt: 1 },
    ];
    const result = new Comparator<Price>()
      .setVerbose()
      .setNewArray(arrNew)
      .setOldArray(arrOld)
      .setIndex("id")
      .setCompareFunction((l, r) => {
        return l.price === r.price && l.qnt === r.qnt;
      })
      .sortNewArray()
      .sortOldArray()
      .hardCompare()
      .getResult();

    expect(result.add.length).toBe(1);
    expect(result.update.length).toBe(1);
    expect(result.delete.length).toBe(1);
    expect(result.empty.length).toBe(1);
    expect(result.add[0]).toEqual({ id: 4, price: 1200, qnt: 1 });
    expect(result.delete[0]).toEqual({ id: 3, price: 1200, qnt: 1 });
    expect(result.empty[0]).toEqual({ id: 1, price: 100, qnt: 3 });
    expect(result.update[0]).toEqual({
      new: { id: 2, price: 120, qnt: 5 },
      old: { id: 2, price: 110, qnt: 5 },
    });
  });
  it("Тест с одним ключём сравнение без сортировки", () => {
    const arrOld = [
      { id: 1, price: 100, qnt: 3 },
      { id: 2, price: 110, qnt: 5 },
      { id: 3, price: 1200, qnt: 1 },
    ];
    const arrNew = [
      { id: 1, price: 100, qnt: 3 },
      { id: 2, price: 120, qnt: 5 },
      { id: 4, price: 1200, qnt: 1 },
    ];
    const result = new Comparator<Price>()
      .setVerbose()
      .setNewArray(arrNew)
      .setOldArray(arrOld)
      .setIndex("id")
      .setCompareFunction((l, r) => {
        return l.price === r.price && l.qnt === r.qnt;
      }) 
      .unsortedCompare()
      .getResult();

    expect(result.add.length).toBe(1);
    expect(result.update.length).toBe(1);
    expect(result.delete.length).toBe(1);
    expect(result.empty.length).toBe(1);
    expect(result.add[0]).toEqual({ id: 4, price: 1200, qnt: 1 });
    expect(result.delete[0]).toEqual({ id: 3, price: 1200, qnt: 1 });
    expect(result.empty[0]).toEqual({ id: 1, price: 100, qnt: 3 });
    expect(result.update[0]).toEqual({
      new: { id: 2, price: 120, qnt: 5 },
      old: { id: 2, price: 110, qnt: 5 },
    });
  });
});
