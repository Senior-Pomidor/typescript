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


// Ответ: статусы
const enum PaymentStatus {
    Failed = 'failed',
    Success = 'success'
}


// Ответ: данные успешного ответа
interface PaymentDataSuccess extends IPayment {
    databaseId: number;
}

// Ответ: данные ошибки
interface PaymentDataFailed {
    errorMessage: string;
    errorCode: number;
}


// XXX: интерфейс предполагает возможность PaymentDataFailed при статусе 'success'
// лучше разделить интерфейсы на уровень выше -- целиком успешный и неуспешный ответ
//
// interface IResponse {
//     status: PaymentStatus;
//     data: PaymentDataSuccess | PaymentDataFailed;
// }

// успешный ответ
interface IResponseSuccess {
    status: PaymentStatus.Success;
    data: PaymentDataSuccess;
}

// неуспешный ответ
interface IResponseFailed {
    status: PaymentStatus.Failed;
    data: PaymentDataFailed;
}

type IResponse = IResponseSuccess | IResponseFailed
