// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { SameSite } from "../../types/SameSite";

export interface CookieOptionsLike {

    getDomain() : string | undefined;
    getExpires() : string | undefined;
    getPartitioned() : boolean | undefined;
    getHttpOnly() : boolean | undefined;
    getMaxAge() : number | undefined;
    getPath() : string | undefined;
    getSameSite() : SameSite | undefined;
    getSecure() : boolean | undefined;

    setDomain(domain : string | undefined) : this;
    setExpires(expires : string | undefined) : this;
    setPartitioned(partitioned : boolean | undefined) : this;
    setHttpOnly(httpOnly : boolean | undefined) : this;
    setMaxAge(maxAge: number | undefined) : this;
    setPath(path: string | undefined) : this;
    setSameSite(sameSite: SameSite | undefined) : this;
    setSecure(secure: boolean | undefined) : this;

}

