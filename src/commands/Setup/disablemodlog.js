const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../../../models/modlog');

module.exports = {
  name: 'disablemodlog',
  category: "Setup",
  description: 'Remove / Disable Moderation Logging Feature.',
  aliases: ['remove-welcoming'],
  emoji: '🗑️',
  userperm: ['MANAGE_GUILD'],
  botperm: ['MANAGE_GUILD'],
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
    await Schema.findOneAndDelete({ Guild: message.guild.id });
    message.reply({
      content: `<:check_green:941607407027625994>・***Sucessfully disable mod-log feature!***`,
    });
  },
};