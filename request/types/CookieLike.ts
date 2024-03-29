// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { SameSite } from "../../types/SameSite";
import { CookieOptionsLike } from "./CookieOptionsLike";

export interface CookieLike extends CookieOptionsLike {

    getName() : string;
    setName(name : string) : this;

    getValue() : string | undefined;
    setValue(name : string | undefined) : this;

    // From CookieOptionsLike
    getDomain() : string | undefined;
    getExpires() : string | undefined;
    getHttpOnly() : boolean | undefined;
    getMaxAge() : number | undefined;
    getPath() : string | undefined;
    getSameSite() : SameSite | undefined;
    getSecure() : boolean | undefined;
    getPartitioned() : boolean | undefined;

    setDomain(domain : string | undefined) : this;
    setExpires(expires : string | undefined) : this;
    setHttpOnly(httpOnly : boolean | undefined) : this;
    setPartitioned(httpOnly : boolean | undefined) : this;
    setMaxAge(maxAge: number | undefined) : this;
    setPath(path: string | undefined) : this;
    setSameSite(sameSite: SameSite | undefined) : this;
    setSecure(secure: boolean | undefined) : this;

}
