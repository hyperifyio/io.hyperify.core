// Copyright (c) 2021 Sendanor. All rights reserved.

import { isNumber } from "../../../../types/Number";
import { isString } from "../../../../types/String";

import {DiscordGatewayOp} from "./DiscordGatewayOp";
import {DiscordGatewayOpDTO} from "./DiscordGatewayOpDTO";

export interface DiscordGatewayOpIdentifyPayloadProperties {
    readonly $os      : string;
    readonly $browser : string;
    readonly $device  : string;
}

export function isDiscordGatewayOpIdentifyPayloadProperties (value : any) : value is DiscordGatewayOpIdentifyPayloadProperties {
    return (
        !!value
        && isString(value?.$os)
        && isString(value?.$browser)
        && isString(value?.$device)
    );
}

export interface DiscordGatewayOpIdentifyPayload {
    readonly token      : string;
    readonly intents    : number;
    readonly properties : DiscordGatewayOpIdentifyPayloadProperties;
}

export function isDiscordGatewayOpIdentifyPayload (value : any) : value is DiscordGatewayOpIdentifyPayload {
    return (
        !!value
        && isString(value?.token)
        && isNumber(value?.intents)
        && isDiscordGatewayOpIdentifyPayloadProperties(value?.properties)
    );
}

export interface DiscordGatewayOpIdentifyDTO extends DiscordGatewayOpDTO<DiscordGatewayOpIdentifyPayload> {

    readonly op : DiscordGatewayOp.IDENTIFY;

}

export function isDiscordGatewayOpIdentifyDTO (value : any) : value is DiscordGatewayOpIdentifyDTO {

    return (
        !!value
        && value?.op === DiscordGatewayOp.IDENTIFY
        && isDiscordGatewayOpIdentifyPayload(value?.d)
    );

}
