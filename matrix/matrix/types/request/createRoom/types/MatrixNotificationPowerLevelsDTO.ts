// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { isUndefined } from "../../../../../../types/undefined";
import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../../../../../types/explain";
import { explainNumberOrUndefined, isNumberOrUndefined } from "../../../../../../types/Number";
import { explainRegularObject, isRegularObject } from "../../../../../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeysInDevelopment } from "../../../../../../types/OtherKeys";

export interface MatrixNotificationPowerLevelsDTO {
    readonly room: number;
}

export function isMatrixNotificationPowerLevelsDTO (value: any): value is MatrixNotificationPowerLevelsDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'room'
        ])
        && isNumberOrUndefined(value?.room)
    );
}

export function explainMatrixNotificationPowerLevelsDTO (value: any): string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'room'
            ]),
            explainProperty("room", explainNumberOrUndefined(value?.room))
        ]
    );
}

export function isMatrixNotificationPowerLevelsDTOOrUndefined (value: any): value is MatrixNotificationPowerLevelsDTO | undefined {
    return isUndefined(value) || isMatrixNotificationPowerLevelsDTO(value);
}

export function explainMatrixNotificationPowerLevelsDTOOrUndefined (value: any): string {
    return isMatrixNotificationPowerLevelsDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(["MatrixNotificationPowerLevelsDTO", "undefined"]));
}

export function stringifyMatrixNotificationPowerLevelsDTO (value: MatrixNotificationPowerLevelsDTO): string {
    return `MatrixNotificationPowerLevelsDTO(${value})`;
}

export function parseMatrixNotificationPowerLevelsDTO (value: any): MatrixNotificationPowerLevelsDTO | undefined {
    if ( isMatrixNotificationPowerLevelsDTO(value) ) return value;
    return undefined;
}


