// Copyright (c) 2021 Sendanor. All rights reserved.

import {DiscordGatewayOp} from "./DiscordGatewayOp";
import {DiscordGatewayOpDTO} from "./DiscordGatewayOpDTO";

export interface DiscordGatewayOpReconnectDTO extends DiscordGatewayOpDTO<null|undefined> {

    readonly op : DiscordGatewayOp.RECONNECT;

}

export function isDiscordGatewayOpReconnectDTO (value : any) : value is DiscordGatewayOpReconnectDTO {

    return (
        !!value
        && value?.op === DiscordGatewayOp.RECONNECT
    );

}
