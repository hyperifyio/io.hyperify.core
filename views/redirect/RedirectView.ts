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
export interface RedirectView {
    readonly location: string;
}

export function createRedirectView (
    location : string
) : RedirectView {
    return {
        location
    };
}

export function isRedirectView ( value: unknown) : value is RedirectView {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'location',
        ])
        && isString(value?.location)
    );
}

export function explainRedirectView (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'location',
            ])
            , explainProperty("location", explainString(value?.location))
        ]
    );
}

export function stringifyRedirectView (value : RedirectView) : string {
    return `RedirectView(${value})`;
}

export function parseRedirectView (value: unknown) : RedirectView | undefined {
    if (isRedirectView(value)) return value;
    return undefined;
}

export function isRedirectViewOrUndefined ( value: unknown): value is RedirectView | undefined {
    return isUndefined(value) || isRedirectView(value);
}

export function explainRedirectViewOrUndefined (value: unknown): string {
    return isRedirectViewOrUndefined(value) ? explainOk() : explainNot(explainOr(['RedirectView', 'undefined']));
}
