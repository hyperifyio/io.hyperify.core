// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explainEnum,
    isEnum,
    parseEnum,
    stringifyEnum,
} from "../../../../types/Enum";
import {
    explainNot,
    explainOk,
    explainOr,
} from "../../../../types/explain";
import { isUndefined } from "../../../../types/undefined";

export enum PHPVersion {
    PHP_5_2 = "PHP_5_2",
    PHP_5_3 = "PHP_5_3",
    PHP_5_4 = "PHP_5_4",
    PHP_5_5 = "PHP_5_5",
    PHP_5_6 = "PHP_5_6",
    PHP_7_0 = "PHP_7_0",
    PHP_7_1 = "PHP_7_1",
    PHP_7_2 = "PHP_7_2",
    PHP_7_3 = "PHP_7_3",
    PHP_7_4 = "PHP_7_4",
    PHP_8_0 = "PHP_8_0",
    PHP_8_1 = "PHP_8_1",
    PHP_8_2 = "PHP_8_2",
    PHP_8_3 = "PHP_8_3",
}

export function isPHPVersion (value: unknown) : value is PHPVersion {
    return isEnum(PHPVersion, value);
}

export function explainPHPVersion (value : unknown) : string {
    return explainEnum("PHPVersion", PHPVersion, isPHPVersion, value);
}

export function stringifyPHPVersion (value : PHPVersion) : string {
    return stringifyEnum(PHPVersion, value);
}

export function parsePHPVersion (value: any) : PHPVersion | undefined {
    return parseEnum(PHPVersion, value) as PHPVersion | undefined;
}

export function isPHPVersionOrUndefined (value: unknown): value is PHPVersion | undefined {
    return isUndefined(value) || isPHPVersion(value);
}

export function explainPHPVersionOrUndefined (value: unknown): string {
    return isPHPVersionOrUndefined(value) ? explainOk() : explainNot(explainOr(['PHPVersion', 'undefined']));
}
