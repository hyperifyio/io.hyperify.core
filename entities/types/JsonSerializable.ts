// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";

export interface JsonSerializable {

    /**
     * Returns internal value (e.g. JSON presentation of the entity).
     */
    valueOf() : ReadonlyJsonObject;

    /**
     * Returns JSON presentation of the entity.
     */
    toJSON () : ReadonlyJsonObject;

}
