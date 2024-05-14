// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explainReadonlyJsonAny,
    isReadonlyJsonAny,
    ReadonlyJsonAny,
} from "../../Json";
import {
    explainArrayOf,
    isArrayOf,
} from "../../types/Array";
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
    explainFacebookAdAccountDTO,
    FacebookAdAccountDTO,
    isFacebookAdAccountDTO,
} from "./FacebookAdAccountDTO";
import {
    explainFacebookPagingDTO,
    FacebookPagingDTO,
    isFacebookPagingDTO,
} from "./FacebookPagingDTO";

export interface FacebookAdAccountListDTO {
    readonly data    : readonly FacebookAdAccountDTO[];
    readonly paging  : FacebookPagingDTO;
    readonly summary : ReadonlyJsonAny;
}

export function isFacebookAdAccountListDTO (value: unknown) : value is FacebookAdAccountListDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'data',
            'paging',
            'summary',
        ])
        && isArrayOf<FacebookAdAccountDTO>(value?.data, isFacebookAdAccountDTO)
        && isFacebookPagingDTO(value?.paging)
        && isReadonlyJsonAny(value?.summary)
    );
}

export function explainFacebookAdAccountListDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'data',
                'paging',
                'summary',
            ])
            , explainProperty("data", explainArrayOf<FacebookAdAccountDTO>("FacebookAdAccountDTO", explainFacebookAdAccountDTO, value?.data, isFacebookAdAccountDTO))
            , explainProperty("paging", explainFacebookPagingDTO(value?.paging))
            , explainProperty("summary", explainReadonlyJsonAny(value?.summary))
        ]
    );
}

export function stringifyFacebookAdAccountListDTO (value : FacebookAdAccountListDTO) : string {
    return `FacebookAdAccountListDTO(${value})`;
}

export function parseFacebookAdAccountListDTO (value: unknown) : FacebookAdAccountListDTO | undefined {
    if (isFacebookAdAccountListDTO(value)) return value;
    return undefined;
}

export function isFacebookAdAccountListDTOOrUndefined (value: unknown): value is FacebookAdAccountListDTO | undefined {
    return isUndefined(value) || isFacebookAdAccountListDTO(value);
}

export function explainFacebookAdAccountListDTOOrUndefined (value: unknown): string {
    return isFacebookAdAccountListDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['FacebookAdAccountListDTO', 'undefined']));
}
