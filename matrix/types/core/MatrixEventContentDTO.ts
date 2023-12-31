// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { isString } from "../../../types/String";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";

export interface MatrixEventContentDTO {
    readonly body: string;
    readonly msgtype: string;
}

export function isMatrixEventContentDTO (value: any): value is MatrixEventContentDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'body',
            'msgtype'
        ])
        && isString(value?.body)
        && isString(value?.msgtype)
    );
}

export function stringifyMatrixEventContentDTO (value: MatrixEventContentDTO): string {
    return `MatrixEventContentDTO(${value})`;
}

export function parseMatrixEventContentDTO (value: any): MatrixEventContentDTO | undefined {
    if ( isMatrixEventContentDTO(value) ) return value;
    return undefined;
}


