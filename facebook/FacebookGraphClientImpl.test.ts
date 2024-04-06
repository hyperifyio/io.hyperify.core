// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { jest } from '@jest/globals';
import { RequestClient } from "../RequestClient";
import { FacebookGraphClientImpl } from "./FacebookGraphClientImpl";
import { AccountListDTO } from "./types/AccountListDTO";
import { PostFeedResponseDTO } from "./types/PostFeedResponseDTO";
import { UserAccessTokenDTO } from "./types/UserAccessTokenDTO";

// Mock data
const mockUserAccessTokenDTO: UserAccessTokenDTO = {
    access_token: "mock_access_token",
    token_type: "bearer",
    expires_in: 3600
};

const mockAccountListDTO: AccountListDTO = {
    data: [
        { access_token: "mock_page_access_token", id: "mock_page_id" }
    ]
};

const mockPostFeedResponseDTO: PostFeedResponseDTO = {
    id: "mock_post_id"
};

class MockRequestClient {
    getJson = jest.fn<any>();
    postJson = jest.fn<any>();

    getClient() {
        throw new Error("Method not implemented.");
    }
}

describe('FacebookGraphClientImpl', () => {
    let mockRequestClient: MockRequestClient;
    let facebookClient: FacebookGraphClientImpl;

    const appId = 'TestAppId';
    const appSecret = 'TestAppSecret';

    beforeEach(() => {
        mockRequestClient = new MockRequestClient();
        facebookClient = FacebookGraphClientImpl.create(
            appId,
            appSecret,
            mockRequestClient as unknown as RequestClient,
        );
    });

    it('should create new instance correctly', () => {
        expect(facebookClient).toBeInstanceOf(FacebookGraphClientImpl);
    });

    describe('getUserAccessToken', () => {

        it('should successfully exchange code for user access token', async () => {
            mockRequestClient.getJson.mockResolvedValue(mockUserAccessTokenDTO);

            const result = await facebookClient.getUserAccessToken('redirectURI', 'code');

            expect(mockRequestClient.getJson).toBeCalledTimes(1);
            expect(result).toStrictEqual(mockUserAccessTokenDTO);

        });

        it('should throw an error when the response is not UserAccessTokenDTO', async () => {
            mockRequestClient.getJson.mockResolvedValue({ invalid: 'response' });

            await expect(facebookClient.getUserAccessToken('redirectURI', 'code'))
                .rejects.toThrow(TypeError);

            expect(mockRequestClient.getJson).toBeCalledTimes(1);

        });

    });

    describe('getAccounts', () => {

        it('should successfully fetch accounts list', async () => {
            mockRequestClient.getJson.mockResolvedValue(mockAccountListDTO);

            const result = await facebookClient.getAccounts('userAccessToken');

            expect(mockRequestClient.getJson).toBeCalledTimes(1);
            expect(result).toStrictEqual(mockAccountListDTO);
        });

        it('should throw an error when the response is not AccountListDTO', async () => {
            mockRequestClient.getJson.mockResolvedValue({ invalid: 'response' });

            await expect(facebookClient.getAccounts('userAccessToken'))
            .rejects.toThrow(TypeError);
            expect(mockRequestClient.getJson).toBeCalledTimes(1);
        });

    });

    describe('postMessage', () => {

        it('should successfully post a message to the feed', async () => {
            mockRequestClient.postJson.mockResolvedValue(mockPostFeedResponseDTO);

            const result = await facebookClient.postMessage('pageToken', 'Hello, world!');

            expect(mockRequestClient.postJson).toBeCalledTimes(1);
            expect(result).toStrictEqual(mockPostFeedResponseDTO);
        });

        it('should throw an error when the response is not PostFeedResponseDTO', async () => {
            mockRequestClient.postJson.mockResolvedValue({ invalid: 'response' });

            await expect(facebookClient.postMessage('pageToken', 'Hello, world!'))
            .rejects.toThrow(TypeError);
            expect(mockRequestClient.postJson).toBeCalledTimes(1);
        });

    });

});
