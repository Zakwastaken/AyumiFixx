const nekos = require('nekos.life');
const { MessageEmbed } = require('discord.js');
const { sfw: { kiss }, } = new nekos();

module.exports = {
  name: "kiss",
  category: "Roleplay",
  description: "Kiss someone!",
  execute: async (message, args, client, prefix) => {
        const embed = new MessageEmbed();

        if (
            message.mentions.members.size &&
            message.mentions.members.first().id === client.user.id
        ) {
            const { url } = await slap().catch(() => { });

            if (!url) return message.channel.send(`Could not connect to nekos.life`);

            return message.reply(
                embed
                    .setColor("#34eb95")
                    .setDescription(`${message.member}, How dare you!`)
                    .setImage(url)
                    .setFooter(`${message.member.displayName}, you really do deserve a slapping.` )
            );
        } else {
            const { url } = await kiss().catch(() => { });

            if (!url) return message.channel.send(`Could not connect to nekos.life`);

            if (
                message.mentions.members.size &&
                message.mentions.members.first().id === message.author.id
            ) {
                return message.reply(`S~seriously?!`);
            } else if (message.mentions.members.size) {
                const embed = new MessageEmbed()
                        .setColor("#34eb95")
                        .setDescription( `${message.author.username} \`kisses\` ${message.mentions.members.first()}!`)
                        .setImage(url)
                        .setTimestamp()
                        return message.reply({ embeds: 
                            [embed] }
                );
            } else {
                return message.reply(
                    `You can't kiss yourself!`
                );
            }
        }
    }
}