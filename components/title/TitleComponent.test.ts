import { HyperComponent } from "../../dto/types/HyperComponent";
import {createTitleComponent, TITLE_COMPONENT_NAME, TitleComponent} from "./TitleComponent";

describe('createTitleTextComponent', () => {
    it('should create TitleTextComponent with default values', () => {
        const expectedTitleTextComponent: TitleComponent = {
            name: TITLE_COMPONENT_NAME,
            extend: HyperComponent.H1,
            content: [],
            meta: undefined,
        };

        const titleTextComponent: TitleComponent = createTitleComponent();

        expect(titleTextComponent).toEqual(expectedTitleTextComponent);
    });
});