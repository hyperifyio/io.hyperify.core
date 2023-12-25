// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    EntityMethod,
    EntityMethodType,
} from "./EntityMethod";

export class EntityMethodImpl
    implements EntityMethod {


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
    ) : EntityMethodImpl {
        return new EntityMethodImpl(
            name,
            aliases,
            false,
        );
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
     * Type(s) of the arguments.
     *
     * @private
     */
    private _args : (readonly EntityMethodType[])[];

    /**
     * Type of the return value.
     *
     * @private
     */
    private _returnType : readonly EntityMethodType[];

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
     * Construct a method entity.
     *
     * @param name The name of the method
     * @param methodAliases Alternative names for the method
     * @param isOptional True if this property may be undefined.
     * @protected
     */
    protected constructor (
        name : string,
        methodAliases : readonly string[],
        isOptional : boolean,
    ) {
        this._name = name;
        this._methodAliases = methodAliases;
        this._isOptional = isOptional;
        this._args = [];
        this._returnType = [];
    }


    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////  public methods  ///////////////////////////////
    ////////////////////////////////////////////////////////////////////////////



    /**
     * @inheritDoc
     */
    public getMethodName () : string {
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
    public isOptional () : boolean {
        return this._isOptional;
    }


    /**
     * @inheritDoc
     */
    public getArguments () : readonly (readonly EntityMethodType[])[] {
        return this._args;
    }

    /**
     * @inheritDoc
     */
    public addArgument (
        ...types : readonly EntityMethodType[]
    ): this {
        this._args.push( types );
        return this;
    }

    /**
     * @inheritDoc
     */
    public getReturnType () : readonly EntityMethodType[] {
        return this._returnType;
    }

    /**
     * @inheritDoc
     */
    public setReturnType (
        ...types : readonly EntityMethodType[]
    ): this {
        this._returnType = types;
        return this;
    }

    /**
     * @inheritDoc
     */
    public returnType (
        ...types : readonly EntityMethodType[]
    ) : this {
        return this.setReturnType(...types);
    }

}
