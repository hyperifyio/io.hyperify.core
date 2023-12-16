// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { isPairArrayOf, isTetradArrayOf, isTripletArrayOf } from "../../types/Array";
import { explainNot, explainOk, explainOr } from "../../types/explain";
import { isUndefined } from "../../types/undefined";
import { SizeEntity } from "../size/SizeEntity";
import { isSizeDTO, SizeDTO } from "../size/SizeDTO";
import { BackgroundPosition, isBackgroundPosition } from "./BackgroundPosition";

export type BackgroundPositionOptions = (
    BackgroundPosition
    | [ BackgroundPosition, BackgroundPosition ]
    | [ BackgroundPosition, SizeDTO, BackgroundPosition ]
    | [ BackgroundPosition, BackgroundPosition, SizeDTO ]
    | [ BackgroundPosition, SizeDTO ]
    | [ SizeDTO, SizeDTO ]
    | [ BackgroundPosition, SizeDTO, BackgroundPosition, SizeDTO ]
);

/**
 *
 * @param a
 */
export function createBackgroundPositionOptions (
    a : BackgroundPosition,
) : BackgroundPosition;

/**
 *
 * @param a
 * @param b
 */
export function createBackgroundPositionOptions (
    a : BackgroundPosition,
    b : BackgroundPosition,
) : [ BackgroundPosition, BackgroundPosition ];

/**
 *
 * @param a
 * @param aSize
 * @param c
 */
export function createBackgroundPositionOptions (
    a : BackgroundPosition,
    aSize : SizeDTO,
    c : BackgroundPosition,
) : [ BackgroundPosition, SizeDTO, BackgroundPosition ];

/**
 *
 * @param a
 * @param b
 * @param bSize
 */
export function createBackgroundPositionOptions (
    a : BackgroundPosition,
    b : BackgroundPosition,
    bSize : SizeDTO,
) : [ BackgroundPosition, BackgroundPosition, SizeDTO ];

/**
 *
 * @param a
 * @param size
 */
export function createBackgroundPositionOptions (
    a : BackgroundPosition,
    size : SizeDTO,
) : [ BackgroundPosition, SizeDTO ];

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
    a : BackgroundPosition,
    aSize : SizeDTO,
    b : BackgroundPosition,
    bSize : SizeDTO,
) : [ BackgroundPosition, SizeDTO, BackgroundPosition, SizeDTO ];

export function createBackgroundPositionOptions (
    a  : BackgroundPosition | SizeDTO,
    b ?: BackgroundPosition | SizeDTO,
    c ?: BackgroundPosition | SizeDTO,
    d ?: BackgroundPosition | SizeDTO,
) : BackgroundPositionOptions {
    if (isBackgroundPosition(a)) {
        if ( b === undefined && c === undefined && d === undefined ) {
            return a;
        } else if ( isBackgroundPosition(b) ) {
            if ( c === undefined && d === undefined ) {
                return [a, b];
            } else if ( isSizeDTO(c) && d === undefined ) {
                return [a, b, c];
            }
        } else if ( isSizeDTO(b) ) {
            if ( c === undefined && d === undefined ) {
                return [a, b];
            } else if ( isBackgroundPosition(c) ) {
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
        isBackgroundPosition(value)
        || isPairArrayOf<SizeDTO, SizeDTO>(value, isSizeDTO, isSizeDTO)
        || isPairArrayOf<BackgroundPosition, SizeDTO>(value, isBackgroundPosition, isSizeDTO)
        || isPairArrayOf<BackgroundPosition, BackgroundPosition>(value, isBackgroundPosition, isBackgroundPosition)
        || isTripletArrayOf<BackgroundPosition, BackgroundPosition, SizeDTO>(value, isBackgroundPosition, isBackgroundPosition, isSizeDTO)
        || isTripletArrayOf<BackgroundPosition, SizeDTO, BackgroundPosition>(value, isBackgroundPosition, isSizeDTO, isBackgroundPosition)
        || isTetradArrayOf<BackgroundPosition, SizeDTO, BackgroundPosition, SizeDTO>(value, isBackgroundPosition, isSizeDTO, isBackgroundPosition, isSizeDTO)
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

    if (isBackgroundPosition(value)) {
        return `${value}`;
    }

    if (isPairArrayOf<SizeDTO, SizeDTO>(value, isSizeDTO, isSizeDTO)) {
        return `${
            SizeEntity.createFromDTO(value[0]).getCssStyles()
        } ${
            SizeEntity.createFromDTO(value[1]).getCssStyles()
        }`;
    }

    if (isPairArrayOf<BackgroundPosition, SizeDTO>(value, isBackgroundPosition, isSizeDTO)) {
        return `${
            value[0]
        } ${
            SizeEntity.createFromDTO(value[1]).getCssStyles()
        }`;
    }

    if (isPairArrayOf<BackgroundPosition, BackgroundPosition>(value, isBackgroundPosition, isBackgroundPosition)) {
        return `${
            value[0]
        } ${
            value[1]
        }`;
    }

    if (isTripletArrayOf<BackgroundPosition, BackgroundPosition, SizeDTO>(value, isBackgroundPosition, isBackgroundPosition, isSizeDTO)) {
        return `${
            value[0]
        } ${
            value[1]
        } ${
            SizeEntity.createFromDTO(value[2]).getCssStyles()
        }`;
    }

    if (isTripletArrayOf<BackgroundPosition, SizeDTO, BackgroundPosition>(value, isBackgroundPosition, isSizeDTO, isBackgroundPosition)) {
        return `${
            value[0]
        } ${
            SizeEntity.createFromDTO(value[1]).getCssStyles()
        } ${
            value[2]
        }`;
    }

    if (isTetradArrayOf<BackgroundPosition, SizeDTO, BackgroundPosition, SizeDTO>(value, isBackgroundPosition, isSizeDTO, isBackgroundPosition, isSizeDTO)) {
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
