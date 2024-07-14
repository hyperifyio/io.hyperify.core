// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

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

export interface MaventaTokenResponse {
    readonly access_token: string;
    readonly token_type: string;
    readonly expires_in: number;
    readonly scope: string;
}

export function createMaventaTokenResponse (
    access_token : string,
    token_type : string,
    expires_in : number,
    scope : string,
) : MaventaTokenResponse {
    return {
        access_token,
        token_type,
        expires_in,
        scope,
    };
}

export function isMaventaTokenResponse (value: unknown) : value is MaventaTokenResponse {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'access_token',
            'token_type',
            'expires_in',
            'scope',
        ])
        && isString(value?.access_token)
        && isString(value?.token_type)
        && isNumber(value?.expires_in)
        && isString(value?.scope)
    );
}

export function explainMaventaTokenResponse (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'access_token',
                'token_type',
                'expires_in',
                'scope',
            ])
            , explainProperty("access_token", explainString(value?.access_token))
            , explainProperty("token_type", explainString(value?.token_type))
            , explainProperty("expires_in", explainNumber(value?.expires_in))
            , explainProperty("scope", explainString(value?.scope))
        ]
    );
}

export function stringifyMaventaTokenResponse (value : MaventaTokenResponse) : string {
    return `MaventaTokenResponse(${value})`;
}

export function parseMaventaTokenResponse (value: unknown) : MaventaTokenResponse | undefined {
    if (isMaventaTokenResponse(value)) return value;
    return undefined;
}

export function isMaventaTokenResponseOrUndefined (value: unknown): value is MaventaTokenResponse | undefined {
    return isUndefined(value) || isMaventaTokenResponse(value);
}

export function explainMaventaTokenResponseOrUndefined (value: unknown): string {
    return isMaventaTokenResponseOrUndefined(value) ? explainOk() : explainNot(explainOr(['MaventaTokenResponse', 'undefined']));
}
