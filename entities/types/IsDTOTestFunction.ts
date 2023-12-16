// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { DTO } from "./DTO";

/**
 * Type for DTO test function.
 * @returns `true` if value is type of T.
 */
export interface IsDTOTestFunction<T extends DTO> {
    (value : unknown) : value is T;
}

/**
 * Type for DTO test function which supports other types.
 *
 * @returns `true` if value is type of D or T.
 */
export interface IsDTOOrTestFunction<D extends DTO, T> {
    (value : unknown) : value is D | T;
}

/**
 * A function which explains results of DTO test functions.
 *
 * @returns Human readable explanation why a type check wasn't accepted or if it was.
 */
export interface IsDTOExplainFunction {
    (value : unknown) : string;
}
