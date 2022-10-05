const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: "wink",
    category: "Roleplay",
    description: "Wink someone!",
    execute: async (message, args, client, prefix) => {
        fetch('https://some-random-api.ml/animu/wink')
        .then(res => res.json())
        .then(response => {
                const embed = new MessageEmbed()
                    .setTitle("Here's your Wink 😉")
                    .setImage(response.link)
                    .setColor("#34eb95")
                    .setTimestamp()
                    .setURL(response.url);
                    message.reply({ embeds: [embed] });
            });
    }
}