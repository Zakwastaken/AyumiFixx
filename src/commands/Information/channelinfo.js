const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'channelinfo',
  category: "Information",
  description: 'Returns information about channels.',
  aliases: ['channel'],
  emoji: '💬',
  userperm: ['SEND_MESSAGES'],
  botperm: ['SEND_MESSAGES'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
   execute: async (message, args, client, prefix) => {
    function checkDays(date) {
      let now = new Date();
      let diff = now.getTime() - date.getTime();
      let days = Math.floor(diff / 86400000);
      return days + (days == 1 ? ' day' : ' days') + ' ago';
    }
    let channel = message.mentions.channels.first();
    if (!channel) return message.reply('Please mention a \`channel\`!');
    let channelType = channel.type;
    if (channelType === 'GUILD_TEXT') {
      channelType = 'Text Channel';
    }
    if (channelType === 'GUILD_VOICE') {
      channelType = 'Voice Channel';
    }
    if (channelType === 'GUILD_PUBLIC_THREAD') {
      channelType = 'Public Thread';
    }
    if (channelType === 'GUILD_PRIVATE_THREAD') {
      channelType = 'Private Thread';
    }
    if (channelType === 'GUILD_CATEGORY') {
      channelType = 'Category';
    }
    let inline = true;
    try {
      let e = new MessageEmbed()
        .setTitle(`Channel Information!`)
        .setThumbnail(message.guild.iconURL({ dynamic: false }))
        .setDescription(`Information About ${channel}!`)
        .addField('Created At :', `\`\`\`${checkDays(channel.createdAt)}\`\`\``, inline)
        .addField('Channel ID :', `\`\`\`${channel.id}\`\`\``, inline)
        .addField('Channel Type :', `\`\`\`${channelType}\`\`\``, inline)
        .setTimestamp()
        .setColor("#34eb95");
      message.reply({ embeds: [e] });
    } catch (error) {
      message.channel.send(error);
    }
  },
};