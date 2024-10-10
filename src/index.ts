export class Comparator<T> {
  private options = { verbose: false };
  private size_part_key = 14;
  private index: number | string = 0;
  private indexs: any[];
  /**
   * Новые записи
   */
  private left: T[] = [];
  /**
   * Старые записи
   */
  private right: T[] = [];
  private result: ResultCompare<T>;
  private operation: (l: T, r: T) => boolean = () => true;

  /**
   * Устанавливает опцию, которая показывает оценку времени выполнения сравнения
   */
  setVerbose(): this {
    this.options.verbose = true;
    return this;
  }

  /**
   * Устанавливает идентификатор (Ключ) записи, по которому будут сопоставляться товары (записи)
   */
  setIndex(index: number | string): Comparator<T> {
    this.index = index;
    return this;
  }

  /**
   * Устанавливает идентификаторов записи, по которым будут сопоставляться товары (записи). Используется для записей с составным ключом
   */
  setIndexes(index: number[] | string[]): Comparator<T> {
    this.indexs = index;
    return this;
  }

  /**
   * Устанавливает новый массив данных
   */
  setNewArray(arr: T[]): Comparator<T> {
    this.left = arr;
    return this;
  }

  /**
   * Устанавливает старый массив данных
   */
  setOldArray(arr: T[]): Comparator<T> {
    this.right = arr;
    return this;
  }

  /**
   * Сортирует новый массив запписей
   */
  sortNewArray(): Comparator<T> {
    if (this.index) {
      if (this.options.verbose) {
        console.time("Left sort time");
      }
      this.left.sort((l, r) => (l[this.index] > r[this.index] ? 1 : -1));

      if (this.options.verbose) {
        console.timeEnd("Left sort time");
      }
    }
    if (this.indexs) {
      if (this.options.verbose) {
        console.time("Left index time");
      }
      this.left.map((r) => {
        r["__key__"] = "";
        this.indexs.forEach((index) => {
          r["__key__"] +=
            (r[index] as String)
              .toString()
              .substring(0, this.size_part_key)
              .padStart(this.size_part_key, "0") + "-";
        });
        r["__key__"] = r["__key__"].substring(0, r["__key__"].length - 1);
      });

      if (this.options.verbose) {
        console.timeEnd("Left index time");
      }

      if (this.options.verbose) {
        console.time("Left sort time");
      }
      this.left.sort((l, r) => (l["__key__"] > r["__key__"] ? 1 : -1));

      if (this.options.verbose) {
        console.timeEnd("Left sort time");
      }
    }
    return this;
  }

  /**
   * Сортирует старый массив записей
   */
  sortOldArray(): Comparator<T> {
    if (this.index) {
      if (this.options.verbose) {
        console.time("Right sort time");
      }
      this.right.sort((l, r) => (l[this.index] > r[this.index] ? 1 : -1));

      if (this.options.verbose) {
        console.timeEnd("Right sort time");
      }
    }
    if (this.indexs) {
      if (this.options.verbose) {
        console.time("Right index time");
      }
      this.right.map((r) => {
        r["__key__"] = "";
        this.indexs.forEach((index) => {
          r["__key__"] +=
            (r[index] as String)
              .toString()
              .substr(0, this.size_part_key)
              .padStart(this.size_part_key, "0") + "-";
        });
        r["__key__"] = r["__key__"].substr(0, r["__key__"].length - 1);
      });

      if (this.options.verbose) {
        console.timeEnd("Right index time");
      }

      if (this.options.verbose) {
        console.time("Right sort time");
      }
      this.right.sort((l, r) => (l["__key__"] > r["__key__"] ? 1 : -1));

      if (this.options.verbose) {
        console.timeEnd("Right sort time");
      }
    }
    return this;
  }

  /**
   * Функция сравнения изменений в записи
   */
  setCompareFunction(operation: (l: T, r: T) => boolean): Comparator<T> {
    this.operation = operation;
    return this;
  }

  /**
   * Мягкое сравнение, в один проход
   */
  softCompare(): Comparator<T> {
    if (this.options.verbose) {
      console.time("Comare time");
    }
    this.result = new ResultCompare();

    if (this.indexs) this.index = "__key__";
    let leftInc = 0;
    let rightInc = 0;
    while (true) {
      if (this.left[leftInc] == null || this.right[rightInc] == null) {
        // Что то удалить или добавить в зависимости какой инкремент больше  и завершить
        if (this.left[leftInc] == null) {
          // удаляем с позиции rightInc или удалить всё что осталось
          // console.log("Delete concat",this.result.delete, this.right);
          this.result.delete = this.result.delete.concat(
            this.right.filter((r) => r != null)
          );
        } else {
          // добавляем
          // console.log("ADD concat",this.left);
          this.result.add = this.result.add.concat(
            this.left.filter((r) => r != null)
          );
        }
        break;
      }

      let indexLeftValue = this.left[leftInc][this.index];
      let indexRightValue = this.right[rightInc][this.index];

      if (indexLeftValue === indexRightValue) {
        if (this.operation(this.left[leftInc], this.right[rightInc])) {
          this.result.empty.push(this.left[leftInc]);
        } else {
          this.result.update.push({
            new: this.left[leftInc],
            old: this.right[rightInc],
          });
        }

        //console.log("step left and right: ", leftInc, rightInc)
        // Чистим массив
        delete this.left[leftInc];
        delete this.right[rightInc];

        leftInc++;
        rightInc++;
      } else if (indexLeftValue < indexRightValue) {
        //console.log("step left: ", leftInc, this.left[leftInc])
        this.result.add.push(this.left[leftInc]);
        delete this.left[leftInc];
        leftInc++;
      } else {
        // console.log("step right: ", rightInc, this.right[rightInc])
        this.result.delete.push(this.right[rightInc]);
        delete this.right[rightInc];
        rightInc++;
      }
    }

    if (this.options.verbose) {
      console.timeEnd("Comare time");
    }
    return this;
  }

  unsortedCompare(): Comparator<T> {
    if (this.options.verbose) {
      console.time("Comare time");
    }
    this.result = new ResultCompare();
    const newItems = this.left.reduce(
      (acc, item) => acc.set(item[this.index], item),
      new Map<string | number, T>()
    );

    for (const oldItem of this.right) {
      const id = oldItem[this.index];
      if (newItems.has(id)) {
        const newItem = newItems.get(id);
        if (this.operation(newItem, oldItem)) {
          this.result.empty.push(newItem);
        } else {
          this.result.update.push({
            new: newItem,
            old: oldItem,
          });
        }
        newItems.delete(id);
      } else {
        this.result.delete.push(oldItem);
      }
    }
    for (let newItem of newItems.values()) {
      this.result.add.push(newItem);
    }

    if (this.options.verbose) {
      console.timeEnd("Comare time");
    }

    return this;
  }

  /**
   * Жёсткое сравнение.
   *
   * Этот метод добавлен для откладки. Испопльзовать только для тестирования. Метод сравнения работает только с одиночным ключём
   */
  hardCompare(): Comparator<T> {
    if (this.options.verbose) {
      console.time("Comare time");
    }
    this.result = new ResultCompare();
    for (let itemLeft of this.left) {
      let flagExecute = false;
      for (let indexItemRight in this.right) {
        if (itemLeft[this.index] == this.right[indexItemRight][this.index]) {
          flagExecute = true;
          if (this.operation(itemLeft, this.right[indexItemRight])) {
            this.result.empty.push(itemLeft);
          } else {
            this.result.update.push({
              new: itemLeft,
              old: this.right[indexItemRight],
            });
          }
          delete this.right[indexItemRight];
          break;
        }
      }
      if (!flagExecute) {
        this.result.add.push(itemLeft);
      }
    }
    this.result.delete = this.right.filter((r) => r != null);
    if (this.options.verbose) {
      console.timeEnd("Comare time");
    }
    return this;
  }

  afterComare(event: (r: ResultCompare<T>) => void): Comparator<T> {
    if (event) event(this.result);
    return this;
  }

  getResult(): ResultCompare<T> {
    return this.result;
  }
}

export class ResultCompare<T> {
  empty: T[] = [];
  delete: T[] = [];
  update: DiffResult<T>[] = [];
  add: T[] = [];
}

export class DiffResult<T> {
  new: T;
  old: T;
}
