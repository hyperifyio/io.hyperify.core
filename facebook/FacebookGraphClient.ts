// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { AccountListDTO } from "./types/AccountListDTO";
import { PostFeedResponseDTO } from "./types/PostFeedResponseDTO";
import { UserAccessTokenDTO } from "./types/UserAccessTokenDTO";

/**
 * Facebook Graph API client library implementation.
 */
export interface FacebookGraphClient {

    /**
     * Exchange authentication code for user access token.
     *
     * @param code The authorization code provided by Facebook OAuth service
     * @param redirectURI The redirect URL used for the authorization code
     */
    getUserAccessToken (redirectURI: string, code: string): Promise<UserAccessTokenDTO>;

    /**
     * Fetch a list of accounts with account access tokens.
     *
     * @param userAccessToken The user access token to authorize this request
     */
    getAccounts (userAccessToken: string): Promise<AccountListDTO>;

    /**
     * Post a message to the feed.
     *
     * @param message The message to post
     * @param pageToken The feed (page) access token to authorize the request
     */
    postMessage(pageToken: string, message: string): Promise<PostFeedResponseDTO>;

}
