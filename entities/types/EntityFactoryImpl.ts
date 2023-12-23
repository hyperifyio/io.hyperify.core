// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { uniq } from "../../functions/uniq";
import { isFunction } from "../../types/Function";
import { isObject } from "../../types/Object";
import { EnumUtils } from "../../EnumUtils";
import { filter } from "../../functions/filter";
import { forEach } from "../../functions/forEach";
import { has } from "../../functions/has";
import { map } from "../../functions/map";
import { reduce } from "../../functions/reduce";
import { some } from "../../functions/some";
import { ReadonlyJsonObject } from "../../Json";
import { isArray } from "../../types/Array";
import { isBoolean } from "../../types/Boolean";
import {
    EnumType,
    isEnum,
    isEnumType,
} from "../../types/Enum";
import {
    explain,
    explainNot,
    explainOk,
    explainOneOf,
    explainProperty,
} from "../../types/explain";
import { isNull } from "../../types/Null";
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
import { isUndefined } from "../../types/undefined";
import { BaseEntity } from "./BaseEntity";
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
    TypeExplainFn,
} from "./EntityFactory";
import {
    EntityProperty,
    EntityPropertyType,
    EntityPropertyValue,

} from "./EntityProperty";
import { EntityPropertyImpl } from "./EntityPropertyImpl";
import {
    EntityType,
    isEntityType,
} from "./EntityType";
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


    private static _entities : {
        [key: string]: EntityType<any, Entity<any>>
    } = {};


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
    /////////////////////////////  #deleteEntity  //////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * Unregister an entity factory by name.
     */
    public static deleteEntity (name : string) : typeof EntityFactoryImpl {
        if ( has( this._entities, name ) ) {
            delete this._entities[name];
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
        this._entities = {};
        return this;
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

        let func = reduce(
            types,
            (prev: TypeCheckFn | undefined, item: EntityPropertyType) : TypeCheckFn => {
                const testFunc = this._createTypeCheckFn(item);
                if (prev === undefined) {
                    return (value: unknown) : boolean => testFunc(value);
                } else {
                    return (value: unknown) : boolean => prev(value) && testFunc(value);
                }
            },
            undefined,
        );

        if (func === undefined) {
            throw new TypeError(`createTypeCheckFn: At least one type must be defined`);
        }

        return func;

    }

    protected static _createTypeCheckFn (item: EntityPropertyType) {

        if ( isString(item) && !isVariableType(item) ) {
            if ( has(EntityFactoryImpl._entities, item) ) {
                item = EntityFactoryImpl._entities[item];
            } else {
                throw new TypeError(`EntityFactoryImpl.createTypeCheckFn(): Could not initialize entity by name: ${item}`);
            }
        }

        if (isEntityType(item)) {
            let isEntity = item.isEntity;
            return (value: unknown) : boolean => isEntity(value);
        } else if (isEnumType<any>(item)) {
            let enumType = item;
            return (value: unknown) : boolean => isEnum<any>(enumType, value);
        }

        switch (item) {
            case VariableType.BOOLEAN: return (value: unknown) : boolean => isBoolean(value);
            case VariableType.STRING: return (value: unknown) : boolean => isString(value);
            case VariableType.INTEGER: return (value: unknown) : boolean => isInteger(value);
            case VariableType.NUMBER: return (value: unknown) : boolean => isNumber(value);
            case VariableType.NULL: return (value: unknown) : boolean => isNull(value);
            case VariableType.UNDEFINED: return (value: unknown) : boolean => isUndefined(value);
            default: throw new TypeError(`createTypeCheckFn: Unknown variable type: ${item}`);
        }

    }


    ////////////////////////////////////////////////////////////////////////////
    //////////////////////////////  #getTypeNames  /////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    public static getTypeNames (
        ...types: readonly EntityPropertyType[]
    ) : string[] {
        return map(
            types,
            (item: EntityPropertyType) : string => this._getTypeName( item ),
        );
    }

    private static _getTypeName (
        item: EntityPropertyType
    ) : string {

        if ( isString(item) && !isVariableType(item) ) {
            if ( has(this._entities, item) ) {
                item = this._entities[item];
            } else {
                throw new TypeError(`EntityFactoryImpl.createPropertyGetter(): Could not initialize entity by name: ${item}`);
            }
        }

        if (isEntityType(item)) {
            return item.getEntityName();
        } else if (isEnumType<any>(item)) {
            return `enum (${EnumUtils.getValues<any>(item).join(' | ')})`;
        }
        switch (item) {
            case VariableType.BOOLEAN: return 'boolean';
            case VariableType.STRING: return 'string';
            case VariableType.INTEGER: return 'integer';
            case VariableType.NUMBER: return 'number';
            case VariableType.NULL: return 'null';
            case VariableType.UNDEFINED: return 'undefined';
            default: throw new TypeError(`createTypeExplainFn: Unknown variable type: ${item}`);
        }
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
        const typeNames : string[] = EntityFactoryImpl.getTypeNames(...types);
        const explainNotOneOf : string = explainNot( explainOneOf(typeNames) );
        const ok = explainOk();
        return (value : unknown) : string => isType(value) ? ok : explainNotOneOf;
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

                if ( isString(type) && !isVariableType(type) ) {
                    if ( has(this._entities, type) ) {
                        type = this._entities[type];
                    } else {
                        throw new TypeError(`EntityFactoryImpl.createPropertyGetter(): Could not initialize entity by name: ${type}`);
                    }
                }

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
                } else if ( isVariableType(type) || entityAsDTO ) {
                    fn = this.createScalarPropertyGetter<D, T>(
                        propertyName,
                        type,
                    );
                } else {
                    throw new TypeError(`createPropertyGetter(): Unsupported type: ${type}`);
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

                if ( isString(type) && !isVariableType(type) ) {
                    if ( has(this._entities, type) ) {
                        type = this._entities[type];
                    } else {
                        throw new TypeError(`EntityFactoryImpl.createArrayPropertyGetter(): Could not initialize entity by name: ${type}`);
                    }
                }

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
                const explainFunction = EntityFactoryImpl.createTypeExplainFn(...item.getTypes());
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
    public createTestFunctionOfDTOorOneOf<T> ( ...types : EntityPropertyType[] ) : IsDTOOrTestFunction<D, T> {
        const isDTO = this.createTestFunctionOfDTO();
        const anotherFn = EntityFactoryImpl.createTypeCheckFn(
            ...types,
        ) as unknown as IsDTOOrTestFunction<D, T>;
        return (value: unknown) : value is D | T => isDTO( value ) || anotherFn( value );
    }

    /**
     * @inheritDoc
     * @fixme Cache the value and use it so that multiple calls do not generate new ones unless state changes
     */
    public createExplainFunctionOfDTOorOneOf ( ...types : EntityPropertyType[] ) : IsDTOExplainFunction {
        const name = this.getName();
        const testDTO = this.createTestFunctionOfDTO();
        const testOtherTypes = EntityFactoryImpl.createTypeCheckFn(
            ...types,
        );
        const ok = explainOk();
        const typeNames : string[] = EntityFactoryImpl.getTypeNames(...types);
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

        if (has(EntityFactoryImpl._entities, name)) {
            throw new TypeError(`EntityFactoryImpl.createEntityType(): The entity by this name exists already`);
        }

        const properties : readonly EntityProperty[] = this.getProperties();
        const isDTO = this.createTestFunctionOfDTO();
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

        const Type = FinalType as unknown as EntityType<D, T>;
        EntityFactoryImpl._entities[name] = Type;
        return Type;

    }


}
