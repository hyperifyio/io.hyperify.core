// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

export interface DTOWithContent<T> {
    readonly content : string | T | readonly (string|T)[];
}
