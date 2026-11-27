"use strict";
class User5 {
    constructor(name) {
        this.name = name;
    }
}
const user5 = new User5('Юля');
console.log(user5.name);
user5.name = 'Какуля';
console.log(user5.name);
// "strictPropertyInitialization": false,
// чтобы не обязательно было присваивать значение в конструкторе
// чаще всего стоит false
// либо role!: number чтобы тс не ругался
class Admin5 {
}
const admin = new Admin5();
admin.role = 1;
// XXX: конструктор
// оверлоад (перегрузка) -- вариации параметров
// например можно создать юзера только с именем или только с возрастом
class User5_C {
    // последний по счету конструктор должен иметь совместимость со всеми предыдущими
    // это конструктор имплементации (реализации)
    constructor(ageOrName) {
        // внутри нужно сделать проверку, чтобы понять какой по итогу параметр пришёл
        // например, сужение типов
        if (typeof ageOrName === 'string') {
            this.name = ageOrName;
        }
        else if (typeof ageOrName === 'number') {
            this.age = ageOrName;
        }
    }
}
const user5_c = new User5_C('Юля');
const user5_c2 = new User5_C('');
const user5_c3 = new User5_C(33);
// XXX: методы
var Payment5Status;
(function (Payment5Status) {
    Payment5Status[Payment5Status["Holded"] = 0] = "Holded";
    Payment5Status[Payment5Status["Processed"] = 1] = "Processed";
    Payment5Status[Payment5Status["Reversed"] = 2] = "Reversed";
})(Payment5Status || (Payment5Status = {}));
class Payment5 {
    constructor(id) {
        // можно присваивать значение прямо тут при объявлении
        // не обязательно через конструктор
        // лучше делать тут для читабельности, чтобы не забивать конструктор
        this.createdAt = new Date();
        this.id = id;
        // this.createdAt = new Date()
        this.status = Payment5Status.Holded;
    }
    getPaymentLifeTime() {
        return new Date().getTime() - this.createdAt.getTime();
    }
    unholdPayment() {
        if (this.status === Payment5Status.Processed) {
            throw new Error('Платёж не может быть возвращён');
        }
        this.status = Payment5Status.Reversed;
        this.updatedAt = new Date();
    }
}
const payment5 = new Payment5(5);
payment5.unholdPayment();
console.log(payment5);
const time = payment5.getPaymentLifeTime();
console.log(time);
