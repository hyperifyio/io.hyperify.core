// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explain,
    explainNot,
    explainOk,
    explainOr,
    explainProperty,
} from "../../types/explain";
import {
    explainNumber,
    isNumber,
} from "../../types/Number";
import {
    explainNoOtherKeysInDevelopment,
    hasNoOtherKeysInDevelopment,
} from "../../types/OtherKeys";
import {
    explainRegularObject,
    isRegularObject,
} from "../../types/RegularObject";
import {
    explainString,
    isString,
} from "../../types/String";
import { isUndefined } from "../../types/undefined";

export interface UserAccessTokenDTO {
    readonly access_token: string;
    readonly token_type: string;
    readonly expires_in: number;
}

export function createUserAccessTokenDTO (
    access_token : string,
    token_type : string,
    expires_in : number,
) : UserAccessTokenDTO {
    return {
        access_token,
        token_type,
        expires_in,
    };
}

export function isUserAccessTokenDTO (value: unknown) : value is UserAccessTokenDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'access_token',
            'token_type',
            'expires_in',
        ])
        && isString(value?.access_token)
        && isString(value?.token_type)
        && isNumber(value?.expires_in)
    );
}

export function explainUserAccessTokenDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'access_token',
                'token_type',
                'expires_in',
            ])
            , explainProperty("access_token", explainString(value?.access_token))
            , explainProperty("token_type", explainString(value?.token_type))
            , explainProperty("expires_in", explainNumber(value?.expires_in))
        ]
    );
}

export function stringifyUserAccessTokenDTO (value : UserAccessTokenDTO) : string {
    return `UserAccessTokenDTO(${value})`;
}

export function parseUserAccessTokenDTO (value: unknown) : UserAccessTokenDTO | undefined {
    if (isUserAccessTokenDTO(value)) return value;
    return undefined;
}

export function isUserAccessTokenDTOOrUndefined (value: unknown): value is UserAccessTokenDTO | undefined {
    return isUndefined(value) || isUserAccessTokenDTO(value);
}

export function explainUserAccessTokenDTOOrUndefined (value: unknown): string {
    return isUserAccessTokenDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['UserAccessTokenDTO', 'undefined']));
}

