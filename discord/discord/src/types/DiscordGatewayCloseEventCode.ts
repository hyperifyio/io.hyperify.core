// Copyright (c) 2021 Sendanor. All rights reserved.

import { isNumber } from "../../../../types/Number";

export enum DiscordGatewayCloseEventCode {

	UNKNOWN_ERROR           = 4000,
	UNKNOWN_OPCODE          = 4001,
	DECODE_ERROR            = 4002,
	NOT_AUTHENTICATED       = 4003,
	AUTHENTICATION_FAILED   = 4004,
	ALREADY_AUTHENTICATED   = 4005,
	INVALID_SEQ             = 4007,
	RATE_LIMITED            = 4008,
	SESSION_TIMED_OUT       = 4009,
	INVALID_SHARD           = 4010,
	SHARDING_REQUIRED       = 4011,
	INVALID_API_VERSION     = 4012,
	INVALID_INTENTS         = 4013,
	DISALLOWED_INTENTS      = 4014,

}

export function isDiscordGatewayCloseEventCode (value : any) : value is DiscordGatewayCloseEventCode {
    return isNumber(value);
}

export function stringifyDiscordGatewayCloseEventCode (value : number ) {

    switch (value) {
        case DiscordGatewayCloseEventCode.UNKNOWN_ERROR         : return 'UNKNOWN_ERROR';
        case DiscordGatewayCloseEventCode.UNKNOWN_OPCODE        : return 'UNKNOWN_OPCODE';
        case DiscordGatewayCloseEventCode.DECODE_ERROR          : return 'DECODE_ERROR';
        case DiscordGatewayCloseEventCode.NOT_AUTHENTICATED     : return 'NOT_AUTHENTICATED';
        case DiscordGatewayCloseEventCode.AUTHENTICATION_FAILED : return 'AUTHENTICATION_FAILED';
        case DiscordGatewayCloseEventCode.ALREADY_AUTHENTICATED : return 'ALREADY_AUTHENTICATED';
        case DiscordGatewayCloseEventCode.INVALID_SEQ           : return 'INVALID_SEQ';
        case DiscordGatewayCloseEventCode.RATE_LIMITED          : return 'RATE_LIMITED';
        case DiscordGatewayCloseEventCode.SESSION_TIMED_OUT     : return 'SESSION_TIMED_OUT';
        case DiscordGatewayCloseEventCode.INVALID_SHARD         : return 'INVALID_SHARD';
        case DiscordGatewayCloseEventCode.SHARDING_REQUIRED     : return 'SHARDING_REQUIRED';
        case DiscordGatewayCloseEventCode.INVALID_API_VERSION   : return 'INVALID_API_VERSION';
        case DiscordGatewayCloseEventCode.INVALID_INTENTS       : return 'INVALID_INTENTS';
        case DiscordGatewayCloseEventCode.DISALLOWED_INTENTS    : return 'DISALLOWED_INTENTS';
        default : return `CloseEventCode#${value}`;
    }

}
