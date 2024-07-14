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

export interface MaventaAction {
    readonly type: string;
    readonly channel: string;
    readonly message: string | null;
    readonly key: string | null;
    readonly happened_at: string;
}

export function createMaventaAction (
    type : string,
    channel : string,
    message : string | null,
    key : string | null,
    happened_at : string,
) : MaventaAction {
    return {
        type,
        channel,
        message,
        key,
        happened_at,
    };
}

export function isMaventaAction (value: unknown) : value is MaventaAction {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'type',
            'channel',
            'message',
            'key',
            'happened_at',
        ])
        && isString(value?.type)
        && isString(value?.channel)
        && isStringOrNull(value?.message)
        && isStringOrNull(value?.key)
        && isString(value?.happened_at)
    );
}

export function explainMaventaAction (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'type',
                'channel',
                'message',
                'key',
                'happened_at',
            ])
            , explainProperty("type", explainString(value?.type))
            , explainProperty("channel", explainString(value?.channel))
            , explainProperty("message", explainStringOrNull(value?.message))
            , explainProperty("key", explainStringOrNull(value?.key))
            , explainProperty("happened_at", explainString(value?.happened_at))
        ]
    );
}

export function stringifyMaventaAction (value : MaventaAction) : string {
    return `MaventaAction(${value})`;
}

export function parseMaventaAction (value: unknown) : MaventaAction | undefined {
    if (isMaventaAction(value)) return value;
    return undefined;
}

export function isMaventaActionOrUndefined (value: unknown): value is MaventaAction | undefined {
    return isUndefined(value) || isMaventaAction(value);
}

export function explainMaventaActionOrUndefined (value: unknown): string {
    return isMaventaActionOrUndefined(value) ? explainOk() : explainNot(explainOr(['MaventaAction', 'undefined']));
}
