import { isUndefined } from "lodash";
import { isEnum, explainEnum, stringifyEnum, parseEnum } from "../../types/Enum";
import { explainOk, explainNot, explainOr } from "../../types/explain";

export enum FlexWrap {
    NOWRAP = "nowrap",
    WRAP = "wrap",
    WRAP_REVERSE = "wrap-reverse",
}

export function isFlexWrap (value: unknown) : value is FlexWrap {
    return isEnum(FlexWrap, value);
}

export function explainFlexWrap (value : unknown) : string {
    return explainEnum("FlexWrap", FlexWrap, isFlexWrap, value);
}

export function stringifyFlexWrap (value : FlexWrap) : string {
    return stringifyEnum(FlexWrap, value);
}

export function parseFlexWrap (value: any) : FlexWrap | undefined {
    return parseEnum(FlexWrap, value) as FlexWrap | undefined;
}

export function isFlexWrapOrUndefined (value: unknown): value is FlexWrap | undefined {
    return isUndefined(value) || isFlexWrap(value);
}

export function explainFlexWrapOrUndefined (value: unknown): string {
    return isFlexWrapOrUndefined(value) ? explainOk() : explainNot(explainOr(['FlexWrap', 'undefined']));
}