// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { DTO } from "../../dto/types/DTO";

/**
 * Type for DTO test function.
 * @returns `true` if value is type of T.
 */
export interface IsDTO<T extends DTO> {
    (value : unknown) : value is T;
}
