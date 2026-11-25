class User5 {
    name: string

    constructor(name: string) {
        this.name = name
    }
}

const user5 = new User5('Юля')
console.log(user5.name)

user5.name = 'Какуля'
console.log(user5.name)


// "strictPropertyInitialization": false,
// чтобы не обязательно было присваивать значение в конструкторе
// чаще всего стоит false
// либо role!: number чтобы тс не ругался
class Admin5 {
    role: number
}

const admin = new Admin5()
admin.role = 1


// XXX: конструктор
// оверлоад (перегрузка) -- вариации параметров
// например можно создать юзера только с именем или только с возрастом
class User5_C {
    name: string
    age: number

    // конструкторы -- перегрузки
    // перегрузка нужна чтобы во время разработки видеть
    // подсветку конкретных вариантов, а не просто объединённые типы
    constructor()
    constructor(name: string)
    constructor(age: number)
    // последний по счету конструктор должен иметь совместимость со всеми предыдущими
    // это конструктор имплементации (реализации)
    constructor(ageOrName?: string | number) {
        // внутри нужно сделать проверку, чтобы понять какой по итогу параметр пришёл
        // например, сужение типов
        if (typeof ageOrName === 'string') {
            this.name = ageOrName
        } else if (typeof ageOrName === 'number') {
            this.age = ageOrName
        }
    }
}

const user5_c = new User5_C('Юля')
const user5_c2 = new User5_C('')
const user5_c3 = new User5_C(33)






// XXX: методы
enum Payment5Status {
    Holded,
    Processed,
    Reversed
}

class Payment5 {
    id: number
    status: Payment5Status
    // можно присваивать значение прямо тут при объявлении
    // не обязательно через конструктор
    // лучше делать тут для читабельности, чтобы не забивать конструктор
    createdAt: Date = new Date()
    updatedAt: Date

    constructor(id: number) {
        this.id = id
        // this.createdAt = new Date()
        this.status = Payment5Status.Holded
    }

    getPaymentLifeTime(): number {
        return new Date().getTime() - this.createdAt.getTime()
    }

    unholdPayment(): void {
        if (this.status === Payment5Status.Processed) {
            throw new Error('Платёж не может быть возвращён')
        }

        this.status = Payment5Status.Reversed
        this.updatedAt = new Date()
    }
}

const payment5 = new Payment5(5)
payment5.unholdPayment()
console.log(payment5)

const time = payment5.getPaymentLifeTime()
console.log(time)
