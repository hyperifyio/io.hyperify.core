// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { filter } from "../../functions/filter";
import { forEach } from "../../functions/forEach";
import { has } from "../../functions/has";
import { map } from "../../functions/map";
import { reduce } from "../../functions/reduce";
import { some } from "../../functions/some";
import { uniq } from "../../functions/uniq";
import { upperFirst } from "../../functions/upperFirst";
import {
    isReadonlyJsonObject,
    ReadonlyJsonAny,
    ReadonlyJsonObject,
} from "../../Json";
import { LogService } from "../../LogService";
import { LogUtils } from "../../LogUtils";
import {
    isArray,
    isArrayOfOrUndefined,
    isArrayOrUndefined,
} from "../../types/Array";
import {
    isBoolean,
    isBooleanOrUndefined,
} from "../../types/Boolean";
import {
    Enum,
    EnumType,
    isEnumType,
} from "../../types/Enum";
import {
    explain,
    explainNot,
    explainOk,
    explainOneOf,
    explainProperty,
} from "../../types/explain";
import { isFunction } from "../../types/Function";
import {
    isNumber,
    isNumberOrUndefined,
} from "../../types/Number";
import {
    isObject,
    isObjectOrUndefined,
} from "../../types/Object";
import {
    explainNoOtherKeysInDevelopment,
    hasNoOtherKeysInDevelopment,
} from "../../types/OtherKeys";
import {
    explainRegularObject,
    isRegularObject,
    isRegularObjectOrUndefined,
} from "../../types/RegularObject";
import {
    isString,
    isStringOrNumber,
    isStringOrUndefined,
} from "../../types/String";
import {
    TestCallback,
    TestCallbackNonStandard,
} from "../../types/TestCallback";
import { BaseEntity } from "./BaseEntity";
import { ChainOperation } from "./ChainOperation";
import { DTO } from "./DTO";
import {
    Entity,
    isEntity,
} from "./Entity";
import {
    ArrayMapMethod,
    CreateEntityTypeOpts,
    EntityFactory,
    GetterMethod,
    MethodTypeCheckFn,
    PropertyTypeCheckFn,
    SetterMethod,
    TypeCheckFn,
} from "./EntityFactory";
import {
    EntityMethod,
    EntityMethodType,
} from "./EntityMethod";
import { EntityMethodImpl } from "./EntityMethodImpl";
import { EntityProperty } from "./EntityProperty";
import { EntityPropertyImpl } from "./EntityPropertyImpl";
import {
    EntityType,
    isEntityType,
} from "./EntityType";
import { EntityTypeCheckFactory } from "./EntityTypeCheckFactory";
import { EntityTypeCheckFactoryImpl } from "./EntityTypeCheckFactoryImpl";
import { EntityTypeRegistry } from "./EntityTypeRegistry";
import { EntityTypeRegistryImpl } from "./EntityTypeRegistryImpl";
import {
    EntityVariableType,
    EntityVariableValue,
} from "./EntityVariableType";
import {
    IsDTOExplainFunction,
    IsDTOOrTestFunction,
    IsDTOTestFunction,
    IsInterfaceTestFunction,
} from "./IsDTOTestFunction";
import { TypeCheckFunctionUtils } from "./TypeCheckFunctionUtils";
import {
    isVariableType,
    VariableType,
} from "./VariableType";

const LOG = LogService.createLogger( 'EntityFactoryImpl' );

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
    ///////////////////////  static private globals  ///////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    private static _entityFactories : {
        [key: string]: EntityFactory<any, Entity<any>>
    } = {};


    private static _entities : EntityTypeRegistry = EntityTypeRegistryImpl.create();
    private static _typeCheckFactory : EntityTypeCheckFactory = EntityTypeCheckFactoryImpl.create(this._entities);


    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////  #createProperty  //////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     *
     * @param name
     * @param aliases
     */
    public static createProperty (
        name : string,
        ...aliases : string[]
    ): EntityProperty {
        return EntityPropertyImpl.create(
            this._typeCheckFactory,
            name,
            ...aliases
        );
    }


    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////  #createMethod  //////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     *
     * @param name
     */
    public static createMethod (
        name : string
    ): EntityMethod {
        return EntityMethodImpl.create(name);
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
        return EntityPropertyImpl.createArray(this._typeCheckFactory, name);
    }


    /**
     *
     * @param name
     */
    public static createOptionalArrayProperty (
        name : string
    ): EntityProperty {
        return EntityPropertyImpl.createOptionalArray(this._typeCheckFactory, name);
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
    > (
        name : string,
    ) : EntityFactoryImpl<D, T> {
        if (has(this._entityFactories, name)) {
            throw new TypeError(`EntityFactoryImpl.create(): Factory exists by name: ${name}`);
        }
        const factory = new EntityFactoryImpl<D, T>(name);
        this._entityFactories[name] = factory;
        return factory;
    }


    ////////////////////////////////////////////////////////////////////////////
    /////////////////////////////  #deleteFactory  /////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * Unregister an entity factory by name.
     */
    public static deleteFactory (name : string) : typeof EntityFactoryImpl {
        if ( has( this._entityFactories, name ) ) {
            delete this._entityFactories[name];
        }
        return this;
    }



    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////  #destroy  ////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * Destroy global state.
     */
    public static destroy () : typeof EntityFactoryImpl {
        this._entityFactories = {};
        this._entities.destroy();
        return this;
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
        types : readonly EntityVariableType[],
        opts ?: PropertyGetterOptions | undefined,
    ) : GetterMethod<D, T, any> {
        const entityAsDTO = !!opts?.entityAsDTO;
        return reduce(
            types,
            (
                prev: GetterMethod<D, T, any> | undefined,
                item: EntityVariableType
            ) : GetterMethod<D, T, any> => {

                if ( isString(item) && !isVariableType(item) ) {
                    const Type = this._entities.findType(item);
                    if ( Type ) {
                        item = Type;
                    } else {
                        throw new TypeError(`EntityFactoryImpl.createPropertyGetter(): Could not initialize entity by name: ${item}`);
                    }
                }

                let fn : GetterMethod<D, T, any>;
                if ( isEntityType(item) && !entityAsDTO ) {
                    fn = this.createEntityPropertyGetter<D, T>(
                        propertyName,
                        item,
                    );
                } else if (isEnumType<any>(item, isStringOrNumber)) {
                    fn = this.createEnumPropertyGetter<D, T>(
                        propertyName,
                        item,
                    );
                } else if ( isVariableType(item) || entityAsDTO ) {
                    fn = this.createScalarPropertyGetter<D, T>(
                        propertyName,
                        item,
                    );
                } else {
                    throw new TypeError(`createPropertyGetter(): Unsupported type: ${item}`);
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
        types : readonly EntityVariableType[],
        opts ?: PropertyGetterOptions | undefined,
    ) : GetterMethod<any, any, any> {

        const entityAsDTO = !!opts?.entityAsDTO;

        const iterator: ArrayMapMethod<EntityVariableValue, EntityVariableValue> = reduce(
            types,
            (
                prev: ArrayMapMethod<EntityVariableValue, EntityVariableValue> | undefined,
                item: EntityVariableType,
            ) : ArrayMapMethod<EntityVariableValue, EntityVariableValue> => {

                if ( isString(item) && !isVariableType(item) ) {
                    const Type = this._entities.findType(item);
                    if ( Type ) {
                        item = Type;
                    } else {
                        throw new TypeError(`EntityFactoryImpl.createArrayPropertyGetter(): Could not initialize entity by name: ${item}`);
                    }
                }

                const fn = this.createArrayItemGetter(
                    item,
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
    ): GetterMethod<D, T, EntityVariableValue> {
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
    ): GetterMethod<D, T, EntityVariableValue> {
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
    ): GetterMethod<D, T, EntityVariableValue> {
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
    ): ArrayMapMethod<EntityVariableValue, EntityVariableValue> {
        const entityAsDTO = !!opts?.entityAsDTO;
        if ( isEntityType(Type) && !entityAsDTO ) {
            return (item : EntityVariableValue) : EntityVariableValue => Type.isDTO(item) ? Type.createFromDTO(item) : undefined;
        }
        return (item : EntityVariableValue) : EntityVariableValue => item;
    }


    ////////////////////////////////////////////////////////////////////////////
    /////////////////////////  #createPropertySetter ///////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    public static createPropertySetter<
        D extends DTO,
        T extends BaseEntity<D, T>,
    > (
        propertyName : string,
        types : readonly EntityVariableType[]
    ) : SetterMethod<D, T, unknown> {

        const methodName = `set${upperFirst(propertyName)}`;

        try {

            const entityTypes : (EntityType<DTO, Entity<DTO>> | string)[] = filter(
                types,
                (item: EntityVariableType) : boolean => isEntityType(item) || (isString(item) && !isVariableType(item))
            ) as (EntityType<DTO, Entity<DTO>> | string)[];

            const entityTypesOnly : EntityType<DTO, Entity<DTO>>[] = uniq(map(
                entityTypes,
                ( item: string | EntityType<DTO, Entity<DTO>> ) : EntityType<DTO, Entity<DTO>> => {
                    if (isString(item)) {
                        const Type : EntityType<any, Entity<any>> | undefined = this._entities.findType(item);
                        if (Type === undefined) {
                            throw new TypeError(`EntityFactoryImpl.createPropertySetter(${propertyName}): Could not find entity type for: ${item}`);
                        }
                        return Type;
                    }
                    return item;
                }
            ));

            const deliverableEntityTypes: EntityVariableType[] = uniq(reduce(
                entityTypesOnly,
                (prev : EntityVariableType[], item : EntityType<DTO, Entity<DTO>>) : EntityVariableType[] => {

                    const staticMethods = item.getStaticMethods();

                    const simpleCreateMethods : EntityMethod[] = filter(
                        staticMethods,
                        (item: EntityMethod) : boolean => {
                            return item.getMethodName() === 'create' && item.getArguments().length === 1;
                        }
                    );

                    if (simpleCreateMethods.length) {

                        const deliverableTypes : EntityMethodType[] = uniq(reduce(
                            simpleCreateMethods,
                            (prev : EntityMethodType[], item: EntityMethod) : EntityMethodType[] => {
                                const types = item.getArguments()[0];
                                return [
                                    ...prev,
                                    ...types,
                                ];
                            },
                            []
                        ));

                        return [
                            ...prev,
                            ...deliverableTypes,
                        ];

                    }

                    return prev;

                },
                []
            ));

            const otherTypes : readonly (Enum<any> | VariableType)[] = filter(
                types,
                (item) => !(isEntityType(item) || (isString(item) && !isVariableType(item)))
            ) as (Enum<any> | VariableType)[];

            type IsOurEntityCallback = (value: unknown) => value is Entity<DTO>;

            const isOurEntity : IsOurEntityCallback | undefined = entityTypesOnly.length ? (
                this._typeCheckFactory.createChainedTypeCheckFunction(
                    ChainOperation.OR,
                    entityTypesOnly,
                    false,
                ) as IsOurEntityCallback
            ) : undefined;

            const isOurDTO : IsOurEntityCallback | undefined = entityTypesOnly.length ? (
                this._typeCheckFactory.createChainedTypeCheckFunction(
                    ChainOperation.OR,
                    entityTypesOnly,
                    true,
                ) as IsOurEntityCallback
            ) : undefined;

            const isOtherTypes = otherTypes.length ? this._typeCheckFactory.createChainedTypeCheckFunction(
                ChainOperation.OR,
                otherTypes,
                false,
            ) : undefined;

            const isDeliverableEntity : IsOurEntityCallback | undefined = isOurEntity && deliverableEntityTypes.length ? (
                this._typeCheckFactory.createChainedTypeCheckFunction(
                    ChainOperation.OR,
                    deliverableEntityTypes,
                    false,
                ) as IsOurEntityCallback
            ) : undefined;

            const deliverableEntityCallback : SetterMethod<D, T, unknown> | undefined = isDeliverableEntity && entityTypesOnly?.length ? reduce(
                entityTypesOnly,
                (prev: SetterMethod<D, T, unknown> | undefined, item: EntityType<DTO, Entity<DTO>>) : SetterMethod<D, T, unknown> | undefined => {

                    const staticMethods = item.getStaticMethods();
                    const simpleCreateMethods : EntityMethod[] = filter(
                        staticMethods,
                        (item: EntityMethod) : boolean => {
                            return item.getMethodName() === 'create' && item.getArguments().length === 1;
                        }
                    );

                    if (!simpleCreateMethods.length) {
                        return prev;
                    }

                    const deliverableTypes : EntityMethodType[] = uniq(reduce(
                        simpleCreateMethods,
                        (prev : EntityMethodType[], item: EntityMethod) : EntityMethodType[] => {
                            const types = item.getArguments()[0];
                            return [
                                ...prev,
                                ...types,
                            ];
                        },
                        []
                    ));

                    const isDeliverableEntity = deliverableTypes.length ? (
                        this._typeCheckFactory.createChainedTypeCheckFunction(
                            ChainOperation.OR,
                            deliverableTypes,
                            false,
                        )
                    ) : undefined;

                    if (!isDeliverableEntity) {
                        return prev;
                    }

                    const Type = item;

                    if (prev) {
                        return function deliverableEntitySetterMethod (
                            this: T,
                            value: unknown
                        ) : T {

                            if (isDeliverableEntity(value)) {
                                return this._setPropertyValue(
                                    propertyName,
                                    // @ts-ignore
                                    Type.create(value).getDTO()
                                );
                            }

                            return prev.call(this, value);
                        };
                    }

                    return function deliverableEntitySetterMethod (
                        this: T,
                        value: unknown
                    ) : T {

                        if (isDeliverableEntity(value)) {
                            return this._setPropertyValue(
                                propertyName,
                                // @ts-ignore
                                Type.create(value).getDTO()
                            );
                        }

                        throw new TypeError(`${Type.getEntityName()}.${methodName}: Invalid argument provided: ${LogUtils.stringifyValue(value)}`);
                    };


                },
                undefined
            ) : undefined;

            if ( isOurEntity && isOtherTypes && isOurDTO ) {

                if ( isDeliverableEntity && deliverableEntityCallback ) {
                    return function entitySetterMethodWithTypesWithDeliverableEntitiesWithDeliverableEntities (
                        this: T,
                        value: unknown
                    ) : T {
                        if ( isOurEntity(value) ) {
                            return this._setPropertyValue( propertyName, value.getDTO() );
                        } else if ( isOurDTO(value) ) {
                            return this._setPropertyValue( propertyName, value );
                        } else if ( isDeliverableEntity(value) ) {
                            return deliverableEntityCallback.call(this, value);
                        } else if ( isOtherTypes(value) ) {
                            return this._setPropertyValue( propertyName, value );
                        } else {
                            throw new TypeError(`${this.getEntityType().getEntityName()}.${methodName}: Invalid argument provided: ${LogUtils.stringifyValue(value)}`);
                        }
                    };
                }

                return function entitySetterMethodWithTypes (
                    this: T,
                    value: unknown
                ) : T {
                    if ( isOurEntity(value) ) {
                        return this._setPropertyValue( propertyName, value.getDTO() );
                    } else if ( isOurDTO(value) ) {
                        return this._setPropertyValue( propertyName, value );
                    } else if ( isOtherTypes(value) ) {
                        return this._setPropertyValue( propertyName, value );
                    } else {
                        throw new TypeError(`${this.getEntityType().getEntityName()}.${methodName}: Invalid argument provided: ${LogUtils.stringifyValue(value)}`);
                    }
                };
            }

            if ( isOtherTypes ) {
                return function setterMethodWithTypes (
                    this: T,
                    value: unknown
                ) : T {
                    if ( isOtherTypes(value) ) {
                        return this._setPropertyValue( propertyName, value );
                    } else {
                        throw new TypeError(`${this.getEntityType().getEntityName()}.${methodName}: Invalid argument provided: ${LogUtils.stringifyValue(value)}`);
                    }
                };
            }

            if ( isOurEntity && isOurDTO ) {

                if ( isDeliverableEntity && deliverableEntityCallback ) {
                    return function entitySetterMethod (
                        this: T,
                        value: unknown
                    ) : T {
                        if ( isOurEntity(value) ) {
                            return this._setPropertyValue( propertyName, value.getDTO() );
                        } else if ( isOurDTO(value) ) {
                            return this._setPropertyValue( propertyName, value );
                        } else if (isDeliverableEntity(value)) {
                            return deliverableEntityCallback.call(this, value);
                        } else {
                            throw new TypeError(`${this.getEntityType().getEntityName()}.${methodName}: Invalid argument provided: ${LogUtils.stringifyValue(value)}`);
                        }
                    };
                }

                return function entitySetterMethod (
                    this: T,
                    value: unknown
                ) : T {
                    if ( isOurEntity(value) ) {
                        return this._setPropertyValue( propertyName, value.getDTO() );
                    } else if ( isOurDTO(value) ) {
                        return this._setPropertyValue( propertyName, value );
                    } else {
                        throw new TypeError(`${this.getEntityType().getEntityName()}.${methodName}: Invalid argument provided: ${LogUtils.stringifyValue(value)}`);
                    }
                };

            }

            return function setterMethod (
                this: T,
                value: unknown
            ) : T {
                throw new TypeError(`${this.getEntityType().getEntityName()}.${methodName}: Invalid argument provided: ${LogUtils.stringifyValue(value)}`);
            };

        } catch (err) {
            LOG.debug(`Error in createPropertySetter(): `, err);
            throw new TypeError(`${methodName}: ${err}`);
        }
    }


    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////  #createArrayPropertySetter ////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    public static createArrayPropertySetter<
        D extends DTO,
        T extends BaseEntity<D, T>,
    > (
        propertyName : string,
        types : readonly EntityVariableType[]
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
     * The default name of the entity.
     *
     * @private
     */
    private readonly _name : string;

    /**
     * Internal properties.
     *
     * @private
     */
    private readonly _properties : EntityProperty[];

    /**
     * Static methods, e.g. methods available on the type of the entity like
     * `.create()`.
     *
     * @private
     */
    private readonly _staticMethods : EntityMethod[];


    ////////////////////////////////////////////////////////////////////////////
    /////////////////////////////  new constructor /////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * Construct an entity factory.
     *
     * @protected
     */
    protected constructor (name : string) {
        this._name = name;
        this._properties = [];
        this._staticMethods = [];
    }


    ////////////////////////////////////////////////////////////////////////////
    /////////////////////////////  public methods //////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    public getName () : string {
        return this._name;
    }

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
    public getStaticMethods () : readonly EntityMethod[] {
        return map(
            this._staticMethods,
            (item : EntityMethod) => item
        );
    }

    /**
     * @inheritDoc
     */
    public createMethod (name : string) : EntityMethod {
        return EntityFactoryImpl.createMethod(name);
    }

    /**
     * @inheritDoc
     */
    public addStaticMethod ( name  : EntityMethod ) : this {
        this._staticMethods.push( name );
        return this;
    }

    /**
     * @inheritDoc
     */
    public add (
        name  : EntityProperty | string,
        ...types : EntityVariableType[]
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
    public createTestFunctionOfDTO () : IsDTOTestFunction<D> {
        try {

            const properties : readonly EntityProperty[] = this.getProperties();

            const propertyNames : readonly string[] = map(
                properties,
                (item : EntityProperty) : string => item.getPropertyName()
            );

            const checkProperties : PropertyTypeCheckFn = TypeCheckFunctionUtils.createChainedFunction(
                ChainOperation.AND,
                map(
                    properties,
                    (item : EntityProperty): TypeCheckFn => {
                        const propertyName = item.getPropertyName();
                        const isType = EntityFactoryImpl._typeCheckFactory.createChainedTypeCheckFunction(
                            ChainOperation.OR,
                            item.getTypes(),
                            true,
                        );
                        return (value: unknown) : boolean => isType((value as ReadonlyJsonObject)[propertyName]);
                    }
                )
            ) as PropertyTypeCheckFn;

            return (value : unknown) : value is D => {
                return (
                    isRegularObject(value)
                    && hasNoOtherKeysInDevelopment(value, propertyNames)
                    && checkProperties(value)
                );
            };

        } catch (err) {
            LOG.debug(`Error in createTestFunctionOfDTO(): `, err);
            throw new Error(`createTestFunctionOfDTO: ${this.getName()}: ${err}`);
        }
    }

    /**
     * @inheritDoc
     * @fixme Cache the value and use it so that multiple calls do not generate new ones unless state changes
     */
    public createExplainFunctionOfDTO () : IsDTOExplainFunction {
        const typeName = this.getName();
        try {

            const properties : readonly EntityProperty[] = this.getProperties();

            const propertyNames : readonly string[] = map(
                properties,
                (item : EntityProperty) : string => item.getPropertyName()
            );

            const explainProperties = map(
                properties,
                (item: EntityProperty): IsDTOExplainFunction => {
                    const propertyName = item.getPropertyName();
                    const explainFunction = EntityFactoryImpl._typeCheckFactory.createChainedTypeExplainFunction(
                        ChainOperation.OR,
                        item.getTypes(),
                        true,
                    );
                    return (value : unknown) : string => {
                        if (!isRegularObject(value)) return 'parent not object';
                        return explainProperty(propertyName, explainFunction((value as any)[propertyName]))
                    };
                }
            )

            const ok = explainOk();

            return (value : unknown) : string => {
                const regularResult = explainRegularObject(value);
                if (regularResult !== ok) {
                    return explainNot(typeName + ' DTO: ' + regularResult);
                }
                const result = explain(
                    [
                        explainNoOtherKeysInDevelopment(value, propertyNames),
                        ...map(
                            explainProperties,
                            (item) => item(value)
                        ),
                    ]
                );
                return result === ok ? explainOk() : explainNot(typeName + ' DTO: ' + result);
            };
        } catch (err) {
            LOG.debug(`Error in createExplainFunctionOfDTO(): `, err);
            throw new Error(`createExplainFunctionOfDTO: ${typeName}: ${err}`);
        }
    }

    /**
     * @inheritDoc
     * @fixme Cache the value and use it so that multiple calls do not generate new ones unless state changes
     */
    public createTestFunctionOfDTOorOneOf<T> ( ...types : EntityVariableType[] ) : IsDTOOrTestFunction<D, T> {
        const isDTO = this.createTestFunctionOfDTO();
        const anotherFn = EntityFactoryImpl._typeCheckFactory.createChainedTypeCheckFunction(
            ChainOperation.OR,
            types,
            true,
        ) as unknown as IsDTOOrTestFunction<D, T>;
        return (value: unknown) : value is D | T => isDTO( value ) || anotherFn( value );
    }

    /**
     * @inheritDoc
     * @fixme Cache the value and use it so that multiple calls do not generate new ones unless state changes
     */
    public createExplainFunctionOfDTOorOneOf ( ...types : EntityVariableType[] ) : IsDTOExplainFunction {
        const name = this.getName();
        try {
            const testDTO = this.createTestFunctionOfDTO();
            const testOtherTypes = EntityFactoryImpl._typeCheckFactory.createChainedTypeCheckFunction(
                ChainOperation.OR,
                types,
                true,
            );
            const ok = explainOk();
            const typeNames : string[] = EntityFactoryImpl._typeCheckFactory.getTypeNameList(types);
            const notOk = explainNot(
                explainOneOf(
                    [
                        `DTO of ${name}`,
                        ...typeNames,
                    ]
                )
            );
            return (value: unknown) : string => (
                testDTO( value ) || testOtherTypes( value ) ? ok : notOk
            );
        } catch (err) {
            LOG.debug(`Passed on error: `, err);
            throw new Error(`createExplainFunctionOfDTOorOneOf() for ${name}: ${err}`);
        }
    }

    /**
     * @inheritDoc
     */
    public createTestFunctionOfInterface () : IsInterfaceTestFunction<D, T> {

        const properties : readonly EntityProperty[] = this.getProperties();

        const methodNames : string[] = uniq(reduce(
            properties,
            (prev: string[], item: EntityProperty) : string[] => {
                return [
                    ...prev,
                    ...item.getGetterNames(),
                    ...item.getSetterNames(),
                    ...item.getMethodAliases(),
                ];
            },
            [
                'valueOf',
                'toJSON',
                'getDTO',
                'getEntityType',
            ]
        ));

        const checkFunctions : MethodTypeCheckFn | undefined = reduce(
            methodNames,
            (prev: MethodTypeCheckFn | undefined, methodName: string): MethodTypeCheckFn => {
                if (prev === undefined) {
                    return (value: any) : boolean => isFunction(value[methodName]);
                } else {
                    return (value: any) : boolean => prev(value) && isFunction(value[methodName]);
                }
            },
            undefined
        );

        if (checkFunctions === undefined) {
            return (value : unknown) : value is T => isObject(value);
        }

        return (value : unknown) : value is T => isObject(value) && checkFunctions(value);
    }


    /**
     * @inheritDoc
     */
    public createDefaultDTO () : D {
        const properties : readonly EntityProperty[] = this.getProperties();
        return reduce(
            properties,
            (prev: D, item : EntityProperty): D => {

                let defValue : EntityVariableValue = item.getDefaultValue();

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
        arg1 ?: CreateEntityTypeOpts | string | undefined,
        arg2 ?: CreateEntityTypeOpts | undefined,
    ) : EntityType<D, T> {

        const arg1IsString= isString(arg1);
        const opts : CreateEntityTypeOpts | undefined = (
            arg2 !== undefined ? arg2 : (
                arg1IsString || arg1 === undefined ? undefined : arg1
            )
        );
        const name : string = (arg1IsString ? arg1 : opts?.name) ?? this.getName();
        const immutable : boolean = !!(opts?.immutable);

        if (EntityFactoryImpl._entities.hasType(name)) {
            throw new TypeError(`EntityFactoryImpl.createEntityType(): The entity by this name exists already: ${name}`);
        }

        const staticMethods : readonly EntityMethod[] = this.getStaticMethods();
        const properties : readonly EntityProperty[] = this.getProperties();

        /**
         * This is a "hack" which initializes the entity type in order to
         * have the instance registered in the global state before other parts
         * of code uses it, e.g. `this.createTestFunctionOfDTO()`.
         *
         * @param Type
         */
        const typeInitializer = (Type: any) : boolean => {
            EntityFactoryImpl._entities.registerType(name, Type);
            return true;
        };

        const isDtoInitializer = () : IsDTOTestFunction<D> => {
            return this.createTestFunctionOfDTO();
        };

        const createDefaultDtoInitializer = () : D => {
            return this.createDefaultDTO();
        };

        const isOk = explainOk();
        const notMyEntity = explainNot(name);

        /**
         * @see EntityType as well, which describes the static API.
         */
        class FinalType
            extends BaseEntity<D, T>
            implements Entity<D>
        {

            private static _initialized : boolean = typeInitializer(FinalType);
            private static _isDTO : IsDTOTestFunction<D> = isDtoInitializer();
            private static _defaultDto : D = createDefaultDtoInitializer();

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

            public static getStaticMethods () : EntityMethod[] {
                return map(staticMethods, (item: EntityMethod) : EntityMethod => item);
            }

            public static getEntityName () : string {
                return name;
            }

            public static isEntity (value: unknown) : value is FinalType {
                return value instanceof FinalType;
            }

            public static explainEntity (value: unknown) : string {
                return this.isEntity(value) ? isOk : notMyEntity;
            }

            public static isDTO (value: unknown) : value is D {
                return this._isDTO(value);
            }

            public constructor (
                dto ?: D | undefined,
            ) {
                super( dto ?? FinalType._defaultDto );
            }

            public getEntityType () : EntityType<D, T> {
                return FinalType as unknown as EntityType<D, T>;
            }

        }

        const installMethods = (
            method : ((this: FinalType, ...args: any) => any),
            ...methodNames : readonly string[]
        ) : void => {
            forEach(
                methodNames,
                (methodName: string) : void => {
                    if ( !has( FinalType.prototype, methodName ) ) {
                        (FinalType.prototype as any)[methodName] = method;
                    }
                }
            );
        };

        forEach(
            properties,
            (item: EntityProperty) : void => {
                const propertyName : string = item.getPropertyName();
                const itemIsArray : boolean = item.isArray();
                const types : readonly EntityVariableType[] = item.getTypes();

                const hasJsonType : boolean = some(types, (type) => type === VariableType.JSON);
                const hasEntityType : boolean = some(types, isEntityType);

                const getterMethodNames : readonly string[] = item.getGetterNames();
                const getterMethodName : string = getterMethodNames[0];

                const dtoGetterMethodNames : readonly string[] = map(getterMethodNames, (item: string) : string => `${item}DTO`);
                const dtoGetterMethodName : string = dtoGetterMethodNames[0];

                const setterMethodNames : readonly string[] = immutable ? [] : item.getSetterNames();
                const setterMethodName : string = setterMethodNames[0];

                const hasPropertyMethodNames = hasJsonType ? [
                    `has${upperFirst(propertyName)}Property`,
                    `${propertyName}HasProperty`,
                    `${propertyName}Has`,
                ] : [];

                const getPropertyMethodNames = hasJsonType ? [
                    `get${upperFirst(propertyName)}Property`,
                    `${propertyName}GetProperty`,
                ] : [];

                const getStringPropertyMethodNames = hasJsonType ? [
                    `get${upperFirst(propertyName)}String`,
                    `${propertyName}GetString`,
                ] : [];

                const setStringPropertyMethodNames = hasJsonType ? [
                    `set${upperFirst(propertyName)}String`,
                    `${propertyName}SetString`,
                ] : [];


                const getNumberPropertyMethodNames = hasJsonType ? [
                    `get${upperFirst(propertyName)}Number`,
                    `${propertyName}GetNumber`,
                ] : [];

                const setNumberPropertyMethodNames = hasJsonType ? [
                    `set${upperFirst(propertyName)}Number`,
                    `${propertyName}SetNumber`,
                ] : [];
                const setNumberPropertyMethodName = setNumberPropertyMethodNames[0];


                const getBooleanPropertyMethodNames = hasJsonType ? [
                    `get${upperFirst(propertyName)}Boolean`,
                    `${propertyName}GetBoolean`,
                ] : [];

                const setBooleanPropertyMethodNames = hasJsonType ? [
                    `set${upperFirst(propertyName)}Boolean`,
                    `${propertyName}SetBoolean`,
                ] : [];
                const setBooleanPropertyMethodName = setBooleanPropertyMethodNames[0];


                const getArrayPropertyMethodNames = hasJsonType ? [
                    `get${upperFirst(propertyName)}Array`,
                    `${propertyName}GetArray`,
                ] : [];

                const getArrayOfPropertyMethodNames = hasJsonType ? [
                    `get${upperFirst(propertyName)}ArrayOf`,
                    `${propertyName}GetArrayOf`,
                ] : [];

                const setArrayPropertyMethodNames = hasJsonType ? [
                    `set${upperFirst(propertyName)}Array`,
                    `${propertyName}SetArray`,
                ] : [];
                const setArrayPropertyMethodName = setArrayPropertyMethodNames[0];


                const getObjectPropertyMethodNames = hasJsonType ? [
                    `get${upperFirst(propertyName)}Object`,
                    `${propertyName}GetObject`,
                ] : [];

                const setObjectPropertyMethodNames = hasJsonType ? [
                    `set${upperFirst(propertyName)}Object`,
                    `${propertyName}SetObject`,
                ] : [];
                const setObjectPropertyMethodName = setObjectPropertyMethodNames[0];

                const addMethodNames = hasEntityType ? [
                    `add${upperFirst(propertyName)}`,
                ] : [];
                const addMethodName : string | undefined = addMethodNames.length ? addMethodNames[0] : undefined;

                const getterMethod = getterMethodNames?.length ? (
                    itemIsArray
                        ? EntityFactoryImpl.createArrayPropertyGetter<D, any>(
                            propertyName,
                            types,
                        )
                        : EntityFactoryImpl.createPropertyGetter<D, any>(
                            propertyName,
                            types,
                        )
                ) : undefined;

                const setterMethod = setterMethodNames?.length ? (
                    itemIsArray
                        ? EntityFactoryImpl.createArrayPropertySetter<D, any>(
                            propertyName,
                            types,
                        )
                        : EntityFactoryImpl.createPropertySetter<D, any>(
                            propertyName,
                            types,
                        )
                ) : undefined;

                const addMethod = dtoGetterMethodName && setterMethodName && addMethodNames.length ? function addMethod (
                    this: FinalType,
                    newValues : any,
                ) : any | undefined {
                    const value : any = (this as any)[dtoGetterMethodName]();

                    if (isEntity(newValues)) {
                        return (this as any)[setterMethodName]({
                            ...(value ? value : {}),
                            ...newValues.getDTO(),
                        });
                    }

                    if (isReadonlyJsonObject(newValues)) {
                        return (this as any)[setterMethodName]({
                            ...(value ? value : {}),
                            ...newValues,
                        });
                    }

                    throw new TypeError(`${name}.${addMethodName}(): The argument was not valid: ${LogUtils.stringifyValue(newValues)}`);

                } : undefined;


                const hasPropertyByKey = getterMethodName && getterMethod && hasPropertyMethodNames.length ? function hasPropertyByKey (
                    this: FinalType,
                    key : string,
                ) : boolean {
                    const value : any = (this as any)[getterMethodName]();
                    return value ? has(value, key) : false;
                } : undefined;

                const getPropertyByKey = getterMethodName && getterMethod && getPropertyMethodNames.length ? function getPropertyByKey (
                    this: FinalType,
                    key : string,
                ) : any | undefined {
                    const value : any = (this as any)[getterMethodName]();
                    return value ? value[key] : undefined;
                } : undefined;

                const setPropertyByKey = setterMethodName && getterMethodName ? function setPropertyByKey (
                    this: FinalType,
                    key : string,
                    newValue : any,
                ) : any | undefined {
                    const item : any = (this as any)[getterMethodName]();
                    if (!isRegularObjectOrUndefined(item)) {
                        throw new TypeError(`${name}.${getterMethodName}(): The property value was not regular object or undefined: ${LogUtils.stringifyValue(item)}`);
                    }
                    (this as any)[setterMethodName]({
                        ...(item ? item : {}),
                        [key]: newValue,
                    });
                    return this;
                } : undefined;


                const getStringPropertyByKey = getPropertyByKey && getStringPropertyMethodNames.length ? function getStringPropertyByKey (
                    this: FinalType,
                    key : string,
                ) : string | undefined {
                    const value = getPropertyByKey.call(this, key);
                    return isStringOrUndefined(value) ? value : `${value}`;
                } : undefined;

                const setStringPropertyByKey = setPropertyByKey && setStringPropertyMethodNames.length ? function setStringPropertyByKey (
                    this: FinalType,
                    key : string,
                    value : unknown,
                ) : string | undefined {
                    if (!isString(value)) {
                        throw new TypeError(`${name}.${setterMethodName}(): The new property value was not a string: ${ LogUtils.stringifyValue(value) }`);
                    }
                    return setPropertyByKey.call(this, key, value);
                } : undefined;


                const getNumberPropertyByKey = getPropertyByKey && getNumberPropertyMethodNames.length ? function getNumberPropertyByKey (
                    this: FinalType,
                    key : string,
                ) : number | null | undefined {
                    const value = getPropertyByKey.call(this, key);
                    return isNumberOrUndefined(value) ? value : null;
                } : undefined;

                const setNumberPropertyByKey = setPropertyByKey && setNumberPropertyMethodNames.length ? function setNumberPropertyByKey (
                    this: FinalType,
                    key : string,
                    value : unknown,
                ) : string | undefined {
                    if (!isNumber(value)) {
                        throw new TypeError(`${name}.${setNumberPropertyMethodName}(): The new property value was not a number: ${ LogUtils.stringifyValue(value) }`);
                    }
                    return setPropertyByKey.call(this, key, value);
                } : undefined;


                const getBooleanPropertyByKey = getPropertyByKey && getBooleanPropertyMethodNames.length ? function getBooleanPropertyByKey (
                    this: FinalType,
                    key : string,
                ) : boolean | null | undefined {
                    const value = getPropertyByKey.call(this, key);
                    return isBooleanOrUndefined(value) ? value : null;
                } : undefined;

                const setBooleanPropertyByKey = setPropertyByKey && setBooleanPropertyMethodNames.length ? function setBooleanPropertyByKey (
                    this: FinalType,
                    key : string,
                    value : unknown,
                ) : string | undefined {
                    if (!isBoolean(value)) {
                        throw new TypeError(`${name}.${setBooleanPropertyMethodName}(): The new property value was not a boolean: ${ LogUtils.stringifyValue(value) }`);
                    }
                    return setPropertyByKey.call(this, key, value);
                } : undefined;


                const getArrayPropertyByKey = getPropertyByKey && getArrayPropertyMethodNames.length ? function getArrayPropertyByKey (
                    this: FinalType,
                    key : string,
                ) : readonly any[] | null | undefined {
                    const value = getPropertyByKey.call(this, key);
                    return isArrayOrUndefined(value) ? value : null;
                } : undefined;

                const getArrayOfPropertyByKey = getPropertyByKey && getArrayOfPropertyMethodNames.length ? function getArrayOfPropertyByKey (
                    this: FinalType,
                    key : string,
                    isItemOf : TestCallback,
                ) : readonly any[] | null | undefined {
                    const value = getPropertyByKey.call(this, key);
                    return isArrayOfOrUndefined<any>(value, isItemOf) ? value : null;
                } : undefined;

                const setArrayPropertyByKey = setPropertyByKey && setArrayPropertyMethodNames.length ? function setArrayPropertyByKey (
                    this: FinalType,
                    key : string,
                    value : unknown,
                ) : readonly any[] | undefined {
                    if (!isArray(value)) {
                        throw new TypeError(`${name}.${setArrayPropertyMethodName}(): The new property value was not an array: ${ LogUtils.stringifyValue(value) }`);
                    }
                    return setPropertyByKey.call(this, key, value);
                } : undefined;


                const getObjectPropertyByKey = getPropertyByKey && getObjectPropertyMethodNames.length ? function getObjectPropertyByKey (
                    this: FinalType,
                    key : string,
                ) : ReadonlyJsonObject | null | undefined {
                    const value = getPropertyByKey.call(this, key);
                    return isObjectOrUndefined(value) ? value : null;
                } : undefined;

                const setObjectPropertyByKey = setPropertyByKey && setObjectPropertyMethodNames.length ? function setObjectPropertyByKey (
                    this: FinalType,
                    key : string,
                    value : unknown,
                ) : ReadonlyJsonObject | undefined {
                    if (!isObject(value)) {
                        throw new TypeError(`${name}.${setObjectPropertyMethodName}(): The new property value was not an object: ${ LogUtils.stringifyValue(value) }`);
                    }
                    return setPropertyByKey.call(this, key, value);
                } : undefined;

                const addObjectPropertyByKey = setPropertyByKey && setObjectPropertyMethodNames.length ? function addObjectPropertyByKey (
                    this: FinalType,
                    key : string,
                    value : unknown,
                ) : ReadonlyJsonObject | undefined {
                    if (!isObject(value)) {
                        throw new TypeError(`${name}.${setObjectPropertyMethodName}(): The new property value was not an object: ${ LogUtils.stringifyValue(value) }`);
                    }
                    return setPropertyByKey.call(this, key, value);
                } : undefined;


                const dtoGetterMethod = (
                    hasEntityType
                        ? (
                            itemIsArray
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


                if (getterMethod && getterMethodNames.length) {
                    installMethods(getterMethod, ...getterMethodNames);
                }

                if (dtoGetterMethod && dtoGetterMethodNames.length) {
                    installMethods(dtoGetterMethod, ...dtoGetterMethodNames);
                }

                if (setterMethod && setterMethodNames.length) {
                    installMethods(setterMethod, ...setterMethodNames);
                }

                if (hasPropertyByKey && hasPropertyMethodNames.length) {
                    installMethods(hasPropertyByKey, ...hasPropertyMethodNames );
                }

                if (getPropertyByKey && getPropertyMethodNames.length) {
                    installMethods(getPropertyByKey, ...getPropertyMethodNames);
                }

                if (getStringPropertyByKey && getStringPropertyMethodNames.length) {
                    installMethods(getStringPropertyByKey, ...getStringPropertyMethodNames);
                }

                if (setStringPropertyByKey && setStringPropertyMethodNames.length) {
                    installMethods(setStringPropertyByKey, ...setStringPropertyMethodNames);
                }

                if (getNumberPropertyByKey && getNumberPropertyMethodNames.length) {
                    installMethods(getNumberPropertyByKey, ...getNumberPropertyMethodNames);
                }

                if (setNumberPropertyByKey && setNumberPropertyMethodNames.length) {
                    installMethods(setNumberPropertyByKey, ...setNumberPropertyMethodNames);
                }

                if (getBooleanPropertyByKey && getBooleanPropertyMethodNames.length) {
                    installMethods(getBooleanPropertyByKey, ...getBooleanPropertyMethodNames);
                }

                if (setBooleanPropertyByKey && setBooleanPropertyMethodNames.length) {
                    installMethods(setBooleanPropertyByKey, ...setBooleanPropertyMethodNames);
                }

                if (getArrayPropertyByKey && getArrayPropertyMethodNames.length) {
                    installMethods(getArrayPropertyByKey, ...getArrayPropertyMethodNames);
                }

                if (getArrayOfPropertyByKey && getArrayOfPropertyMethodNames.length) {
                    installMethods(getArrayOfPropertyByKey, ...getArrayOfPropertyMethodNames);
                }

                if (setArrayPropertyByKey && setArrayPropertyMethodNames.length) {
                    installMethods(setArrayPropertyByKey, ...setArrayPropertyMethodNames);
                }

                if (getObjectPropertyByKey && getObjectPropertyMethodNames.length) {
                    installMethods(getObjectPropertyByKey, ...getObjectPropertyMethodNames);
                }

                if (setObjectPropertyByKey && setObjectPropertyMethodNames.length) {
                    installMethods(setObjectPropertyByKey, ...setObjectPropertyMethodNames);
                }

                if (addMethod && addMethodNames.length) {
                    installMethods(addMethod, ...addMethodNames);
                }

            }
        );

        return FinalType as unknown as EntityType<D, T>;

    }


}
