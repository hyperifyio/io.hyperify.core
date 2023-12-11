// Copyright (c) 2021 Sendanor. All rights reserved.

import { isArray } from "../../../../types/Array";
import { isNumber } from "../../../../types/Number";
import { every } from "../../../../functions/every";
import { isString } from "../../../../types/String";

import {DiscordGatewayOp} from "./DiscordGatewayOp";
import {DiscordGatewayOpDTO} from "./DiscordGatewayOpDTO";
import {DiscordGatewayEvent} from "./DiscordGatewayEvent";
import {DiscordUserDTO, isDiscordUserDTO} from "./DiscordUserDTO";
import {DiscordUnavailableGuildDTO, isDiscordUnavailableGuildDTO} from "./DiscordUnavailableGuildDTO";
import {DiscordApplicationDTO, isDiscordApplicationDTO} from "./DiscordApplicationDTO";

export interface DiscordGatewayDispatchReadyPayload {
    readonly v          : number;
    readonly user       : DiscordUserDTO;
    readonly guilds     : DiscordUnavailableGuildDTO[];
    readonly session_id : string;
    readonly application : DiscordApplicationDTO;
}

export function isDiscordGatewayDispatchReadyPayload (value : any) : value is DiscordGatewayDispatchReadyPayload {
    return (
        !!value
        && isNumber(value?.v)
        && isDiscordUserDTO(value?.user)
        && ( isArray(value?.guilds) && every(value?.guilds, isDiscordUnavailableGuildDTO) )
        && isString(value?.session_id)
        && isDiscordApplicationDTO(value?.application)
    );
}

export interface DiscordGatewayDispatchReadyDTO extends DiscordGatewayOpDTO<DiscordGatewayDispatchReadyPayload> {

    readonly t  : DiscordGatewayEvent.READY;
    readonly op : DiscordGatewayOp.DISPATCH;

}

export function isDiscordGatewayDispatchReadyDTO (value : any) : value is DiscordGatewayDispatchReadyDTO {

    return (
        !!value
        && value?.t === DiscordGatewayEvent.READY
        && value?.op === DiscordGatewayOp.DISPATCH
        && isDiscordGatewayDispatchReadyPayload(value?.d)
    );

}
