// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentEntity } from "../../entities/ComponentEntity";
import { IMAGE_COMPONENT_NAME } from "./ImageComponent";

const IMAGE_SOURCE_META_KEY : string = "source";
const IMAGE_ALT_META_KEY : string = "alt";

export class ImageEntity extends ComponentEntity {

    protected constructor (
        name : string,
    ) {
        super(name);
        this.extend(IMAGE_COMPONENT_NAME);
    }

    public getSource () : string | undefined {
        return this.getMetaString(IMAGE_SOURCE_META_KEY);
    }

    public setSource (source : string) : this {
        return this.setMetaString(IMAGE_SOURCE_META_KEY, source);
    }

    public getAltText () : string | undefined {
        return this.getMetaString(IMAGE_ALT_META_KEY);
    }

    public setAltText (alt : string) : this {
        return this.setMetaString(IMAGE_ALT_META_KEY, alt);
    }

    public static create (
        name : string,
    ) : ImageEntity {
        return new this( name );
    }

    public static createImage (
        name   : string,
        source : string,
        alt    : string = '',
    ) : ImageEntity {
        return this.create(name).setSource(source).setAltText(alt);
    }

}
