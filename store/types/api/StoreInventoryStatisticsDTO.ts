// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    explainArrayOf,
    isArrayOf,
} from "../../../types/Array";
import {
    explain,
    explainNot,
    explainOk,
    explainOr,
    explainProperty,
} from "../../../types/explain";
import {
    explainNumber,
    isNumber,
} from "../../../types/Number";
import {
    explainNoOtherKeysInDevelopment,
    hasNoOtherKeysInDevelopment,
} from "../../../types/OtherKeys";
import {
    explainRegularObject,
    isRegularObject,
} from "../../../types/RegularObject";
import { isUndefined } from "../../../types/undefined";
import {
    explainStoreInventorySummaryDTO,
    isStoreInventorySummaryDTO,
    StoreInventorySummaryDTO,
} from "./StoreInventorySummaryDTO";

export interface StoreInventoryStatisticsDTO {
    readonly yearsDuplicated : number;
    readonly services: readonly StoreInventorySummaryDTO[];
}

export function createStoreInventoryStatisticsDTO (
    yearsDuplicated : number,
    services : readonly StoreInventorySummaryDTO[]
) : StoreInventoryStatisticsDTO {
    return {
        yearsDuplicated,
        services,
    };
}

export function isStoreInventoryStatisticsDTO (value: unknown) : value is StoreInventoryStatisticsDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'yearsDuplicated',
            'services',
        ])
        && isNumber(value?.yearsDuplicated)
        && isArrayOf<StoreInventorySummaryDTO>(value?.services, isStoreInventorySummaryDTO)
    );
}

export function explainStoreInventoryStatisticsDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'yearsDuplicated',
                'services',
            ])
            , explainProperty("yearsDuplicated", explainNumber(value?.yearsDuplicated))
            , explainProperty("services", explainArrayOf<StoreInventorySummaryDTO>("StoreInventorySummaryDTO", explainStoreInventorySummaryDTO, value?.services, isStoreInventorySummaryDTO))
        ]
    );
}

export function stringifyStoreInventoryStatisticsDTO (value : StoreInventoryStatisticsDTO) : string {
    return `StoreInventoryStatisticsDTO(${value})`;
}

export function parseStoreInventoryStatisticsDTO (value: unknown) : StoreInventoryStatisticsDTO | undefined {
    if (isStoreInventoryStatisticsDTO(value)) return value;
    return undefined;
}

export function isStoreInventoryStatisticsDTOOrUndefined (value: unknown): value is StoreInventoryStatisticsDTO | undefined {
    return isUndefined(value) || isStoreInventoryStatisticsDTO(value);
}

export function explainStoreInventoryStatisticsDTOOrUndefined (value: unknown): string {
    return isStoreInventoryStatisticsDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['StoreInventoryStatisticsDTO', 'undefined']));
}
