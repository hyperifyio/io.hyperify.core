import {TitleEntity} from "./TitleEntity";
import {TITLE_COMPONENT_NAME} from "./TitleComponent";

describe('TitleTextEntity', () => {
    describe('#createText', () => {
        it('should create TitleText with provided name and text', () => {
            const name = 'TitleTextName';
            const text = 'The Title';

            const expectedTitleText: any = {
                name: name,
                extend: TITLE_COMPONENT_NAME,
                content: [text],
                meta: undefined,
            };

            const titleText: TitleEntity = TitleEntity.createText(name, text);

            expect(titleText).toEqual(expectedTitleText);
        });
    });
});
