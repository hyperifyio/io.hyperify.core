// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import {ButtonEntity} from "./ButtonEntity";
import {BUTTON_COMPONENT_NAME} from "./ButtonComponent";

describe('ButtonEntity', () => {
    describe('createButton', () => {
        it('should create Button with provided name, text, and eventName', () => {
            const name = 'ButtonName';
            const text = 'Click me';
            const eventName = 'buttonClick';

            const expectedButton: any = {
                name: name,
                content: [text],
                extend: BUTTON_COMPONENT_NAME,
                meta: {
                    eventName: eventName,
                },
            };

            const button: ButtonEntity = ButtonEntity.createButton(name, text, eventName);

            expect(button).toEqual(expectedButton);
        });
    });
});
