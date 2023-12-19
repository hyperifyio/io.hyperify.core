// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isPairArrayOf } from "../../types/Array";
import { explainNot, explainOk, explainOr } from "../../types/explain";
import { isUndefined } from "../../types/undefined";
import { SizeEntity } from "../size/SizeEntity";
import { isSizeDTO, SizeDTO } from "../size/SizeDTO";
import { BackgroundSize, isBackgroundSize } from "./BackgroundSize";

export type BackgroundSizeOptions  = (
    BackgroundSize
    | SizeDTO
    | [SizeDTO, SizeDTO]
);

export function createBackgroundSizeOptions (
    option : BackgroundSize,
) : BackgroundSize;

export function createBackgroundSizeOptions (
    size : SizeDTO,
) : SizeDTO;

export function createBackgroundSizeOptions (
    a : SizeDTO,
    b : SizeDTO,
) : [SizeDTO, SizeDTO];

export function createBackgroundSizeOptions (
    a : BackgroundSize | SizeDTO,
    b : SizeDTO | undefined = undefined,
) : BackgroundSizeOptions {
    if ( b === undefined && isBackgroundSize(a) ) {
        return a;
    }
    if (isSizeDTO(a)) {
        if (b === undefined) {
            return a;
        } else if (isSizeDTO(b)) {
            return [a, b];
        }
    }
    throw new TypeError(`Unsupported combination: ${a}, ${b}`);
}

export function isBackgroundSizeOptions (value: unknown) : value is BackgroundSizeOptions {
    return (
        isBackgroundSize(value)
        || isSizeDTO(value)
        || isPairArrayOf<SizeDTO, SizeDTO>(value, isSizeDTO, isSizeDTO)
    );
}

export function explainBackgroundSizeOptions (value: any) : string {
    return (
        isBackgroundSizeOptions(value) ? explainOk() : explainNot(
            explainOr([
                'BackgroundSize',
                'SizeDTO',
                '[SizeDTO, SizeDTO]',
            ])
        )
    );
}

export function stringifyBackgroundSizeOptions (value : BackgroundSizeOptions) : string {
    return `BackgroundSizeOptions(${value})`;
}

export function parseBackgroundSizeOptions (value: unknown) : BackgroundSizeOptions | undefined {
    if (isBackgroundSizeOptions(value)) return value;
    return undefined;
}

export function isBackgroundSizeOptionsOrUndefined (value: unknown): value is BackgroundSizeOptions | undefined {
    return isUndefined(value) || isBackgroundSizeOptions(value);
}

export function explainBackgroundSizeOptionsOrUndefined (value: unknown): string {
    return isBackgroundSizeOptionsOrUndefined(value) ? explainOk() : explainNot(explainOr(['BackgroundSizeOptions', 'undefined']));
}

export function getCssStylesForBackgroundSizeOptions (value : BackgroundSizeOptions) : string {

    if (isBackgroundSize(value)) {
        return `${value}`;
    }

    if (isSizeDTO(value)) {
        return `${ SizeEntity.createFromDTO(value).getCssStyles() }`;
    }

    if (isPairArrayOf<SizeDTO, SizeDTO>(value, isSizeDTO, isSizeDTO)) {
        return `${
            SizeEntity.createFromDTO(value[0]).getCssStyles()
        } ${
            SizeEntity.createFromDTO(value[1]).getCssStyles()
        }`;
    }

    throw new TypeError(`getCssStylesForBackgroundSizeOptions: Unsupported value: ${value}`);

}
