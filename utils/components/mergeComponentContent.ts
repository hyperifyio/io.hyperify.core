// Copyright (c) 2023-2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentDTOContent } from "../../entities/component/ComponentContent";
import { isArray } from "../../types/Array";

export function mergeComponentContent (
    a: ComponentDTOContent | undefined,
    b: ComponentDTOContent | undefined,
) : ComponentDTOContent {
    return [
        ...(a !== undefined ? ( isArray( a ) ? a : [ a ] ) : []),
        ...(b !== undefined ? ( isArray( b ) ? b : [ b ] ) : []),
    ];
}
