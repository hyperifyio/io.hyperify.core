// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

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

export enum ChainOperation {
    AND = "AND",
    OR = "OR",
}

export function isChainOperation (value: unknown) : value is ChainOperation {
    return isEnum(ChainOperation, value);
}

export function explainChainOperation (value : unknown) : string {
    return explainEnum("ChainOperation", ChainOperation, isChainOperation, value);
}

export function stringifyChainOperation (value : ChainOperation) : string {
    return stringifyEnum(ChainOperation, value);
}

export function parseChainOperation (value: any) : ChainOperation | undefined {
    return parseEnum(ChainOperation, value) as ChainOperation | undefined;
}

export function isChainOperationOrUndefined (value: unknown): value is ChainOperation | undefined {
    return isUndefined(value) || isChainOperation(value);
}

export function explainChainOperationOrUndefined (value: unknown): string {
    return isChainOperationOrUndefined(value) ? explainOk() : explainNot(explainOr(['ChainOperation', 'undefined']));
}

export type ChainOperationFunction = (a: boolean, b: boolean) => boolean;

export const andChainOperation : ChainOperationFunction = (a: boolean, b: boolean) => a && b;

export const orChainOperation : ChainOperationFunction = (a: boolean, b: boolean) => a || b;

export function getChainOperationFunction (
    op : ChainOperation
) : ChainOperationFunction {
    switch (op) {
        case ChainOperation.AND: return andChainOperation;
        case ChainOperation.OR: return orChainOperation;
    }
    throw new TypeError(`getChainOperationFunction: Unsupported operation: ${op}`);
}
