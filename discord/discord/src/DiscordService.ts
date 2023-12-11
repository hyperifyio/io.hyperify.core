// Copyright (c) 2021 Sendanor. All rights reserved.

import {Observer, ObserverCallback, ObserverDestructor} from "../../../Observer";

import {DiscordApplicationDTO, isDiscordApplicationDTO} from "./types/DiscordApplicationDTO";
import {DiscordCreateMessageDTO} from "./types/DiscordCreateMessageDTO";
import {DiscordMessageDTO, isDiscordMessageDTO} from "./types/DiscordMessageDTO";
import {DiscordBotGatewayDTO, isDiscordBotGatewayDTO} from "./types/DiscordBotGatewayDTO";

import {DISCORD_API_ENDPOINT, LIBRARY_NAME, LIBRARY_URL, LIBRARY_VERSION} from "./discord-constants";
import { LogService } from "../../../LogService";
import { RequestClientImpl } from "../../../RequestClientImpl";
import { JsonAny } from "../../../Json";

const LOG = LogService.createLogger('DiscordService');

export enum DiscordBotServiceEvent {

}

export class DiscordService {

    public static Event = DiscordBotServiceEvent;

    private readonly _botToken             : string;
    private readonly _guildId              : string;

    private _observer                 : Observer<DiscordBotServiceEvent>;
    private _me                       : DiscordApplicationDTO | undefined;

    public constructor (
        botToken       : string,
        discordGuildId : string
    ) {

        this._botToken  = botToken;
        this._observer  = new Observer<DiscordBotServiceEvent>("DiscordBotService");
        this._me        = undefined;
        this._guildId   = discordGuildId;

    }

    public destroy () {

    }

    public getMe () : DiscordApplicationDTO | undefined {
        return this._me;
    }

    public on (name : DiscordBotServiceEvent, callback: ObserverCallback<DiscordBotServiceEvent>) : ObserverDestructor {
        return this._observer.listenEvent(name, callback);
    }

    public async initialize () {

        this._me = await DiscordService.getMe(this._botToken);

    }

    public async changeMyNick (newNick : string) : Promise<void> {

        await DiscordService.changeMyNick(this._botToken, this._guildId, newNick);

    }

    public async createMessage (channelId : string, payload: DiscordCreateMessageDTO) : Promise<DiscordMessageDTO> {
        return DiscordService.createMessage(this._botToken, channelId, payload);
    }

    public async createMessageWithNick (nick: string, channelId : string, payload: DiscordCreateMessageDTO) : Promise<DiscordMessageDTO> {
        return DiscordService.createMessageWithNick(this._botToken, nick, channelId, payload);
    }


    public static async getMe (botToken: string) : Promise<DiscordApplicationDTO> {

        return await RequestClientImpl.getJson(
            `${DISCORD_API_ENDPOINT}/oauth2/applications/@me`,
            DiscordService.generateBotHeadersObject(botToken)
        ).then((response: any) => {

            if (!isDiscordApplicationDTO(response)) {
                LOG.debug('response = ', response);
                throw new TypeError('Response was not DiscordApplicationDTO');
            }

            return response;

        });

    }

    public static async changeMyNick (botToken: string, guildId: string, newNick : string) : Promise<void> {

        const payload = {
            nick : newNick
        };

        return await RequestClientImpl.patchJson(
            `${DISCORD_API_ENDPOINT}/guilds/${guildId}/members/@me/nick`,
            payload as JsonAny,
            DiscordService.generateBotHeadersObject(botToken)
        ).then((
            /*response: any*/) : void => {
        });

    }

    public static async createMessageWithNick (botToken: string, nick: string, channelId : string, payload: DiscordCreateMessageDTO) : Promise<DiscordMessageDTO> {

        // await this.changeMyNick(nick);

        const newPayload : DiscordCreateMessageDTO = {
            ...payload,
            content: `<${nick}> ${payload.content}`
        };

        return await DiscordService.createMessage(botToken, channelId, newPayload);

    }

    public static async getDiscordBotGatewayDTO (botToken: string) : Promise<DiscordBotGatewayDTO> {

        return await RequestClientImpl.getJson(
            `${DISCORD_API_ENDPOINT}/gateway/bot`,
            DiscordService.generateBotHeadersObject(botToken)
        ).then((response: any) => {

            if (!isDiscordBotGatewayDTO(response)) {
                LOG.debug('response = ', response);
                throw new TypeError('Response was not DiscordBotGatewayDTO');
            }

            return response;

        });

    }

    public static async createMessage (botToken: string, channelId : string, payload: DiscordCreateMessageDTO) : Promise<DiscordMessageDTO> {

        return await RequestClientImpl.postJson(
            `${DISCORD_API_ENDPOINT}/channels/${channelId}/messages`,
            payload as JsonAny,
            DiscordService.generateBotHeadersObject(botToken)
        ).then((response: any) => {

            if (!isDiscordMessageDTO(response)) {
                LOG.debug('response = ', response);
                throw new TypeError('Response was not DiscordMessageDTO');
            }

            return response;

        });

    }


    public static generateBotHeadersObject (botToken: string) : { [key: string]: string } {
        return {
            'Authorization': DiscordService.getBotAuthorizationHeader(botToken),
            'User-Agent': DiscordService.getUserAgentString()
        };
    }

    public static getUserAgentString () : string {
        return `${LIBRARY_NAME} (${LIBRARY_URL}, v${LIBRARY_VERSION})`;
    }

    public static getBotAuthorizationHeader (botToken: string) : string {
        return `Bot ${botToken}`;
    }


}

