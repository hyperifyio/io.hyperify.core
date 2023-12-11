// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../types/Enum";
import { explainNot, explainOk, explainOr } from "../../types/explain";
import { isUndefined } from "../../types/undefined";

export enum BackgroundAttachment {
    SCROLL = "scroll",
    FIXED = "fixed",
    LOCAL = "local",
    INHERIT = "inherit",
    INITIAL = "initial",
    REVERT = "revert",
    REVERT_LAYER = "revert-layer",
    UNSET = "unset",
}

export function isBackgroundAttachment (value: unknown) : value is BackgroundAttachment {
    return isEnum(BackgroundAttachment, value);
}

export function explainBackgroundAttachment (value : unknown) : string {
    return explainEnum("BackgroundAttachment", BackgroundAttachment, isBackgroundAttachment, value);
}

export function stringifyBackgroundAttachment (value : BackgroundAttachment) : string {
    return stringifyEnum(BackgroundAttachment, value);
}

export function parseBackgroundAttachment (value: any) : BackgroundAttachment | undefined {
    return parseEnum(BackgroundAttachment, value) as BackgroundAttachment | undefined;
}

export function isBackgroundAttachmentOrUndefined (value: unknown): value is BackgroundAttachment | undefined {
    return isUndefined(value) || isBackgroundAttachment(value);
}

export function explainBackgroundAttachmentOrUndefined (value: unknown): string {
    return isBackgroundAttachmentOrUndefined(value) ? explainOk() : explainNot(explainOr(['BackgroundAttachment', 'undefined']));
}
