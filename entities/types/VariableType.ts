// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

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

export enum VariableType {
    JSON = "json",
    STRING = "string",
    NUMBER = "number",
    INTEGER = "integer",
    BOOLEAN = "boolean",
    NULL = "null",
    UNDEFINED = "undefined",
}

export function isVariableType (value: unknown) : value is VariableType {
    return isEnum(VariableType, value);
}

export function explainVariableType (value : unknown) : string {
    return explainEnum("VariableType", VariableType, isVariableType, value);
}

export function stringifyVariableType (value : VariableType) : string {
    return stringifyEnum(VariableType, value);
}

export function parseVariableType (value: any) : VariableType | undefined {
    return parseEnum(VariableType, value) as VariableType | undefined;
}

export function isVariableTypeOrUndefined (value: unknown): value is VariableType | undefined {
    return isUndefined(value) || isVariableType(value);
}

export function explainVariableTypeOrUndefined (value: unknown): string {
    return isVariableTypeOrUndefined(value) ? explainOk() : explainNot(explainOr(['VariableType', 'undefined']));
}
