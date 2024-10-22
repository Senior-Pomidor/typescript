"use strict";
// 4.15. Упражнение - Делаем typeguard ответа
// typeguard для определения типа ответа
const isSuccessResponse2 = (res) => {
    return res.status === "success" /* PaymentStatus2.Success */;
};
const getIdFromData = response => {
    if (isSuccessResponse2(response)) {
        return response.data.databaseId;
    }
    throw new Error(response.data.errorMessage);
};
