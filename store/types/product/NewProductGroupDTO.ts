// Copyright (c) 2022-2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { isBoolean } from "../../../types/Boolean";
import {
    isNumber,
    isNumberOrUndefined,
} from "../../../types/Number";
import {
    isString,
} from "../../../types/String";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";

export interface NewProductGroupDTO {
    readonly slug            : string;
    readonly type            : string;
    readonly name            : string;
    readonly description     : string;
    readonly stockSold       : number;
    readonly stockAmount     : number;
    readonly stockEnabled    : boolean;
    readonly onHold          : boolean;
    readonly published       : boolean;
    readonly order          ?: number | undefined;
}

export function createNewProductGroupDTO (
    slug            : string,
    type            : string,
    name            : string,
    description     : string,
    stockSold       : number,
    stockAmount     : number,
    stockEnabled    : boolean,
    onHold          : boolean,
    published       : boolean,
    order           : number | undefined,
): NewProductGroupDTO {
    return {
        slug,
        type,
        name,
        description,
        stockSold,
        stockAmount,
        stockEnabled,
        onHold,
        published,
        order,
    };
}

export function isNewProductGroupDTO (value: any): value is NewProductGroupDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'slug',
            'type',
            'name',
            'description',
            'stockSold',
            'stockAmount',
            'stockEnabled',
            'onHold',
            'published',
            'order',
        ])
        && isString(value?.slug)
        && isString(value?.type)
        && isString(value?.name)
        && isString(value?.description)
        && isNumber(value?.stockSold)
        && isNumber(value?.stockAmount)
        && isBoolean(value?.stockEnabled)
        && isBoolean(value?.onHold)
        && isBoolean(value?.published)
        && isNumberOrUndefined(value?.order)
    );
}

export function stringifyNewProductGroupDTO (value: NewProductGroupDTO): string {
    return `NewProductGroupDTO(${value})`;
}

export function parseNewProductGroupDTO (value: any): NewProductGroupDTO | undefined {
    if ( isNewProductGroupDTO(value) ) return value;
    return undefined;
}
