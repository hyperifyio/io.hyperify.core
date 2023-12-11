// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { reduce } from "../functions/reduce";
import { uniq } from "../functions/uniq";
import { LogService } from "../LogService";
import { ComponentDTO } from "../dto/ComponentDTO";
import { ComponentFactory } from "../services/ComponentFactory";
import { ComponentFactoryService } from "../services/ComponentFactoryService";
import { ComponentEntity } from "../entities/ComponentEntity";
import { ComponentType } from "../entities/types/ComponentType";
import { registerActionButtonComponent } from "./actionButton/ActionButtonComponent";
import { registerArticleComponent } from "./article/ArticleComponent";
import { registerButtonComponent } from "./button/ButtonComponent";
import { registerDivComponent } from "./div/DivComponent";
import { registerFormComponent } from "./form/FormComponent";
import { registerHeadingComponent } from "./heading/HeadingComponent";
import { registerImageComponent } from "./image/ImageComponent";
import { registerLinkButtonComponent } from "./linkButton/LinkButtonComponent";
import { registerParagraphComponent } from "./paragraph/ParagraphComponent";
import { registerSpanComponent } from "./span/SpanComponent";
import { registerSubTitleComponent } from "./subTitle/SubTitleComponent";
import { registerTableColumnComponent } from "./table/column/TableColumnComponent";
import { registerTableRowComponent } from "./table/row/TableRowComponent";
import { registerTableComponent } from "./table/TableComponent";
import { registerTitleComponent } from "./title/TitleComponent";

const LOG = LogService.createLogger( 'HyperComponentCollection' );

/**
 * Base collection of hyper components.
 */
export class HyperComponentCollection {

    /**
     * Register base collection of components.
     *
     * @param factory The factory where to register components.
     */
    public static registerToFactory (
        factory: ComponentFactory,
    ) : void {
        registerActionButtonComponent(factory);
        registerArticleComponent(factory);
        registerButtonComponent(factory);
        registerDivComponent(factory);
        registerFormComponent(factory);
        registerHeadingComponent(factory);
        registerImageComponent(factory);
        registerLinkButtonComponent(factory);
        registerParagraphComponent(factory);
        registerSpanComponent(factory);
        registerSubTitleComponent(factory);
        registerTableColumnComponent(factory);
        registerTableRowComponent(factory);
        registerTableComponent(factory);
        registerTitleComponent(factory);
    }

    /**
     * Create a new component factory with the base collection of components.
     */
    public static createFactory () : ComponentFactory {
        const factory : ComponentFactory = ComponentFactoryService.create();
        this.registerToFactory(factory);
        return factory;
    }

    /**
     * Create a collection of HyperComponentDTOs using standard components for
     * specified component types.
     *
     * @param types Component entities to search for parents (extends) to create base DTOs.
     */
    public static createBaseCollection (
        types: readonly ComponentType[],
    ) : readonly ComponentDTO[] {

        const factory : ComponentFactory = this.createFactory();

        const extendList : readonly string[] = uniq(
            reduce(
                types,
                (list : readonly string[], type: ComponentType) : readonly string[] => {
                    const entity : ComponentEntity = type.create('x');
                    const extend : string | undefined = entity.getExtend();
                    return extend === undefined ? list : [
                        ...list,
                        extend
                    ];
                },
                []
            )
        );
        LOG.debug(`createCollection: extendList = `, extendList);

        return reduce(
            extendList,
            ( list : readonly ComponentDTO[], extend: string) : readonly ComponentDTO[] => {

                if ( !factory.hasComponent( extend ) ) {
                    return list;
                }

                const dto: ComponentDTO | undefined = factory.createComponentDTO( extend );
                if ( dto === undefined ) {
                    LOG.warn( `Warning! Could not create DTO even though the component was registered. This should not happen.` );
                    return list;
                }

                return [
                    ...list,
                    dto
                ];
            },
            []
        );
    }

}
