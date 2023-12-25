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
     */
    createChainedTypeCheckFunction (
        op: ChainOperation,
        ...types: readonly EntityVariableType[]
    ) : TypeCheckFn;

    createChainedTypeExplainFunction (
        op: ChainOperation,
        ...types: readonly EntityVariableType[]
    ) : TypeExplainFn;

    /**
     *
     * @param item
     * @protected
     */
    createTypeCheckFunction ( item: EntityVariableType ) : TypeCheckFn;

    getTypeNameList (
        ...types: readonly EntityVariableType[]
    ) : string[];

    getTypeName ( item: EntityVariableType ) : string;

}
