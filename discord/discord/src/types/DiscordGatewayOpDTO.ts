// Copyright (c) 2021 Sendanor. All rights reserved.

import {DiscordGatewayOp} from "./DiscordGatewayOp";
import {DiscordGatewayEvent} from "./DiscordGatewayEvent";

export interface DiscordGatewayOpDTO<T> {

    readonly t  : DiscordGatewayEvent;
    readonly op : DiscordGatewayOp;
    readonly d  : T;
    readonly s  : number | null;

}
