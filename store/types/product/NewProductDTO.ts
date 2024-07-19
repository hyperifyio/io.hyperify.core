// Copyright (c) 2022-2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { isBoolean } from "../../../types/Boolean";
import { isString } from "../../../types/String";
import { isNumber } from "../../../types/Number";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";

export interface NewProductDTO {
    readonly productGroupId    : string;
    readonly priceTypeId       : string;
    readonly number            : number;
    readonly slug              : string;
    readonly name              : string;
    readonly description       : string;
    readonly expensePrice      : number;
    readonly discountPercent   : number;
    readonly discountFrom      : string;
    readonly discountTo        : string;
    readonly price             : number;
    readonly vatPercent        : number;
    readonly stockSold         : number;
    readonly stockAmount       : number;
    readonly stockEnabled      : boolean;
    readonly onHold            : boolean;
    readonly published         : boolean;
}

export function createNewProductDTO (
    productGroupId  : string,
    priceTypeId     : string,
    number          : number,
    slug            : string,
    name            : string,
    description     : string,
    expensePrice    : number,
    discountPercent : number,
    discountFrom    : string,
    discountTo      : string,
    price           : number,
    vatPercent      : number,
    stockSold       : number,
    stockAmount     : number,
    stockEnabled    : boolean,
    onHold          : boolean,
    published       : boolean,
): NewProductDTO {
    return {
        productGroupId,
        priceTypeId,
        number,
        slug,
        name,
        description,
        expensePrice,
        discountPercent,
        discountFrom,
        discountTo,
        price,
        vatPercent,
        stockSold,
        stockAmount,
        stockEnabled,
        onHold,
        published,
    };
}

export function isNewProductDTO (value: any): value is NewProductDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'productGroupId',
            'priceTypeId',
            'number',
            'slug',
            'name',
            'description',
            'expensePrice',
            'discountPercent',
            'discountFrom',
            'discountTo',
            'price',
            'vatPercent',
            'stockSold',
            'stockAmount',
            'stockEnabled',
            'onHold',
            'published',
        ])
        && isString(value?.productGroupId)
        && isString(value?.priceTypeId)
        && isNumber(value?.number)
        && isString(value?.slug)
        && isString(value?.name)
        && isString(value?.description)
        && isNumber(value?.expensePrice)
        && isNumber(value?.discountPercent)
        && isString(value?.discountFrom)
        && isString(value?.discountTo)
        && isNumber(value?.price)
        && isNumber(value?.vatPercent)
        && isNumber(value?.stockSold)
        && isNumber(value?.stockAmount)
        && isBoolean(value?.stockEnabled)
        && isBoolean(value?.onHold)
        && isBoolean(value?.published)
    );
}

export function stringifyNewProductDTO (value: NewProductDTO): string {
    return `NewProductDTO(${value})`;
}

export function parseNewProductDTO (value: any): NewProductDTO | undefined {
    if ( isNewProductDTO(value) ) return value;
    return undefined;
}
