const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'emojilist',
  category: "Information",
  description: 'List all emojis.',
  aliases: ['emojis'],
  userperm: ['SEND_MESSAGES'],
  botperm: ['SEND_MESSAGES'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
   execute: async (message, args, client, prefix) => {
    try {
      let Emojis = '';
      let EmojisAnimated = '';
      let EmojiCount = 0;
      let Animated = 0;
      let OverallEmojis = 0;
      function Emoji(id) {
        return client.emojis.cache.get(id).toString();
      }
      message.guild.emojis.cache.forEach((emoji) => {
        OverallEmojis++;
        if (emoji.animated) {
          Animated++;
          EmojisAnimated += Emoji(emoji.id);
        } else {
          EmojiCount++;
          Emojis += Emoji(emoji.id);
        }
      });
      let emn = new MessageEmbed();
      emn.setTitle(
        `Showing Emojis of ${message.guild.name}!`
      );
      emn.setThumbnail(
        message.guild.iconURL({ dynamic: true, format: 'png', size: 512 })
      );
      emn.setDescription(
        `**Animated [${Animated}]**:\n${EmojisAnimated}\n\n**Standard [${EmojiCount}]**:\n${Emojis}`
      );
      emn
        .setColor("#34eb95")
        .setTimestamp()
      message.reply({ embeds: [emn] });
    } catch (err) {
      message.reply(
        'Oops! Looks like something went wrong, Please try again Later.'
      );
      console.log(err);
    }
  },
};