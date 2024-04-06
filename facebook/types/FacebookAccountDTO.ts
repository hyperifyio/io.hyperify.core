// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explain,
    explainNot,
    explainOk,
    explainOr,
    explainProperty,
} from "../../types/explain";
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

export interface FacebookAccountDTO {
    readonly access_token: string;
    readonly id: string;
}

export function createAccountDTO (
    access_token : string,
    id           : string,
) : FacebookAccountDTO {
    return {
        access_token,
        id,
    };
}

export function isAccountDTO (value: unknown) : value is FacebookAccountDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'access_token',
            'id',
        ])
        && isString(value?.access_token)
        && isString(value?.id)
    );
}

export function explainAccountDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'access_token',
                'id',
            ])
            , explainProperty("access_token", explainString(value?.access_token))
            , explainProperty("id", explainString(value?.id))
        ]
    );
}

export function stringifyAccountDTO (value : FacebookAccountDTO) : string {
    return `AccountDTO(${value})`;
}

export function parseAccountDTO (value: unknown) : FacebookAccountDTO | undefined {
    if (isAccountDTO(value)) return value;
    return undefined;
}

export function isAccountDTOOrUndefined (value: unknown): value is FacebookAccountDTO | undefined {
    return isUndefined(value) || isAccountDTO(value);
}

export function explainAccountDTOOrUndefined (value: unknown): string {
    return isAccountDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['AccountDTO', 'undefined']));
}
