// Copyright (c) 2021 Sendanor. All rights reserved.

import {DiscordGatewayOp} from "./DiscordGatewayOp";
import {DiscordGatewayOpDTO} from "./DiscordGatewayOpDTO";
import {DiscordGatewayEvent} from "./DiscordGatewayEvent";
import {DiscordMessageUpdateDTO, isDiscordMessageUpdateDTO} from "./DiscordMessageUpdateDTO";

export interface DiscordGatewayDispatchMessageUpdateDTO extends DiscordGatewayOpDTO<DiscordMessageUpdateDTO> {

    readonly t  : DiscordGatewayEvent.MESSAGE_UPDATE;
    readonly op : DiscordGatewayOp.DISPATCH;

}

export function isDiscordGatewayDispatchMessageUpdateDTO (value : any) : value is DiscordGatewayDispatchMessageUpdateDTO {

    return (
        !!value
        && value?.t === DiscordGatewayEvent.MESSAGE_UPDATE
        && value?.op === DiscordGatewayOp.DISPATCH
        && isDiscordMessageUpdateDTO(value?.d)
    );

}
