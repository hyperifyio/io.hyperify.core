// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ViewEntity } from "../../entities/view/ViewEntity";
import { LogLevel } from "../../types/LogLevel";
import { findViewDTO } from "./findViewDTO";
import { populateViewDTO } from "./populateViewDTO";
import { isArrayOf } from "../../types/Array";

describe('populateViewDTO', () => {

    beforeAll( () => {
        populateViewDTO.setLogger(LogLevel.NONE);
        findViewDTO.setLogger(LogLevel.NONE);
    });

    const viewWithoutExtension = (
        ViewEntity.create('View1')
                  .setPublicUrl('url1')
                  .setLanguage('en')
                  .setContent([
                      "Content 1",
                      "Content 2"
                  ])
                  .getDTO()
    );

    const viewWithExtension = (
        ViewEntity.create('View2')
                  .setExtend('View1')
                  .setLanguage('fr')
                  .setContent(["Content 3"])
                  .getDTO()
    );

    const viewNotFound = (
        ViewEntity.create('View3')
                  .extend('NonexistentView')
                  .setLanguage('es')
                  .setContent(["Content 4"])
                  .getDTO()
    );

    const components = [viewWithoutExtension, viewWithExtension];
  
    it('should return the original view when extend is undefined', () => {
      const result = populateViewDTO(viewWithoutExtension, components, '');
      expect(result).toEqual(viewWithoutExtension);
    });
  
    it('should populate the view with properties from the extended view', () => {

      const result = populateViewDTO(viewWithExtension, components, '');
  
      // Verify that properties from the extended view are merged correctly
      expect(result.name).toEqual('View1'); // Name from the extended view
      expect(result.publicUrl).toEqual('url1'); // Public URL from the extended view
      expect(result.language).toEqual('en'); // Language from the extended view
      expect(isArrayOf<string>(result?.content, undefined, 3, 3)).toEqual(true); // Merged content from both views
  
      // Make sure the original view is not modified
      expect(viewWithExtension.name).toEqual('View2');
      expect(viewWithExtension.language).toEqual('fr'); // Original view language should not be modified
      expect(viewWithExtension.content).toEqual(["Content 3"]); // Original content

    });
  
    it('should throw an error when the extended view is not found', () => {
        expect(() => populateViewDTO(viewNotFound, components, '')).toThrowError(
            new TypeError('Could not find view by name NonexistentView to extend for View3')
        );
    });

});
