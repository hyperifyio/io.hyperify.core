// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { RequestClient } from "../RequestClient";
import { RequestClientImpl } from "../RequestClientImpl";
import {
    FACEBOOK_ME_FEED_PATH,
    getFacebookAuthorizationURL,
    getFacebookGraphApiMyAccounts,
} from "./facebook-constants";
import { FacebookGraphClient } from "./FacebookGraphClient";
import {
    AccountListDTO,
    explainAccountListDTO,
    isAccountListDTO,
} from "./types/AccountListDTO";
import {
    explainPostFeedResponseDTO,
    isPostFeedResponseDTO,
    PostFeedResponseDTO,
} from "./types/PostFeedResponseDTO";
import {
    explainUserAccessTokenDTO,
    isUserAccessTokenDTO,
    UserAccessTokenDTO,
} from "./types/UserAccessTokenDTO";
import { createHmac } from 'crypto';

/**
 * @inheritDoc
 */
export class FacebookGraphClientImpl implements FacebookGraphClient {

    // Private parts

    private readonly _client: RequestClient;
    private readonly _appId: string;
    private readonly _appSecret: string;

    private constructor (
        client: RequestClient,
        appId: string,
        appSecret: string,
    ) {
        this._client = client;
        this._appId = appId;
        this._appSecret = appSecret;
    }

    private _generateAppSecretProof(accessToken: string): string {
        const hmac = createHmac('sha256', this._appSecret);
        hmac.update(accessToken);
        return hmac.digest('hex');
    }


    /**
     * Create an instance of Facebook Graph API client.
     *
     * @param appId
     * @param appSecret
     * @param client
     */
    public static create (
        appId: string,
        appSecret: string,
        client ?: RequestClient,
    ) {
        return new FacebookGraphClientImpl(
            client ?? RequestClientImpl,
            appId,
            appSecret,
        );
    }

    /**
     * @inheritDoc
     */
    public async getUserAccessToken (redirectURI: string, code: string): Promise<UserAccessTokenDTO> {
        const response = await this._client.getJson(
            getFacebookAuthorizationURL(this._appId, this._appSecret, redirectURI, code)
        );
        if (!isUserAccessTokenDTO(response)) {
            throw new TypeError(`Response was not UserAccessTokenDTO: ${explainUserAccessTokenDTO(response)}`)
        }
        return response;
    }

    /**
     * @inheritDoc
     */
    public async getAccounts (userAccessToken: string): Promise<AccountListDTO> {
        const appSecretProof = this._generateAppSecretProof(userAccessToken);
        const response = await this._client.getJson(
            getFacebookGraphApiMyAccounts(userAccessToken, appSecretProof)
        );
        if (!isAccountListDTO(response)) {
            throw new TypeError(`Response was not AccountListDTO: ${explainAccountListDTO(response)}`)
        }
        return response;
    }

    /**
     * @inheritDoc
     */
    public async postMessage (pageToken: string, message: string): Promise<PostFeedResponseDTO> {
        const appSecretProof = this._generateAppSecretProof(pageToken);
        const response = await this._client.postJson(
            FACEBOOK_ME_FEED_PATH,
            {
                message,
                access_token: pageToken,
                appsecret_proof: appSecretProof,
            }
        );
        if (!isPostFeedResponseDTO(response)) {
            throw new TypeError(`Response was not PostFeedResponseDTO: ${explainPostFeedResponseDTO(response)}`)
        }
        return response;
    }

}
