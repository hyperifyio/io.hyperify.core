// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explainArrayOf,
    isArrayOf,
} from "../../types/Array";
import {
    AccountDTO,
    explainAccountDTO,
    isAccountDTO,
} from "./AccountDTO";
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
import { isUndefined } from "../../types/undefined";

export interface AccountListDTO {
    readonly data: readonly AccountDTO[];
}

export function createAccountListDTO (
    data : readonly AccountDTO[],
) : AccountListDTO {
    return {
        data,
    };
}

export function isAccountListDTO (value: unknown) : value is AccountListDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'data',
        ])
        && isArrayOf<AccountDTO>(value?.data, isAccountDTO)
    );
}

export function explainAccountListDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'data',
            ])
            , explainProperty("data", explainArrayOf<AccountDTO>("AccountDTO", explainAccountDTO, value?.data, isAccountDTO))
        ]
    );
}

export function stringifyAccountListDTO (value : AccountListDTO) : string {
    return `AccountListDTO(${value})`;
}

export function parseAccountListDTO (value: unknown) : AccountListDTO | undefined {
    if (isAccountListDTO(value)) return value;
    return undefined;
}

export function isAccountListDTOOrUndefined (value: unknown): value is AccountListDTO | undefined {
    return isUndefined(value) || isAccountListDTO(value);
}

export function explainAccountListDTOOrUndefined (value: unknown): string {
    return isAccountListDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['AccountListDTO', 'undefined']));
}
