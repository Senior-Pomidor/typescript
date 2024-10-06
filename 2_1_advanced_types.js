"use strict";
// HACK: Union - объединение
// const arr: (string | number)[] - union
const arr = ['str', 1];
function logId(id) {
    console.log(id);
}
logId(1);
logId('str');
logId(true);
// logId([1]); // error
// HACK: Type Narrowing - сужение типов
// в рантайме проверка типов
function logIdLowerCase(id) {
    // console.log(id.toLowerCase);
    // error - потому что id не обязательно строка
    // сужение до одного типа - String
    if (typeof id === 'string') {
        id.toLowerCase(); // (parameter) id: string
        // id. - автодополнение будет предлагать методы String
    }
    // else {
    //     id // (parameter) id: number | boolean
    //     // String исключён в if выше
    // }
    else if (typeof id === 'number') {
        console.log(id.toFixed(2));
    }
    else {
        console.log(id);
    }
}
// пример с Array
function logError(err) {
    // сузили до Array
    if (Array.isArray(err)) {
        err.forEach(error => console.log(error));
    }
    else {
        console.log(err);
    }
}
// пример с Object
function logObject(obj) {
    if ('a' in obj) {
        console.log(obj.a);
    }
    else {
        console.log(obj.b);
    }
}
// сужение с проверкой по типу для примитивов
const logMultipleIds = (a, b) => {
    // тут будет только строка
    // проверка по типу
    if (a === b) {
        console.log(a.toLowerCase());
        console.log(b.toLowerCase());
    }
    else {
        console.log(a);
    }
};
// HACK: Literal Types
// тип - конкретное значение или набор значений
// напр. const A: 1 = 1 // в A можно записать только единицу
// напр. const И: 'POST' | 'GET' | number = 'POST' // в B можно записать только 'POST' | 'GET' | number
// enum может быть лишним, в таком случае исп Literal Types
function fetchWithAuth(url, method) {
    return 1;
    // return 0 // error потому что вернуть можем только 1 или -1
}
fetchWithAuth('str', 'GET'); // ok
// fetchWithAuth('str', 'get') // error
// XXX
let method = 'POST'; // String
// fetchWithAuth('str', method)
// - err, проверка переменных на типы
// method: String , параметр: 'GET' | 'POST'
let methodTyped = 'POST';
fetchWithAuth('str', methodTyped);
// - ок, типы совпадают (пересекаются)
// XXX
// с let не получится записать в переменную что-то,
// кроме указанного в типе
// как будто константа
let A = 'str';
A = 'qwe'; // ok
// A = '123' // error
// HACK: Types Casting
// Принудительное приведение (кастование) типов
// напр, если приходит строка в объекте,
// точно попадающая в Literal Type в конкретном месте
const qwe = {
    str: 'GET',
};
// fetchWithAuth('str', qwe.str)
// - err, потому что qwe.str: String, параметр - 'GET' | 'POST'
// XXX
// Использовать аккуратно !!!   Только если нет другого способа
fetchWithAuth('str', qwe.str);
// - ok
fetchWithAuth('str', 'dabudi dabudai');
const fetchWithAuthTyped = (method) => {
    return 1;
};
let vasya = {
    name: 'Vasya',
    age: 25,
    skills: ['Vue', 'React'],
    isAuth: true,
    log: (age) => '1',
};
const petya = {
    name: 'Petya',
    age: 25,
    skills: ['Vue', 'React'],
    log: (age) => '1',
};
// Итог : {
//     name: string,
//     age: number,
//     skills: string[],
//     id: number,
// }
const userWithRole = {
    name: 'Petya',
    age: 25,
    skills: ['Vue', 'React'],
    id: 1,
};
// ИЛИ
// interface RoleInterface {
//     roleId: number,
// }
// interface UserWithRoleInterface extends UserInterface, RoleInterface {}
let vasyaRole = {
    // из определения UserInterface
    name: 'Vasya',
    age: 25,
    skills: ['Vue', 'React'],
    log: (id) => '',
    // из определения UserWithRoleInterface
    roleId: 1,
};
// означает что может быть сколько угодно полей, удовл. типу
const userDic = {
    1: vasyaRole,
    '2': vasyaRole,
    3: vasyaRole,
    // ...
};
// interface iID number // error
// interface iID { id: number } // good
// XXX: type
// для простых типов, пересечений, объединений
// XXX: interface
// !!! всегда для объектов (рекомендация),
// кроме случаев, когда НЕОБХОДИМ type (простые типы, пересечения, объединения)
// HACK: Optional
// XXX: ?: - необязвтельнй параметр в функции
const multiply = (num1, num2) => {
    // return num1 * num2; // err - второго параметра может и не быть
    if (!num2) {
        return num1 * num1;
    }
    // ok - сужение типов
    return num1 * num2;
};
multiply(1);
multiply(1, 2);
// XXX: ?. - Optional Chaining
// XXX: !. - Non-null Assertion Operator
const testPass = (user) => {
    var _a;
    // XXX: ?. - optional chaining - проверка на существование
    const type = (_a = user.password) === null || _a === void 0 ? void 0 : _a.type;
    // XXX: !. - явно указываем (зуб даю) что тут всегда password будет не undefined
    // Non-null Assertion Operator
    // лучше не использовать
    const type1 = user.password.type;
    console.log(type);
    return true;
};
testPass({
    login: 'login',
});
testPass({
    login: 'login',
    password: {
        type: 'sec',
    },
});
// XXX: ?? - Nullish Coalescing
// проверяет param на null и undefined
const testPassStr = (param) => {
    const str = param !== null && param !== void 0 ? param : multiply(5);
    return '123';
};
