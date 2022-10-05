const Discord = module.require("discord.js");

module.exports = {
  name: "poll",
  category: "Utility",
  description: "Start a Poll!",
  userPerms: ["MANAGE_SERVER"],
  execute: async (message, args, client, prefix) => {
    const pll = args.join(" ");
    if (!message.member.permissions.has("MANAGE_SERVER")) {
      return message.reply("You don't have enough permissions!");
    }
    if (!pll) {
      return message.reply("<:cross_warning:941601429783740456>・***Enter some text for the polling!***");
    }
    let embed = new Discord.MessageEmbed()
      .setTitle("Poll Time!")
      .setDescription(`${pll}`)
      .setFooter(`Started By ${message.author.username}`)
      .setColor("#34eb95");
    message.channel
      .send({ embeds: [embed] })
      .then(function (message, str) {
        message.react("👍");
        message.react("👎");
      })
      .catch(function () {});
  },
};
