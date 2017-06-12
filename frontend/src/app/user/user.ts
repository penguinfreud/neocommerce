export const enum UserType {
    ADMIN = 1, CUSTOMER = 2
}

export class User {
    id: number;
    name: string;
    userName: string;
    token: string;
    type: UserType;
}
