// Copyright (c) 2022-2024. <info@sendanor.fi>. All rights reserved.
// Copyright (c) 2022-2024. <info@heusalagroup.fi>. All rights reserved.

import {
    isString,
    isStringOrUndefined,
} from "../../../types/String";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";

export interface AuthenticateEmailDTO {
    readonly email     : string;
    readonly password ?: string;
}

export function createAuthenticateEmailDTO (
    email     : string,
    password ?: string,
) : AuthenticateEmailDTO {
    return {
        email,
        ...(password ? {password} : {}),
    };
}

export function isAuthenticateEmailDTO (value: any): value is AuthenticateEmailDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'email',
            'password',
        ])
        && isString(value?.email)
        && isStringOrUndefined(value?.password)
    );
}

export function stringifyAuthenticateEmailDTO (value: AuthenticateEmailDTO): string {
    return JSON.stringify(value);
}

export function parseAuthenticateEmailDTO (value: any): AuthenticateEmailDTO | undefined {
    if ( isAuthenticateEmailDTO(value) ) return value;
    return undefined;
}
