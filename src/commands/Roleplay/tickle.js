const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "tickle",
 aliases: [],
 description: "Tickle a user",
 category: "Roleplay",
 usage: "tickle <user>",
    execute: async (message, args, client, prefix) => {
        const member = message.mentions.users.first() || client.users.cache.get(args[0]);
        if (!member) return message.reply('<:cross_warning:941601429783740456>・***You must mention someone!***');

    const response = await fetch("https://nekos.life/api/v2/img/tickle");
    const body = await response.json();
    const embed = new MessageEmbed() // Prettier
     .setColor("#34eb95")
     .setTimestamp()
     .setTitle(`**\`${member.username}\` just got tickled by \`${message.author.username}.\`**`)
     .setImage(body.url);
    message.reply({ embeds: [embed] });
    }}
