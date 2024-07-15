// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

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

export enum MaventaReturnFormat {
    VISMAXML60 = "VISMAXML60",
    PEPPOLBIS30 = "PEPPOLBIS30",
    SIUBL20 = "SIUBL20",
    OIOUBL21 = "OIOUBL21",
    VISMAUBL30 = "VISMAUBL30",
    FINVOICE30 = "FINVOICE30",
    TEAPPS30 = "TEAPPS30",
    ORIGINAL_IMAGE = "ORIGINAL_IMAGE",
    GENERATED_IMAGE = "GENERATED_IMAGE",
    ORIGINAL_OR_GENERATED_IMAGE = "ORIGINAL_OR_GENERATED_IMAGE",
    EXTENDED_DETAILS = "EXTENDED_DETAILS",
}

export function isMaventaReturnFormat (value: unknown) : value is MaventaReturnFormat {
    return isEnum(MaventaReturnFormat, value);
}

export function explainMaventaReturnFormat (value : unknown) : string {
    return explainEnum("MaventaReturnFormat", MaventaReturnFormat, isMaventaReturnFormat, value);
}

export function stringifyMaventaReturnFormat (value : MaventaReturnFormat) : string {
    return stringifyEnum(MaventaReturnFormat, value);
}

export function parseMaventaReturnFormat (value: any) : MaventaReturnFormat | undefined {
    return parseEnum(MaventaReturnFormat, value) as MaventaReturnFormat | undefined;
}

export function isMaventaReturnFormatOrUndefined (value: unknown): value is MaventaReturnFormat | undefined {
    return isUndefined(value) || isMaventaReturnFormat(value);
}

export function explainMaventaReturnFormatOrUndefined (value: unknown): string {
    return isMaventaReturnFormatOrUndefined(value) ? explainOk() : explainNot(explainOr(['MaventaReturnFormat', 'undefined']));
}
