// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

export enum SpecialSize {
    AUTO = "auto"
}

export function isAutoSpecialSize ( value : unknown ) : value is SpecialSize.AUTO {
    return value === SpecialSize.AUTO;
}
