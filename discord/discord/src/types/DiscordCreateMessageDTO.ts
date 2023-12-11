// Copyright (c) 2021 Sendanor. All rights reserved.

import {DiscordEmbedDTO} from "./DiscordEmbedDTO";

/**
 * @see https://discord.com/developers/docs/resources/channel#create-message
 */
export interface DiscordCreateMessageDTO {

    readonly content  ?: string;
    readonly tts      ?: boolean;
    readonly embeds   ?: DiscordEmbedDTO[];

}
