import { HyperComponent } from "../../entities/types/HyperComponent";
import {createLinkButtonComponent, LinkButtonComponent, LINK_BUTTON_COMPONENT_NAME} from "./LinkButtonComponent";

describe('createLinkButtonComponent', () => {
    it('should create LinkButtonComponent with default values', () => {

        const expectedLinkButtonComponent: LinkButtonComponent = {
            name: LINK_BUTTON_COMPONENT_NAME,
            extend: HyperComponent.LinkButton,
        };

        const linkButtonComponent: LinkButtonComponent = createLinkButtonComponent();

        expect(linkButtonComponent).toEqual(
            expect.objectContaining(
                expectedLinkButtonComponent
            )
        );

    });
});