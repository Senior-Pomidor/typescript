"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor() {
        this.skills = [];
    }
    addSkill(skillOrSkills) {
        if (typeof skillOrSkills === 'string') {
            this.skills.push(skillOrSkills);
        }
        else if (Array.isArray(skillOrSkills)) {
            this.skills.push(...skillOrSkills);
        }
    }
}
const user = new User();
user.addSkill('javascript');
user.addSkill(['vue', 'typescript']);
console.log(user.skills);
function logAge(age) {
    console.log(age);
    return age;
}
logAge(11);
logAge('11');
// для стрелок можно только кастованием типа
// если цказать напрямую : LogAge будет ошибка
const logAge2 = ((age) => {
    console.log(age);
    return age;
});
logAge2(12);
logAge2('12');
