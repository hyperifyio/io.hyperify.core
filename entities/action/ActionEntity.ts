// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { reduce } from "../../functions/reduce";
import { EntityFactoryImpl } from "../types/EntityFactoryImpl";
import { VariableType } from "../types/VariableType";
import {
    Action,
    isAction,
} from "./Action";
import { ActionDTO } from "./ActionDTO";

export const ActionEntityFactory = (
    EntityFactoryImpl.create<ActionDTO, Action>("Action")
                     .add( EntityFactoryImpl.createProperty("label").setTypes(VariableType.STRING) )
                     .add( EntityFactoryImpl.createProperty("target").setTypes(VariableType.STRING) )
                     .add( EntityFactoryImpl.createProperty("method").setTypes(VariableType.STRING) )
                     .add( EntityFactoryImpl.createProperty("body").setTypes(VariableType.JSON, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("successRedirect").setTypes(VariableType.STRING, "Action", VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("errorRedirect").setTypes(VariableType.STRING, "Action", VariableType.UNDEFINED) )
);

export const isActionDTO = ActionEntityFactory.createTestFunctionOfDTO();

export const explainActionDTO = ActionEntityFactory.createExplainFunctionOfDTO();

export const isActionDTOOrUndefined = ActionEntityFactory.createTestFunctionOfDTOorOneOf<ActionDTO|undefined>(VariableType.UNDEFINED);

export const explainActionDTOOrUndefined = ActionEntityFactory.createExplainFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const isActionDTOOrStringOrUndefined = ActionEntityFactory.createTestFunctionOfDTOorOneOf<ActionDTO|string|undefined>(VariableType.STRING, VariableType.UNDEFINED);

export const explainActionDTOOrStringOrUndefined = ActionEntityFactory.createExplainFunctionOfDTOorOneOf(VariableType.STRING, VariableType.UNDEFINED);

export const BaseActionEntity = ActionEntityFactory.createEntityType();

/**
 * Action entity.
 */
export class ActionEntity
    extends BaseActionEntity
    implements Action
{

    /**
     * Creates a Action entity.
     *
     * @param value The optional DTO of Action
     */
    public static create (
        value ?: ActionDTO,
    ) : ActionEntity {
        return new ActionEntity(value);
    }

    /**
     * Creates a Action entity from DTO.
     *
     * @param dto The optional DTO of Action
     */
    public static createFromDTO (
        dto : ActionDTO,
    ) : ActionEntity {
        return new ActionEntity(dto);
    }

    /**
     * Merges multiple values as one entity.
     */
    public static merge (
        ...values: readonly (ActionDTO | Action | ActionEntity)[]
    ) : ActionEntity {
        return ActionEntity.createFromDTO(
            reduce(
                values,
                (
                    prev: ActionDTO,
                    item: ActionDTO | Action | ActionEntity,
                ) : ActionDTO => {
                    const dto : ActionDTO = this.toDTO(item);
                    return {
                        ...prev,
                        ...dto,
                    };
                },
                ActionEntityFactory.createDefaultDTO(),
            )
        );
    }

    /**
     * Normalizes the value as a DTO.
     */
    public static toDTO (
        value: ActionDTO | Action | ActionEntity,
    ) : ActionDTO {
        if (isActionEntity(value)) {
            return value.getDTO();
        } else if (isAction(value)) {
            return value.getDTO();
        } else {
            return value;
        }
    }

    /**
     * Construct an entity of ActionEntity.
     */
    public constructor (
        dto ?: ActionDTO | undefined,
    ) {
        super(dto);
    }

}

export function isActionEntity (value: unknown): value is ActionEntity {
    return value instanceof ActionEntity;
}
