# About

Command handler designed to be fast and easy to use.

Once you call the handler and provide the commands directory, the client and the prefix, the handler automatically registers the user mssages, in the directory, which have to follow an easy structure.

# Usage

We create a basic Discord.js Client in our main file

```javascript
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

client.login(token);
```

We add "dcjs-handler" to the main file and create a Handler with the required configuration.

```javascript
const { Client, Intents } = require("discord.js");

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// Creating the Command handler
const { Handler } = require("dcjs-handler");
const path = require("path");

new Handler({
	commands: path.join(__dirname, "./commands"),
	bot: client,
	prefix: "?",
});

client.login(token);
```

Command example in "./comands/hello.js"

```javascript
const { Command } = require("dcjs-handler");

function hello(message, client) {
	message.reply("hola");
}

module.exports = new Command(hello);
```

If the client was created succesfully and the correct intents were provided, the handler will receive any message which starts with the prefix, verify if it exists and then run the callback of the command in its respective file.

## License

[MIT](https://choosealicense.com/licenses/mit/)
