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
import { Component } from "./Component";
import {
    ComponentDTO,
} from "./ComponentDTO";
import {
    ComponentEntity,
    explainComponentDTOOrString,
    isComponentDTOOrString,
} from "./ComponentEntity";

export type UnreparedComponentContentItem = string | ComponentDTO | ComponentEntity | Component;
export type UnreparedComponentContentList = readonly UnreparedComponentContentItem[];
export type UnreparedComponentContent = UnreparedComponentContentItem | UnreparedComponentContentList;

export type ComponentContentItem = string | ComponentDTO;
export type ComponentContent = readonly ComponentContentItem[];

export function isComponentContent ( value: unknown) : value is ComponentContent {
    return isArrayOf<ComponentContentItem>(value, isComponentDTOOrString);
}

export function explainComponentContent (value: any) : string {
    return isComponentContent(value) ? explainOk() : explainNot(
        `Array<string|ComponentDTO>(\n${prefixLines(explainArrayOf<string|ComponentDTO|Component|ComponentEntity>(
            "string | ComponentDTO",
            explainComponentDTOOrString,
            value,
            isComponentDTOOrString
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
