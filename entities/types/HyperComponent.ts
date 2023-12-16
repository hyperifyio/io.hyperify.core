// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../types/Enum";
import { explainNot, explainOk, explainOr } from "../../types/explain";
import { isUndefined } from "../../types/undefined";

export enum HyperComponent {
    Form = "fi.nor.form",
    Table = "fi.nor.table",
    TableRow = "fi.nor.table.row",
    TableColumn = "fi.nor.table.column",
    Button = "fi.nor.button",
    ActionButton = "fi.nor.actionButton",
    LinkButton = "fi.nor.linkButton",
    Link = "fi.nor.link",
    Article = "fi.nor.article",
    Div = "fi.nor.div",
    Span = "fi.nor.span",
    H1 = "fi.nor.h1",
    H2 = "fi.nor.h2",
    H3 = "fi.nor.h3",
    H4 = "fi.nor.h4",
    H5 = "fi.nor.h5",
    H6 = "fi.nor.h6",
    Paragraph = "fi.nor.paragraph",
    List = "fi.nor.list",
    Image = "fi.nor.image",
    Card = "fi.nor.card",
    Accordion = "fi.nor.accordion",
}

export function isHyperComponent (value: unknown) : value is HyperComponent {
    return isEnum(HyperComponent, value);
}

export function explainHyperComponent (value : unknown) : string {
    return explainEnum("HyperComponent", HyperComponent, isHyperComponent, value);
}

export function stringifyHyperComponent (value : HyperComponent) : string {
    return stringifyEnum(HyperComponent, value);
}

export function parseHyperComponent (value: any) : HyperComponent | undefined {
    return parseEnum(HyperComponent, value) as HyperComponent | undefined;
}

export function isHyperComponentOrUndefined (value: unknown): value is HyperComponent | undefined {
    return isUndefined(value) || isHyperComponent(value);
}

export function explainHyperComponentOrUndefined (value: unknown): string {
    return isHyperComponentOrUndefined(value) ? explainOk() : explainNot(explainOr(['HyperComponent', 'undefined']));
}
