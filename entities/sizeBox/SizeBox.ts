// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    SizeDTO,

} from "../size/SizeDTO";
import { ReadonlyJsonObject } from "../../Json";
import { SpecialSize } from "../size/SpecialSize";
import {
    SizeBoxDTO,
} from "./SizeBoxDTO";
import { SizeEntity } from "../size/SizeEntity";
import { Entity } from "../types/Entity";
import { UnitType } from "../types/UnitType";

/**
 * Presents a box of sizes (e.g. top, bottom, left, right)
 */
export interface SizeBox
    extends Entity<SizeBoxDTO> {

    /**
     * Returns the DTO object.
     */
    getDTO () : SizeBoxDTO;

    /**
     * @inheritDoc
     */
    valueOf() : ReadonlyJsonObject;

    /**
     * @inheritDoc
     */
    toJSON () : ReadonlyJsonObject;

    /**
     * Returns CSS styles.
     */
    getCssStyles () : string;

    getTop () : SizeEntity | undefined;
    getTopDTO () : SizeDTO | undefined;
    setTop ( value : undefined ) : this;
    setTop ( value : SizeEntity ) : this;
    setTop ( value : SizeDTO ) : this;
    setTop ( value : SpecialSize.AUTO ) : this;
    setTop ( value : number ) : this;
    setTop ( value : number, unit : UnitType ) : this;

    getRight () : SizeEntity | undefined;
    getRightDTO () : SizeDTO | undefined;
    setRight ( value : undefined ) : this;
    setRight ( value : SizeEntity ) : this;
    setRight ( value : SizeDTO ) : this;
    setRight ( value : SpecialSize.AUTO ) : this;
    setRight ( value : number ) : this;
    setRight ( value : number, unit : UnitType ) : this;

    getBottom () : SizeEntity | undefined;
    getBottomDTO () : SizeDTO | undefined;
    setBottom ( value : undefined ) : this;
    setBottom ( value : SizeEntity ) : this;
    setBottom ( value : SizeDTO ) : this;
    setBottom ( value : SpecialSize.AUTO ) : this;
    setBottom ( value : number ) : this;
    setBottom ( value : number, unit : UnitType ) : this;

    getLeft () : SizeEntity | undefined;
    getLeftDTO () : SizeDTO | undefined;
    setLeft ( value : undefined ) : this;
    setLeft ( value : SizeEntity ) : this;
    setLeft ( value : SizeDTO ) : this;
    setLeft ( value : SpecialSize.AUTO ) : this;
    setLeft ( value : number ) : this;
    setLeft ( value : number, unit : UnitType ) : this;

}
