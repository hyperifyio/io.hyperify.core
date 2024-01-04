// Copyright (c) 2021 Sendanor. All rights reserved.

import {DiscordGatewayOp} from "./DiscordGatewayOp";
import {DiscordGatewayOpDTO} from "./DiscordGatewayOpDTO";
import {DiscordGatewayEvent} from "./DiscordGatewayEvent";
import {DiscordMessageDeleteBulkDTO, isDiscordMessageDeleteBulkDTO} from "./DiscordMessageDeleteBulkDTO";

export interface DiscordGatewayDispatchMessageDeleteBulkDTO extends DiscordGatewayOpDTO<DiscordMessageDeleteBulkDTO> {

    readonly t  : DiscordGatewayEvent.MESSAGE_DELETE_BULK;
    readonly op : DiscordGatewayOp.DISPATCH;

}

export function isDiscordGatewayDispatchMessageDeleteBulkDTO (value : any) : value is DiscordGatewayDispatchMessageDeleteBulkDTO {

    return (
        !!value
        && value?.t === DiscordGatewayEvent.MESSAGE_DELETE_BULK
        && value?.op === DiscordGatewayOp.DISPATCH
        && isDiscordMessageDeleteBulkDTO(value?.d)
    );

}
