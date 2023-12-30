// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentEntity } from "./ComponentEntity";

/**
 * Public interface of static `ComponentEntity`.
 */
export interface ComponentType {
    create (name ?: string) : ComponentEntity;
}
