const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "sign",
    category: "Roleplay",
    description: "Get image about an anime sign.",
    usage: "[command | Anime]",
    execute: async (message, args, client, prefix) => {
        if (!message.content.includes(" ")) {
            return message.reply("Please specify what you want to say!")
        }
        message.channel.send('\`Creating image ...\`')
        let input = message.content.substring(message.content.indexOf(' ') + 1)

        let res = await fetch(`https://nekobot.xyz/api/imagegen?type=fact&text=${input}`);
        let json = await res.json();

        if (!json.message) throw new Error(`Something went wrong, Try again later!`);

        const data = new MessageEmbed()
        .setImage(json.message)
        .setColor("#34eb95")
        message.reply({ embeds: [data] });
    }
}
