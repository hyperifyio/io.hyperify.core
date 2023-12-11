// Copyright (c) 2021 Sendanor. All rights reserved.

import {DiscordGatewayOp} from "./DiscordGatewayOp";
import {DiscordGatewayOpDTO} from "./DiscordGatewayOpDTO";
import { isBoolean } from "../../../../types/Boolean";

export interface DiscordGatewayOpInvalidSessionDTO extends DiscordGatewayOpDTO<boolean> {

    readonly op : DiscordGatewayOp.INVALID_SESSION;

}

export function isDiscordGatewayOpInvalidSessionDTO (value : any) : value is DiscordGatewayOpInvalidSessionDTO {

    return (
        !!value
        && value?.op === DiscordGatewayOp.INVALID_SESSION
        && isBoolean(value?.d)
    );

}
