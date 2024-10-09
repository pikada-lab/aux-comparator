
#  Компаратор списков с простой логикой

Для поиска разницы по оригинальному числовому ключу в массивах  структу.  

Класс принимает 2 массива с одинаковой структурой. Старый (правый) и новый (Левый). 

Корекция будет дана так, чтобы применив действия Создания, редактирования и удаления к первоначальному правому массиву получится первоночальный левый массив.

* Comparator<T>::setNewArray - установить массив с новыми данными
* Comparator<T>::setOldArray - установить правый со старыми данными
* Comparator<T>::setIndex - установить поле с уникальным ключём
* Comparator<T>::setIndexs - установить массив полей как уникальный ключь
* Comparator<T>::setCompareFunction - Устанавливает функцию для определения что должно быть отредактированно, а что должно быть проигнорировано
* Comparator<T>::sortNewArray - Отсортировать по ключу левый массив
* Comparator<T>::sortOldArray - Отсортировать по ключу правый массив
* Comparator<T>::softCompare - Мягкое сравнение 
* Comparator<T>::hardCompare - Жёсткое сравнение
* Comparator<T>::afterComare - обработка результата сравнения

Описание структуры обработанных данных

* ResultCompare<T>::empty - Массив одинаковых значений T (Рекомендуется игнорировать)
* ResultCompare<T>::delete - Массив  правых элементов T для удаления 
* ResultCompare<T>::update - Массив элементов типа DiffResult<T> для коррекции из левого массива
* ResultCompare<T>::add - Массив элементов T на добавление из левого массива

Описание структуры DiffResult

* DiffResult<T>::new - Новый элемент
* DiffResult<T>::old - Старый элемент

## Принцип работы

### hardCompare 

Решение в лоб. Перебор массива в другом массиве. 

Низкопроизводительный метод.

### softCompare 

Берёт два отсортированных массива и синхронно прокручивает левый и правый массив. Если индекс не совпадает, проверяет в чью сторону перекос и добавляет индекс наименьшему формируя команды удаления и создания элементов. Если индекс совпадает вызывается метод сравнения для определения куда отнести элементы массива - в редактирование или игнорирование

Когда заканчивается один из списков все элементы оставшиеся в противоположном массиве автоматически добавляюбтся в список на удаление или добавление автоматически.
 


## Использование

Генератор случайных структур

```typescript
interface Item {
    id: string;
    price: number;
    qnt: number;
}
 
let arrLeft = [];
let arrRight = [];

for(let i = 4000000; i > 0; i--) {
    if(Math.random() > 0.1) {
        arrLeft.push({
            id: i+"-ml",
            price: Math.round(1000 * Math.random())/100,
            qnt: Math.round(10 * Math.random())
        })
    } 
    if(Math.random() > 0.1) {
        arrRight.push({
            id: i+"-ml",
            price: Math.round(1000 * Math.random())/100,
            qnt: Math.round(10 * Math.random())
        })
    }
}
```


Клиентский код

```typescript
new Comparator<Item>()
    .setNewArray(arrLeft)
    .setOldArray(arrRight)
    .setIndex("id")
    .setCompareFunction((l,r) => {
        return l.price == r.price && l.qnt == r.qnt
    })
    .sortNewArray()
    .sortOldArray()
    .softCompare()
    .afterComare((r) => {
        console.log({
            name: "soft",
            add: r.add.length,
            empty: r.empty.length,
            delete: r.delete.length,
            update: r.update.length,
            left: arrLeft.length,
            right: arrRight.length
        });
    })
```

