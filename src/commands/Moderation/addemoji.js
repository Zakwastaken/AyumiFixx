const Discord = require('discord.js')
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "addemoji",
    category: "Moderation",
    description: 'Addemoji commands.',
    execute: async (message, args, client, prefix) => {
        if (!message.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) {
          const warning = new MessageEmbed()
          .setColor("RED")
          .setDescription("<:cross_warning:941601429783740456>・You don't have permission to use this commands!")
          return message.reply({ embeds: [warning] });
}
        const emojis = args.join(" ").match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi)
        if (!emojis) return message.reply(`Provide The emojis to add !`);
        emojis.forEach(emote => {
        let emoji = Discord.Util.parseEmoji(emote);
        if (emoji.id) {
      const Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${
       emoji.animated ? "gif" : "png"
}`
            message.guild.emojis.create(
                `${Link}`,
                `${`${emoji.name}`}`
            ).then(em => message.channel.send(em.toString() + " added!")).catch(error => {
              message.channel.send(":x: | an Error occured!")
                console.log(error)
})
          
        }
        })
}
}