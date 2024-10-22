// 4.15. Упражнение - Делаем typeguard ответа

interface IPayment2 {
    sum: number;
    from: number;
    to: number;
}

const enum PaymentStatus2 {
    Success = 'success',
    Failed = 'failed',
}

interface IPaymentRequest2 extends IPayment2 { }

interface IDataSuccess2 extends IPayment2 {
    databaseId: number;
}

interface IDataFailed2 {
    errorMessage: string;
    errorCode: number;
}

interface IResponseSuccess2 {
    status: PaymentStatus2.Success;
    data: IDataSuccess2;
}

interface IResponseFailed2 {
    status: PaymentStatus2.Failed;
    data: IDataFailed2;
}

type IResponse2 = IResponseSuccess2 | IResponseFailed2

// typeguard для определения типа ответа
const isSuccessResponse2 = (res: IResponse2): res is IResponseSuccess2 => {
    return res.status === PaymentStatus2.Success
}

type CheckResponse2 = (response: IResponse2) => number

const getIdFromData: CheckResponse2 = response => {
    if (isSuccessResponse2(response)) {
        return response.data.databaseId
    }

    throw new Error(response.data.errorMessage)
}
