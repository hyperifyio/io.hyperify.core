// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    explainReadonlyJsonObject,
    isReadonlyJsonObject,
    ReadonlyJsonAny,
} from "../../Json";
import {
    explain,
    explainNot,
    explainOk,
    explainOr,
} from "../../types/explain";
import { isUndefined } from "../../types/undefined";

export interface MaventaRevisionObject {
    readonly [key : string] : ReadonlyJsonAny;
}

export function isMaventaRevisionObject (value: unknown) : value is MaventaRevisionObject {
    return (
        isReadonlyJsonObject(value)
    );
}

export function explainMaventaRevisionObject (value: any) : string {
    return explain(
        [
            explainReadonlyJsonObject(value),
        ]
    );
}

export function stringifyMaventaRevisionObject (value : MaventaRevisionObject) : string {
    return `MaventaRevisionObject(${value})`;
}

export function parseMaventaRevisionObject (value: unknown) : MaventaRevisionObject | undefined {
    if (isMaventaRevisionObject(value)) return value;
    return undefined;
}

export function isMaventaRevisionObjectOrUndefined (value: unknown): value is MaventaRevisionObject | undefined {
    return isUndefined(value) || isMaventaRevisionObject(value);
}

export function explainMaventaRevisionObjectOrUndefined (value: unknown): string {
    return isMaventaRevisionObjectOrUndefined(value) ? explainOk() : explainNot(explainOr(['MaventaRevisionObject', 'undefined']));
}
