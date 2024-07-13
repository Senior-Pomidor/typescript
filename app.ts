// const a = 1;

// HACK: Function
function getFullName(firstName: string, lastName: string): string {
    return `${firstName} ${lastName}`
}

const getFullNameArrow = (firstName: string, lastName: string): string => {
    return `${firstName} ${lastName}`
}


// HACK: Array
const skills: string[] = ['Dev', 'DevOps']

const skillsAny: any[] = ['Dev', 'DevOps', 1, { a: 1 }] // bad way

// HACK: Tuple (кортеж)

// массив ограниченной длины.
// В [] точно (буквально) описана структура.
// Фикс длина, даже после удаления и добавления элемнетов
const skill: [number, string] = [1, 'Dev']

// const id = skill[0]
// const skillName = skill[1]

const [id, skillName] = skill

// кортеж произвольной длины
const skillsArr: [number, string, ...boolean[]] = [1, 'Dev', true, false, true]



// HACK: Readonly
// tuples
const skillRO: readonly [number, string] = [1, 'Dev']
// skillRO[0] = [9] // недопустимо изменять readonly

const skillsRO: readonly string[] = ['dev', 'devops']
// skillRO[0] = ['str'] // недопустимо изменять readonly

// arrays
const skillsGArr: Array<string> = ['q', 'w', 'qwe'] // Array<string> - generyc
const skillsGArrRO: ReadonlyArray<string> = ['q', 'w', 'qwe'] // аналог readonly string[]