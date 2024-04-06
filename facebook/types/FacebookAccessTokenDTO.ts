// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explain,
    explainNot,
    explainOk,
    explainOr,
    explainProperty,
} from "../../types/explain";
import {
    explainNumberOrUndefined,
    isNumberOrUndefined,
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

/**
 * @see https://developers.facebook.com/docs/facebook-login/guides/access-tokens
 */
export interface FacebookAccessTokenDTO {
    readonly access_token  : string;
    readonly token_type    : string;
    readonly expires_in   ?: number;
}

export function createFacebookAccessTokenDTO (
    access_token  : string,
    token_type    : string,
    expires_in   ?: number,
) : FacebookAccessTokenDTO {
    return {
        access_token,
        token_type,
        expires_in,
    };
}

export function isFacebookAccessTokenDTO ( value: unknown) : value is FacebookAccessTokenDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'access_token',
            'token_type',
            'expires_in',
        ])
        && isString(value?.access_token)
        && isString(value?.token_type)
        && isNumberOrUndefined(value?.expires_in)
    );
}

export function explainFacebookAccessTokenDTO ( value: any) : string {
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
            , explainProperty("expires_in", explainNumberOrUndefined(value?.expires_in))
        ]
    );
}

export function stringifyFacebookAccessTokenDTO ( value : FacebookAccessTokenDTO) : string {
    return `UserAccessTokenDTO(${value})`;
}

export function parseFacebookAccessTokenDTO ( value: unknown) : FacebookAccessTokenDTO | undefined {
    if (isFacebookAccessTokenDTO(value)) return value;
    return undefined;
}

export function isFacebookAccessTokenDTOOrUndefined ( value: unknown): value is FacebookAccessTokenDTO | undefined {
    return isUndefined(value) || isFacebookAccessTokenDTO(value);
}

export function explainFacebookAccessTokenDTOOrUndefined ( value: unknown): string {
    return isFacebookAccessTokenDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['UserAccessTokenDTO', 'undefined']));
}

