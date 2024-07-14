// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explainEnum,
    isEnum,
    parseEnum,
    stringifyEnum,
} from "../../types/Enum";
import {
    explainNot,
    explainOk,
    explainOr,
} from "../../types/explain";
import { isUndefined } from "../../types/undefined";

export enum MaventaDirection {
    SENT = "SENT",
    RECEIVED = "RECEIVED",
}

export function isMaventaDirection (value: unknown) : value is MaventaDirection {
    return isEnum(MaventaDirection, value);
}

export function explainMaventaDirection (value : unknown) : string {
    return explainEnum("MaventaDirection", MaventaDirection, isMaventaDirection, value);
}

export function stringifyMaventaDirection (value : MaventaDirection) : string {
    return stringifyEnum(MaventaDirection, value);
}

export function parseMaventaDirection (value: any) : MaventaDirection | undefined {
    return parseEnum(MaventaDirection, value) as MaventaDirection | undefined;
}

export function isMaventaDirectionOrUndefined (value: unknown): value is MaventaDirection | undefined {
    return isUndefined(value) || isMaventaDirection(value);
}

export function explainMaventaDirectionOrUndefined (value: unknown): string {
    return isMaventaDirectionOrUndefined(value) ? explainOk() : explainNot(explainOr(['MaventaDirection', 'undefined']));
}
