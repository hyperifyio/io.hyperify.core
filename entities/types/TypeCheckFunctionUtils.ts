// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { reduce } from "../../functions/reduce";
import {
    ChainOperation,
    getChainOperationFunction,
} from "./ChainOperation";
import { TypeCheckFn } from "./EntityFactory";

/**
 *
 */
export class TypeCheckFunctionUtils {


    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////  #createChainedFunction  ///////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     *
     * @param op
     * @param list
     */
    public static createChainedFunction (
        op : ChainOperation,
        list : readonly TypeCheckFn[],
    ) : TypeCheckFn {
        const operation = getChainOperationFunction(op);
        const func = reduce(
            list,
            (prev: TypeCheckFn | undefined, item: TypeCheckFn) : TypeCheckFn => {
                if (prev === undefined) {
                    return (value: unknown) : boolean => item(value);
                } else {
                    return (value: unknown) : boolean => operation(prev(value), item(value));
                }
            },
            undefined,
        );
        if (func === undefined) {
            throw new TypeError(`TypeCheckFunctionUtils.createChainedFunction: At least one test function must be defined`);
        }
        return func;
    }


}
