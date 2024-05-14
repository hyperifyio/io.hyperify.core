// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explainEnum,
    isEnum,
    parseEnum,
    stringifyEnum,
} from "../../types/Enum";
import {
    explainNot,
    explainOk,
    explainOr,
} from "../../types/explain";
import { isUndefined } from "../../types/undefined";

export enum FacebookBidStrategy {
    LOWEST_COST_WITHOUT_CAP = "LOWEST_COST_WITHOUT_CAP",
    LOWEST_COST_WITH_BID_CAP = "LOWEST_COST_WITH_BID_CAP",
    COST_CAP = "COST_CAP",
    LOWEST_COST_WITH_MIN_ROAS = "LOWEST_COST_WITH_MIN_ROAS",
}

export function isFacebookBidStrategy (value: unknown) : value is FacebookBidStrategy {
    return isEnum(FacebookBidStrategy, value);
}

export function explainFacebookBidStrategy (value : unknown) : string {
    return explainEnum("FacebookBidStrategy", FacebookBidStrategy, isFacebookBidStrategy, value);
}

export function stringifyFacebookBidStrategy (value : FacebookBidStrategy) : string {
    return stringifyEnum(FacebookBidStrategy, value);
}

export function parseFacebookBidStrategy (value: any) : FacebookBidStrategy | undefined {
    return parseEnum(FacebookBidStrategy, value) as FacebookBidStrategy | undefined;
}

export function isFacebookBidStrategyOrUndefined (value: unknown): value is FacebookBidStrategy | undefined {
    return isUndefined(value) || isFacebookBidStrategy(value);
}

export function explainFacebookBidStrategyOrUndefined (value: unknown): string {
    return isFacebookBidStrategyOrUndefined(value) ? explainOk() : explainNot(explainOr(['FacebookBidStrategy', 'undefined']));
}
