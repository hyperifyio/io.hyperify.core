// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { DTO } from "../../dto/types/DTO";
import { Entity } from "./Entity";
import { Extendable } from "./Extendable";

export interface ExtendableEntity<T extends DTO>
    extends
        Extendable,
        Entity<T>
{


}
