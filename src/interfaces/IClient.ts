export interface IClient {
    token: string;
    data: {
        id: number;
        username: string;
        role?: string;
    } 
}

export interface IClientData {
    id:string,
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    rc: string;
    age: string;
    adviserStatus: string;
}