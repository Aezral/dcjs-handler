const fs = require("fs");
const path = require("path");

class Command {
  constructor(func) {
    this.run = func;
  }
}

class Handler {
  constructor(options) {
    const routes = options.commands;
    const client = options.bot;
    const prefix = options.prefix;

    if (!routes || !fs.existsSync(routes)) {
      throw new Error("Missing command directory");
    }

    if (!client) {
      throw new Error("Missing discord.js client");
    }

    if (!prefix || typeof prefix != "string") {
      throw new Error("Missing correct prefix");
    }

    this.commands = fs
      .readdirSync(routes)
      .filter((file) => file.endsWith(".js"))
      .map((x) => ({
        name: path.parse(x).name,
        run: require(routes + "/" + x),
      }));

    this.list = this.commands.map((x) => x.name);

    client.on("messageCreate", async (message) => {
      if (!message.guild) {
        return;
      }
      if (!message.content.startsWith(prefix) || message.author.bot) return;

      var args = message.content.slice(prefix.length).trim().split(/ +/);

      const command = args.shift().toLowerCase();

      if (this.commands.filter((x) => x.name == command)[0]) {
        this.commands
          .filter((x) => x.name == command)[0]
          .run.run(message, client);
      }
    });

    console.log(`Handler | Commands: ${this.list.length} | Prefix: ${prefix}`);
  }
}

module.exports = {
  Command,
  Handler,
};
