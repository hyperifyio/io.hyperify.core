// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explainArrayOf,
    isArrayOf,
} from "../../types/Array";
import {
    FacebookPageDTO,
    explainAccountDTO,
    isAccountDTO,
} from "./FacebookPageDTO";
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
import {
    explainFacebookPagingDTO,
    FacebookPagingDTO,
    isFacebookPagingDTO,
} from "./FacebookPagingDTO";

export interface FacebookAccountListDTO {
    readonly data   : readonly FacebookPageDTO[];
    readonly paging : FacebookPagingDTO;
}

export function createFacebookAccountListDTO (
    data : readonly FacebookPageDTO[],
    paging : FacebookPagingDTO,
) : FacebookAccountListDTO {
    return {
        data,
        paging,
    };
}

export function isFacebookAccountListDTO ( value: unknown) : value is FacebookAccountListDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'data',
            'paging',
        ])
        && isArrayOf<FacebookPageDTO>(value?.data, isAccountDTO)
        && isFacebookPagingDTO(value?.paging)
    );
}

export function explainFacebookAccountListDTO ( value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'data',
                'paging',
            ])
            , explainProperty("data", explainArrayOf<FacebookPageDTO>("AccountDTO", explainAccountDTO, value?.data, isAccountDTO))
            , explainProperty("paging", explainFacebookPagingDTO(value?.paging))
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
