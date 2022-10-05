const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "24/7",
  aliases: ["24h", "24/7", "24*7"],
  category: "Music",
  description: "24/7 in voice channel.",
  args: false,
  usage: "",
  permission: [],
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {


    const player = message.client.manager.players.get(message.guild.id);
    if (player.twentyFourSeven) {
      player.twentyFourSeven = false;
      const embed = new MessageEmbed()
       .setColor("#34eb95")
       .setDescription(`<:check_green:941607407027625994>・24/7 mode is now off.`)
      return message.reply({embeds: [embed]});
    }
    else {
      player.twentyFourSeven = true;
      const embed = new MessageEmbed()
       .setColor("#34eb95")
       .setDescription(`<:check_green:941607407027625994>・24/7 mode is now on.`)
      
      return message.reply({embeds: [embed]});
    }
  }
};