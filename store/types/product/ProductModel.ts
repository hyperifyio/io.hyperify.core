// Copyright (c) 2021-2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isUndefined } from "../../../types/undefined";
import { isProductOrUndefined, Product } from "./Product";
import { isProductPriceOrUndefined, ProductPrice } from "./ProductPrice";
import { ButtonStyle, isButtonStyleOrUndefined } from "../../../frontend/button/ButtonStyle";
import { isString, isStringOrUndefined } from "../../../types/String";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeys } from "../../../types/OtherKeys";

export interface SelectProductModelCallback {
    (item: ProductModel): void;
}

export interface ProductModel {
    readonly id            : string;
    readonly icon          : any;
    readonly title         : string;

    /**
     * @type {string | react.ReactNode}
     */
    readonly description   : string | any;

    readonly route        ?: string;
    readonly buttonLabel  ?: string;
    readonly product      ?: Product;
    readonly productPrice ?: ProductPrice;
    readonly buttonStyle  ?: ButtonStyle;
}

/**
 *
 * @param id
 * @param icon
 * @param title
 * @param description {string | react.ReactNode}
 * @param route
 * @param buttonLabel
 * @param product
 * @param productPrice
 * @param buttonStyle
 */
export function createProductModel (
    id: string,
    icon: any,
    title: string,
    description: string | any,
    route ?: string,
    buttonLabel ?: string,
    product ?: Product,
    productPrice ?: ProductPrice,
    buttonStyle ?: ButtonStyle
): ProductModel {
    return {
        id,
        icon,
        title,
        description,
        route,
        buttonLabel,
        product,
        productPrice,
        buttonStyle
    };
}

export function isProductModel (value: any): value is ProductModel {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'id',
            'icon',
            'title',
            'description',
            'route',
            'buttonLabel',
            'product',
            'productPrice',
            'buttonStyle'
        ])
        && isString(value?.id)
        && isString(value?.title)
        && value?.description !== undefined
        && isString(value?.buttonLabel)
        && isStringOrUndefined(value?.route)
        && isProductOrUndefined(value?.product)
        && isProductPriceOrUndefined(value?.productPrice)
        && isButtonStyleOrUndefined(value?.buttonStyle)
    );
}

export function isPartialProductModel (value: any): value is Partial<ProductModel> {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'id',
            'icon',
            'title',
            'description',
            'route',
            'buttonLabel',
            'product',
            'productPrice',
            'buttonStyle'
        ])
        && isStringOrUndefined(value?.id)
        && isStringOrUndefined(value?.title)
        && !isUndefined(value?.description)
        && isStringOrUndefined(value?.route)
        && isStringOrUndefined(value?.buttonLabel)
        && isProductOrUndefined(value?.product)
        && isProductPriceOrUndefined(value?.productPrice)
        && isButtonStyleOrUndefined(value?.buttonStyle)
    );
}

export function stringifyProductModel (value: ProductModel): string {
    return `ProductModel(${value})`;
}

export function parseProductModel (value: any): ProductModel | undefined {
    if ( isProductModel(value) ) return value;
    return undefined;
}


