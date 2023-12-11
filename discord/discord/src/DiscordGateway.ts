// Copyright (c) 2021 Sendanor. All rights reserved.

import WebSocket from "ws";

import {Observer, ObserverCallback, ObserverDestructor} from "../../../Observer";
import { map } from "../../../functions/map";

import {DiscordService} from "./DiscordService";

import {DiscordGatewayState} from "./types/DiscordGatewayState";
import {DiscordUserDTO} from "./types/DiscordUserDTO";
import {DiscordBotGatewayDTO} from "./types/DiscordBotGatewayDTO";
import {
    DiscordGatewayOpHelloPayload,
    isDiscordGatewayOpHelloDTO
} from "./types/DiscordGatewayOpHelloDTO";
import {isDiscordGatewayHeartbeatAckDTO} from "./types/DiscordGatewayHeartbeatAckDTO";
import {isDiscordGatewayHeartbeatDTO} from "./types/DiscordGatewayHeartbeatDTO";
import {isDiscordGatewayOpInvalidSessionDTO} from "./types/DiscordGatewayOpInvalidSessionDTO";
import {isDiscordGatewayOpReconnectDTO} from "./types/DiscordGatewayOpReconnectDTO";
import {DiscordGatewayOp} from "./types/DiscordGatewayOp";
import {
    DiscordGatewayDispatchReadyPayload,
    isDiscordGatewayDispatchReadyDTO
} from "./types/DiscordGatewayDispatchReadyDTO";
import {isDiscordGatewayDispatchMessageCreateDTO} from "./types/DiscordGatewayDispatchMessageCreateDTO";
import {isDiscordGatewayDispatchMessageUpdateDTO} from "./types/DiscordGatewayDispatchMessageUpdateDTO";
import {isDiscordGatewayDispatchMessageDeleteDTO} from "./types/DiscordGatewayDispatchMessageDeleteDTO";
import {isDiscordGatewayDispatchMessageDeleteBulkDTO} from "./types/DiscordGatewayDispatchMessageDeleteBulkDTO";
import {DiscordGatewayOpIdentifyPayload} from "./types/DiscordGatewayOpIdentifyDTO";
import {DiscordGatewayOpResumePayload} from "./types/DiscordGatewayOpResumeDTO";
import {DiscordMessageDTO} from "./types/DiscordMessageDTO";
import {DiscordMessageUpdateDTO} from "./types/DiscordMessageUpdateDTO";
import {DiscordMessageDeleteDTO} from "./types/DiscordMessageDeleteDTO";
import {DiscordMessageDeleteBulkDTO} from "./types/DiscordMessageDeleteBulkDTO";
import { LogService } from "../../../LogService";

const LOG = LogService.createLogger('DiscordGateway');

export enum DiscordGatewayEvent {

    /**
     * These are messages which our bot user did not send.
     */
    NEW_MESSAGE,

    /**
     * Any new message, including ones that the bot user created.
     */
    CREATE_MESSAGE,
    UPDATE_MESSAGE,
    DELETE_MESSAGE,
    BULK_DELETE_MESSAGE,

}

export class DiscordGateway {

    public static Event = DiscordGatewayEvent;
    public static State = DiscordGatewayState;

    private readonly _botToken             : string;
    private readonly _wsHeartbeatCallback  : () => void;
    private readonly _wsOpenCallback       : () => void;
    private readonly _wsCloseCallback      : () => void;
    private readonly _wsMessageCallback    : (dataString : string) => void;

    private _ws                       : WebSocket | undefined;
    private _observer                 : Observer<DiscordGatewayEvent>;
    private _wsHeartbeatInterval      : any;
    private _wsHeartbeatTimeout       : any;
    private _wsLastSequence           : number | null;
    private _wsState                  : DiscordGatewayState;
    private _wsSessionId              : string | undefined;
    private _wsSessionUser            : DiscordUserDTO | undefined;
    private _previousHeartBeatAckTime : number | undefined;
    private _heartBeatAckTime         : number | undefined;

    constructor (
        botToken : string,
        sessionKey ?: string | undefined
    ) {

        this._botToken                 = botToken;
        this._wsSessionId              = sessionKey;

        this._observer                 = new Observer<DiscordGatewayEvent>("DiscordGateway");
        this._ws                       = undefined;
        this._wsHeartbeatInterval      = undefined;
        this._wsHeartbeatTimeout       = undefined;
        this._wsLastSequence           = null;
        this._wsState                  = DiscordGatewayState.UNINITIALIZED;
        this._previousHeartBeatAckTime = undefined;
        this._heartBeatAckTime         = undefined;

        this._wsHeartbeatCallback      = this._onHeartbeatInterval.bind(this);
        this._wsMessageCallback        = this._onWsMessage.bind(this);
        this._wsCloseCallback          = this._onWsClose.bind(this);
        this._wsOpenCallback           = this._onWsOpen.bind(this);

    }

    public getUser () : DiscordUserDTO | undefined {
        return this._wsSessionUser;
    }

    public getState () : DiscordGatewayState {
        return this._wsState;
    }

    public destroy () {

        this._disconnect();

        this._wsState = DiscordGatewayState.DESTROYED;

    }

    public connect () {
        this._connect().catch(err => {

            LOG.error('Could not connect: ', err);

            // FIXME: Implement automatic reply

        });
    }

    public disconnect () {
        this._disconnect();
    }

    public on (name : DiscordGatewayEvent, callback: ObserverCallback<DiscordGatewayEvent>) : ObserverDestructor {
        return this._observer.listenEvent(name, callback);
    }


    private _disconnect () {

        if (this._wsHeartbeatInterval) {
            clearInterval(this._wsHeartbeatInterval);
            this._wsHeartbeatInterval = undefined;
        }

        if (this._wsHeartbeatTimeout) {
            clearTimeout(this._wsHeartbeatTimeout);
            this._wsHeartbeatTimeout = undefined;
        }

        if (this._ws) {

            this._ws.off('open'   , this._wsOpenCallback);
            this._ws.off('close'  , this._wsCloseCallback);
            this._ws.off('message', this._wsMessageCallback);

            if (this._wsState === DiscordGatewayState.INITIALIZED || this._wsState === DiscordGatewayState.UNINITIALIZED) {

            } else {
                this._ws.close();
            }

            this._ws = undefined;

        }

        this._wsSessionUser = undefined;
        this._wsState       = DiscordGatewayState.UNINITIALIZED;

    }

    private async _connect () {

        if (this._ws) {
            this._disconnect();
        }

        const discordGateway : DiscordBotGatewayDTO = await DiscordService.getDiscordBotGatewayDTO(this._botToken);

        this._ws = new WebSocket(`${discordGateway.url}?v=9&encoding=json`);

        this._ws.on('open'   , this._wsOpenCallback)
        this._ws.on('close'  , this._wsCloseCallback)
        this._ws.on('message', this._wsMessageCallback);

        this._wsState = DiscordGatewayState.INITIALIZED;

    }

    private async _reconnect () {

        this._disconnect();

        await this._connect();

    }

    private _onWsOpen () {

        LOG.debug('ws open');

        if ( this._wsState === DiscordGatewayState.INITIALIZED || this._wsState === DiscordGatewayState.UNINITIALIZED ) {
            this._wsState = DiscordGatewayState.OPEN;
        }

    }

    private _onWsClose () {

        LOG.debug('ws close');

        this._wsState = DiscordGatewayState.INITIALIZED;

        this._disconnect();

    }

    private _onWsMessage (dataString : string) {

        LOG.debug('ws message', dataString);

        const data = JSON.parse(dataString);

        this._wsLastSequence = data.s;

        if (isDiscordGatewayOpHelloDTO(data)) {
            this._onOpHello(data.d);

        } else if (isDiscordGatewayHeartbeatAckDTO(data)) {
            this._onOpHeartbeatAck();

        } else if (isDiscordGatewayHeartbeatDTO(data)) {
            this._onOpHeartbeat(data.d);

        } else if (isDiscordGatewayOpInvalidSessionDTO(data)) {
            this._onOpInvalidSession(data.d);

        } else if (isDiscordGatewayOpReconnectDTO(data)) {
            this._onOpReconnect();

        } else if (data.op === DiscordGatewayOp.DISPATCH) {

            if (isDiscordGatewayDispatchReadyDTO(data)) {
                this._onDispatchReady(data.d);

            } else if (isDiscordGatewayDispatchMessageCreateDTO(data)) {
                this._onDispatchMessageCreate(data.d);

            } else if (isDiscordGatewayDispatchMessageUpdateDTO(data)) {
                this._onDispatchMessageUpdate(data.d);

            } else if (isDiscordGatewayDispatchMessageDeleteDTO(data)) {
                this._onDispatchMessageDelete(data.d);

            } else if (isDiscordGatewayDispatchMessageDeleteBulkDTO(data)) {
                this._onDispatchMessageDeleteBulk(data.d);

            } else {
                LOG.debug('unsupported dispatch: ', data.t, data.op, data.d);
            }

        } else {
            LOG.debug('unsupported op: ', data.op, data.d);
        }

    }

    private _sendHeartbeat (value: number | null) {

        LOG.debug('_sendHeartbeat', value);

        this._sendOp(DiscordGatewayOp.HEARTBEAT, value);

    }

    private _sendIdentify () {

        this._sendIdentifyOp({
            token: this._botToken,
            intents: 1 << 9,
            properties: {
                $os: "linux",
                $browser: "nor_library",
                $device: "nor_library"
            }
        });

    }

    private _sendResume (sessionId: string, sequence: number) {

        this._sendResumeOp({
            token: this._botToken,
            session_id: sessionId,
            seq: sequence
        });

    }

    private _sendIdentifyOp (data: DiscordGatewayOpIdentifyPayload) {

        LOG.debug('_sendIdentify', data);

        this._sendOp(DiscordGatewayOp.IDENTIFY, data);

    }

    private _sendResumeOp (data: DiscordGatewayOpResumePayload) {

        LOG.debug('_sendResume', data);

        this._sendOp(DiscordGatewayOp.RESUME, data);

    }

    private _sendOp (op: DiscordGatewayOp, d: any) {

        if (!this._ws) {
            LOG.warn(`Warning! WebSocket was not initialized.`);
            return;
        }

        LOG.debug('_sendOp', op, d);

        const data = {
            op,
            d
        };

        const dataString : string = JSON.stringify(data);

        this._ws.send(dataString);

    }

    private _onOpHello (data: DiscordGatewayOpHelloPayload) {

        const hbInterval = data.heartbeat_interval;

        LOG.debug('_onOpHello: ', hbInterval);

        this._wsState = DiscordGatewayState.HELLO;

        this._wsHeartbeatTimeout = setTimeout( () => {

            this._wsHeartbeatTimeout = undefined;

            try {
                this._wsHeartbeatCallback();
            } catch (err) {
                LOG.error('Error while initial heartbeat interval: ', err);
            }

            this._wsHeartbeatInterval = setInterval(
                this._wsHeartbeatCallback
                , hbInterval
            );

            this._wsState = DiscordGatewayState.HEARTBEATING;

        }, Math.round(Math.random() * hbInterval));

        // Send resume or identify
        if ( this._wsSessionId && this._wsLastSequence ) {
            this._sendResume(this._wsSessionId, this._wsLastSequence);
        } else {
            this._sendIdentify();
        }

    }

    private _onOpHeartbeatAck () {

        LOG.debug('_onOpHeartbeatAck');

        this._heartBeatAckTime = Date.now();

    }

    private _onOpHeartbeat (data: number | null) {

        LOG.debug('_onOpHeartbeat: ', data);

        this._wsHeartbeatCallback();

    }

    private _onOpInvalidSession (isResumable: boolean) {

        LOG.debug('_onOpInvalidSession: ', isResumable);

        if (!isResumable) {
            this._wsSessionId = "";
            this._wsLastSequence = null;
        }

        this._reconnect().catch(err => {
            LOG.error('Reconnect failed: ', err);
        });

    }

    private _onOpReconnect () {

        LOG.debug('_onOpReconnect');
        this._reconnect().catch(err => {
            LOG.error('Reconnect failed: ', err);
        });

    }

    private _onDispatchReady (data: DiscordGatewayDispatchReadyPayload) {

        LOG.debug(`_onDispatchReady: ${data?.user?.bot ? 'bot ' : ''}user ${data?.user?.username}#${data?.user?.id}, session_id=${data?.session_id}, ${data?.guilds?.length ?? 0} guilds, application#${data?.application?.id}`);

        this._wsSessionId = data.session_id;

        this._wsSessionUser = data?.user;

        this._wsState = DiscordGatewayState.CONNECTED;

    }

    private _onDispatchMessageCreate (data : DiscordMessageDTO) {

        const msgId = data?.id;

        const hasCreateMessageListeners = this._observer.hasCallbacks(DiscordGatewayEvent.CREATE_MESSAGE);
        if (hasCreateMessageListeners) {
            LOG.debug(`Triggering CREATE_MESSAGE for #${msgId}`);
            this._observer.triggerEvent(DiscordGatewayEvent.CREATE_MESSAGE, data);
        }

        const hasNewMessageListeners = this._observer.hasCallbacks(DiscordGatewayEvent.NEW_MESSAGE);
        if (hasNewMessageListeners) {

            const myUserId: string | undefined = this._wsSessionUser?.id;
            const msgAuthorId = data?.author?.id;

            if (!myUserId) {
                LOG.warn(`Warning! We could not detect our own id. Skipped sending NEW_MESSAGE event for #${msgId}.`);
            } else if (!msgAuthorId) {
                LOG.warn(`Warning! We could not detect ID from message. Skipped sending NEW_MESSAGE event for #${msgId}.`);
            } else if (myUserId === msgAuthorId) {
                LOG.debug(`It was our own message. Not sending NEW_MESSAGE event for #${msgId}.`);
            } else {
                LOG.debug(`Triggering NEW_MESSAGE for #${msgId}`);
                this._observer.triggerEvent(DiscordGatewayEvent.NEW_MESSAGE, data);
            }
        }

        if (!hasCreateMessageListeners && !hasNewMessageListeners) {
            LOG.debug(`No CREATE_MESSAGE nor NEW_MESSAGE listeners for #${msgId}`);
        }

    }

    private _onDispatchMessageUpdate (data : DiscordMessageUpdateDTO) {
        const msgId = data?.id;
        if (this._observer.hasCallbacks(DiscordGatewayEvent.UPDATE_MESSAGE)) {
            LOG.debug(`Triggering UPDATE_MESSAGE for #${msgId}`);
            this._observer.triggerEvent(DiscordGatewayEvent.UPDATE_MESSAGE, data);
        } else {
            LOG.debug(`No UPDATE_MESSAGE listeners for #${msgId}`);
        }
    }

    private _onDispatchMessageDelete (data : DiscordMessageDeleteDTO) {
        const msgId = data?.id;
        if (this._observer.hasCallbacks(DiscordGatewayEvent.DELETE_MESSAGE)) {
            LOG.debug(`Triggering DELETE_MESSAGE for #${msgId}`);
            this._observer.triggerEvent(DiscordGatewayEvent.DELETE_MESSAGE, data);
        } else {
            LOG.debug(`No DELETE_MESSAGE listeners for #${msgId}`);
        }
    }

    private _onDispatchMessageDeleteBulk (data : DiscordMessageDeleteBulkDTO) {
        const msgIds = data?.ids;
        if (this._observer.hasCallbacks(DiscordGatewayEvent.BULK_DELETE_MESSAGE)) {
            LOG.debug(`Triggering BULK_DELETE_MESSAGE for ${map(msgIds, (id: string) => `#${id}`).join(' ')}`);
            this._observer.triggerEvent(DiscordGatewayEvent.BULK_DELETE_MESSAGE, data);
        } else {
            LOG.debug(`No BULK_DELETE_MESSAGE listeners ${map(msgIds, (id: string) => `#${id}`).join(' ')}`);
        }
    }

    /**
     * Called periodically to trigger heartbeat for Discord
     *
     * @private
     */
    private _onHeartbeatInterval () {

        try {

            LOG.debug('_onHeartbeatInterval');

            if ( this._heartBeatAckTime !== undefined && this._heartBeatAckTime === this._previousHeartBeatAckTime ) {

                this._reconnect().catch(err => {
                    LOG.error('Reconnect failed: ', err);
                });

            } else {

                this._sendHeartbeat(this._wsLastSequence);

                this._previousHeartBeatAckTime = this._heartBeatAckTime;

            }

        } catch (err) {
            LOG.error('Error while sending heartbeat interval: ', err);
        }

    }


}
