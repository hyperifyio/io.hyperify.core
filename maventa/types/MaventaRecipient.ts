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

export interface MaventaRecipient {
    readonly name: string;
    readonly country: string | null;
    readonly operator: string | null;
    readonly eia: string | null;
    readonly bid: string | null;
}

export function createMaventaRecipient (
    name : string,
    country : string | null,
    operator : string | null,
    eia : string | null,
    bid : string | null,
) : MaventaRecipient {
    return {
        name,
        country,
        operator,
        eia,
        bid,
    };
}

export function isMaventaRecipient (value: unknown) : value is MaventaRecipient {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'name',
            'country',
            'operator',
            'eia',
            'bid',
        ])
        && isString(value?.name)
        && isStringOrNull(value?.country)
        && isStringOrNull(value?.operator)
        && isStringOrNull(value?.eia)
        && isStringOrNull(value?.bid)
    );
}

export function explainMaventaRecipient (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'name',
                'country',
                'operator',
                'eia',
                'bid',
            ])
            , explainProperty("name", explainString(value?.name))
            , explainProperty("country", explainStringOrNull(value?.country))
            , explainProperty("operator", explainStringOrNull(value?.operator))
            , explainProperty("eia", explainStringOrNull(value?.eia))
            , explainProperty("bid", explainStringOrNull(value?.bid))
        ]
    );
}

export function stringifyMaventaRecipient (value : MaventaRecipient) : string {
    return `MaventaRecipient(${value})`;
}

export function parseMaventaRecipient (value: unknown) : MaventaRecipient | undefined {
    if (isMaventaRecipient(value)) return value;
    return undefined;
}

export function isMaventaRecipientOrUndefined (value: unknown): value is MaventaRecipient | undefined {
    return isUndefined(value) || isMaventaRecipient(value);
}

export function explainMaventaRecipientOrUndefined (value: unknown): string {
    return isMaventaRecipientOrUndefined(value) ? explainOk() : explainNot(explainOr(['MaventaRecipient', 'undefined']));
}
