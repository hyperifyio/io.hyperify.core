// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { EnumUtils } from "../../EnumUtils";
import { find } from "../../functions/find";
import { map } from "../../functions/map";
import { uniq } from "../../functions/uniq";
import { isReadonlyJsonAny } from "../../Json";
import { LogService } from "../../LogService";
import { isBoolean } from "../../types/Boolean";
import {
    isEnum,
    isEnumType,
} from "../../types/Enum";
import {
    explainNot,
    explainOk,
    explainOneOf,
} from "../../types/explain";
import { isNull } from "../../types/Null";
import {
    isInteger,
    isNumber,
} from "../../types/Number";
import { isString } from "../../types/String";
import { isUndefined } from "../../types/undefined";
import { ChainOperation } from "./ChainOperation";
import { DTO } from "./DTO";
import {
    TypeCheckFn,
    TypeExplainFn,
} from "./EntityFactory";
import {
    EntityType,
    isEntityType,
} from "./EntityType";
import { EntityTypeCheckFactory } from "./EntityTypeCheckFactory";
import { EntityTypeRegistry } from "./EntityTypeRegistry";
import {
    EntityVariableType,
    EntityVariableValue,
} from "./EntityVariableType";
import { TypeCheckFunctionUtils } from "./TypeCheckFunctionUtils";
import {
    isVariableType,
    VariableType,
} from "./VariableType";

const LOG = LogService.createLogger( 'EntityTypeCheckFactoryImpl' );

/**
 *
 */
export class EntityTypeCheckFactoryImpl
    implements EntityTypeCheckFactory
{


    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////  #create  //////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    public static create (
        entities : EntityTypeRegistry
    ) : EntityTypeCheckFactoryImpl {
        return new EntityTypeCheckFactoryImpl(entities);
    }


    ////////////////////////////////////////////////////////////////////////////
    //////////////////////////  private properties  ////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    private readonly _entities : EntityTypeRegistry;


    ////////////////////////////////////////////////////////////////////////////
    /////////////////////////////  #constructor  ///////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    protected constructor (
        entities: EntityTypeRegistry
    ) {
        this._entities = entities;
    }


    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////  #createDefaultValueFromTypes  /////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * @inheritDoc
     */
    public createDefaultValueFromTypes (
        types: readonly EntityVariableType[],
    ) : EntityVariableValue {
        if ( types.length === 0 || types.includes(VariableType.UNDEFINED) ) return undefined;
        if ( types.includes(VariableType.NULL) ) return null;
        if ( types.includes(VariableType.STRING) ) return "";
        if ( types.includes(VariableType.NUMBER) ) return 0;
        if ( types.includes(VariableType.INTEGER) ) return 0;
        if ( types.includes(VariableType.BOOLEAN) ) return false;

        const Type : EntityVariableType | undefined = find(
            types,
            (item : EntityVariableType) => isEntityType(item)
        ) as EntityType<DTO, any>;

        if ( Type !== undefined ) {
            return Type.create();
        }

        return undefined;
    }


    ////////////////////////////////////////////////////////////////////////////
    /////////////////////  #createChainedTypeCheckFunction  ////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * @inheritDoc
     */
    public createChainedTypeCheckFunction (
        op: ChainOperation,
        types: readonly EntityVariableType[],
        useDtoCheck : boolean | "both",
    ) : TypeCheckFn {
        const functions= map(
            uniq(types),
            (item: EntityVariableType) : TypeCheckFn => this.createTypeCheckFunction(item, useDtoCheck)
        );
        return TypeCheckFunctionUtils.createChainedFunction(op, functions);
    }


    ////////////////////////////////////////////////////////////////////////////
    //////////////////////////  #createTypeCheckFn  ////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * @inheritDoc
     */
    public createTypeCheckFunction (
        item: EntityVariableType,
        useDtoCheck : boolean | "both",
    ) : TypeCheckFn {

        if ( isString(item) && !isVariableType(item) ) {
            const Type = this._entities.findType(item);
            if ( Type ) {
                item = Type;
            } else {
                throw new TypeError(`EntityTypeCheckFactoryImpl.createTypeCheckFunction(): Could not initialize entity by name: ${item}`);
            }
        }

        if ( isEntityType(item) ) {
            if (useDtoCheck === "both") {
                const isDTO = item.isDTO.bind(item);
                const isEntity = item.isEntity.bind(item);
                return (value: unknown) : boolean => isDTO(value) || isEntity(value);
            }
            const isFn = useDtoCheck ? item.isDTO.bind( item ) : item.isEntity.bind( item );
            return (value: unknown) : boolean => isFn(value);
        } else if (isEnumType<any>(item)) {
            let enumType = item;
            return (value: unknown) : boolean => isEnum<any>(enumType, value);
        }

        switch (item) {
            case VariableType.JSON: return (value: unknown) : boolean => isReadonlyJsonAny(value);
            case VariableType.BOOLEAN: return (value: unknown) : boolean => isBoolean(value);
            case VariableType.STRING: return (value: unknown) : boolean => isString(value);
            case VariableType.INTEGER: return (value: unknown) : boolean => isInteger(value);
            case VariableType.NUMBER: return (value: unknown) : boolean => isNumber(value);
            case VariableType.NULL: return (value: unknown) : boolean => isNull(value);
            case VariableType.UNDEFINED: return (value: unknown) : boolean => isUndefined(value);
            default: throw new TypeError(`EntityTypeCheckFactoryImpl.createTypeCheckFunction: Unknown variable type: ${item}`);
        }

    }


    ////////////////////////////////////////////////////////////////////////////
    ////////////////////  #createChainedTypeExplainFunction  ///////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * @inheritDoc
     */
    public createChainedTypeExplainFunction (
        op: ChainOperation,
        types: readonly EntityVariableType[],
        useDtoCheck : boolean | "both",
    ) : TypeExplainFn {
        if (!types.length) throw new TypeError(`createChainedTypeExplainFunction: There must be at least one type`);
        try {
            const isType = this.createChainedTypeCheckFunction(op, types, useDtoCheck);
            const typeNames : string[] = this.getTypeNameList(types);
            const explainNotOneOf : string = explainNot( explainOneOf(typeNames) );
            const ok = explainOk();
            return (value : unknown) : string => isType(value) ? ok : explainNotOneOf;
        } catch (err) {
            LOG.debug(`Error in createChainedTypeExplainFunction(): `, err);
            throw new Error(`createChainedTypeExplainFunction: Error: ${err}`);
        }
    }


    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////  #getTypeNameList  /////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * @inheritDoc
     */
    public getTypeNameList (
        types: readonly EntityVariableType[]
    ) : string[] {
        return map(
            types,
            (item: EntityVariableType) : string => this.getTypeName( item ),
        );
    }


    ////////////////////////////////////////////////////////////////////////////
    //////////////////////////////  #getTypeName  //////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * @inheritDoc
     */
    public getTypeName (
        item: EntityVariableType
    ) : string {

        if ( isString(item) && !isVariableType(item) ) {
            const Type = this._entities.findType(item);
            if ( Type ) {
                item = Type;
            } else {
                throw new TypeError(`EntityFactoryImpl._getTypeName(): Could not initialize entity by name: ${item}`);
            }
        }

        if (isEntityType(item)) {
            return item.getEntityName();
        } else if (isEnumType<any>(item)) {
            return `enum (${EnumUtils.getValues<any>(item).join(' | ')})`;
        }

        switch (item) {
            case VariableType.JSON: return 'json';
            case VariableType.BOOLEAN: return 'boolean';
            case VariableType.STRING: return 'string';
            case VariableType.INTEGER: return 'integer';
            case VariableType.NUMBER: return 'number';
            case VariableType.NULL: return 'null';
            case VariableType.UNDEFINED: return 'undefined';
            default: throw new TypeError(`createTypeExplainFn: Unknown variable type: ${item}`);
        }
    }


}
