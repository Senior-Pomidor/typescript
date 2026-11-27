export {}

// Gettegs и Setters дополняют действия,
// которые будем делать при чтении или записи поля

class User {
    _login: string
    password: string
    _readOnlyField: number = 42
    createdAt: Date

    // без сеттера преобразование 'user-' + login
    // будет только при явном вызове getLogin()
    getLogin(login: string): void {
        this.login = 'user-' + login
    }

    set login(login: string) {
        this._login = 'user-' + login
        this.createdAt = new Date()
    }

    // XXX: тип поля по итогу будет разняться return type геттера
    get login() {
        // return this._login
        return 'не скажу'
    }

    // XXX: если только геттер, то свойство становится readonly
    get readOnlyField() {
        return this._readOnlyField
    }

    // XXX: геттеры и сеттеры нельзя делать асинхронными
    // поэтому все преобразования должны быть синхронными
    // поэтому для тяжёлых операций лучше использовать методы, а не сеттеры
    // set password(pass: string) {

    // }

    async getPassword(pass: string) {
        await new Promise(res => {
            res(1)
        })

        return this.password
    }
}

const user = new User()

// без сеттера будет просто 'myLogin'
// с ним сразу станет 'user-myLogin'
user.login = 'myLogin'

// без геттера будет 'user-myLogin'
// с гетером будет 'не скажу' либо undefined, если не прописать геттер
console.log(user.login)


// ошибка, для поля нету setter
// user.readOnlyField = 51