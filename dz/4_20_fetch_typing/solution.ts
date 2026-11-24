// Типизируем запрос к https://dummyjson.com/users
import * as dz_420_Types from './types'

const getUsers = async () : Promise<dz_420_Types.UsersResponse> => {
    try {
        const response = await fetch('https://dummyjson.com/users')

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`)
        }

        // Вы делаете так называемый __"Type Assertion"
        // (Контракт доверия)__. Вы говорите компилятору: *"TypeScript,
        // поверь мне на слово, бэкенд-разработчики обещали,
        // что тут придет именно такая структура"*.

        // в критикал проектах:
        // используют __библиотеки рантайм-валидации схем__
        // (самая популярная сегодня — __Zod__):

        const data: dz_420_Types.UsersResponse = await response.json()

        console.log(data.users[0].address)

        return data
    } catch (error) {
        console.error('Не удалось загрузить пользователей: ', error)

        throw error
    }
}

getUsers()
