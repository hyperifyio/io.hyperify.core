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
    isString,
} from "../../types/String";
import { isUndefined } from "../../types/undefined";

export interface MaventaFile {
    readonly id: string;
    readonly filename: string;
    readonly type: string;
    readonly mimetype: string;
    readonly href: string;
}

export function createMaventaFile (
    id : string,
    filename : string,
    type : string,
    mimetype : string,
    href : string,
) : MaventaFile {
    return {
        id,
        filename,
        type,
        mimetype,
        href,
    };
}

export function isMaventaFile (value: unknown) : value is MaventaFile {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'id',
            'filename',
            'type',
            'mimetype',
            'href',
        ])
        && isString(value?.id)
        && isString(value?.filename)
        && isString(value?.type)
        && isString(value?.mimetype)
        && isString(value?.href)
    );
}

export function explainMaventaFile (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'id',
                'filename',
                'type',
                'mimetype',
                'href',
            ])
            , explainProperty("id", explainString(value?.id))
            , explainProperty("filename", explainString(value?.filename))
            , explainProperty("type", explainString(value?.type))
            , explainProperty("mimetype", explainString(value?.mimetype))
            , explainProperty("href", explainString(value?.href))
        ]
    );
}

export function stringifyMaventaFile (value : MaventaFile) : string {
    return `MaventaFile(${value})`;
}

export function parseMaventaFile (value: unknown) : MaventaFile | undefined {
    if (isMaventaFile(value)) return value;
    return undefined;
}

export function isMaventaFileOrUndefined (value: unknown): value is MaventaFile | undefined {
    return isUndefined(value) || isMaventaFile(value);
}

export function explainMaventaFileOrUndefined (value: unknown): string {
    return isMaventaFileOrUndefined(value) ? explainOk() : explainNot(explainOr(['MaventaFile', 'undefined']));
}
