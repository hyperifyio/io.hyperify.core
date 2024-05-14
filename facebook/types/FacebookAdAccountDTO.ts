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
    explainStringOrUndefined,
} from "../../types/String";
import { isStringArrayOrUndefined } from "../../types/StringArray";
import { isUndefined } from "../../types/undefined";

export interface FacebookAdAccountDTO {
    readonly id             ?: string;
    readonly account_id     ?: string;
    readonly account_status ?: number;
    readonly age            ?: number;
    readonly amount_spent   ?: string;
    readonly balance        ?: string;
}

export function isFacebookAdAccountDTO (value: unknown) : value is FacebookAdAccountDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'id',
            'account_id',
            'account_status',
            'age',
            'amount_spent',
            'balance',
        ])
        && isStringArrayOrUndefined(value?.id)
        && isStringArrayOrUndefined(value?.account_id)
        && isNumberOrUndefined(value?.account_status)
        && isNumberOrUndefined(value?.age)
        && isStringArrayOrUndefined(value?.amount_spent)
        && isStringArrayOrUndefined(value?.balance)
    );
}

export function explainFacebookAdAccountDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'id',
                'account_id',
                'account_status',
                'age',
                'amount_spent',
                'balance',
            ])
            , explainProperty("id", explainStringOrUndefined(value?.id))
            , explainProperty("account_id", explainStringOrUndefined(value?.account_id))
            , explainProperty("account_status", explainNumberOrUndefined(value?.account_status))
            , explainProperty("age", explainNumberOrUndefined(value?.age))
            , explainProperty("amount_spent", explainStringOrUndefined(value?.amount_spent))
            , explainProperty("balance", explainStringOrUndefined(value?.balance))
        ]
    );
}

export function stringifyFacebookAdAccountDTO (value : FacebookAdAccountDTO) : string {
    return `FacebookAdAccountDTO(${value})`;
}

export function parseFacebookAdAccountDTO (value: unknown) : FacebookAdAccountDTO | undefined {
    if (isFacebookAdAccountDTO(value)) return value;
    return undefined;
}

export function isFacebookAdAccountDTOOrUndefined (value: unknown): value is FacebookAdAccountDTO | undefined {
    return isUndefined(value) || isFacebookAdAccountDTO(value);
}

export function explainFacebookAdAccountDTOOrUndefined (value: unknown): string {
    return isFacebookAdAccountDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['FacebookAdAccountDTO', 'undefined']));
}
