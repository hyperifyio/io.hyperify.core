// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explainEnum,
    isEnum,
    parseEnum,
    stringifyEnum,
} from "../../types/Enum";
import {
    explainNot,
    explainOk,
    explainOr,
} from "../../types/explain";
import { isUndefined } from "../../types/undefined";

export enum FacebookPixelEvent {
    AddPaymentInfo = "ADD_PAYMENT_INFO",
    AddToCart = "ADD_TO_CART",
    CompleteRegistration = "COMPLETE_REGISTRATION",
    InitiateCheckout = "INITIATE_CHECKOUT",
    Lead = "LEAD",
    Purchase = "PURCHASE",
    Schedule = "SCHEDULE",
    Search = "SEARCH",
    StartTrial = "START_TRIAL",
    SubmitApplication = "SUBMIT_APPLICATION",
    Subscribe = "SUBSCRIBE",
    ViewContent = "VIEW_CONTENT",
}

export function isFacebookPixelEvent (value: unknown) : value is FacebookPixelEvent {
    return isEnum(FacebookPixelEvent, value);
}

export function explainFacebookPixelEvent (value : unknown) : string {
    return explainEnum("FacebookPixelEvent", FacebookPixelEvent, isFacebookPixelEvent, value);
}

export function stringifyFacebookPixelEvent (value : FacebookPixelEvent) : string {
    return stringifyEnum(FacebookPixelEvent, value);
}

export function parseFacebookPixelEvent (value: any) : FacebookPixelEvent | undefined {
    return parseEnum(FacebookPixelEvent, value) as FacebookPixelEvent | undefined;
}

export function isFacebookPixelEventOrUndefined (value: unknown): value is FacebookPixelEvent | undefined {
    return isUndefined(value) || isFacebookPixelEvent(value);
}

export function explainFacebookPixelEventOrUndefined (value: unknown): string {
    return isFacebookPixelEventOrUndefined(value) ? explainOk() : explainNot(explainOr(['FacebookPixelEvent', 'undefined']));
}
