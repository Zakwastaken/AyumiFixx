const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "color",
    category: "Funny",
    execute: async (message, args, client, prefix) => {
        const result = await fetch("https://api.popcat.xyz/randomcolor").then(res => res.json());
        const embed = new MessageEmbed()
        .setTitle("Random Color Generated.")
        .addField("NAME", `\`\`\`${result.name}\`\`\``, true)
        .addField("HEX", `\`\`\`#${result.hex}\`\`\``, true)
        .setColor(result.hex)
        .setImage(result.image)
        message.reply({ embeds: [embed] })
    }
    }