// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

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
    explainStringOrNull,
    isString,
    isStringOrNull,
} from "../../types/String";
import { isUndefined } from "../../types/undefined";

export interface MaventaSender {
    readonly eia: string | null;
    readonly bid: string | null;
    readonly name: string;
    readonly country: string;
}

export function createMaventaSender (
    name : string,
    country : string,
    eia : string | null,
    bid : string | null,
) : MaventaSender {
    return {
        eia,
        bid,
        name,
        country,
    };
}

export function isMaventaSender (value: unknown) : value is MaventaSender {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'eia',
            'bid',
            'name',
            'country',
        ])
        && isStringOrNull(value?.eia)
        && isStringOrNull(value?.bid)
        && isString(value?.name)
        && isString(value?.country)
    );
}

export function explainMaventaSender (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'eia',
                'bid',
                'name',
                'country',
            ])
            , explainProperty("eia", explainStringOrNull(value?.eia))
            , explainProperty("bid", explainStringOrNull(value?.bid))
            , explainProperty("name", explainString(value?.name))
            , explainProperty("country", explainString(value?.country))
        ]
    );
}

export function stringifyMaventaSender (value : MaventaSender) : string {
    return `MaventaSender(${value})`;
}

export function parseMaventaSender (value: unknown) : MaventaSender | undefined {
    if (isMaventaSender(value)) return value;
    return undefined;
}

export function isMaventaSenderOrUndefined (value: unknown): value is MaventaSender | undefined {
    return isUndefined(value) || isMaventaSender(value);
}

export function explainMaventaSenderOrUndefined (value: unknown): string {
    return isMaventaSenderOrUndefined(value) ? explainOk() : explainNot(explainOr(['MaventaSender', 'undefined']));
}
