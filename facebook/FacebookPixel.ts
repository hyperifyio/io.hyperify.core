// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Currency } from "../types/Currency";
import { FacebookPixelEvent } from "./types/FacebookPixelEvent";

export class FacebookPixel {

    public static getURL (
        pixelId: string,
        ev: FacebookPixelEvent,
    ) : string {
        return `https://www.facebook.com/tr?id=${pixelId}&ev=${ev}`;
    }

    public static getURLWithValue (
        pixelId: string,
        ev: FacebookPixelEvent,
        value: number,
        currency : Currency = Currency.EUR,
    ) : string {
        return `https://www.facebook.com/tr?id=${pixelId}&ev=${ev}&cd[currency]=${currency}&cd[value]=${value.toFixed(2)}`;
    }

    public static getPurchaseURL (
        pixelId: string,
        value: number,
        currency : Currency = Currency.EUR,
    ) : string {
        return `https://www.facebook.com/tr?id=${pixelId}&ev=${FacebookPixelEvent.Purchase}&cd[currency]=${currency}&cd[value]=${value.toFixed(2)}`;
    }

    public static getLeadURL (
        pixelId: string,
        value: number,
        currency : Currency = Currency.EUR,
    ) : string {
        return `https://www.facebook.com/tr?id=${pixelId}&ev=${FacebookPixelEvent.Lead}&cd[currency]=${currency}&cd[value]=${value.toFixed(2)}`;
    }

    public static getInitiateCheckoutURL (
        pixelId: string,
        value: number,
        currency : Currency = Currency.EUR,
    ) : string {
        return `https://www.facebook.com/tr?id=${pixelId}&ev=${FacebookPixelEvent.InitiateCheckout}&cd[currency]=${currency}&cd[value]=${value.toFixed(2)}`;
    }

    public static getViewContentURL (
        pixelId: string,
        value: number,
        currency : Currency = Currency.EUR,
    ) : string {
        return `https://www.facebook.com/tr?id=${pixelId}&ev=${FacebookPixelEvent.ViewContent}&cd[currency]=${currency}&cd[value]=${value.toFixed(2)}`;
    }

    public static getAddToCartURL (
        pixelId: string,
        value: number,
        currency : Currency = Currency.EUR,
    ) : string {
        return `https://www.facebook.com/tr?id=${pixelId}&ev=${FacebookPixelEvent.AddToCart}&cd[currency]=${currency}&cd[value]=${value.toFixed(2)}`;
    }

}
