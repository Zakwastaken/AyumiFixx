const { MessageEmbed } = require("discord.js");
const OWNERID = "760723665372971008";

module.exports = {
    name: "shutdown",
    category: "Owner",
    description: "Shut's down the bot",
    execute: async (message, args, client, prefix) => {
      if (message.author.id != OWNERID) {
        let warning = new MessageEmbed()
        .setColor("RED")
        .setDescription("<:cross_warning:941601429783740456>・Only **Zakuro** can use this commands!")
        return message.reply({ embeds: [warning] });
      }
      message.reply("Shutting down!").then((m) => {
        client.destroy();
      });
      const embed = new MessageEmbed()
      .setColor("GREEN")
      .setDescription("\`\`\`The bot has been shutdown!\`\`\`")
      return message.channel.send({ embeds: [embed] })
    },
  };