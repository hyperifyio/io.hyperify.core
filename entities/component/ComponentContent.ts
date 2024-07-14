// Copyright (c) 2023-2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { prefixLines } from "../../functions/prefixLines";
import {
    explainArrayOf,
    isArrayOf,
} from "../../types/Array";
import {
    explainNot,
    explainOk,
    explainOr,
} from "../../types/explain";
import { isUndefined } from "../../types/undefined";
import { Component } from "./Component";
import {
    ComponentDTO,
} from "./ComponentDTO";
import {
    ComponentEntity,
    explainComponentDTOOrString,
    isComponentDTOOrString,
    isComponentOrString,
} from "./ComponentEntity";


export type UnreparedComponentContentItem = string | ComponentDTO | ComponentEntity | Component;
export type UnreparedComponentContentList = readonly UnreparedComponentContentItem[];
export type UnreparedComponentContent = UnreparedComponentContentItem | UnreparedComponentContentList;


export type ComponentContentItem = string | ComponentEntity | Component;
export type ComponentContent = readonly ComponentContentItem[];

export function isComponentContent ( value: unknown) : value is ComponentContent {
    return isArrayOf<ComponentContentItem>(value, isComponentOrString);
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



export type ComponentDTOContentItem = string | ComponentDTO;
export type ComponentDTOContent = readonly ComponentDTOContentItem[];

export function isComponentDTOContent ( value: unknown) : value is ComponentDTOContent {
    return isArrayOf<ComponentDTOContentItem>(value, isComponentDTOOrString);
}

