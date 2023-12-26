import {TitleEntity} from "./TitleEntity";
import {TITLE_COMPONENT_NAME} from "./TitleComponent";

describe('TitleEntity', () => {
    describe('#createText', () => {
        it('should create TitleText with provided name and text', () => {
            const name = 'TitleTextName';
            const text = 'The Title';

            const expectedTitleText: any = {
                name: name,
                extend: TITLE_COMPONENT_NAME,
                content: [text],
            };

            const titleText: TitleEntity = TitleEntity.createText(name, text);

            expect(titleText.getDTO()).toEqual(expectedTitleText);
        });
    });
});
