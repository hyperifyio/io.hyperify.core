// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explainArrayOf,
    isArrayOf,
} from "../../types/Array";
import {
    FacebookAccountDTO,
    explainAccountDTO,
    isAccountDTO,
} from "./FacebookAccountDTO";
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

export interface FacebookAccountListDTO {
    readonly data: readonly FacebookAccountDTO[];
}

export function createFacebookAccountListDTO (
    data : readonly FacebookAccountDTO[],
) : FacebookAccountListDTO {
    return {
        data,
    };
}

export function isFacebookAccountListDTO ( value: unknown) : value is FacebookAccountListDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'data',
        ])
        && isArrayOf<FacebookAccountDTO>(value?.data, isAccountDTO)
    );
}

export function explainFacebookAccountListDTO ( value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'data',
            ])
            , explainProperty("data", explainArrayOf<FacebookAccountDTO>("AccountDTO", explainAccountDTO, value?.data, isAccountDTO))
        ]
    );
}

export function stringifyFacebookAccountListDTO ( value : FacebookAccountListDTO) : string {
    return `AccountListDTO(${value})`;
}

export function parseFacebookAccountListDTO ( value: unknown) : FacebookAccountListDTO | undefined {
    if (isFacebookAccountListDTO(value)) return value;
    return undefined;
}

export function isFacebookAccountListDTOOrUndefined ( value: unknown): value is FacebookAccountListDTO | undefined {
    return isUndefined(value) || isFacebookAccountListDTO(value);
}

export function explainFacebookAccountListDTOOrUndefined ( value: unknown): string {
    return isFacebookAccountListDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['AccountListDTO', 'undefined']));
}
