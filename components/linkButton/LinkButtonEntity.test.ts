// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import {LinkButtonEntity} from "./LinkButtonEntity";
import { LINK_BUTTON_COMPONENT_NAME, LinkButtonComponent } from "./LinkButtonComponent";

describe('LinkButtonEntity', () => {
    describe('createLinkButton', () => {
        it('should create LinkButton with provided name, text, and href', () => {
            const name = 'LinkButtonName';
            const text = 'Visit our website';
            const href = 'https://example.com';

            const expectedLinkButton: LinkButtonComponent = {
                name: name,
                extend: LINK_BUTTON_COMPONENT_NAME,
                content: [text],
                meta: {
                    href: href,
                },
            };

            const linkButton: LinkButtonEntity = LinkButtonEntity.createButton(name, text, href);

            expect(linkButton).toEqual(expectedLinkButton);
        });
    });
});