const { MessageEmbed, Client, Message } = require("discord.js");
module.exports = {
  name: "editsnipe",
  category: "Utility",
  aliases : ['es'],
  description: "Gets the edited messages.",
  usage: "",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

   execute: async (message, args, client, prefix) => {
    const esnipes = client.esnipes.get(message.channel.id);
    if (!esnipes) return message.reply("<:cross_warning:941601429783740456>・***There is no message to snipe!***");

    const esnipe = +args[0] - 1 || 0;
    const target = esnipes[esnipe];
    if (!target) {
      message.reply(`There are ${snipes.length} messages to snipe!`);
    }
    const { newc, msg } = target;
    message.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor(
            msg.author.tag,
            msg.author.displayAvatarURL({ dynamic: true })
          )
          .setDescription(`**Old Content:**\n${msg.content}\n**New Content:**\n${newc.content}`)
          .setTimestamp()
          .setColor("#34eb95"),
      ],
    });
  },
};