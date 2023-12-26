// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ChainOperation } from "./ChainOperation";
import {
    TypeCheckFn,
    TypeExplainFn,
} from "./EntityFactory";
import {
    EntityVariableType,
    EntityVariableValue,
} from "./EntityVariableType";

/**
 *
 */
export interface EntityTypeCheckFactory {

    /**
     *
     * @param types
     */
    createDefaultValueFromTypes (
        types: readonly EntityVariableType[],
    ) : EntityVariableValue;

    /**
     *
     * @param types
     * @param op
     * @param useDtoCheck
     */
    createChainedTypeCheckFunction (
        op: ChainOperation,
        types: readonly EntityVariableType[],
        useDtoCheck : boolean | "both",
    ) : TypeCheckFn;

    /**
     *
     * @param op
     * @param types
     * @param useDtoCheck
     */
    createChainedTypeExplainFunction (
        op: ChainOperation,
        types: readonly EntityVariableType[],
        useDtoCheck : boolean | "both",
    ) : TypeExplainFn;

    /**
     *
     * @param item
     * @param useDtoCheck Indicates that isDTO should be used instead of isEntity.
     * @protected
     */
    createTypeCheckFunction (
        item: EntityVariableType,
        useDtoCheck : boolean | "both",
    ) : TypeCheckFn;

    /**
     *
     * @param types
     */
    getTypeNameList (
        types: readonly EntityVariableType[]
    ) : string[];

    /**
     *
     * @param item
     */
    getTypeName ( item: EntityVariableType ) : string;

}
