// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { FacebookAccountListDTO } from "./types/FacebookAccountListDTO";
import { FacebookScope } from "./types/FacebookScope";
import { FacebookPostFeedResponseDTO } from "./types/FacebookPostFeedResponseDTO";
import { FacebookAccessTokenDTO } from "./types/FacebookAccessTokenDTO";

/**
 * Facebook Graph API client library implementation.
 */
export interface FacebookGraphClient {

    /**
     * Return URL which the end user must use to authorize access.
     *
     * @param redirectURI
     * @param scopes
     */
    getAuthorizationURL (
        redirectURI: string,
        scopes : readonly FacebookScope[],
    ) : string;

    /**
     * Exchange authentication code for user access token.
     *
     * @param code The authorization code provided by Facebook OAuth service
     * @param redirectURI The redirect URL used for the authorization code. This must be same as provided in .getAuthorizationURL().
     */
    getUserAccessToken (redirectURI: string, code: string): Promise<FacebookAccessTokenDTO>;

    /**
     * Fetch a list of accounts with account access tokens.
     *
     * @param userAccessToken The user access token to authorize this request
     */
    getAccounts (userAccessToken: string): Promise<FacebookAccountListDTO>;

    /**
     * Post a message to the feed.
     *
     * @param message The message to post
     * @param pageToken The feed (page) access token to authorize the request
     */
    postMessage(pageToken: string, message: string): Promise<FacebookPostFeedResponseDTO>;

}
