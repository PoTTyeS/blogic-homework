export interface IApiProps {
    url: string;
    data?: any;
    headers?: IApiHeaders;
};

export interface IApiResponse {
    data: string;
    status: string;
};

interface IApiHeaders {
    jwt: string;
};