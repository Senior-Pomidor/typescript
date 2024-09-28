// HACK: Union - объединение

// const arr: (string | number)[] - union
const arr = ['str', 1];


function logId(id: string | number | boolean) {
    console.log(id);
}

logId(1);
logId('str');
logId(true);
// logId([1]); // error


// HACK: Type Narrowing - сужение типов
// в рантайме проверка типов
function logIdLowerCase(id: string | number | boolean) {
    // console.log(id.toLowerCase);
    // error - потому что id не обязательно строка

    // сужение до одного типа - String
    if (typeof id === 'string') {
        id.toLowerCase() // (parameter) id: string
        // id. - автодополнение будет предлагать методы String
    }
    // else {
    //     id // (parameter) id: number | boolean
    //     // String исключён в if выше
    // }
    else if (typeof id === 'number') {
        console.log(id.toFixed(2))
    } else {
        console.log(id)
    }
}

// пример с Array
function logError(err: string | string[]) {
    // сузили до Array
    if (Array.isArray(err)) {
        err.forEach(error => console.log(error))
    } else {
        console.log(err)
    }
}

// пример с Object
function logObject(obj: { a: number } | { b: number }) {
    if ('a' in obj) {
        console.log(obj.a)
    } else {
        console.log(obj.b)
    }
}

// сужение с проверкой по типу для примитивов
const logMultipleIds = (a: string | number, b: string | boolean) => {
    // тут будет только строка
    // проверка по типу
    if (a === b) {
        console.log(a.toLowerCase())
        console.log(b.toLowerCase())
    } else {
        console.log(a)
    }
}



// HACK: Literal Types
// тип - конкретное значение или набор значений
// напр. const A: 1 = 1 // в A можно записать только единицу
// напр. const И: 'POST' | 'GET' | number = 'POST' // в B можно записать только 'POST' | 'GET' | number
// enum может быть лишним, в таком случае исп Literal Types


function fetchWithAuth(url: string, method: 'GET' | 'POST'): 1 | -1 {
    return 1
    // return 0 // error потому что вернуть можем только 1 или -1
}

fetchWithAuth('str', 'GET') // ok
// fetchWithAuth('str', 'get') // error

// XXX
let method = 'POST' // String
// fetchWithAuth('str', method)
// - err, проверка переменных на типы
// method: String , параметр: 'GET' | 'POST'

let methodTyped: 'POST' = 'POST'
fetchWithAuth('str', methodTyped)
// - ок, типы совпадают (пересекаются)

// XXX
// с let не получится записать в переменную что-то,
// кроме указанного в типе
// как будто константа
let A: 'str' | 'qwe' = 'str'
A = 'qwe' // ok
// A = '123' // error



// HACK: Types Casting
// Принудительное приведение (кастование) типов

// напр, если приходит строка в объекте,
// точно попадающая в Literal Type в конкретном месте

const qwe: { str: string } = {
    str: 'GET',
}
// fetchWithAuth('str', qwe.str)
// - err, потому что qwe.str: String, параметр - 'GET' | 'POST'

// XXX
// Использовать аккуратно !!!   Только если нет другого способа
fetchWithAuth('str', qwe.str as 'GET')
// - ok

fetchWithAuth('str', 'dabudi dabudai' as 'GET')
// - тоже ок, поэтому аккуратно !!!
