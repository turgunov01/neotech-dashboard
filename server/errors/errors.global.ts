export interface IValidationError {
    type: 'ValidationError';
    message: string;
}

export interface IAuthenticationError {
    type: 'AuthenticationError';
    message: string;
}

export interface IAuthorizationError {
    type: 'AuthorizationError';
    message: string;
}

export interface INetworkError {
    type: 'NetworkError';
    message: string;
}

export interface IUnknownError {
    type: 'UnknownError';
    message: string;
}

export type UserFacingError = IValidationError | IAuthenticationError | IAuthorizationError | INetworkError | IUnknownError;


export const errorMessages: UserFacingError[] = [
    { type: 'ValidationError', message: 'Validation failed' },
    { type: 'AuthenticationError', message: 'Authentication failed' },
    { type: 'AuthorizationError', message: 'Authorization failed' },
    { type: 'NetworkError', message: 'Network error occurred' },
    { type: 'UnknownError', message: 'An unknown error occurred' },
];