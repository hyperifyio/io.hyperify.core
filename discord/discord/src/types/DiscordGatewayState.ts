// Copyright (c) 2021 Sendanor. All rights reserved.

export enum DiscordGatewayState {

    /**
     * WebSocket is not initialized yet
     */
    UNINITIALIZED = "UNINITIALIZED",

    /**
     * Connect method has been called for the WebSocket and listeners has been initialized, but "open" event has not
     * been triggered.
     *
     * This state will be also after the "close" event has been received from the WebSocket.
     */
    INITIALIZED   = "INITIALIZED",

    /**
     * The WS "open" event has been received
     */
    OPEN          = "OPEN",

    /**
     * We have received the "hello" event from the Discord gateway and we're sending our first heartbeat OP.
     */
    HELLO         = "HELLO",

    /**
     * The bot is in the normal heartbeat loop
     */
    HEARTBEATING  = "HEARTBEATING",

    /**
     * We have received the ready event
     */
    CONNECTED     = "CONNECTED",

    /**
     * The bot was destroyed
     */
    DESTROYED     = "DESTROYED",

}
