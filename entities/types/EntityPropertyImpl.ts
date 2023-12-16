// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { find } from "../../functions/find";
import { map } from "../../functions/map";
import { uniq } from "../../functions/uniq";
import { upperFirst } from "../../functions/upperFirst";
import { LogService } from "../../LogService";
import {
    isArray,
    isArrayOrUndefined,
} from "../../types/Array";
import { isBoolean } from "../../types/Boolean";
import { isNull } from "../../types/Null";
import {
    isInteger,
    isNumber,
} from "../../types/Number";
import { isString } from "../../types/String";
import { isUndefined } from "../../types/undefined";
import { DTO } from "./DTO";
import {
    isEntity,
} from "./Entity";
import {
    EntityProperty,
    EntityPropertyType,
    EntityPropertyValue,
    VariableType,
} from "./EntityProperty";
import {
    EntityType,
    isEntityType,
} from "./EntityType";

const LOG = LogService.createLogger('EntityPropertyImpl');

export class EntityPropertyImpl
    implements EntityProperty {


    ////////////////////////////////////////////////////////////////////////////
    //////////////////////////////  #create  ///////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * Create an entity property.
     *
     * @param name The name of the property
     * @param aliases The method aliases of the property
     */
    public static create (
        name : string,
        ...aliases : readonly string[]
    ) : EntityPropertyImpl {
        return new EntityPropertyImpl(
            name,
            aliases,
            [],
            undefined,
            false,
            true,
        );
    }


    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////  #createArray  /////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * Create an array property.
     *
     * @param name The name of the property
     * @param aliases The method aliases of the property
     */
    public static createArray (
        name : string,
        ...aliases : readonly string[]
    ) : EntityPropertyImpl {
        return new EntityPropertyImpl(
            name,
            aliases,
            [],
            [],
            true,
            false,
        );
    }


    /**
     * Create an array property which may be undefined.
     *
     * @param name The name of the property
     * @param aliases The method aliases of the property
     */
    public static createOptionalArray (
        name : string,
        ...aliases : readonly string[]
    ) : EntityPropertyImpl {
        return new EntityPropertyImpl(
            name,
            aliases,
            [],
            undefined,
            true,
            true,
        );
    }


    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////  #createDefaultValueFromTypes  /////////////////////
    ////////////////////////////////////////////////////////////////////////////


    public static createDefaultValueFromTypes (
        types: readonly EntityPropertyType[],
    ) : EntityPropertyValue {
        if ( types.length === 0 || types.includes(VariableType.UNDEFINED) ) return undefined;
        if ( types.includes(VariableType.NULL) ) return null;
        if ( types.includes(VariableType.STRING) ) return "";
        if ( types.includes(VariableType.NUMBER) ) return 0;
        if ( types.includes(VariableType.INTEGER) ) return 0;
        if ( types.includes(VariableType.BOOLEAN) ) return false;

        const Type : EntityPropertyType | undefined = find(
            types,
            (item : EntityPropertyType) => isEntityType(item)
        ) as EntityType<DTO, any>;

        if ( Type !== undefined ) {
            return Type.create();
        }

        return undefined;
    }


    ////////////////////////////////////////////////////////////////////////////
    ////////////////////  #getEntityPropertyTypeFromVariable  //////////////////
    ////////////////////////////////////////////////////////////////////////////


    public static getEntityPropertyTypeFromVariable (
        value: EntityPropertyValue
    ) : EntityPropertyType {
        if (isString(value)) return VariableType.STRING;
        if (isInteger(value)) return VariableType.INTEGER;
        if (isNumber(value)) return VariableType.NUMBER;
        if (isBoolean(value)) return VariableType.BOOLEAN;
        if (isNull(value)) return VariableType.NULL;
        if (isUndefined(value)) return VariableType.UNDEFINED;
        if (isEntity(value)) return value.getEntityType();
        throw new TypeError(`The value was of unsupported type: "${value}"`)
    }


    ////////////////////////////////////////////////////////////////////////////
    /////////////////////////  private properties  /////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * The name of the property.
     *
     * @private
     */
    private readonly _name : string;

    /**
     * Alias names of methods.
     *
     * These aliases are only used for methods. It will not create support for
     * alias DTO properties.
     *
     * @private
     */
    private readonly _methodAliases : readonly string[];

    /**
     * Type(s) of the property.
     *
     * @private
     */
    private _types : readonly EntityPropertyType[];

    /**
     * The default value of the property.
     *
     * @private
     */
    private _defaultValue : EntityPropertyValue;

    /**
     * `true` if this property is an array type.
     *
     * @private
     */
    private readonly _isArray : boolean;

    /**
     * `true` if this property is may be undefined.
     *
     * @private
     */
    private readonly _isOptional : boolean;

    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////  protected constructor  ///////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * Construct the property entity.
     *
     * @param name The name of the property
     * @param types Types of the property
     * @param defaultValue Default value
     * @param isArray True if this property is an array.
     * @param isOptional True if this property may be undefined.
     * @protected
     */
    protected constructor (
        name : string,
        methodAliases : readonly string[],
        types : readonly EntityPropertyType[],
        defaultValue : EntityPropertyValue,
        isArray : boolean,
        isOptional : boolean,
    ) {
        this._name = name;
        this._methodAliases = methodAliases;
        this._types = types;
        this._defaultValue = defaultValue;
        this._isArray = isArray;
        this._isOptional = isOptional;
    }


    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////  public methods  ///////////////////////////////
    ////////////////////////////////////////////////////////////////////////////



    /**
     * @inheritDoc
     */
    public getPropertyName () : string {
        return this._name;
    }

    /**
     * @inheritDoc
     */
    public getMethodAliases () : readonly string[] {
        return this._methodAliases;
    }

    /**
     * @inheritDoc
     */
    public isArray () : boolean {
        return this._isArray;
    }

    /**
     * @inheritDoc
     */
    public isOptional () : boolean {
        return this._isOptional;
    }

    /**
     * @inheritDoc
     */
    public getTypes () : readonly EntityPropertyType[] {
        return this._types;
    }

    /**
     * @inheritDoc
     */
    public setTypes (
        ...types : readonly EntityPropertyType[]
    ): this {
        this._types = types;
        if (this._isArray) {
            this._defaultValue = this._isOptional ? undefined : [];
        } else {
            this._defaultValue = EntityPropertyImpl.createDefaultValueFromTypes(types);
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public types (
        ...types : readonly EntityPropertyType[]
    ) : this {
        return this.setTypes(...types);
    }

    /**
     * @inheritDoc
     */
    public getDefaultValue () : EntityPropertyValue {
        return this._defaultValue;
    }

    /**
     * @inheritDoc
     */
    public setDefaultValue (value: EntityPropertyValue) : this {

        if (this._isArray) {
            if (this._isOptional) {
                if (!isArrayOrUndefined(value) ) {
                    LOG.warn(`Warning! The default value provided to .setDefaultValue() was not an array or undefined. This may be a bug. Value: `, value);
                }
            } else {
                if (!isArray(value) ) {
                    LOG.warn(`Warning! The default value provided to .setDefaultValue() was not an array. This may be a bug. Value: `, value);
                }
            }
        }

        this._defaultValue = value;

        if (!this._types.length) {
            if (this._isArray) {
                if (isArray(value)) {
                    this._types = uniq(map(
                        value,
                        (item) => EntityPropertyImpl.getEntityPropertyTypeFromVariable(item)
                    ));
                }
            } else {
                this._types = uniq([
                    EntityPropertyImpl.getEntityPropertyTypeFromVariable(value)
                ]);
            }
        }

        return this;
    }

    /**
     * @inheritDoc
     */
    public defaultValue (value: EntityPropertyValue) : this {
        return this.setDefaultValue(value);
    }

    /**
     * @inheritDoc
     */
    public getGetterNames () : readonly string[] {
        const propertyName : string = this.getPropertyName();
        const getterName : string = `get${ upperFirst(propertyName) }`;
        return [
            getterName,
            ...(map(
                this.getMethodAliases(),
                (alias) => `get${ upperFirst( alias ) }`
            )),
        ];
    }

    /**
     * @inheritDoc
     */
    public getSetterNames () : readonly string[] {
        const propertyName : string = this.getPropertyName();
        return [
            `set${ upperFirst(propertyName) }`,
            ...(map(
                this.getMethodAliases(),
                (alias) => `set${ upperFirst( alias ) }`
            )),
            `${ propertyName }`,
            ...(map(
                this.getMethodAliases(),
                (alias) => `${ alias }`
            )),
        ];
    }

}
