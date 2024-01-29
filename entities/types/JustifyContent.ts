import { isUndefined } from "lodash";
import { isEnum, explainEnum, stringifyEnum, parseEnum } from "../../types/Enum";
import { explainOk, explainNot, explainOr } from "../../types/explain";

export enum JustifyContent {
    FLEX_START = "flex-start",
    FLEX_END = "flex-end",
    CENTER = "center",
    SPACE_BETWEEN = "space-between",
    SPACE_AROUND = "space-around",
    SPACE_EVENLY = "space-evenly",
    START = "start",
    END = "end",
    LEFT = "left",
    RIGHT = "right",
}

export function isJustifyContent (value: unknown) : value is JustifyContent {
    return isEnum(JustifyContent, value);
}

export function explainJustifyContent (value : unknown) : string {
    return explainEnum("JustifyContent", JustifyContent, isJustifyContent, value);
}

export function stringifyJustifyContent (value : JustifyContent) : string {
    return stringifyEnum(JustifyContent, value);
}

export function parseJustifyContent (value: any) : JustifyContent | undefined {
    return parseEnum(JustifyContent, value) as JustifyContent | undefined;
}

export function isJustifyContentOrUndefined (value: unknown): value is JustifyContent | undefined {
    return isUndefined(value) || isJustifyContent(value);
}

export function explainJustifyContentOrUndefined (value: unknown): string {
    return isJustifyContentOrUndefined(value) ? explainOk() : explainNot(explainOr(['JustifyContent', 'undefined']));
}