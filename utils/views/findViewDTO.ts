// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { find } from "../../functions/find";
import { LogService } from "../../LogService";
import {
    createViewDTO,
    ViewDTO,
} from "../../dto/ViewDTO";

const LOG = LogService.createLogger( 'findHyperViewDTO' );

export function findViewDTO (
    viewName : string,
    allViews : readonly ViewDTO[],
) : ViewDTO {
    const view : ViewDTO | undefined = find(
        allViews,
        (a: ViewDTO) : boolean => a.name === viewName
    );
    if (!view) {
        LOG.warn(`Warning! Could not find view by name: ${viewName}`);
        return createViewDTO(
            viewName,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
        );
    }
    return view;
}
