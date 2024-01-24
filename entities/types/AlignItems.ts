import { isUndefined } from "lodash";
import { isEnum, explainEnum, stringifyEnum, parseEnum } from "../../types/Enum";
import { explainOk, explainNot, explainOr } from "../../types/explain";

export enum AlignItems {
    STRETCH = "stretch",
    FLEX_START = "flex-start",
    FLEX_END = "flex-end",
    CENTER = "center",
    BASELINE = "baseline",
    FIRST_BASELINE = "first baseline",
    LAST_BASELINE = "last baseline",
    START = "start",
    END = "end",
    SELF_START = "self-start",
    SELF_END = "self-end"
}

export function isAlignItems (value: unknown) : value is AlignItems {
    return isEnum(AlignItems, value);
}

export function explainAlignItems (value : unknown) : string {
    return explainEnum("AlignItems", AlignItems, isAlignItems, value);
}

export function stringifyAlignItems (value : AlignItems) : string {
    return stringifyEnum(AlignItems, value);
}

export function parseAlignItems (value: any) : AlignItems | undefined {
    return parseEnum(AlignItems, value) as AlignItems | undefined;
}

export function isAlignItemsOrUndefined (value: unknown): value is AlignItems | undefined {
    return isUndefined(value) || isAlignItems(value);
}

export function explainAlignItemsOrUndefined (value: unknown): string {
    return isAlignItemsOrUndefined(value) ? explainOk() : explainNot(explainOr(['AlignItems', 'undefined']));
}