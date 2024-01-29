import { isUndefined } from "lodash";
import { isEnum, explainEnum, stringifyEnum, parseEnum } from "../../types/Enum";
import { explainOk, explainNot, explainOr } from "../../types/explain";

export enum AlignContent {
    FLEX_START = "flex-start",
    FLEX_END = "flex-end",
    CENTER = "center",
    SPACE_BETWEEN = "space-between",
    SPACE_AROUND = "space-around",
    SPACE_EVENLY = "space-evenly",
    STRETCH = "stretch",
    START = "start",
    END = "end",
    BASELINE = "baseline",
    FIRST_BASELINE = "first baseline",
    LAST_BASELINE = "last baseline",
}

export function isAlignContent (value: unknown) : value is AlignContent {
    return isEnum(AlignContent, value);
}

export function explainAlignContent (value : unknown) : string {
    return explainEnum("AlignContent", AlignContent, isAlignContent, value);
}

export function stringifyAlignContent (value : AlignContent) : string {
    return stringifyEnum(AlignContent, value);
}

export function parseAlignContent (value: any) : AlignContent | undefined {
    return parseEnum(AlignContent, value) as AlignContent | undefined;
}

export function isAlignContentOrUndefined (value: unknown): value is AlignContent | undefined {
    return isUndefined(value) || isAlignContent(value);
}

export function explainAlignContentOrUndefined (value: unknown): string {
    return isAlignContentOrUndefined(value) ? explainOk() : explainNot(explainOr(['AlignContent', 'undefined']));
}