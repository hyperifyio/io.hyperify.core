// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ViewEntity } from "../../entities/view/ViewEntity";
import { LogLevel } from "../../types/LogLevel";
import { findViewDTO } from "./findViewDTO";
import { populateViewDTO } from "./populateViewDTO";

describe('findViewDTO', () => {

  const hyperView1 = ViewEntity.create('View1').getDTO();

  const hyperView2 = ViewEntity.create('View2').getDTO();

  const allViews = [hyperView1, hyperView2];


  beforeAll( () => {
    populateViewDTO.setLogger(LogLevel.NONE);
    findViewDTO.setLogger(LogLevel.NONE);
  });

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
