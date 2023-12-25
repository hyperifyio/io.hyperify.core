// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { filter } from "../../functions/filter";
import { forEach } from "../../functions/forEach";
import { has } from "../../functions/has";
import { map } from "../../functions/map";
import { reduce } from "../../functions/reduce";
import { some } from "../../functions/some";
import { uniq } from "../../functions/uniq";
import { upperFirst } from "../../functions/upperFirst";
import { ReadonlyJsonObject } from "../../Json";
import { isArray } from "../../types/Array";
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
import { isObject } from "../../types/Object";
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
import {
    isVariableType,
    VariableType,
} from "./VariableType";

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
                ...entityTypesOnly
            ) as IsOurEntityCallback
        ) : undefined;

        const isOtherTypes = otherTypes.length ? this._typeCheckFactory.createChainedTypeCheckFunction(
            ChainOperation.OR,
            ...otherTypes
        ) : undefined;

        const isDeliverableEntity : IsOurEntityCallback | undefined = isOurEntity && deliverableEntityTypes.length ? (
            this._typeCheckFactory.createChainedTypeCheckFunction(
                ChainOperation.OR,
                ...deliverableEntityTypes
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
                        ...deliverableTypes
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

                    throw new TypeError(`${methodName}: Invalid argument provided: ${value}`);
                };


            },
            undefined
        ) : undefined;

        if ( isOurEntity && isOtherTypes ) {

            if ( isDeliverableEntity && deliverableEntityCallback ) {
                return function entitySetterMethodWithTypesWithDeliverableEntitiesWithDeliverableEntities (
                    this: T,
                    value: unknown
                ) : T {
                    if ( isOurEntity(value) ) {
                        return this._setPropertyValue( propertyName, value.getDTO() );
                    } else if (isDeliverableEntity(value)) {
                        return deliverableEntityCallback.call(this, value);
                    } else if ( isOtherTypes(value) ) {
                        return this._setPropertyValue( propertyName, value );
                    } else {
                        throw new TypeError(`${methodName}: Invalid argument provided: ${value}`);
                    }
                };
            }

            return function entitySetterMethodWithTypes (
                this: T,
                value: unknown
            ) : T {
                if ( isOurEntity(value) ) {
                    return this._setPropertyValue( propertyName, value.getDTO() );
                } else if ( isOtherTypes(value) ) {
                    return this._setPropertyValue( propertyName, value );
                } else {
                    throw new TypeError(`${methodName}: Invalid argument provided: ${value}`);
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
                    throw new TypeError(`${methodName}: Invalid argument provided: ${value}`);
                }
            };
        }

        if ( isOurEntity ) {

            if ( isDeliverableEntity && deliverableEntityCallback ) {
                return function entitySetterMethod (
                    this: T,
                    value: unknown
                ) : T {
                    if ( isOurEntity(value) ) {
                        return this._setPropertyValue( propertyName, value.getDTO() );
                    } else if (isDeliverableEntity(value)) {
                        return deliverableEntityCallback.call(this, value);
                    } else {
                        throw new TypeError(`${methodName}: Invalid argument provided: ${value}`);
                    }
                };
            }

            return function entitySetterMethod (
                this: T,
                value: unknown
            ) : T {
                if ( isOurEntity(value) ) {
                    return this._setPropertyValue( propertyName, value.getDTO() );
                } else {
                    throw new TypeError(`${methodName}: Invalid argument provided: ${value}`);
                }
            };
        }

        return function setterMethod (
            this: T,
            value: unknown
        ) : T {
            throw new TypeError(`${methodName}: Invalid argument provided: ${value}`);
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

        const properties : readonly EntityProperty[] = this.getProperties();

        const propertyNames : readonly string[] = map(
            properties,
            (item : EntityProperty) : string => item.getPropertyName()
        );

        const checkProperties = reduce(
            properties,
            (prev: PropertyTypeCheckFn, item: EntityProperty): PropertyTypeCheckFn => {
                const propertyName = item.getPropertyName();
                const isType = EntityFactoryImpl._typeCheckFactory.createChainedTypeCheckFunction(
                    ChainOperation.OR,
                    ...item.getTypes()
                );
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
    public createExplainFunctionOfDTO () : IsDTOExplainFunction {

        const typeName = this.getName();

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
                    ...item.getTypes()
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
    }

    /**
     * @inheritDoc
     * @fixme Cache the value and use it so that multiple calls do not generate new ones unless state changes
     */
    public createTestFunctionOfDTOorOneOf<T> ( ...types : EntityVariableType[] ) : IsDTOOrTestFunction<D, T> {
        const isDTO = this.createTestFunctionOfDTO();
        const anotherFn = EntityFactoryImpl._typeCheckFactory.createChainedTypeCheckFunction(
            ChainOperation.OR,
            ...types,
        ) as unknown as IsDTOOrTestFunction<D, T>;
        return (value: unknown) : value is D | T => isDTO( value ) || anotherFn( value );
    }

    /**
     * @inheritDoc
     * @fixme Cache the value and use it so that multiple calls do not generate new ones unless state changes
     */
    public createExplainFunctionOfDTOorOneOf ( ...types : EntityVariableType[] ) : IsDTOExplainFunction {
        const name = this.getName();
        const testDTO = this.createTestFunctionOfDTO();
        const testOtherTypes = EntityFactoryImpl._typeCheckFactory.createChainedTypeCheckFunction(
            ChainOperation.OR,
            ...types,
        );
        const ok = explainOk();
        const typeNames : string[] = EntityFactoryImpl._typeCheckFactory.getTypeNameList(...types);
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
            throw new TypeError(`EntityFactoryImpl.createEntityType(): The entity by this name exists already`);
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

        forEach(
            properties,
            (item: EntityProperty) : void => {
                const propertyName : string = item.getPropertyName();
                const isArray : boolean = item.isArray();
                const types : readonly EntityVariableType[] = item.getTypes();

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
