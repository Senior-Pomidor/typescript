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



// HACK: Type Aliases
// Определение типа с имнем, наподобие переменной
// XXX: TS StyleGuide рекомендует именовать с заглавной

type HttpMethod = 'POST' | 'GET';
type FetchWithAuthResponse = 1 | -1;
type CoolString = string; // CoolString - отдельный тип

const fetchWithAuthTyped = (method: HttpMethod): FetchWithAuthResponse => {
    return 1
}

// Типизация объектов

// Было
// let vasya: {
//     name: string,
//     age: number,
//     skills: string[],
//     isAuth?: boolean,
//     log: (id: number) => string,
// } = {
//     name: 'Vasya',
//     age: 25,
//     skills: ['Vue', 'React'],
//     isAuth: true,
//     log: (age) => '1',
// }

// Стало
type User = {
    name: string,
    age: number,
    skills: string[],
    isAuth?: boolean,
    log: (id: number) => string,
}

let vasya: User = {
    name: 'Vasya',
    age: 25,
    skills: ['Vue', 'React'],
    isAuth: true,
    log: (age) => '1',
}

const petya: User = {
    name: 'Petya',
    age: 25,
    skills: ['Vue', 'React'],
    log: (age) => '1',
}

// HACK: Types Intersection
// пересечение (объединение с переечением)

type User2 = {
    name: string,
    age: number,
    skills: string[],
}

type Role2 = {
    id: number,
}

// Пересечение (объединение с переечением)
type UserWithRole = User2 & Role2;
// Итог : {
//     name: string,
//     age: number,
//     skills: string[],
//     id: number,
// }

const userWithRole: UserWithRole = {
    name: 'Petya',
    age: 25,
    skills: ['Vue', 'React'],
    id: 1,
}


// XXX: Пересечение типов объектов с одинаковыми полями
// Тип поля в итоге должен удовлетворять сразу обоим типам
// Если в TS нет такого (итогового) типа, то будет тип never
type User3 = {
    skill: string,
    name: string,
    id: number,
}

type Role3 = {
    skill: string, // одинаковые типы
    name: 'POST', // пересекающиеся типы
    id: string, // разные типы, объединения которых нет в TS
}

type UserWithRole3 = User3 & Role3

// const userWithRole3: UserWithRole3 = {
//     skill: '', // string
//     name: 'POST', // string & 'POST'
//     id: 1, // never
// }

//XXX: В случае пересечения с одинаковыми полями, лучше делать композицию
type UserWithRoleComp = {
    user: User3,
    role: Role3,
}



// HACK: Interfaces

interface UserInterface {
    name: string,
    age: number,
    skills: string[],

    log: (id: number) => string,
}

// HACK: Interfaces intersection
// Объединение интерфейсов

interface UserWithRoleInterface extends UserInterface {
    roleId: number,
    // name: number, // error - Типы свойства "name" несовместимы.
    // name: 'POST', // ok - Типы свойства "name" могут быть объединены.
}
// ИЛИ
// interface RoleInterface {
//     roleId: number,
// }
// interface UserWithRoleInterface extends UserInterface, RoleInterface {}

let vasyaRole: UserWithRoleInterface = {
    // из определения UserInterface
    name: 'Vasya',
    age: 25,
    skills: ['Vue', 'React'],
    log: (id) => '',

    // из определения UserWithRoleInterface
    roleId: 1,
}


// HACK: интерфейс для объектов (словарей)
interface UserDic {
    [index: number]: UserWithRoleInterface,
    [index: string]: UserWithRoleInterface,
}
// означает что может быть сколько угодно полей, удовл. типу
const userDic: UserDic = {
    1: vasyaRole,
    '2': vasyaRole,
    3: vasyaRole,
    // ...
}

// HACK: утилитарный тип Record<>
// аналогичен интерфейсу словаря выше
type ud = Record<number, UserWithRoleInterface>


// HACK: Типы или Интерфейсы?

// XXX: Интерфейсы можно доопределить, типы нельзя
// !!! Использовать только в случае доопределения внешних либ и т.п.
// !!! В своём коде так лучше не делать

interface int1 {
    name: string,
}

interface int1 {
    type: string,
}

// // В итоге будет 
// interface int1 {
//     name: string,
//     type: string,
// }


// XXX: Интерфейсы нельзя для примитивных типов
// Для простых типов и объединений -- использовать типы
type ID = string | number
// interface iID number // error
// interface iID { id: number } // good

// XXX: type
// для простых типов, пересечений, объединений

// XXX: interface
// !!! всегда для объектов (рекомендация),
// кроме случаев, когда НЕОБХОДИМ type (простые типы, пересечения, объединения)


// HACK: Optional
// XXX: ?: - необязвтельнй параметр в функции
const multiply = (num1: number, num2?: number): number => {
    // return num1 * num2; // err - второго параметра может и не быть

    if (!num2) {
        return num1 * num1
    }

    // ok - сужение типов
    return num1 * num2
}

multiply(1)
multiply(1, 2)

// XXX: ?: - необязвтельнй параметр в объекте
interface UserPro {
    login: string;
    password?: {
        type: 'prime' | 'sec';
    };
}
// XXX: ?. - Optional Chaining
// XXX: !. - Non-null Assertion Operator
const testPass = (user: UserPro): boolean => {
    // XXX: ?. - optional chaining - проверка на существование
    const type = user.password?.type;

    // XXX: !. - явно указываем (зуб даю) что тут всегда password будет не undefined
    // Non-null Assertion Operator
    // лучше не использовать
    const type1 = user.password!.type;

    console.log(type)
    return true
}

testPass({
    login: 'login',
})

testPass({
    login: 'login',
    password: {
        type: 'sec',
    },
})

// XXX: ?? - Nullish Coalescing
// проверяет param на null и undefined
const testPassStr = (param?: string): string => {
    const str = param ?? multiply(5)

    return '123'
}
