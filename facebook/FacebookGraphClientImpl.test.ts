// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { jest } from '@jest/globals';
import { RequestClient } from "../RequestClient";
import { FacebookGraphClientImpl } from "./FacebookGraphClientImpl";
import { FacebookAccountListDTO } from "./types/FacebookAccountListDTO";
import { FacebookPostFeedResponseDTO } from "./types/FacebookPostFeedResponseDTO";
import { FacebookUserAccessTokenDTO } from "./types/FacebookUserAccessTokenDTO";

// Mock data
const mockUserAccessTokenDTO: FacebookUserAccessTokenDTO = {
    access_token: "mock_access_token",
    token_type: "bearer",
    expires_in: 3600
};

const mockAccountListDTO: FacebookAccountListDTO = {
    data: [
        { access_token: "mock_page_access_token", id: "mock_page_id" }
    ]
};

const mockPostFeedResponseDTO: FacebookPostFeedResponseDTO = {
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

    describe('getPagePostScopes', () => {
        it('should return the correct set of scopes for posting to a Facebook Page', () => {
            const expectedScopes = [
                "pages_manage_engagement",
                "pages_manage_posts",
                "pages_manage_metadata",
                "pages_read_engagement",
                "pages_show_list",
            ];

            const scopes = FacebookGraphClientImpl.getPagePostScopes();

            expect(scopes).toEqual(expect.arrayContaining(expectedScopes));
            expect(scopes.length).toBe(expectedScopes.length);
        });
    });

    describe('getAuthorizationURL', () => {
        it('should return a correctly formatted authorization URL', () => {
            const redirectURI = 'https://example.com/callback';
            const scopes = ["public_profile", "email"]; // Simplified for demonstration
            const responseType = "code"; // Assuming responseType is a constant in this context

            const authorizationURL = facebookClient.getAuthorizationURL(redirectURI, scopes);

            // You might need to adjust this expected URL based on the actual implementation of getFacebookDialogOAuthUrl()
            const expectedURL = `https://www.facebook.com/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectURI)}&scope=${encodeURIComponent(scopes.join(','))}&response_type=${responseType}`;

            expect(authorizationURL).toBe(expectedURL);
        });
    });

});
