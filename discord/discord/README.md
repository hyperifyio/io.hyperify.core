**Join our [Discord](https://discord.gg/UBTrHxA78f) to discuss about our software!**

# @heusalagroup/fi.hg.discord

Lightweight Discord API and Gateway Library for TypeScript and NodeJS.

It's still quite experimental and mostly intended for our internal use in our gateway product.

### It doesn't have many runtime dependencies

 * [NodeJS v14](https://nodejs.org)
 * [Lodash](https://lodash.com)
 * [WebSocket library `ws`](https://github.com/websockets/ws) -- It's only required for [the `DiscordGateway` implementation](https://github.com/heusalagroup/fi.hg.discord/blob/main/src/DiscordGateway.ts)

### We don't have traditional releases

This project evolves directly to our git repository in an agile software development format.

### We use this library internally as a git submodule

```
mkdir -p src/fi/hg
git submodule add git@github.com:heusalagroup/fi.hg.discord.git src/fi/hg/discord
git config -f .gitmodules submodule.src/fi/hg/discord.branch main
```

You may want to do that, too, in order to take full advance of the TypeScript language.

### Documentation

There isn't much, but look at the source code. *It should be quite readable.*

There's two main files to start from:

 * [`DiscordService`](https://github.com/heusalagroup/fi.hg.discord/blob/main/src/DiscordService.ts) is a simple API for Discord's REST calls
 * [`DiscordGateway`](https://github.com/heusalagroup/fi.hg.discord/blob/main/src/DiscordGateway.ts) is a [Discord Gateway](https://discord.com/developers/docs/topics/gateway) implementation

Since this project is experimental, we might change things later.

### We can make stable releases for a commercial customer

One stable release is 8000 € + taxes.

The payment includes a month of agile development with the customer, and a year of
support for that release branch.

### License

Copyright (c) Heusala Group. All rights reserved. Licensed under the MIT License (the "[License](LICENSE)");
