// Copyright (c) 2021 Sendanor. All rights reserved.

import {DiscordGatewayOpDTO} from "./DiscordGatewayOpDTO";
import {DiscordGatewayOp} from "./DiscordGatewayOp";

export interface DiscordGatewayHeartbeatAckDTO extends DiscordGatewayOpDTO<undefined|null> {

    readonly op : DiscordGatewayOp.HEARTBEAT_ACK;

}

export function isDiscordGatewayHeartbeatAckDTO (value: any) : value is DiscordGatewayHeartbeatAckDTO {
    return (
        !!value
        && value?.op === DiscordGatewayOp.HEARTBEAT_ACK
        && ( value?.d === null || value?.d === undefined )
    );
}
