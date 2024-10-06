// 4.8. Упражнение - Типизируем ответ сервера

// Создать интерфейс для запроса перевода средств (IPaymentsRequest) и ответа API

// // Запрос в виде платежа
// {
//     "sum": 10000,
//     "from": 2,
//     "to": 4
// }


// // Ответ
// {
//     "status": "success",
//     "data": {
//         "databaseId": 567,
//         "sum": 10000,
//         "from": 2,
//         "to": 4
//     }
// },
// {
//     "status": "failed",
//     "data": {
//         "errorMessage": "Недостаточно средств",
//         "errorCode": 4
//     }
// }

// Разработка интерфейсов:

// IPaymentsRequest:
// Основан на сущности платежа IPayment
// Содержит атрибуты: сумма (sum), отправитель (from), получатель (to)
//
// Ответ API:
// Разработка двух типов ответов: успешный (IResponseSuccess) и неуспешный (IResponseFailed)
// Использование enum для статусов ответа (PaymentStatus): success или failed

// платёж
interface IPayment {
    sum: number;
    from: number,
    to: number,
}


// разделение бизнес-сущности и сущности запроса
interface IPaymentRequest extends IPayment {}

// Ответ: данные успешного ответа
interface ResponseDataSuccess extends IPayment {
    databaseId: number;
}

// Ответ: статусы
const enum ResponseStatus {
    failed = 'failed',
    success = 'success'
}

// Ответ: коды ошибок
type ResponseErrorCode = 1 | 2 | 3 | 4

// Ответ: данные ошибки
interface ResponseDataFailed {
    errorMessage: string;
    errorCode: ResponseErrorCode;
}

// успешный ответ
interface IResponseSuccess {
    status: ResponseStatus.success;
    data: ResponseDataSuccess;
}

// неуспешный ответ
interface IResponseFailed {
    status: ResponseStatus.failed;
    data: ResponseDataFailed;
}

type IResponse = IResponseSuccess | IResponseFailed

