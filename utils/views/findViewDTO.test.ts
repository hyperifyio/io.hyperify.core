import { findViewDTO } from "./findViewDTO";
import { createViewDTO } from '../../dto/ViewDTO';

describe('findViewDTO', () => {
  const hyperView1 = createViewDTO('View1', undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  const hyperView2 = createViewDTO('View2', undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  const allViews = [hyperView1, hyperView2];

  it('should find a hyper view by name', () => {
    const result = findViewDTO('View1', allViews);
    expect(result).toEqual(hyperView1);
  });

  it('should throw an error when the view is not found', () => {
    expect(() => findViewDTO('NonexistentView', allViews)).toThrowError(
      new TypeError('Could not find app by name: NonexistentView')
    );
  });
});
