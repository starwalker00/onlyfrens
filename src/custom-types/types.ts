export interface authToken {
    accessToken: string;//stringified(Jwt)
    refreshToken: string;//stringified(Jwt)
}

export type Jwt = {
    id: string;
    role: string;
    iat: number;
    exp: number;
}