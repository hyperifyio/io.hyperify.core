// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ViewDTO } from "../../dto/ViewDTO";
import { findViewDTO } from "./findViewDTO";
import { populateViewDTO } from "./populateViewDTO";

export function findAndPopulateViewDTO (
    viewName : string,
    allViews : readonly ViewDTO[],
    publicUrl : string,
) : ViewDTO {
    const view : ViewDTO = populateViewDTO(
        findViewDTO(viewName, allViews),
        allViews,
        publicUrl,
    );
    return {
        ...view,
        name: viewName,
    };
}
