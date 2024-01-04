// Copyright (c) 2023-2024. Sendanor <info@sendanor.fi>. All rights reserved.

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
import {
    isEntity,
} from "./Entity";
import {
    EntityProperty,
} from "./EntityProperty";
import { EntityTypeCheckFactory } from "./EntityTypeCheckFactory";
import {
    EntityVariableType,
    EntityVariableValue,
} from "./EntityVariableType";
import {
    VariableType,
} from "./VariableType";

const LOG = LogService.createLogger('EntityPropertyImpl');

export class EntityPropertyImpl
    implements EntityProperty {


    ////////////////////////////////////////////////////////////////////////////
    //////////////////////////////  #create  ///////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * Create an entity property.
     *
     * @param entityTypeCheckFactory Type check function factory
     * @param name The name of the property
     * @param aliases The method aliases of the property
     */
    public static create (
        entityTypeCheckFactory: EntityTypeCheckFactory,
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
            entityTypeCheckFactory,
        );
    }


    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////  #createArray  /////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * Create an array property.
     *
     * @param entityTypeCheckFactory
     * @param name The name of the property
     * @param aliases The method aliases of the property
     */
    public static createArray (
        entityTypeCheckFactory: EntityTypeCheckFactory,
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
            entityTypeCheckFactory,
        );
    }


    /**
     * Create an array property which may be undefined.
     *
     * @param entityTypeCheckFactory
     * @param name The name of the property
     * @param aliases The method aliases of the property
     */
    public static createOptionalArray (
        entityTypeCheckFactory: EntityTypeCheckFactory,
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
            entityTypeCheckFactory,
        );
    }




    ////////////////////////////////////////////////////////////////////////////
    ////////////////////  #getEntityPropertyTypeFromVariable  //////////////////
    ////////////////////////////////////////////////////////////////////////////


    public static getEntityPropertyTypeFromVariable (
        value: EntityVariableValue
    ) : EntityVariableType {
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
    private _types : readonly EntityVariableType[];

    /**
     * The default value of the property.
     *
     * @private
     */
    private _defaultValue : EntityVariableValue;

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

    /**
     * Type check function factory
     *
     * @private
     */
    private readonly _entityTypeCheckFactory : EntityTypeCheckFactory;

    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////  protected constructor  ///////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * Construct the property entity.
     *
     * @param name The name of the property
     * @param methodAliases Alias names for the property
     * @param types Types of the property
     * @param defaultValue Default value
     * @param isArray True if this property is an array.
     * @param isOptional True if this property may be undefined.
     * @param entityTypeCheckFactory Type check factory
     * @protected
     */
    protected constructor (
        name : string,
        methodAliases : readonly string[],
        types : readonly EntityVariableType[],
        defaultValue : EntityVariableValue,
        isArray : boolean,
        isOptional : boolean,
        entityTypeCheckFactory : EntityTypeCheckFactory,
    ) {
        this._name = name;
        this._methodAliases = methodAliases;
        this._types = types;
        this._defaultValue = defaultValue;
        this._isArray = isArray;
        this._isOptional = isOptional;
        this._entityTypeCheckFactory = entityTypeCheckFactory;
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
    public getTypes () : readonly EntityVariableType[] {
        return this._types;
    }

    /**
     * @inheritDoc
     */
    public setTypes (
        ...types : readonly EntityVariableType[]
    ): this {
        this._types = types;
        if (this._isArray) {
            this._defaultValue = this._isOptional ? undefined : [];
        } else {
            this._defaultValue = this._entityTypeCheckFactory.createDefaultValueFromTypes(types);
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public types (
        ...types : readonly EntityVariableType[]
    ) : this {
        return this.setTypes(...types);
    }

    /**
     * @inheritDoc
     */
    public getDefaultValue () : EntityVariableValue {
        return this._defaultValue;
    }

    /**
     * @inheritDoc
     */
    public setDefaultValue (value: EntityVariableValue) : this {

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
    public defaultValue (value: EntityVariableValue) : this {
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
