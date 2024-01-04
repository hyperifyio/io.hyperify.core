// Copyright (c) 2021 Sendanor. All rights reserved.

import {DiscordGatewayOp} from "./DiscordGatewayOp";
import {DiscordGatewayOpDTO} from "./DiscordGatewayOpDTO";
import {DiscordGatewayEvent} from "./DiscordGatewayEvent";
import {DiscordMessageDeleteDTO, isDiscordMessageDeleteDTO} from "./DiscordMessageDeleteDTO";

export interface DiscordGatewayDispatchMessageDeleteDTO extends DiscordGatewayOpDTO<DiscordMessageDeleteDTO> {

    readonly t  : DiscordGatewayEvent.MESSAGE_DELETE;
    readonly op : DiscordGatewayOp.DISPATCH;

}

export function isDiscordGatewayDispatchMessageDeleteDTO (value : any) : value is DiscordGatewayDispatchMessageDeleteDTO {

    return (
        !!value
        && value?.t === DiscordGatewayEvent.MESSAGE_DELETE
        && value?.op === DiscordGatewayOp.DISPATCH
        && isDiscordMessageDeleteDTO(value?.d)
    );

}
