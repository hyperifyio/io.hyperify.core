// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { Enum } from "../../types/Enum";
import { Entity } from "./Entity";
import { EntityType } from "./EntityType";
import { VariableType } from "./VariableType";

/**
 *
 */
export type EntityVariableType = EntityType<any, Entity<any>> | Enum<any> | VariableType | string;

/**
 *
 */
export type EntityVariableValue = Entity<any> | string | number | boolean | null | undefined | Enum<any> | EntityVariableValue[];
