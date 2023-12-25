// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { isPairArrayOf, isTetradArrayOf, isTripletArrayOf } from "../../types/Array";
import { explainNot, explainOk, explainOr } from "../../types/explain";
import { isUndefined } from "../../types/undefined";
import {
    isSizeDTO,
    SizeEntity,
} from "../size/SizeEntity";
import { SizeDTO } from "../size/SizeDTO";
import { BackgroundPositionValue, isBackgroundPositionValue } from "./BackgroundPositionValue";

export type BackgroundPositionOptions = (
    BackgroundPositionValue
    | [ BackgroundPositionValue, BackgroundPositionValue ]
    | [ BackgroundPositionValue, SizeDTO, BackgroundPositionValue ]
    | [ BackgroundPositionValue, BackgroundPositionValue, SizeDTO ]
    | [ BackgroundPositionValue, SizeDTO ]
    | [ SizeDTO, SizeDTO ]
    | [ BackgroundPositionValue, SizeDTO, BackgroundPositionValue, SizeDTO ]
);

/**
 *
 * @param a
 */
export function createBackgroundPositionOptions (
    a : BackgroundPositionValue,
) : BackgroundPositionValue;

/**
 *
 * @param a
 * @param b
 */
export function createBackgroundPositionOptions (
    a : BackgroundPositionValue,
    b : BackgroundPositionValue,
) : [ BackgroundPositionValue, BackgroundPositionValue ];

/**
 *
 * @param a
 * @param aSize
 * @param c
 */
export function createBackgroundPositionOptions (
    a : BackgroundPositionValue,
    aSize : SizeDTO,
    c : BackgroundPositionValue,
) : [ BackgroundPositionValue, SizeDTO, BackgroundPositionValue ];

/**
 *
 * @param a
 * @param b
 * @param bSize
 */
export function createBackgroundPositionOptions (
    a : BackgroundPositionValue,
    b : BackgroundPositionValue,
    bSize : SizeDTO,
) : [ BackgroundPositionValue, BackgroundPositionValue, SizeDTO ];

/**
 *
 * @param a
 * @param size
 */
export function createBackgroundPositionOptions (
    a : BackgroundPositionValue,
    size : SizeDTO,
) : [ BackgroundPositionValue, SizeDTO ];

/**
 *
 * @param aSize
 * @param bSize
 */
export function createBackgroundPositionOptions (
    aSize : SizeDTO,
    bSize : SizeDTO,
) : [ SizeDTO, SizeDTO ];

/**
 *
 * @param a
 * @param aSize
 * @param b
 * @param bSize
 */
export function createBackgroundPositionOptions (
    a : BackgroundPositionValue,
    aSize : SizeDTO,
    b : BackgroundPositionValue,
    bSize : SizeDTO,
) : [ BackgroundPositionValue, SizeDTO, BackgroundPositionValue, SizeDTO ];

export function createBackgroundPositionOptions (
    a  : BackgroundPositionValue | SizeDTO,
    b ?: BackgroundPositionValue | SizeDTO,
    c ?: BackgroundPositionValue | SizeDTO,
    d ?: BackgroundPositionValue | SizeDTO,
) : BackgroundPositionOptions {
    if (isBackgroundPositionValue(a)) {
        if ( b === undefined && c === undefined && d === undefined ) {
            return a;
        } else if ( isBackgroundPositionValue(b) ) {
            if ( c === undefined && d === undefined ) {
                return [a, b];
            } else if ( isSizeDTO(c) && d === undefined ) {
                return [a, b, c];
            }
        } else if ( isSizeDTO(b) ) {
            if ( c === undefined && d === undefined ) {
                return [a, b];
            } else if ( isBackgroundPositionValue(c) ) {
                if ( d === undefined ) {
                    return [a, b, c];
                } else if ( isSizeDTO(d) ) {
                    return [a, b, c, d];
                }
            }
        }
    } else if ( isSizeDTO(a) && isSizeDTO(b) && c === undefined && d === undefined ) {
        return [a, b];
    }
    throw new TypeError(`Unsupported arguments provided: ${a}, ${b}, ${c}, ${d}`);
}

export function isBackgroundPositionOptions (value: unknown) : value is BackgroundPositionOptions {
    return (
        isBackgroundPositionValue(value)
        || isPairArrayOf<SizeDTO, SizeDTO>(value, isSizeDTO, isSizeDTO)
        || isPairArrayOf<BackgroundPositionValue, SizeDTO>(value, isBackgroundPositionValue, isSizeDTO)
        || isPairArrayOf<BackgroundPositionValue, BackgroundPositionValue>(value, isBackgroundPositionValue, isBackgroundPositionValue)
        || isTripletArrayOf<BackgroundPositionValue, BackgroundPositionValue, SizeDTO>(value, isBackgroundPositionValue, isBackgroundPositionValue, isSizeDTO)
        || isTripletArrayOf<BackgroundPositionValue, SizeDTO, BackgroundPositionValue>(value, isBackgroundPositionValue, isSizeDTO, isBackgroundPositionValue)
        || isTetradArrayOf<BackgroundPositionValue, SizeDTO, BackgroundPositionValue, SizeDTO>(value, isBackgroundPositionValue, isSizeDTO, isBackgroundPositionValue, isSizeDTO)
    );
}

export function explainBackgroundPositionOptions (value: any) : string {
    return isBackgroundPositionOptions(value) ? explainOk() : explainNot(
        explainOr(
            [
                'BackgroundPosition',
                '[SizeDTO, SizeDTO]',
                '[BackgroundPosition, SizeDTO]',
                '[BackgroundPosition, BackgroundPosition]',
                '[BackgroundPosition, BackgroundPosition, SizeDTO]',
                '[BackgroundPosition, SizeDTO, BackgroundPosition]',
                '[BackgroundPosition, SizeDTO, BackgroundPosition, SizeDTO]',
            ]
        )
    );
}

export function stringifyBackgroundPositionOptions (value : BackgroundPositionOptions) : string {
    return `BackgroundPositionOptions(${value})`;
}

export function parseBackgroundPositionOptions (value: unknown) : BackgroundPositionOptions | undefined {
    if (isBackgroundPositionOptions(value)) return value;
    return undefined;
}

export function isBackgroundPositionOptionsOrUndefined (value: unknown): value is BackgroundPositionOptions | undefined {
    return isUndefined(value) || isBackgroundPositionOptions(value);
}

export function explainBackgroundPositionOptionsOrUndefined (value: unknown): string {
    return isBackgroundPositionOptionsOrUndefined(value) ? explainOk() : explainNot(explainOr([
        'BackgroundPosition',
        '[SizeDTO, SizeDTO]',
        '[BackgroundPosition, SizeDTO]',
        '[BackgroundPosition, BackgroundPosition]',
        '[BackgroundPosition, BackgroundPosition, SizeDTO]',
        '[BackgroundPosition, SizeDTO, BackgroundPosition]',
        '[BackgroundPosition, SizeDTO, BackgroundPosition, SizeDTO]',
        'undefined'
    ]));
}

export function getCssStylesForBackgroundPosition (
    value : BackgroundPositionOptions,
) : string {

    if (isBackgroundPositionValue(value)) {
        return `${value}`;
    }

    if (isPairArrayOf<SizeDTO, SizeDTO>(value, isSizeDTO, isSizeDTO)) {
        return `${
            SizeEntity.createFromDTO(value[0]).getCssStyles()
        } ${
            SizeEntity.createFromDTO(value[1]).getCssStyles()
        }`;
    }

    if (isPairArrayOf<BackgroundPositionValue, SizeDTO>(value, isBackgroundPositionValue, isSizeDTO)) {
        return `${
            value[0]
        } ${
            SizeEntity.createFromDTO(value[1]).getCssStyles()
        }`;
    }

    if (isPairArrayOf<BackgroundPositionValue, BackgroundPositionValue>(value, isBackgroundPositionValue, isBackgroundPositionValue)) {
        return `${
            value[0]
        } ${
            value[1]
        }`;
    }

    if (isTripletArrayOf<BackgroundPositionValue, BackgroundPositionValue, SizeDTO>(value, isBackgroundPositionValue, isBackgroundPositionValue, isSizeDTO)) {
        return `${
            value[0]
        } ${
            value[1]
        } ${
            SizeEntity.createFromDTO(value[2]).getCssStyles()
        }`;
    }

    if (isTripletArrayOf<BackgroundPositionValue, SizeDTO, BackgroundPositionValue>(value, isBackgroundPositionValue, isSizeDTO, isBackgroundPositionValue)) {
        return `${
            value[0]
        } ${
            SizeEntity.createFromDTO(value[1]).getCssStyles()
        } ${
            value[2]
        }`;
    }

    if (isTetradArrayOf<BackgroundPositionValue, SizeDTO, BackgroundPositionValue, SizeDTO>(value, isBackgroundPositionValue, isSizeDTO, isBackgroundPositionValue, isSizeDTO)) {
        return `${
            value[0]
        } ${
            SizeEntity.createFromDTO(value[1]).getCssStyles()
        } ${
            value[2]
        } ${
            SizeEntity.createFromDTO(value[3]).getCssStyles()
        }`;
    }

    throw new TypeError(`getCssStylesForBackgroundPosition: Could not prepare CSS styles for ${value}`);
}
