// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
import { DTO } from "../types/DTO";

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

