// Copyright (c) 2021 Sendanor. All rights reserved.

import { isNumber } from "../../../../types/Number";

export interface DiscordSessionStartLimitDTO {

    readonly total           : number;
    readonly remaining       : number;
    readonly reset_after     : number;
    readonly max_concurrency : number;

}

export function isDiscordSessionStartLimitDTO (value : any) : value is DiscordSessionStartLimitDTO {

    return (
        !!value
        && isNumber(value?.total)
        && isNumber(value?.remaining)
        && isNumber(value?.reset_after)
        && isNumber(value?.max_concurrency)
    );

}
