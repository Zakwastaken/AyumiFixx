const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "poke",
 aliases: [],
 description: "Poke user",
 category: "Roleplay",
 usage: "poke <user>",
 execute: async (message, args, client, prefix) => {
    const member = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!member) return message.reply('<:cross_warning:941601429783740456>・***You must mention someone!***');
    try {
    const response = await fetch("https://nekos.life/api/v2/img/poke");
    const body = await response.json();
    const embed = new MessageEmbed() // Prettier
     .setTitle(`**\`${member.username}\` just got poked by \`${message.author.username}.\`**`)
     .setImage(body.url)
     .setColor("#34eb95")
     .setTimestamp()
    message.reply({ embeds: [embed] });
} catch (err) {
    console.log(err);
    return client.createCommandError(message, err);
   }
 },
};