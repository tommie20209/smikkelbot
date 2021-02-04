const discord = require("discord.js");
const botConfig = require("./botconfig.json");
const userMap = new Map();
const ms = require("ms")



//  Command handler
const fs = require("fs");
const { isFunction } = require("util");

const client = new discord.Client();


//  Command handler
client.commands = new discord.Collection();


client.login(botConfig.token);


//  Command handler
fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Kon geen files vinden");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen`);

        client.commands.set(fileGet.help.name, fileGet);
    });

});
/*
'id' => `{
    msgcount: 0,
    LastMessage: 'message',
    timer: fn()     
}

*/



client.on("ready", async () => {

    console.log(`${client.user.username} is online.`);

    client.user.setActivity("Testing", { type: "PLAYING" });

});


client.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;
    
    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");


    var command = messageArray[0];

    //  Command handler
    var arguments = messageArray.slice(1);

    var commands = client.commands.get(command.slice(prefix.length));

    if(!message.content.startsWith(prefix)) return;
    if (commands) commands.run(client, message, arguments)}
);
