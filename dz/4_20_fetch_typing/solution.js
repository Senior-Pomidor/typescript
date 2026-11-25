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
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('https://dummyjson.com/users');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
        }
        // Вы делаете так называемый __"Type Assertion"
        // (Контракт доверия)__. Вы говорите компилятору: *"TypeScript,
        // поверь мне на слово, бэкенд-разработчики обещали,
        // что тут придет именно такая структура"*.
        // в критикал проектах:
        // используют __библиотеки рантайм-валидации схем__
        // (самая популярная сегодня — __Zod__):
        const data = yield response.json();
        console.log(data.users[0].address);
        return data;
    }
    catch (error) {
        console.error('Не удалось загрузить пользователей: ', error);
        throw error;
    }
});
getUsers();
