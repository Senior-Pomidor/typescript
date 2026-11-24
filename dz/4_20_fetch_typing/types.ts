type Role = 'admin' | 'moderator' | 'user'

type oneToNine = 1|2|3|4|5|6|7|8|9
type zeroToNine = 0|1|2|3|4|5|6|7|8|9

type YYYY = `19${zeroToNine}${zeroToNine}` | `20${zeroToNine}${zeroToNine}`
type MM = oneToNine | `1${0|1|2}`
type DD = oneToNine | `2${zeroToNine}` | `3${0|1}`
/*
    HINT: не стоит делать объединённые типы
    с большим количеством значений
    Замедлится компиляция и IDE
    Для ответов с апи достаточно string.
    Состаывной всё равно не допускает невалидные значения
    Например, 2022-02-31 -- 31 день в феврале
 */
type BirthDate = `${YYYY}-${MM}-${DD}`

type Url = `http${'s' | ''}://${string}`

type BloodGroup = `${'A' | 'B' | 'O' | 'AB'}${'+' | '-'}`

/*
    HINT: не стоит делать объединённые типы
    с большим количеством значений
    Тут достаточно string
    или `${number}/${number}`
 */
type cardExpireMM = `0${oneToNine}` | `1${0|1|2}`
type cardExpireYY = `${zeroToNine}${zeroToNine}`
type cardExpire = `${cardExpireMM}/${cardExpireYY}`

interface Coordinates {
    lat: number,
    lng: number,
}

interface Address {
    address: string,
    city: string,
    state: string,
    stateCode: string,
    postalCode: string,
    coordinates: Coordinates,
    country: string,
}

interface Bank {
    cardExpire: cardExpire,
    cardNumber: string,
    cardType: string,
    currency: string,
    iban: string,
}

interface Company {
    department: string,
    name: string,
    title: string,
    address: Address,
}

interface Crypto {
    coin: string,
    wallet: string,
    network: string,
}

export interface User {
    id: number,
    firstName: string,
    lastName: string,
    maidenName: string,
    age: number,
    gender: "male" | "female",
    email: `${string}@${string}`,
    phone: `+${string}`,
    username: string,
    password: string,
    birthDate: BirthDate,
    image: Url,
    bloodGroup: BloodGroup,
    height: number,
    weight: number,
    eyeColor: string,
    hair: {
        color: string,
        type: string
    },
    ip: string,
    address: Address,
    macAddress: string,
    university: string,
    bank: Bank,
    company: Company,
    ein: string,
    ssn: string,
    userAgent: string,
    crypto: Crypto,
    role: Role,
}

export type UserList = User[]

export type UsersResponse = {
    users: UserList,
    total: number,
    skip: number,
    limit: number,
}