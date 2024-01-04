// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ViewEntity } from "../../entities/view/ViewEntity";
import { LogLevel } from "../../types/LogLevel";
import { findViewDTO } from "./findViewDTO";
import { populateViewDTO } from "./populateViewDTO";

describe('findViewDTO', () => {

  let hyperView1 = ViewEntity.create('View1').getDTO();

  let hyperView2 = ViewEntity.create('View2').getDTO();

  let allViews = [hyperView1, hyperView2];

  beforeAll( () => {
    populateViewDTO.setLogger(LogLevel.NONE);
    findViewDTO.setLogger(LogLevel.NONE);
  });

  it('should find a hyper view by name', () => {
    const result = findViewDTO('View1', allViews);
    expect(result).toEqual(hyperView1);
  });

  it('should create an empty view when the view is not found', () => {
    const result = findViewDTO('NonexistentView', allViews);
    expect(result).toEqual(
        expect.objectContaining({
          name: 'NonexistentView'
        })
    );
  });

});
