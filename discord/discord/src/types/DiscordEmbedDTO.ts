// Copyright (c) 2021 Sendanor. All rights reserved.

import { isNumberOrUndefined } from "../../../../types/Number";
import { isStringOrUndefined } from "../../../../types/String";
import {DiscordAuthorDTO, isDiscordAuthorDTO} from "./DiscordAuthorDTO";
import {DiscordEmbedType, isDiscordEmbedType} from "./DiscordEmbedType";

export interface DiscordEmbedDTO {

    readonly title       ?: string;
    readonly type        ?: DiscordEmbedType;
    readonly description ?: string;
    readonly url         ?: string;
    readonly timestamp   ?: string;
    readonly color       ?: number;
    readonly author      ?: DiscordAuthorDTO;

}

export function isDiscordEmbedDTO (value: any) : value is DiscordEmbedDTO {

    return (
        !!value
        && isStringOrUndefined(value?.title)
        && (value?.type === undefined || isDiscordEmbedType(value?.type))
        && isStringOrUndefined(value?.description)
        && isStringOrUndefined(value?.url)
        && isStringOrUndefined(value?.timestamp)
        && isNumberOrUndefined(value?.color)
        && ( value?.author === undefined || isDiscordAuthorDTO(value?.author) )
    )

}
