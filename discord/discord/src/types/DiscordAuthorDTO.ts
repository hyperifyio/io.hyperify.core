// Copyright (c) 2021 Sendanor. All rights reserved.

import { isStringOrUndefined } from "../../../../types/String";

export interface DiscordAuthorDTO {

    readonly name            ?: string;
    readonly url             ?: string;
    readonly icon_url        ?: string;
    readonly proxy_icon_url  ?: string;

}

export function isDiscordAuthorDTO (value : any) : value is DiscordAuthorDTO {

    return (
        !!value
        && isStringOrUndefined(value?.name)
        && isStringOrUndefined(value?.url)
        && isStringOrUndefined(value?.icon_url)
        && isStringOrUndefined(value?.proxy_icon_url)
    );

}
