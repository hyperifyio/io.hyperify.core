// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.


import {
    createOpenAiChatCompletionFunctions,
    explainOpenAiChatCompletionFunctions,
    isOpenAiChatCompletionFunctions
} from "./OpenAiChatCompletionFunctions";

describe("OpenAiChatCompletionFunctions", () => {
    const validItem = createOpenAiChatCompletionFunctions(
        "function_1",
        {startParam : "param1", nextParam : "param2"},
        "For testing purposes"
    );

    const inValidItem = {
        "description": ["For testing purposes"],
        "name": "function_1",
        "params": {
            "nextParam": "param2",
            "startParam": 2
        }
    }
    describe("createOpenAiChatCompletionFunctions", () => {

        it("creates valid OpenAiChatCompletionFunctions objects", () => {

            expect(validItem).toBeTruthy();
            expect(validItem).toStrictEqual(
                {
                    "description": "For testing purposes",
                    "name": "function_1",
                    "parameters": {
                        "nextParam": "param2",
                        "startParam": "param1"
                    }}
            );
        });

    });

    describe("isOpenAiChatCompletionFunctions", () => {

        it("returns true for valid OpenAiChatCompletionFunctions objects", () => {
            expect(isOpenAiChatCompletionFunctions(validItem)).toBeTruthy();
            expect(isOpenAiChatCompletionFunctions(inValidItem)).toBeFalsy();
        });

    });

    describe("explainOpenAiChatCompletionFunctions", () => {

        it("returns true if value is OpenAiChatCompletionFunctions", () => {
            expect(explainOpenAiChatCompletionFunctions(validItem)).toBeTruthy();
        });

        it("returns a human-readable string explaining why the value is not a OpenAiChatCompletionFunctions", () => {
            const result = explainOpenAiChatCompletionFunctions(inValidItem);
            expect(result).toEqual( expect.stringContaining( "Value had extra properties: params" ) );
            expect(result).toEqual( expect.stringContaining( "property \"parameters\" not object" ) );
            expect(result).toEqual( expect.stringContaining( "property \"description\" not string or undefined" ) );
        });

    });

});
