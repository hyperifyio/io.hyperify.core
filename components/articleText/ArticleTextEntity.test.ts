import {ArticleTextEntity} from "./ArticleTextEntity";
import {ARTICLE_COMPONENT_NAME} from "../article/ArticleComponent";

describe('ArticleTextEntity', () => {
    describe('#createText', () => {
        it('should create ArticleText with provided name and text', () => {
            const name = 'ArticleTextName';
            const text = 'Lorem ipsum dolor sit amet.';

            const expectedArticleText: any = {
                name: name,
                extend: ARTICLE_COMPONENT_NAME,
                content: [text],
                meta: undefined,
            };

            const articleText: ArticleTextEntity = ArticleTextEntity.createText(name, text);

            expect(articleText).toEqual(expectedArticleText);
        });
    });
});
