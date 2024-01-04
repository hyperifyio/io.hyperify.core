// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../types/Enum";
import { explainNot, explainOk, explainOr } from "../../types/explain";
import { isUndefined } from "../../types/undefined";

export enum BackgroundOrigin {

    /**
     * The background is positioned relative to the border box.
     */
    BORDER_BOX = "border-box",

    /**
     * The background is positioned relative to the padding box.
     */
    PADDING_BOX = "padding-box",

    /**
     * The background is positioned relative to the content box.
     */
    CONTENT_BOX = "content-box",

    INHERIT = "inherit",
    INITIAL = "initial",
    REVERT = "revert",
    REVERT_LAYER = "revert-layer",
    UNSET = "unset",
}

export function isBackgroundOrigin (value: unknown) : value is BackgroundOrigin {
    return isEnum(BackgroundOrigin, value);
}

export function explainBackgroundOrigin (value : unknown) : string {
    return explainEnum("BackgroundOrigin", BackgroundOrigin, isBackgroundOrigin, value);
}

export function stringifyBackgroundOrigin (value : BackgroundOrigin) : string {
    return stringifyEnum(BackgroundOrigin, value);
}

export function parseBackgroundOrigin (value: any) : BackgroundOrigin | undefined {
    return parseEnum(BackgroundOrigin, value) as BackgroundOrigin | undefined;
}

export function isBackgroundOriginOrUndefined (value: unknown): value is BackgroundOrigin | undefined {
    return isUndefined(value) || isBackgroundOrigin(value);
}

export function explainBackgroundOriginOrUndefined (value: unknown): string {
    return isBackgroundOriginOrUndefined(value) ? explainOk() : explainNot(explainOr(['BackgroundOrigin', 'undefined']));
}
