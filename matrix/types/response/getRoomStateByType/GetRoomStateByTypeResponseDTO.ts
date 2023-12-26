// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isReadonlyJsonObject, ReadonlyJsonObject } from "../../../../../Json";
import { isUndefined } from "../../../../../types/undefined";
import { isStringOrUndefined } from "../../../../../types/String";
import { isNumberOrUndefined } from "../../../../../types/Number";
import { isRegularObject } from "../../../../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../../../../types/OtherKeys";

export interface GetRoomStateByTypeResponseDTO {
    readonly name    ?: string;
    readonly version ?: number;
    readonly data    ?: ReadonlyJsonObject;
}

export function createGetRoomStateByTypeResponseDTO (
    name    ?: string,
    version ?: number,
    data    ?: ReadonlyJsonObject
): GetRoomStateByTypeResponseDTO {
    return {
        name,
        version,
        data
    };
}

export function isGetRoomStateByTypeResponseDTO (value: any): value is GetRoomStateByTypeResponseDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'name',
            'version',
            'data'
        ])
        && isStringOrUndefined(value?.name)
        && isNumberOrUndefined(value?.version)
        && (isUndefined(value?.data) || isReadonlyJsonObject(value?.data))
    );
}

export function stringifyGetRoomStateByTypeResponseDTO (value: GetRoomStateByTypeResponseDTO): string {
    return `GetRoomStateByTypeResponseDTO(${value})`;
}

export function parseGetRoomStateByTypeResponseDTO (value: any): GetRoomStateByTypeResponseDTO | undefined {
    if ( isGetRoomStateByTypeResponseDTO(value) ) return value;
    return undefined;
}
