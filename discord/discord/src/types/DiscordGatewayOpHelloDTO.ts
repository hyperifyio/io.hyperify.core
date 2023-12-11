// Copyright (c) 2021 Sendanor. All rights reserved.

import {DiscordGatewayOp} from "./DiscordGatewayOp";
import {DiscordGatewayOpDTO} from "./DiscordGatewayOpDTO";
import { isNumber } from "../../../../types/Number";

export interface DiscordGatewayOpHelloPayload {
    readonly heartbeat_interval: number;
}

export function isDiscordGatewayOpHelloPayload (value : any) : value is DiscordGatewayOpHelloPayload {
    return (
        !!value
        && isNumber(value?.heartbeat_interval)
    );
}

export interface DiscordGatewayOpHelloDTO extends DiscordGatewayOpDTO<DiscordGatewayOpHelloPayload> {

    readonly op : DiscordGatewayOp.HELLO;

}

export function isDiscordGatewayOpHelloDTO (value : any) : value is DiscordGatewayOpHelloDTO {

    return (
        !!value
        && value?.op === DiscordGatewayOp.HELLO
        && isDiscordGatewayOpHelloPayload(value?.d)
    );

}
