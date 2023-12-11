// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../types/Enum";
import { explainNot, explainOk, explainOr } from "../../types/explain";
import { isUndefined } from "../../types/undefined";

export enum BackgroundClip {

    /**
     * The background extends to the outside edge of the border (but underneath
     * the border in z-ordering).
     */
    BORDER_BOX = "border-box",

    /**
     * The background extends to the outside edge of the padding. No background
     * is drawn beneath the border.
     */
    PADDING_BOX = "padding-box",

    /**
     * The background is painted within (clipped to) the content box.
     */
    CONTENT_BOX = "content-box",

    /**
     * The background is painted within (clipped to) the foreground text.
     */
    TEXT = "text",
    INHERIT = "inherit",
    INITIAL = "initial",
    REVERT = "revert",
    REVERT_LAYER = "revert-layer",
    UNSET = "unset",
}

export function isBackgroundClip (value: unknown) : value is BackgroundClip {
    return isEnum(BackgroundClip, value);
}

export function explainBackgroundClip (value : unknown) : string {
    return explainEnum("BackgroundClip", BackgroundClip, isBackgroundClip, value);
}

export function stringifyBackgroundClip (value : BackgroundClip) : string {
    return stringifyEnum(BackgroundClip, value);
}

export function parseBackgroundClip (value: any) : BackgroundClip | undefined {
    return parseEnum(BackgroundClip, value) as BackgroundClip | undefined;
}

export function isBackgroundClipOrUndefined (value: unknown): value is BackgroundClip | undefined {
    return isUndefined(value) || isBackgroundClip(value);
}

export function explainBackgroundClipOrUndefined (value: unknown): string {
    return isBackgroundClipOrUndefined(value) ? explainOk() : explainNot(explainOr(['BackgroundClip', 'undefined']));
}
