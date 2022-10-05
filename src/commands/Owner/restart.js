require('dotenv').config();
const { Client, Message, MessageEmbed } = require('discord.js');
const OWNERID = "760723665372971008";

module.exports = {
  name: 'restart',
  category: "Owner",
  description: 'Restart the client',
  aliases: ['reboot'],
  emoji: '',
  userperm: ['SEND_MESSAGES'],
  botperm: ['SEND_MESSAGES'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
   execute: async (message, args, client, prefix) => {
    if (message.author.id != OWNERID) {
      let warning = new MessageEmbed()
      .setColor("RED")
      .setDescription("<:cross_warning:941601429783740456>・Only **Zakuro** can use this commands!")
      return message.reply({ embeds: [warning] });
    }
    await message.reply({
      embeds: [
        new MessageEmbed()
          .setDescription(`\`\`\`Successfully Restarted!\nLoaded Commands : ${client.commands.size}\`\`\``)
          .setColor("GREEN")
      ],
    });

    const masterLogger = client.channels.cache.get('928219815083147264');
    if (masterLogger) {
      await masterLogger.send({
        embeds: [
          new MessageEmbed()
            .setTitle('Client Restarted!')
            .setThumbnail(
              message.author.displayAvatarURL({ dynamic: true, size: 512 })
            )
            .setDescription(`**Actioned by** : ${message.author.tag}`)
            .setColor('GREEN')
            .setTimestamp(),
        ],
      });
    }

    return process.exit();
  },
};