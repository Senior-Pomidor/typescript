// Сделать перегрузку метода addSkill - string или string[]
export {}

class User {
    skills: string[] = []

    addSkill(skills: string[]): void
    addSkill(skill: string): void
    addSkill(skillOrSkills: string | string[]): void {
        if (typeof skillOrSkills === 'string') {
            this.skills.push(skillOrSkills)
        } else if (Array.isArray(skillOrSkills)) {
            this.skills.push(...skillOrSkills)
        }
    }
}
const user = new User()
user.addSkill('javascript')
user.addSkill(['vue', 'typescript'])

console.log(user.skills)


// Перегрузки можно делать и в обычных функциях
// тип возвратного значения тоже может различаться

function logAge(age: number): number
function logAge(age: string): string
function logAge(age: number | string): number | string {
    console.log(age)

    return age
}

logAge(11)
logAge('11')


// Для стрелочных функций нельзя написать несколько сигнатур
// только типом, и этот тип прокинуть в функцию
// на практике перегрузки пишут только для function

interface LogAge {
    (age: number): number
    (age: string): string
}

// для стрелок можно только кастованием типа
// если цказать напрямую : LogAge будет ошибка
const logAge2 = ((age: number | string): number | string => {
    console.log(age)

    return age
}) as LogAge

logAge2(12)
logAge2('12')
