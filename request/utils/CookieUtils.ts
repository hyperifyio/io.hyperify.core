// Copyright (c) 2023-2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { indexOf } from "../../functions/indexOf";
import { map } from "../../functions/map";
import { reduce } from "../../functions/reduce";
import { split } from "../../functions/split";
import { LogUtils } from "../../LogUtils";
import { Cookie } from "../types/Cookie";
import { CookieLike } from "../types/CookieLike";
import { isArray } from "../../types/Array";

export class CookieUtils {

    public static parseCookies (
        value: string | readonly string[]
    ) : CookieLike[] {
        return map(
            reduce(
                isArray(value) ? value : [value],
                (ret: string[], item: string) : string[] => {
                    return [
                        ...ret,
                        ...split(item, /; */),
                    ];
                },
                []
            ),
            (item: string) : CookieLike => {
                const i : number = indexOf(item, '=');
                if (i < 0) {
                    return Cookie.create(
                        item,
                        undefined,
                        undefined,
                    );
                }
                const key : string = item.substring(0, i);
                const value : string = item.substring(i+1);
                return Cookie.create(
                    key,
                    value,
                    undefined,
                );
            }
        );
    }

    /**
     * Stringifies a cookie.
     *
     * This is the value for `Set-Cookie` HTTP headers.
     *
     * @param cookie
     */
    public static stringifyCookie (
        cookie : CookieLike,
    ) : string {
        const name = cookie.getName();
        const value = cookie.getValue();
        const path = cookie.getPath();
        const domain = cookie.getDomain();
        const httpOnly = cookie.getHttpOnly();
        const maxAge = cookie.getMaxAge();
        const secure = cookie.getSecure();
        const sameSite = cookie.getSameSite();
        const partitioned = cookie.getPartitioned();
        const expires = cookie.getExpires();
        CookieUtils.assertCookieName(name);
        if (value !== undefined) {
            CookieUtils.assertCookieValue( value );
        }
        if (path !== undefined) {
            CookieUtils.assertCookiePath(path);
        }
        if (domain !== undefined) {
            CookieUtils.assertCookieDomain( domain );
        }
        if (expires !== undefined) {
            CookieUtils.assertCookieExpires( expires );
        }
        return `${name}=${value ? value : ''}${
            path !== undefined ? `; Path=${path}` : ''
        }${
            domain !== undefined ? `; Domain=${domain}` : ''
        }${
            expires !== undefined ? `; Expires=${expires}` : ''
        }${
            sameSite !== undefined ? `; SameSite=${sameSite}` : ''
        }${
            httpOnly ? `; HttpOnly` : ''
        }${
            secure ? `; Secure` : ''
        }${
            partitioned ? `; Partitioned` : ''
        }${
            maxAge !== undefined ? `; MaxAge=${maxAge.toFixed(0)}` : ''
        }`
    }

    public static assertCookieName (value: string) : void {
        if (!CookieUtils.isCookieName(value)) {
            throw new TypeError(`Cookie name invalid: ${LogUtils.stringifyValue(value)}`)
        }
    }

    public static assertCookieValue (value: string) : void {
        if (!CookieUtils.isCookieValue(value)) {
            throw new TypeError(`Cookie value invalid: ${LogUtils.stringifyValue(value)}`)
        }
    }

    public static assertCookiePath (value: string) : void {
        if (!CookieUtils.isCookiePath(value)) {
            throw new TypeError(`Cookie path invalid: ${LogUtils.stringifyValue(value)}`)
        }
    }

    public static assertCookieDomain (value: string) : void {
        if (!CookieUtils.isCookieDomain(value)) {
            throw new TypeError(`Cookie domain invalid: ${LogUtils.stringifyValue(value)}`)
        }
    }

    public static assertCookieExpires (value: string) : void {
        if (!CookieUtils.isCookieExpires(value)) {
            throw new TypeError(`Cookie expires invalid: ${LogUtils.stringifyValue(value)}`)
        }
    }


    public static isCookieName (value: string) : boolean {
        return /^[a-zA-Z0-9!#$%&'*+.^_`|~-]+$/.test(value);
    }

    public static isCookieValue (value: string) : boolean {
        return /^[a-zA-Z0-9!#$%&'()*+./:<=>?@[\]^_`{|}~-]+$/.test(value);
    }

    public static isCookiePath (value: string) : boolean {
        return /^[a-zA-Z0-9!#$%&'()*+./:<=>?@[\]^_`{|}~-]+$/.test(value);
    }

    public static isCookieDomain (value: string) : boolean {
        return /^[a-zA-Z0-9!#$%&'()*+./:<=>?@[\]^_`{|}~-]+$/.test(value);
    }

    public static isCookieExpires (value: string) : boolean {
        return /^[a-zA-Z0-9!#$%&'()*+./:<=>?@[\]^_`{|}~-]+$/.test(value);
    }

}
