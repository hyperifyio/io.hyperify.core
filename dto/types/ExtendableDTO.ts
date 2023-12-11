// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { DTO } from "./DTO";
import { DTOWithName } from "./DTOWithName";
import { DTOWithOptionalExtend } from "./DTOWithOptionalExtend";

/**
 * Interface for extendable DTOs.
 */
export interface ExtendableDTO
    extends
        DTO,
        DTOWithName,
        DTOWithOptionalExtend
{

    /**
     * @inheritDoc
     */
    readonly name    : string;

    /**
     * @inheritDoc
     */
    readonly extend ?: string | undefined;

}
