export const enum UserType {
    ADMIN, CUSTOMER
}

export class User {
    id: number
    name: string
    username: string
    token: string
    type: UserType
}
