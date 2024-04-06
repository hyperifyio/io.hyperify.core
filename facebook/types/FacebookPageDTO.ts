// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explainReadonlyJsonObject,
    isReadonlyJsonObject,
    ReadonlyJsonObject,
} from "../../Json";
import {
    explain,
    explainNot,
    explainOk,
    explainOr,
    explainProperty,
} from "../../types/explain";
import {
    explainString,
    explainStringOrUndefined,
    isString,
    isStringOrUndefined,
} from "../../types/String";
import { isUndefined } from "../../types/undefined";

export interface FacebookPageDTO extends ReadonlyJsonObject {
    readonly access_token   : string;
    readonly id             : string;
    readonly category      ?: string;
    readonly name          ?: string;
}

export function isAccountDTO (value: unknown) : value is FacebookPageDTO {
    return (
        isReadonlyJsonObject(value)
        && isString(value?.id)
        && isString(value?.access_token)
        && isStringOrUndefined(value?.category)
        && isStringOrUndefined(value?.name)
    );
}

export function explainAccountDTO (value: any) : string {
    return explain(
        [
            explainReadonlyJsonObject(value)
            , explainProperty("access_token", explainString(value?.access_token))
            , explainProperty("id", explainString(value?.id))
            , explainProperty("category", explainStringOrUndefined(value?.category))
            , explainProperty("name", explainStringOrUndefined(value?.name))
        ]
    );
}

export function stringifyAccountDTO (value : FacebookPageDTO) : string {
    return `AccountDTO(${value})`;
}

export function parseAccountDTO (value: unknown) : FacebookPageDTO | undefined {
    if (isAccountDTO(value)) return value;
    return undefined;
}

export function isAccountDTOOrUndefined (value: unknown): value is FacebookPageDTO | undefined {
    return isUndefined(value) || isAccountDTO(value);
}

export function explainAccountDTOOrUndefined (value: unknown): string {
    return isAccountDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['AccountDTO', 'undefined']));
}
