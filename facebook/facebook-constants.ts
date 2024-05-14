// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

// Constants for Facebook Graph API

export const FACEBOOK_GRAPH_API_BASE_URL = 'https://graph.facebook.com/v19.0';

export const FACEBOOK_OAUTH_ACCESS_TOKEN_PATH = `${FACEBOOK_GRAPH_API_BASE_URL}/oauth/access_token`;
export const getFacebookAuthorizationURL = (appId: string, appSecret: string, redirectURI: string, code: string) => `${FACEBOOK_OAUTH_ACCESS_TOKEN_PATH}?client_id=${q(appId)}&redirect_uri=${q(redirectURI)}&client_secret=${q(appSecret)}&code=${q(code)}`

export const FACEBOOK_ME_ACCOUNTS_PATH = `${FACEBOOK_GRAPH_API_BASE_URL}/me/accounts`;

export const getFacebookGraphApiMyAccounts = (userAccessToken: string, appSecretProof: string) => `${FACEBOOK_ME_ACCOUNTS_PATH}?access_token=${q(userAccessToken)}&appsecret_proof=${q(appSecretProof)}`

export const FACEBOOK_ME_FEED_PATH = `${FACEBOOK_GRAPH_API_BASE_URL}/me/feed`;

export const FACEBOOK_ME_AD_ACCOUNTS_PATH = `${FACEBOOK_GRAPH_API_BASE_URL}/me/adaccounts`;

export const FACEBOOK_OAUTH_DIALOG_URL = 'https://www.facebook.com/dialog/oauth';

export const getFacebookDialogOAuthUrl = (client_id: string, redirect_uri: string, scope: string, response_type: string): string => `${FACEBOOK_OAUTH_DIALOG_URL}?client_id=${q(client_id)}&redirect_uri=${q(redirect_uri)}&scope=${q(scope)}&response_type=${q(response_type)}`

// Utility function for URL encoding parameters
function q (value: string): string {
    return encodeURIComponent(value);
}
