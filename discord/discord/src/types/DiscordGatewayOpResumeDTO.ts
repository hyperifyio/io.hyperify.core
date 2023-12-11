// Copyright (c) 2021 Sendanor. All rights reserved.

import {DiscordGatewayOp} from "./DiscordGatewayOp";
import {DiscordGatewayOpDTO} from "./DiscordGatewayOpDTO";
import { isNumber } from "../../../../types/Number";

export interface DiscordGatewayOpResumePayload {
    readonly token      : string;
    readonly session_id : string;
    readonly seq        : number;
}

export function isDiscordGatewayOpResumePayload (value : any) : value is DiscordGatewayOpResumePayload {
    return (
        !!value
        && isNumber(value?.heartbeat_interval)
    );
}

export interface DiscordGatewayOpResumeDTO extends DiscordGatewayOpDTO<DiscordGatewayOpResumePayload> {

    readonly op : DiscordGatewayOp.RESUME;

}

export function isDiscordGatewayOpResumeDTO (value : any) : value is DiscordGatewayOpResumeDTO {

    return (
        !!value
        && value?.op === DiscordGatewayOp.RESUME
        && isDiscordGatewayOpResumePayload(value?.d)
    );

}
