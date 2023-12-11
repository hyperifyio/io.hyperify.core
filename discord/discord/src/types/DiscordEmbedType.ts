// Copyright (c) 2021 Sendanor. All rights reserved.

export enum DiscordEmbedType {

    RICH     = "rich",
    IMAGE    = "image",
    VIDEO    = "video",
    GIFV     = "gifv",
    ARTICLE  = "article",
    LINK     = "link"

}

export function isDiscordEmbedType (value : any ) : value is DiscordEmbedType {

    switch (value) {
        case DiscordEmbedType.RICH:
        case DiscordEmbedType.IMAGE:
        case DiscordEmbedType.VIDEO:
        case DiscordEmbedType.GIFV:
        case DiscordEmbedType.ARTICLE:
        case DiscordEmbedType.LINK:
            return true

        default:
            return false;

    }

}
