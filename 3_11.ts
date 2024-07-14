const enum FAQStatus {
    PUBLISHED = 'published',
    DRAFT = 'draft',
    DELETED = 'deleted',
}

type RequestBodyFAQ = {
    topicId: number,
    status: FAQStatus,
}

type FAQ = {
    question: String,
    answer: String,
    tags: String[],
    likes: Number,
    status?: FAQStatus,
}

type ResponseFAQ = FAQ[]

async function getFaqs(req: RequestBodyFAQ): Promise<ResponseFAQ> {
    const res = await fetch('/faqs', {
        method: 'POST',
        body: JSON.stringify(req)
    });

    const data: ResponseFAQ = await res.json();

    return data;
}




/* Запрос */
// {
//     "topicId": 5,
//     "status": "published" // "draft", "deleted"
// }
// /* Ответ */
// [
//     {
//         "question": "Как осуществляется доставка?",
//         "answer": "быстро!",
//         "tags": [
//             "popular",
//             "new"
//         ],
//         "likes": 3,
//         "status": "published"
//     }
// ]

/* 
async function getFaqs(req) {
    const res = await fetch('/faqs', {
        method: 'POST',
        body: JSON.stringify(req)
    });
    const data = await res.json();
    return data;
}
*/
