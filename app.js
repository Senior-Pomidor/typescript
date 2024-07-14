"use strict";
// const a = 1;
// HACK: Function
function getFullName(firstName, lastName) {
    return `${firstName} ${lastName}`;
}
const getFullNameArrow = (firstName, lastName) => {
    return `${firstName} ${lastName}`;
};
// HACK: Array
const skills = ['Dev', 'DevOps'];
const skillsAny = ['Dev', 'DevOps', 1, { a: 1 }]; // bad way
// HACK: Tuple (кортеж)
// массив ограниченной длины.
// В [] точно (буквально) описана структура.
// Фикс длина, даже после удаления и добавления элемнетов
const skill = [1, 'Dev'];
// const id = skill[0]
// const skillName = skill[1]
const [id, skillName] = skill;
// кортеж произвольной длины
const skillsArr = [1, 'Dev', true, false, true];
// HACK: Readonly
// tuples
const skillRO = [1, 'Dev'];
// skillRO[0] = [9] // недопустимо изменять readonly
const skillsRO = ['dev', 'devops'];
// skillRO[0] = ['str'] // недопустимо изменять readonly
// arrays
const skillsGArr = ['q', 'w', 'qwe']; // Array<string> - generyc
const skillsGArrRO = ['q', 'w', 'qwe']; // аналог readonly string[]
// HACK: Enums
// const res = {
//     message: 'Платёж успешен',
//     statusCode: 1,
// }
// мб чиловым и строковым
// гетерогенный - содержит и строки, и числа
// по умолчанию гетерогенный ведёт себя как числовой
// компилится в функцию
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["SUCCESS"] = 1] = "SUCCESS";
    StatusCode["FAILED"] = "p";
    StatusCode[StatusCode["IN_PROCESS"] = 2] = "IN_PROCESS";
})(StatusCode || (StatusCode = {}));
const res = {
    message: 'Платёж успешен',
    statusCode: StatusCode.SUCCESS,
};
// 1 - успех
// 'p' - в процессе
// 3 - отклонён
function action(status) {
    console.log(status);
}
action(StatusCode.SUCCESS); // ok
action(1); // ok
const logRoles = (role) => {
    console.log(role);
};
logRoles(1 /* Roles.ADMIN */);
