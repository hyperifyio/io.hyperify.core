// Copyright (c) 2020-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

export interface ParserCallback<T> {
    (value: any): T | undefined;
}
