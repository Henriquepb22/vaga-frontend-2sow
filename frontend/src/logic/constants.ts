export const ROUTES = {
    LOGIN: '/login',
    USERS: '/users',
    USER: '/user',
    EDIT_USER: '/user/:id',
    LOGOUT: '/logout'
}

export const REQUESTS = {
    PAGE_LIMIT: 10
}

export const REGEX = {
    EMAIL: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    ZIPCODE: /^\d{5}-\d{3}$/,
    DOCUMENT: /^\d{3}\.\d{3}\.\d{3}-\d{2}/
}
