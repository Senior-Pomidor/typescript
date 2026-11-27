"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Gettegs и Setters дополняют действия,
// которые будем делать при чтении или записи поля
class User {
    constructor() {
        this._readOnlyField = 42;
    }
    // без сеттера преобразование 'user-' + login
    // будет только при явном вызове getLogin()
    getLogin(login) {
        this.login = 'user-' + login;
    }
    set login(login) {
        this._login = 'user-' + login;
        this.createdAt = new Date();
    }
    // XXX: тип поля по итогу будет разняться return type геттера
    get login() {
        // return this._login
        return 'не скажу';
    }
    // XXX: если только геттер, то свойство становится readonly
    get readOnlyField() {
        return this._readOnlyField;
    }
    // XXX: геттеры и сеттеры нельзя делать асинхронными
    // поэтому все преобразования должны быть синхронными
    // поэтому для тяжёлых операций лучше использовать методы, а не сеттеры
    // set password(pass: string) {
    // }
    getPassword(pass) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise(res => {
                res(1);
            });
            return this.password;
        });
    }
}
const user = new User();
// без сеттера будет просто 'myLogin'
// с ним сразу станет 'user-myLogin'
user.login = 'myLogin';
// без геттера будет 'user-myLogin'
// с гетером будет 'не скажу' либо undefined, если не прописать геттер
console.log(user.login);
// ошибка, для поля нету setter
// user.readOnlyField = 51
