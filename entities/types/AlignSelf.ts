import { isUndefined } from "lodash";
import { isEnum, explainEnum, stringifyEnum, parseEnum } from "../../types/Enum";
import { explainOk, explainNot, explainOr } from "../../types/explain";

export enum AlignSelf {
    AUTO = "auto",
    FLEX_START = "flex-start",
    FLEX_END = "flex-end",
    CENTER = "center",
    BASELINE = "baseline",
    STRETCH = "stretch",
}

export function isAlignSelf (value: unknown) : value is AlignSelf {
    return isEnum(AlignSelf, value);
}

export function explainAlignSelf (value : unknown) : string {
    return explainEnum("AlignSelf", AlignSelf, isAlignSelf, value);
}

export function stringifyAlignSelf (value : AlignSelf) : string {
    return stringifyEnum(AlignSelf, value);
}

export function parseAlignSelf (value: any) : AlignSelf | undefined {
    return parseEnum(AlignSelf, value) as AlignSelf | undefined;
}

export function isAlignSelfOrUndefined (value: unknown): value is AlignSelf | undefined {
    return isUndefined(value) || isAlignSelf(value);
}

export function explainAlignSelfOrUndefined (value: unknown): string {
    return isAlignSelfOrUndefined(value) ? explainOk() : explainNot(explainOr(['AlignSelf', 'undefined']));
}