type Office = {
    officeId: Number,
    isOpened: Boolean,
    contacts: {
        phone: String,
        email: String,
        address: {
            city: String,
        },
    },
}

const office: Office = {
    officeId: 45,
    isOpened: false,
    contacts: {
        phone: "+79100000000",
        email: "my@email.ru",
        address: {
            city: "Москва"
        }
    }
}

const office2: {
    officeId: Number,
    isOpened: Boolean,
    contacts: {
        phone: String,
        email: String,
        address: {
            city: String,
        },
    },
} = {
    officeId: 46,
    isOpened: false,
    contacts: {
        phone: "+79100000000",
        email: "my@email.ru",
        address: {
            city: "Москва"
        }
    }
}