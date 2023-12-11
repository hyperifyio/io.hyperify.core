// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isReadonlyJsonObjectOrUndefined, ReadonlyJsonObject } from "../Json";
import { explain, explainNot, explainOk, explainOr, explainProperty } from "../types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../types/RegularObject";
import { explainString, isString } from "../types/String";
import { isUndefined } from "../types/undefined";
import { DTO } from "./types/DTO";

export interface ActionDTO extends DTO {

    /**
     * Label of the action
     */
    readonly label: string;

    /**
     * The target for the action, e.g. URL.
     */
    readonly target: string;

    /**
     * The HTTP method to use, e.g. "POST"
     */
    readonly method: string;

    /**
     * The HTTP request body to use for the request.
     *
     * If this value is not provided, and this action was a chained action from
     * a success or an error handler, the response body from the previous action
     * will be used instead.
     */
    readonly body ?: ReadonlyJsonObject | undefined;

    /**
     * The action when the response was successful.
     *
     * Defaults to redirection to another view or resource if a string is provided.
     *
     * If `HyperAction` is provided, will perform another action. See the body
     * property. The response from the first action will be provided as the body
     * for this action if the success action does not define one.
     */
    readonly successRedirect ?: string | ActionDTO | undefined;

    /**
     * The action when the response was unsuccessful.
     *
     * Defaults to redirection to another view or resource if a string is provided.
     *
     * If `HyperAction` is provided, will perform another action. See the body
     * property. The response from the first action will be provided as the body
     * for this action if the success action does not define one.
     */
    readonly errorRedirect ?: string | ActionDTO | undefined;

}

export function createActionDTO (
    label : string,
    target : string,
    method : string,
    body : ReadonlyJsonObject | undefined,
    successRedirect : string | ActionDTO | undefined,
    errorRedirect : string | ActionDTO | undefined,
) : ActionDTO {
    return {
        label,
        target,
        method,
        ...(body !== undefined ? {body} : {}),
        ...(successRedirect !== undefined ? {successRedirect} : {}),
        ...(errorRedirect !== undefined ? {errorRedirect} : {}),
    };
}

export function isActionDTO (value: unknown) : value is ActionDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'label',
            'target',
            'method',
            'body',
            'successRedirect',
            'errorRedirect',
        ])
        && isString(value?.label)
        && isString(value?.target)
        && isString(value?.method)
        && isReadonlyJsonObjectOrUndefined(value?.body)
        && isActionDTOOrStringOrUndefined(value?.successRedirect)
        && isActionDTOOrStringOrUndefined(value?.errorRedirect)
    );
}

export function explainActionDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'label',
                'target',
                'method',
                'body',
                'successRedirect',
                'errorRedirect',
            ])
            , explainProperty("label", explainString(value?.label))
            , explainProperty("target", explainString(value?.target))
            , explainProperty("method", explainString(value?.method))
            , explainProperty("body", explainString(value?.body))
            , explainProperty("successRedirect", explainActionDTOOrStringOrUndefined(value?.successRedirect))
            , explainProperty("errorRedirect", explainActionDTOOrStringOrUndefined(value?.errorRedirect))
        ]
    );
}

export function stringifyActionDTO (value : ActionDTO) : string {
    return `HyperAction(${value})`;
}

export function parseActionDTO (value: unknown) : ActionDTO | undefined {
    if (isActionDTO(value)) return value;
    return undefined;
}

export function isActionDTOOrUndefined (value: unknown): value is ActionDTO | undefined {
    return isUndefined(value) || isActionDTO(value);
}

export function explainActionDTOOrUndefined (value: unknown): string {
    return isActionDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['HyperAction', 'undefined']));
}

export function isActionDTOOrStringOrUndefined (value: unknown): value is string | ActionDTO | undefined {
    return isUndefined(value) || isString(value) || isActionDTO(value);
}

export function explainActionDTOOrStringOrUndefined (value: unknown): string {
    return isActionDTOOrStringOrUndefined(value) ? explainOk() : explainNot(explainOr(['HyperAction', 'undefined', 'string']));
}

export function isActionDTOOrString (value: unknown): value is ActionDTO | string {
    return isString(value) || isActionDTO(value);
}

export function explainActionDTOOrString (value: unknown): string {
    return isActionDTOOrString(value) ? explainOk() : explainNot(explainOr(['HyperAction', 'string']));
}
