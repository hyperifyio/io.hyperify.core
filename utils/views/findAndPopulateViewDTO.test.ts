import { ViewEntity } from "../../entities/view/ViewEntity";
import { findAndPopulateViewDTO } from "./findAndPopulateViewDTO";
import { isArrayOf } from "../../types/Array";

describe('findAndPopulateViewDTO', () => {

    const viewWithoutExtension = (
        ViewEntity.create('View1')
            .setPublicUrl('url1')
            .setLanguage('en')
            .setContent(["Content 1", "Content 2"])
            .getDTO()
    );

    const viewWithExtension = (
        ViewEntity.create('View2')
                  .extend('View1')
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

    const views = [viewWithoutExtension, viewWithExtension, viewNotFound];
  
    it('should find and return the original view when extend is undefined', () => {
        const result = findAndPopulateViewDTO("View1", views, '');
        expect(result).toEqual(viewWithoutExtension);
    });
  
    it('should find the view and populate it with properties from the extended view', () => {
        const result = findAndPopulateViewDTO("View2", views, '');
    
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

    it('should throw an error when the view is not found', () => {
        expect(() => findAndPopulateViewDTO('NonexistentView', views, '')).toThrowError(
            new TypeError('Could not find app by name: NonexistentView')
        );
    });
  
    it('should throw an error when the extended view is not found', () => {
        expect(() => findAndPopulateViewDTO("View3", views, '')).toThrowError(
            new TypeError('Could not find view by name NonexistentView to extend for View3')
        );
    });
});
