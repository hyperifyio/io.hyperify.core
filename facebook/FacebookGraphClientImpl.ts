// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { RequestClient } from "../RequestClient";
import { RequestClientImpl } from "../RequestClientImpl";
import {
    FACEBOOK_ME_FEED_PATH,
    getFacebookAuthorizationURL,
    getFacebookDialogOAuthUrl,
    getFacebookGraphApiMyAccounts,
} from "./facebook-constants";
import { FacebookGraphClient } from "./FacebookGraphClient";
import {
    FacebookAccountListDTO,
    explainFacebookAccountListDTO,
    isFacebookAccountListDTO,
} from "./types/FacebookAccountListDTO";
import { FacebookResponseType } from "./types/FacebookResponseType";
import { FacebookScope } from "./types/FacebookScope";
import {
    explainFacebookPostFeedResponseDTO,
    isFacebookPostFeedResponseDTO,
    FacebookPostFeedResponseDTO,
} from "./types/FacebookPostFeedResponseDTO";
import {
    explainFacebookAccessTokenDTO,
    isFacebookAccessTokenDTO,
    FacebookAccessTokenDTO,
} from "./types/FacebookAccessTokenDTO";
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

        if (!appId) throw new TypeError('FacebookGraphClientImpl requires appId');
        if (!appSecret) throw new TypeError('FacebookGraphClientImpl requires appSecret');

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
     * Returns scopes required for posting to Facebook Page.
     */
    public static getPagePostScopes () : FacebookScope[] {
        return [
            FacebookScope.pages_manage_engagement,
            FacebookScope.pages_manage_posts,
            FacebookScope.pages_manage_metadata,
            FacebookScope.pages_read_engagement,
            FacebookScope.pages_show_list,
        ];
    }

    /**
     * @inheritDoc
     */
    public getAuthorizationURL (
        redirectURI: string,
        scopes : readonly string[],
    ) : string {
        return getFacebookDialogOAuthUrl(
            this._appId,
            redirectURI,
            scopes.join(','),
            FacebookResponseType.CODE,
        );
    }

    /**
     * @inheritDoc
     */
    public async getUserAccessToken (redirectURI: string, code: string): Promise<FacebookAccessTokenDTO> {
        const response = await this._client.getJson(
            getFacebookAuthorizationURL(this._appId, this._appSecret, redirectURI, code)
        );
        if (!isFacebookAccessTokenDTO(response)) {
            throw new TypeError(`Response was not UserAccessTokenDTO: ${explainFacebookAccessTokenDTO(response)}`)
        }
        return response;
    }

    /**
     * @inheritDoc
     */
    public async getAccounts (userAccessToken: string): Promise<FacebookAccountListDTO> {
        const appSecretProof = this._generateAppSecretProof(userAccessToken);
        const response = await this._client.getJson(
            getFacebookGraphApiMyAccounts(userAccessToken, appSecretProof)
        );
        if (!isFacebookAccountListDTO(response)) {
            throw new TypeError(`Response was not FacebookAccountListDTO: ${explainFacebookAccountListDTO(response)}`)
        }
        return response;
    }

    /**
     * @inheritDoc
     */
    public async postMessage (pageToken: string, message: string): Promise<FacebookPostFeedResponseDTO> {
        const appSecretProof = this._generateAppSecretProof(pageToken);
        const response = await this._client.postJson(
            FACEBOOK_ME_FEED_PATH,
            {
                message,
                access_token: pageToken,
                appsecret_proof: appSecretProof,
            }
        );
        if (!isFacebookPostFeedResponseDTO(response)) {
            throw new TypeError(`Response was not PostFeedResponseDTO: ${explainFacebookPostFeedResponseDTO(response)}`)
        }
        return response;
    }

}
