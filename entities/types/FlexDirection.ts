import { isUndefined } from "lodash";
import { isEnum, explainEnum, stringifyEnum, parseEnum } from "../../types/Enum";
import { explainOk, explainNot, explainOr } from "../../types/explain";

export enum FlexDirection {
    ROW = "row",
    ROW_REVERSE = "row-reverse",
    COLUMN = "column",
    COLUMN_REVERSE = "column-reverse",
}

export function isFlexDirection (value: unknown) : value is FlexDirection {
    return isEnum(FlexDirection, value);
}

export function explainFlexDirection (value : unknown) : string {
    return explainEnum("FlexDirection", FlexDirection, isFlexDirection, value);
}

export function stringifyFlexDirection (value : FlexDirection) : string {
    return stringifyEnum(FlexDirection, value);
}

export function parseFlexDirection (value: any) : FlexDirection | undefined {
    return parseEnum(FlexDirection, value) as FlexDirection | undefined;
}

export function isFlexDirectionOrUndefined (value: unknown): value is FlexDirection | undefined {
    return isUndefined(value) || isFlexDirection(value);
}

export function explainFlexDirectionOrUndefined (value: unknown): string {
    return isFlexDirectionOrUndefined(value) ? explainOk() : explainNot(explainOr(['FlexDirection', 'undefined']));
}