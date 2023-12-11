// Copyright (c) 2021 Sendanor. All rights reserved.

import {DiscordGatewayOp} from "./DiscordGatewayOp";
import {DiscordGatewayOpDTO} from "./DiscordGatewayOpDTO";
import {DiscordGatewayEvent} from "./DiscordGatewayEvent";
import {DiscordMessageDTO, isDiscordMessageDTO} from "./DiscordMessageDTO";

export interface DiscordGatewayDispatchMessageCreateDTO extends DiscordGatewayOpDTO<DiscordMessageDTO> {

    readonly t  : DiscordGatewayEvent.MESSAGE_CREATE;
    readonly op : DiscordGatewayOp.DISPATCH;

}

export function isDiscordGatewayDispatchMessageCreateDTO (value : any) : value is DiscordGatewayDispatchMessageCreateDTO {

    return (
        !!value
        && value?.t === DiscordGatewayEvent.MESSAGE_CREATE
        && value?.op === DiscordGatewayOp.DISPATCH
        && isDiscordMessageDTO(value?.d)
    );

}
