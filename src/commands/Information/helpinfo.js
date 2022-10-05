const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const config = require('../../config');
const ms = require('ms');

module.exports = {

    name: "helpinfo",
    aliases: ["hi"],
    category: "Information",
    description: "Shows all the commands present in me.",

    execute: async (message, args, client, prefix) => {
        const command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
    
        if(!command) return;

        const embed = new MessageEmbed()
        .setColor("GREEN")
        .setImage("https://cdn.discordapp.com/attachments/933327921899262013/939040869829443624/IMG_20220204_131025.jpg")
        .setThumbnail(client.user.displayAvatarURL({dynamic: true, size: 1024}))
        .setAuthor(`Commands Detail`, message.guild.iconURL())
        .addField('Command Name', `\`\`\`${command.name}\`\`\``, true)
        .addField('Description', `\`\`\`${command.description}\`\`\``)
        .addField('Category', `\`\`\`${command.category}\`\`\``, true)
        .addField(
            "Aliases",
            command.aliases
              ? `\`\`\`${command.aliases.join(", ")}\`\`\``
              : "_\`\`\`No aliases for this command.\`\`\`_"
          )
        .addField('Information',`_\`\`\`asciidoc\n> Remove brackets when typing commands\n> <> = required arguments\n> [] = optional arguments\`\`\`_`)
        .setFooter("© Zakuro Development 2022")
        .setTimestamp()

        return message.reply({ embeds: [embed] })
    }
};