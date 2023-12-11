// Copyright (c) 2021 Sendanor. All rights reserved.

import { isString, isStringOrUndefined } from "../../../../types/String";

export interface DiscordMessageDeleteDTO {

    id           : string;
    channel_id   : string;
    guild_id    ?: string;

}

export function isDiscordMessageDeleteDTO (value: any) : value is DiscordMessageDeleteDTO {

    return (
        !!value
        && isString(value?.id)
        && isString(value?.channel_id)
        && isStringOrUndefined(value?.guild_id)
    );

}
