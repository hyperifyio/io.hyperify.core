// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ActionEntity } from "../../entities/action/ActionEntity";
import { ReadonlyJsonAny } from "../../Json";
import { isString } from "../../types/String";
import { ComponentEntity } from "../../entities/component/ComponentEntity";
import { ActionDTO } from "../../entities/action/ActionDTO";
import { ACTION_BUTTON_COMPONENT_NAME } from "./ActionButtonComponent";

export class ActionButtonEntity extends ComponentEntity {

    protected constructor (name : string) {
        super(name);
        this.extend(ACTION_BUTTON_COMPONENT_NAME);
    }

    public static create (name : string) : ActionButtonEntity {
        return new ActionButtonEntity(name);
    }

    public static createButton (
        name: string,
        dto: ActionDTO | string,
    ) : ActionButtonEntity {

        if (isString(dto)) {
            return this.createButton(
                name,
                ActionEntity.create()
                            .label('')
                            .target(dto)
                            .method('link')
                            .getDTO()
            );
        }

        const text = dto.label;
        const href = dto.target;
        const method = dto.method ?? 'POST';
        const body = dto.body;
        const successRedirect = dto.successRedirect;
        const failureRedirect = dto.errorRedirect;

        return this.create(name).addText(text).setMeta(
            {
                href,
                successRedirect: successRedirect as unknown as ReadonlyJsonAny,
                failureRedirect: failureRedirect as unknown as ReadonlyJsonAny,
                method: method.toUpperCase(),
                body,
            }
        );

    }

}
