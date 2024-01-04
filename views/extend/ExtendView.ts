// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainString, isString } from "../../types/String";
import { isUndefined } from "../../types/undefined";

/**
 * View to redirect the frontend to another view or URL.
 *
 * This is required since the frontend usually cannot detect the Location HTTP
 * header, e.g. the HTTP client library already implements the redirection.
 */
export interface ExtendView {
    readonly extend: string;
}

export function createExtendView (
    extend : string
) : ExtendView {
    return {
        extend
    };
}

export function isExtendView ( value: unknown) : value is ExtendView {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'extend',
        ])
        && isString(value?.extend)
    );
}

export function explainExtendView (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'extend',
            ])
            , explainProperty("extend", explainString(value?.extend))
        ]
    );
}

export function stringifyExtendView (value : ExtendView) : string {
    return `ExtendView(${value})`;
}

export function parseExtendView (value: unknown) : ExtendView | undefined {
    if (isExtendView(value)) return value;
    return undefined;
}

export function isExtendViewOrUndefined ( value: unknown): value is ExtendView | undefined {
    return isUndefined(value) || isExtendView(value);
}

export function explainExtendViewOrUndefined (value: unknown): string {
    return isExtendViewOrUndefined(value) ? explainOk() : explainNot(explainOr(['ExtendView', 'undefined']));
}
