// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentDTO } from "../../../entities/component/ComponentDTO";
import { ComponentEntity } from "../../../entities/component/ComponentEntity";
import { TEXT_COMPONENT_NAME } from "./TextComponent";

export type Text = ComponentDTO;

export function createText (
    name: string,
    text: string,
) : Text {
    return (
        ComponentEntity.create(name)
                       .extend(TEXT_COMPONENT_NAME)
                       .setContent([text])
                       .getDTO()
    );
}
