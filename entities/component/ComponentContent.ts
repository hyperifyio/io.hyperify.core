// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    explainArrayOf,
    isArrayOf,
} from "../../types/Array";
import {
    explainNot,
    explainOk,
    explainOr,
} from "../../types/explain";
import { prefixLines } from "../../types/String";
import { isUndefined } from "../../types/undefined";
import {
    ComponentDTO,
    explainStringOrComponentDTO,
    isStringOrComponentDTO,
} from "./ComponentDTO";

export type ComponentContent = readonly (string|ComponentDTO)[];

export function isComponentContent ( value: unknown) : value is ComponentContent {
    return isArrayOf<string|ComponentDTO>(value, isStringOrComponentDTO);
}

export function explainComponentContent (value: any) : string {
    return isComponentContent(value) ? explainOk() : explainNot(
        `Array<string|ComponentDTO>(\n${prefixLines(explainArrayOf<string|ComponentDTO>(
            "string|ComponentDTO",
            explainStringOrComponentDTO,
            value,
            isStringOrComponentDTO
        ), '  ')}\n)`
    );

}

export function isComponentContentOrUndefined ( value: unknown) : value is ComponentContent | undefined {
    return isUndefined(value) || isComponentContent(value);
}

export function explainComponentContentOrUndefined ( value: unknown): string {
    return isComponentContentOrUndefined(value) ? explainOk() : explainNot(explainOr([
        `ComponentContent (\n${prefixLines(explainComponentContent(value), '  ')}\n)`,
        'undefined'
    ]));
}
