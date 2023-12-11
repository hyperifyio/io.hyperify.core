// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { LogLevel } from "../../types/LogLevel";
import { populateViewDTO } from "./populateViewDTO";
import { isArrayOf } from "../../types/Array";
import { createViewDTO } from '../../dto/ViewDTO';

describe('populateViewDTO', () => {

    beforeAll( () => {
        populateViewDTO.setLogger(LogLevel.NONE);
    })

    const viewWithoutExtension = createViewDTO('View1', undefined, 'url1', 'en', undefined, ["Content 1", "Content 2"], undefined, undefined);
    const viewWithExtension = createViewDTO('View2', 'View1', undefined, 'fr', undefined, "Content 3", undefined, undefined);
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
      expect(viewWithExtension.content).toEqual("Content 3"); // Original content
    });
  
    it('should throw an error when the extended view is not found', () => {
      const viewNotFound = createViewDTO('View3', 'NonexistentView', undefined, 'es', undefined, "Content 4", undefined, undefined);
      expect(() => populateViewDTO(viewNotFound, components, '')).toThrowError(
        new TypeError('Could not find view by name NonexistentView to extend for View3')
      );
    });

});
