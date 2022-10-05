const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "hug",
    category: "Roleplay",
    description: "Hug someone!",
    execute: async (message, args, client, prefix) => {

        let victim = message.mentions.users.first() || (args.length > 0 ? message.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first() : message.author) || message.author;
        await fetch("https://nekos.life/api/v2/img/hug")
            .then(res => res.json())
            .then(body => {
                const embed = new MessageEmbed()
                    .setColor("#34eb95")
                    .setTitle("Here's your Hug, 🤗")
                    .setDescription(`\`User\` \`is hugged by\` ${message.author.username}.`)
                    .setImage(body.url)
                    .setTimestamp()
                    message.reply({ embeds: [embed] })
            });
    },
};