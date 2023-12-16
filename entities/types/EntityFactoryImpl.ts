// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { EnumUtils } from "../../EnumUtils";
import { filter } from "../../functions/filter";
import { forEach } from "../../functions/forEach";
import { has } from "../../functions/has";
import { map } from "../../functions/map";
import { reduce } from "../../functions/reduce";
import { some } from "../../functions/some";
import {
    ReadonlyJsonObject,
} from "../../Json";
import { isArray } from "../../types/Array";
import {
    isBoolean,
} from "../../types/Boolean";
import {
    EnumType,
    isEnum,
    isEnumType,
} from "../../types/Enum";
import {
    explain,
    explainNot,
    explainOk,
    explainProperty,
} from "../../types/explain";
import {
    isNull,
} from "../../types/Null";
import {
    isInteger,
    isNumber,
} from "../../types/Number";
import {
    explainNoOtherKeysInDevelopment,
    hasNoOtherKeysInDevelopment,
} from "../../types/OtherKeys";
import {
    explainRegularObject,
    isRegularObject,
} from "../../types/RegularObject";
import {
    isString,
    isStringOrNumber,
} from "../../types/String";
import {
    isUndefined,
} from "../../types/undefined";
import { DTO } from "./DTO";
import { BaseEntity } from "./BaseEntity";
import {
    Entity,
    isEntity,
} from "./Entity";
import {
    EntityType,
    isEntityType,
} from "./EntityType";
import {
    ArrayMapMethod,
    EntityFactory,
    GetterMethod,
    PropertyTypeCheckFn,
    SetterMethod,
    TypeCheckFn,
    TypeExplainFn,
} from "./EntityFactory";
import {
    EntityProperty,
    EntityPropertyType,
    EntityPropertyValue,
    VariableType,
} from "./EntityProperty";
import { EntityPropertyImpl } from "./EntityPropertyImpl";
import {
    IsDTOExplainFunction,
    IsDTOTestFunction,
    IsDTOOrTestFunction,
} from "./IsDTOTestFunction";

export interface PropertyGetterOptions {
    readonly entityAsDTO ?: boolean;
}

/**
 * @inheritDoc
 */
export class EntityFactoryImpl<
    D extends DTO,
    T extends Entity<D>,
>
    implements EntityFactory<D, T> {


    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////  #createProperty  //////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     *
     * @param name
     */
    public static createProperty (
        name : string
    ): EntityProperty {
        return EntityPropertyImpl.create(name);
    }


    ////////////////////////////////////////////////////////////////////////////
    /////////////////////////  #createArrayProperty  ///////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     *
     * @param name
     */
    public static createArrayProperty (
        name : string
    ): EntityProperty {
        return EntityPropertyImpl.createArray(name);
    }


    /**
     *
     * @param name
     */
    public static createOptionalArrayProperty (
        name : string
    ): EntityProperty {
        return EntityPropertyImpl.createOptionalArray(name);
    }


    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////  #create  /////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * Create an entity factory.
     */
    public static create<
        D extends DTO,
        T extends Entity<D>,
    > () : EntityFactoryImpl<D, T> {
        return new EntityFactoryImpl<D, T>();
    }


    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////  #createTypeCheckFn  ///////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     *
     * @param types
     */
    public static createTypeCheckFn (
        ...types: readonly EntityPropertyType[]
    ) : TypeCheckFn {
        return reduce(
            types,
            (prev: TypeCheckFn, item: EntityPropertyType) : TypeCheckFn => {
                if (isEntityType(item)) {
                    return (value: unknown) : boolean => prev(value) || item.isEntity(value);
                }
                if (isEnumType<any>(item)) {
                    return (value: unknown) : boolean => prev(value) || isEnum<any>(item, value);
                }
                switch (item) {
                    case VariableType.BOOLEAN: return (value: unknown) : boolean => prev(value) || isBoolean(value);
                    case VariableType.STRING: return (value: unknown) : boolean => prev(value) || isString(value);
                    case VariableType.INTEGER: return (value: unknown) : boolean => prev(value) || isInteger(value);
                    case VariableType.NUMBER: return (value: unknown) : boolean => prev(value) || isNumber(value);
                    case VariableType.NULL: return (value: unknown) : boolean => prev(value) || isNull(value);
                    case VariableType.UNDEFINED: return (value: unknown) : boolean => prev(value) || isUndefined(value);
                    default: throw new TypeError(`createTypeCheckFn: Unknown variable type: ${item}`);
                }
            },
            () : boolean => false,
        );
    }


    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////  #createTypeExplainFn  /////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * @inheritDoc
     * @param types
     * @fixme This creates a new isType function which could be reused from cache
     */
    public static createTypeExplainFn (
        ...types: readonly EntityPropertyType[]
    ) : TypeExplainFn {

        if (!types.length) throw new TypeError(`createTypeExplainFn: There must be at least one type`);

        const isType = this.createTypeCheckFn(...types);

        type Fn = () => string;

        const explainFunctions : Fn[] = map(
            types,
            (item: EntityPropertyType) : Fn => {
                if (isEntityType(item)) {
                    const typeName = item.getEntityName();
                    return () : string => typeName;
                }
                if (isEnumType<any>(item)) {
                    const isType = (value: unknown) : boolean => isEnum<any>(item, value);
                    return () : string => `enum (${EnumUtils.getValues<any>(item).join(' | ')})`;
                }
                switch (item) {
                    case VariableType.BOOLEAN: return () : string => 'boolean';
                    case VariableType.STRING: return () : string => 'string';
                    case VariableType.INTEGER: return () : string => 'integer';
                    case VariableType.NUMBER: return () : string => 'number';
                    case VariableType.NULL: return () : string => 'null';
                    case VariableType.UNDEFINED: return () : string => 'undefined';
                    default: throw new TypeError(`createTypeExplainFn: Unknown variable type: ${item}`);
                }
            },
        );

        const explainNotOneOf : string = explainFunctions.length >= 2 ? explainNot(
            `one of:\n${
                map(
                    explainFunctions,
                    (item: Fn) : string => ` - ${item()}`
                ).join('\n')
            }`
        ) : explainNot(explainFunctions[0]());

        return (value : unknown) : string => {
            return isType(value) ? explainOk() : explainNotOneOf;
        };

    }


    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////  #createPropertyGetter /////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     *
     * @param propertyName
     * @param types
     * @param opts
     */
    public static createPropertyGetter<
        D extends DTO,
        T extends BaseEntity<D, T>,
    > (
        propertyName : string,
        types : readonly EntityPropertyType[],
        opts ?: PropertyGetterOptions | undefined,
    ) : GetterMethod<D, T, any> {
        const entityAsDTO = !!opts?.entityAsDTO;
        return reduce(
            types,
            (
                prev: GetterMethod<D, T, any> | undefined,
                type: EntityPropertyType
            ) : GetterMethod<D, T, any> => {

                let fn : GetterMethod<D, T, any>;
                if ( isEntityType(type) && !entityAsDTO ) {
                    fn = this.createEntityPropertyGetter<D, T>(
                        propertyName,
                        type,
                    );
                } else if (isEnumType<any>(type, isStringOrNumber)) {
                    fn = this.createEnumPropertyGetter<D, T>(
                        propertyName,
                        type,
                    );
                } else {
                    fn = this.createScalarPropertyGetter<D, T>(
                        propertyName,
                        type,
                    );
                }

                if (prev === undefined) return fn;

                return function (
                    this: T,
                ) : any {
                    return prev.call(this) ?? fn.call(this);
                };
            },
            undefined
        ) ?? function (this: T) : any { return undefined; };
    }


    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////  #createArrayPropertyGetter ///////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     *
     * @param propertyName
     * @param types
     * @param opts
     */
    public static createArrayPropertyGetter<
        D extends DTO,
        T extends BaseEntity<D, T>,
    > (
        propertyName : string,
        types : readonly EntityPropertyType[],
        opts ?: PropertyGetterOptions | undefined,
    ) : GetterMethod<any, any, any> {

        const entityAsDTO = !!opts?.entityAsDTO;

        const iterator: ArrayMapMethod<EntityPropertyValue, EntityPropertyValue> = reduce(
            types,
            (
                prev: ArrayMapMethod<EntityPropertyValue, EntityPropertyValue> | undefined,
                type: EntityPropertyType,
            ) : ArrayMapMethod<EntityPropertyValue, EntityPropertyValue> => {

                const fn = this.createArrayItemGetter(
                    type,
                    { entityAsDTO }
                );

                if (prev === undefined) {
                    return fn;
                }

                return (
                    item : any,
                ) : any | undefined => prev(item) ?? fn(item);

            },
            undefined
        ) ?? ((item : any) : any => item);

        return function arrayGetterMethod (
            this: T,
        ) : any {
            const list = this._getPropertyValue(propertyName);
            return list ? map(list, (item) => iterator(item)) : undefined;
        };

    }


    ////////////////////////////////////////////////////////////////////////////
    //////////////////////  #createScalarPropertyGetter ////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * Implementation.
     *
     * @param propertyName
     * @param type
     */
    public static createScalarPropertyGetter<
        D extends DTO,
        T extends BaseEntity<D, T>,
    > (
        propertyName : string,
        type: EntityType<any, any> | VariableType,
    ): GetterMethod<D, T, EntityPropertyValue> {
        return function scalarGetterMethod (
            this: T,
        ) : any {
            return this._getPropertyValue(propertyName);
        };
    }


    ////////////////////////////////////////////////////////////////////////////
    //////////////////////  #createScalarPropertyGetter ////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * Implementation.
     *
     * @param propertyName
     * @param type
     */
    public static createEnumPropertyGetter<
        D extends DTO,
        T extends BaseEntity<D, T>,
    > (
        propertyName : string,
        type: EnumType<any>,
    ): GetterMethod<D, T, EntityPropertyValue> {
        return function enumGetterMethod (
            this: T,
        ) : any {
            return this._getPropertyValue(propertyName);
        };
    }


    ////////////////////////////////////////////////////////////////////////////
    //////////////////////  #createEntityPropertyGetter ////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * Implementation.
     *
     * @param propertyName
     * @param type
     */
    public static createEntityPropertyGetter<
        D extends DTO,
        T extends BaseEntity<D, T>,
    > (
        propertyName : string,
        type: EntityType<any, any>,
    ): GetterMethod<D, T, EntityPropertyValue> {
        return function entityGetterMethod (
            this: T,
        ) : Entity<any> | undefined {
            const dto = this._getPropertyValue(propertyName);
            return dto ? type.createFromDTO(dto) : undefined;
        };
    }


    ////////////////////////////////////////////////////////////////////////////
    /////////////////////////  #createArrayItemGetter //////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * Implementation.
     *
     * @param Type
     * @param opts
     */
    public static createArrayItemGetter (
        Type: EntityType<any, any> | EnumType<any> | VariableType,
        opts ?: PropertyGetterOptions | undefined,
    ): ArrayMapMethod<EntityPropertyValue, EntityPropertyValue> {
        const entityAsDTO = !!opts?.entityAsDTO;
        if ( isEntityType(Type) && !entityAsDTO ) {
            return (item : EntityPropertyValue) : EntityPropertyValue => Type.isDTO(item) ? Type.createFromDTO(item) : undefined;
        }
        return (item : EntityPropertyValue) : EntityPropertyValue => item;
    }


    ////////////////////////////////////////////////////////////////////////////
    /////////////////////////  #createPropertySetter ///////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    public static createPropertySetter<
        D extends DTO,
        T extends BaseEntity<D, T>,
    > (
        propertyName : string,
        types : readonly EntityPropertyType[]
    ) : SetterMethod<D, T, unknown> {

        const entityTypes : EntityType<DTO, Entity<DTO>>[] = filter(types, isEntityType);

        type IsOurEntityCallback = (value: unknown) => value is Entity<DTO>;

        const isOurEntity : IsOurEntityCallback | undefined = entityTypes.length ? reduce(
            entityTypes,
            (prev: IsOurEntityCallback | undefined, Type: EntityType<DTO, Entity<DTO>>) : IsOurEntityCallback => {
                if (prev === undefined) {
                    return (value: unknown) : value is Entity<DTO> => Type.isEntity(value);
                }
                return (value: unknown) : value is Entity<DTO> => prev(value) || Type.isEntity(value);
            },
            undefined,
        ) : undefined;

        if ( isOurEntity) {
            return function entitySetterMethod (
                this: T,
                value: unknown
            ) : T {
                if ( isOurEntity(value) ) {
                    return this._setPropertyValue(propertyName, value.getDTO());
                } else {
                    return this._setPropertyValue(propertyName, value);
                }
            };
        }

        return function setterMethod (
            this: T,
            value: unknown
        ) : T {
            return this._setPropertyValue(propertyName, value);
        };

    }


    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////  #createArrayPropertySetter ////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    public static createArrayPropertySetter<
        D extends DTO,
        T extends BaseEntity<D, T>,
    > (
        propertyName : string,
        types : readonly EntityPropertyType[]
    ) : SetterMethod<D, T, unknown> {

        /**
         * Array of entity types included.
         */
        const entityTypes : EntityType<DTO, Entity<DTO>>[] = filter(types, isEntityType);

        /**
         * Type of check function for entity.
         */
        type IsOurEntityCallback = (value: unknown) => value is Entity<DTO>;

        /**
         * Returns an optional test function to test if the entity is one of
         * our defined entity types.
         */
        const isOurEntity : IsOurEntityCallback | undefined = entityTypes.length ? reduce(
            entityTypes,
            (prev: IsOurEntityCallback | undefined, Type: EntityType<DTO, Entity<DTO>>) : IsOurEntityCallback => {
                if (prev === undefined) {
                    return (value: unknown) : value is Entity<DTO> => Type.isEntity(value);
                }
                return (value: unknown) : value is Entity<DTO> => prev(value) || Type.isEntity(value);
            },
            undefined,
        ) : undefined;

        if ( isOurEntity ) {
            return function entitySetterMethod (
                this: T,
                value: unknown
            ) : T {
                const list : unknown[] = map(
                    isArray(value) ? value : [ value ],
                    (item) : any => {
                        if ( isOurEntity(item) ) {
                            return item.getDTO();
                        } else {
                            return item;
                        }
                    }
                );
                return this._setPropertyValue(propertyName, list);
            };
        }

        return function setterMethod (
            this: T,
            value: unknown
        ) : T {
            return this._setPropertyValue(
                propertyName,
                map(
                    isArray(value) ? value : [ value ],
                    (item: unknown) : unknown => item
                )
            );
        };

    }


    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////  private properties ////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * Internal properties.
     *
     * @private
     */
    private readonly _properties : EntityProperty[];


    ////////////////////////////////////////////////////////////////////////////
    /////////////////////////////  new constructor /////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * Construct an entity factory.
     *
     * @protected
     */
    protected constructor () {
        this._properties = [];
    }


    ////////////////////////////////////////////////////////////////////////////
    /////////////////////////////  public methods //////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * @inheritDoc
     */
    public getProperties () : readonly EntityProperty[] {
        return map(
            this._properties,
            (item : EntityProperty) => item
        );
    }

    /**
     * @inheritDoc
     */
    public createProperty (name : string) : EntityProperty {
        return EntityFactoryImpl.createProperty(name);
    }

    /**
     * @inheritDoc
     */
    public add (
        name  : EntityProperty | string,
        ...types : EntityPropertyType[]
    ) : this {
        if ( isString(name) ) {
            this._properties.push( this.createProperty(name).types(...types) );
        } else {
            this._properties.push( name );
        }
        return this;
    }

    /**
     * @inheritDoc
     * @fixme Cache the value and use it so that multiple calls do not generate new ones unless state changes
     */
    public createIsDTO () : IsDTOTestFunction<D> {

        const properties : readonly EntityProperty[] = this.getProperties();

        const propertyNames : readonly string[] = map(
            properties,
            (item : EntityProperty) : string => item.getPropertyName()
        );

        const checkProperties = reduce(
            properties,
            (prev: PropertyTypeCheckFn, item: EntityProperty): PropertyTypeCheckFn => {
                const propertyName = item.getPropertyName();
                const isType = EntityFactoryImpl.createTypeCheckFn(...item.getTypes());
                return (value: ReadonlyJsonObject) : boolean => prev(value) && isType(value[propertyName]);
            },
            (): boolean => true,
        );

        return (value : unknown) : value is D => {
            return (
                isRegularObject(value)
                && hasNoOtherKeysInDevelopment(value, propertyNames)
                && checkProperties(value)
            );
        };
    }

    /**
     * @inheritDoc
     * @fixme Cache the value and use it so that multiple calls do not generate new ones unless state changes
     */
    public createExplainDTO () : IsDTOExplainFunction {

        const properties : readonly EntityProperty[] = this.getProperties();

        const propertyNames : readonly string[] = map(
            properties,
            (item : EntityProperty) : string => item.getPropertyName()
        );

        const checkProperties = reduce(
            properties,
            (prev: PropertyTypeCheckFn, item: EntityProperty): PropertyTypeCheckFn => {
                const propertyName = item.getPropertyName();
                const isType = EntityFactoryImpl.createTypeCheckFn(...item.getTypes());
                return (value: ReadonlyJsonObject) : boolean => prev(value) && isType(value[propertyName]);
            },
            (): boolean => true,
        );

        const explainProperties = map(
            properties,
            (item: EntityProperty): IsDTOExplainFunction => {
                const propertyName = item.getPropertyName();
                const explainFunction = EntityFactoryImpl.createTypeExplainFn(...item.getTypes());
                return (value : unknown) : string => {
                    return explainProperty(propertyName, explainFunction((value as any)[propertyName]))
                };
            }
        )

        return (value : unknown) : string => {
            return explain(
                [
                    explainRegularObject(value),
                    explainNoOtherKeysInDevelopment(value, propertyNames),
                    ...map(
                        explainProperties,
                        (item) => item(value)
                    ),
                ]
            );
        };
    }

    /**
     * @inheritDoc
     * @fixme Cache the value and use it so that multiple calls do not generate new ones unless state changes
     */
    public createIsDTOOr<T> (...types : EntityPropertyType[]) : IsDTOOrTestFunction<D, T> {
        const isDTO = this.createIsDTO();
        const anotherFn = EntityFactoryImpl.createTypeCheckFn(
            ...types,
        ) as unknown as IsDTOOrTestFunction<D, T>;
        return (value: unknown) : value is D | T => isDTO( value ) || anotherFn( value );
    }

    /**
     * @inheritDoc
     */
    public createDefaultDTO () : D {
        const properties : readonly EntityProperty[] = this.getProperties();
        return reduce(
            properties,
            (prev: D, item : EntityProperty): D => {

                let defValue : EntityPropertyValue = item.getDefaultValue();

                if (item.isArray()) {
                    if (isArray(defValue)) {

                        defValue = map(
                            defValue,
                            (item) => isEntity(item) ? item.getDTO() as Entity<DTO> : item
                        );

                        if (item.isOptional() && defValue.length === 0) {
                            defValue = undefined;
                        }

                    } else {
                        defValue = item.isOptional() ? undefined : [];
                    }

                } else {
                    defValue = isEntity(defValue) ? defValue.getDTO() as Entity<DTO> : defValue;
                }

                return {
                    ...prev,
                    ...(defValue !== undefined ? { [item.getPropertyName()] : defValue } : {})
                };
            },
            {} as unknown as D,
        );
    }

    /**
     * @inheritDoc
     */
    public createEntityType (
        name : string,
        opts : { immutable ?: boolean } = {}
    ) : EntityType<D, T> {

        const { immutable } = opts;

        const properties : readonly EntityProperty[] = this.getProperties();
        const isDTO = this.createIsDTO();
        const defaultDto : D = this.createDefaultDTO();

        /**
         * @see EntityType as well, which describes the static API.
         */
        class FinalType
            extends BaseEntity<D, T>
            implements Entity<D>
        {

            public static create () : FinalType {
                return new FinalType();
            }

            public static createFromDTO (
                dto : D,
            ) : Entity<D> {
                return new FinalType(dto);
            }

            public static getProperties () : EntityProperty[] {
                return map(properties, (item: EntityProperty) : EntityProperty => item);
            }

            public static getEntityName () : string {
                return name;
            }

            public static isEntity (value: unknown) : value is FinalType {
                return value instanceof FinalType;
            }

            public static explainEntity (value: unknown) : string {
                return value instanceof FinalType ? explainOk() : (
                    explainNot('EntityType')
                );
            }

            public static isDTO (value: unknown) : value is D {
                return isDTO(value);
            }

            public constructor (
                dto ?: D | undefined,
            ) {
                super( dto ?? defaultDto );
            }

            public getEntityType () : EntityType<D, T> {
                return FinalType as unknown as EntityType<D, T>;
            }

        }

        forEach(
            properties,
            (item: EntityProperty) : void => {
                const propertyName : string = item.getPropertyName();
                const isArray : boolean = item.isArray();
                const types : readonly EntityPropertyType[] = item.getTypes();

                const hasEntityType : boolean = some(types, isEntityType);

                const getterMethod = (
                    isArray
                        ? EntityFactoryImpl.createArrayPropertyGetter<D, any>(
                            propertyName,
                            types,
                        )
                        : EntityFactoryImpl.createPropertyGetter<D, any>(
                            propertyName,
                            types,
                        )
                );

                const dtoGetterMethod = (
                    hasEntityType
                        ? (
                            isArray
                                ? EntityFactoryImpl.createArrayPropertyGetter<D, any>(
                                    propertyName,
                                    types,
                                    {
                                        entityAsDTO: true
                                    }
                                )
                                : EntityFactoryImpl.createPropertyGetter<D, any>(
                                    propertyName,
                                    types,
                                    {
                                        entityAsDTO: true
                                    }
                                )
                        )
                        : undefined
                );

                forEach(
                    item.getGetterNames(),
                    (methodName : string): void => {

                        if (!has(FinalType.prototype, methodName)) {
                            (FinalType.prototype as any)[methodName] = getterMethod;
                        }

                        if (dtoGetterMethod) {
                            const dtoMethodName = `${methodName}DTO`;
                            if (!has(FinalType.prototype, dtoMethodName)) {
                                (FinalType.prototype as any)[dtoMethodName] = dtoGetterMethod;
                            }
                        }

                    }
                );

                if (!immutable) {

                    const setterMethod = (
                        isArray
                            ? EntityFactoryImpl.createArrayPropertySetter<D, any>(
                                propertyName,
                                types,
                            )
                            : EntityFactoryImpl.createPropertySetter<D, any>(
                                propertyName,
                                types,
                            )
                    );

                    forEach(
                        item.getSetterNames(),
                        (methodName : string): void => {
                            if (!has(FinalType.prototype, methodName)) {
                                (FinalType.prototype as any)[methodName] = setterMethod;
                            }
                        }
                    );

                }

            }
        );

        return FinalType as unknown as EntityType<D, T>;

    }


}
