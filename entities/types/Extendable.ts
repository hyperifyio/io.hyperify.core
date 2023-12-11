// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

/**
 * Interface for extendable objects.
 */
export interface Extendable {

    /**
     * Get component name.
     */
    getName () : string;

    /**
     * Set the name of object which to extend from. This can also be an URL.
     *
     * @param name
     */
    extend (name : string) : this;

    /**
     * Get the name of object which to extend from. This can also be an URL.
     */
    getExtend () : string | undefined;

}
