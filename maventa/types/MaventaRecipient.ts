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
    readonly country: string;
    readonly operator: string | null;
}

export function createMaventaRecipient (
    name : string,
    country : string,
    operator : string | null,
) : MaventaRecipient {
    return {
        name,
        country,
        operator,
    };
}

export function isMaventaRecipient (value: unknown) : value is MaventaRecipient {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'name',
            'country',
            'operator',
        ])
        && isString(value?.name)
        && isString(value?.country)
        && isStringOrNull(value?.operator)
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
            ])
            , explainProperty("name", explainString(value?.name))
            , explainProperty("country", explainString(value?.country))
            , explainProperty("operator", explainStringOrNull(value?.operator))
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
