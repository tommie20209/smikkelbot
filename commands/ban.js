const discord = require("discord.js");
const botConfig = require("../botconfig.json");
const prefix = botConfig.prefix;
module.exports.run = async (client, message, argument) => {
    const args = message.content.slice(prefix.length).split(/ +/);
    if (!message.member.hasPermission("BAN_MEMBERS")) return 
        let User = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0])
    if (!User) return message.channel.send("geef een gebruiker aan")
    if (User.hasPermission("BAN_MEMBERS")) return message.reply("de persoon heeft een speciale rol")
    let banReason = args.join(" ").slice(22);
    if (!banReason) {
        banReason = "None"
    }

    User.ban({ reason: banReason })
    message.channel.send(`${User} is geband door: ${message.author}`)
}
module.exports.help = {
    name: "ban",
    description: "Ban iemand",
    category: "Algemeen"
}