// Copyright (c) 2021 Sendanor. All rights reserved.

import { every } from "../../../../functions/every";
import { isArray } from "../../../../types/Array";
import { isString, isStringOrUndefined } from "../../../../types/String";

export interface DiscordMessageDeleteBulkDTO {

    ids          : string[];
    channel_id   : string;
    guild_id    ?: string;

}

export function isDiscordMessageDeleteBulkDTO (value: any) : value is DiscordMessageDeleteBulkDTO {

    return (
        !!value
        && isArray(value?.ids) && every(value?.ids, isString)
        && isString(value?.channel_id)
        && isStringOrUndefined(value?.guild_id)
    );

}
