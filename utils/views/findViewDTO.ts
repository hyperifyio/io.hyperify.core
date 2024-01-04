// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ViewEntity } from "../../entities/view/ViewEntity";
import { find } from "../../functions/find";
import { LogService } from "../../LogService";
import { ViewDTO } from "../../entities/view/ViewDTO";
import { LogLevel } from "../../types/LogLevel";

const LOG = LogService.createLogger( 'findViewDTO' );

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
        return ViewEntity.create(viewName).getDTO();
    }
    return view;
}

findViewDTO.setLogger = (level: LogLevel) : void => {
    LOG.setLogLevel(level);
};
