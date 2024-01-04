// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { DTO } from "../types/DTO";

export interface SeoDTO extends DTO {
    readonly title       ?: string;
    readonly description ?: string;
    readonly siteName    ?: string;
}
