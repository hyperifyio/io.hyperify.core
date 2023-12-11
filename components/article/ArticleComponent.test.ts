import { HyperComponent } from "../../dto/types/HyperComponent";
import {ARTICLE_COMPONENT_NAME, ArticleComponent, createArticleComponent} from "./ArticleComponent";

describe('createArticleComponent', () => {
    it('should create ArticleComponent with default values', () => {
        const expectedArticleComponent: ArticleComponent = {
            name: ARTICLE_COMPONENT_NAME,
            extend: HyperComponent.Article,
            content: [],
            meta: undefined,
        };

        const articleComponent: ArticleComponent = createArticleComponent();

        expect(articleComponent).toEqual(expectedArticleComponent);
    });
});