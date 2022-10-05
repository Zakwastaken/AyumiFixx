const { MessageEmbed } = require("discord.js");
const nekos = require("nekos.life");
const { sfw: { slap }, } = new nekos()

module.exports = {
    name: "slap",
    category: "Roleplay",
    description: "Slap someone!",
    execute: async (message, args, client, prefix) => {
        const { url } = await slap().catch(() => {});

        if (!url) return message.channel.send(`Could not connect to nekos.life`);
    
        const embed = new MessageEmbed();
    
        if (
          message.mentions.members.size &&
          message.mentions.members.first().id === client.user.id
        ) {
          return message.channel.send(
            `${
              [`Ouch! How dare you slap me!`, `Stop that!`, `It hurts! ;-;`][
                Math.floor(Math.random() * 2)
              ]
            }`
          );
        } else if (
          message.mentions.members.size &&
          message.mentions.members.first().id === message.author.id
        ) {
          return message.reply(`Wai~ Seriously!?`);
        } else if (message.mentions.members.size) {
          const embed = new MessageEmbed()
              .setColor("#34eb95")
              .setDescription(`${message.author.username} \`slapped\` ${message.mentions.members.first()}!`)
              .setImage(url)
              .setTimestamp()
            return  message.reply({ embeds:  [embed] }
          );
        } else {
          return message.reply( `You can't slap yourself in the face!`);
        }

    }
}