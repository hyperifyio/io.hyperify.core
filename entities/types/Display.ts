import { isUndefined } from "lodash";
import { isEnum, explainEnum, stringifyEnum, parseEnum } from "../../types/Enum";
import { explainOk, explainNot, explainOr } from "../../types/explain";

export enum Display {
    FLEX = 'flex'
}

export function isDisplay (value: unknown) : value is Display {
    return isEnum(Display, value);
}

export function explainDisplay (value : unknown) : string {
    return explainEnum("Display", Display, isDisplay, value);
}

export function stringifyDisplay (value : Display) : string {
    return stringifyEnum(Display, value);
}

export function parseDisplay (value: any) : Display | undefined {
    return parseEnum(Display, value) as Display | undefined;
}

export function isDisplayOrUndefined (value: unknown): value is Display | undefined {
    return isUndefined(value) || isDisplay(value);
}

export function explainDisplayOrUndefined (value: unknown): string {
    return isDisplayOrUndefined(value) ? explainOk() : explainNot(explainOr(['Display', 'undefined']));
}