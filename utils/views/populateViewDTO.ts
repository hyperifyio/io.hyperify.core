// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentContent } from "../../entities/component/ComponentContent";
import { ViewEntity } from "../../entities/view/ViewEntity";
import { find } from "../../functions/find";
import { LogService } from "../../LogService";
import { LogLevel } from "../../types/LogLevel";
import { ViewDTO } from "../../entities/view/ViewDTO";
import { mergeComponentContent } from "../components/mergeComponentContent";

const LOG = LogService.createLogger( 'populateViewDTO' );

/**
 *
 * @param view
 * @param views
 * @param publicUrl
 */
export function populateViewDTO (
    view: ViewDTO,
    views: readonly ViewDTO[],
    publicUrl : string,
): ViewDTO {

    publicUrl = view.publicUrl ?? publicUrl;

    let extend: string | undefined = view.extend;
    if ( extend === undefined ) {
        return view;
    }
    if (extend.startsWith('/')) {
        extend = `${publicUrl}${extend}`;
    }

    const extendView: ViewDTO | undefined = find(
        views,
        (c: ViewDTO): boolean => c.name === extend
    );

    if ( !extendView ) {
        LOG.debug(`views = `, views);
        throw new TypeError( `Could not find view by name ${extend} to extend for ${view.name}` );
    }

    const componentContent: ComponentContent | undefined = view.content;
    const extendContent: ComponentContent | undefined = extendView.content;

    return populateViewDTO(
        ViewEntity.create(extendView.name)
                  .extend(extendView.extend)
                  .setPublicUrl(extendView.publicUrl ?? view.publicUrl)
                  .setLanguage(extendView.language ?? view.language)
                  .setSeo({
                      ...(extendView.seo ? extendView.seo : {}),
                      ...(view.seo ? view.seo : {}),
                  })
                  .setContent( mergeComponentContent(extendContent, componentContent) )
                  .setStyle({
                      ...(extendView.style ? extendView.style : {}),
                      ...(view.style ? view.style : {}),
                  })
                  .setMeta({
                      ...(extendView.meta ? extendView.meta : {}),
                      ...(view.meta ? view.meta : {}),
                  })
                  .getDTO(),
        views,
        publicUrl,
    );

}

populateViewDTO.setLogger = (level: LogLevel) : void => {
    LOG.setLogLevel(level);
};
