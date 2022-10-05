const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../../../models/modlog');

module.exports = {
  name: 'setmodlog',
  category: "Setup",
  description: 'Set Moderation Log System Channel.',
  aliases: ['set-welcoming'],
  emoji: '➕',
  userperm: ['MANAGE_GUILD'],
  botperm: ['SEND_MESSAGES'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
   execute: async (message, args, client, prefix) => {
    if(!message.member.permissions.has("MANAGE_GUILD")) {
      const warning = new MessageEmbed()
      .setColor("RED")
      .setDescription("<:cross_warning:941601429783740456>・You don't have permission to use this commands!")
      return message.reply({ embeds: [warning] });
    }
    const channel = message.mentions.channels.first();
    if (!channel)
      return message.reply({ content: '<:cross_warning:941601429783740456>・***Please mention a channel!***' });

    Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (data) {
        data.Channel = channel.id;
        data.save();
      } else {
        new Schema({
          Guild: message.guild.id,
          Channel: channel.id,
        }).save();
      }
      message.reply({
        content: `<:check_green:941607407027625994>・***${channel} has been set as the mod-log channel!***`,
      });
    });
  },
};