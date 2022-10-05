const { MessageEmbed } = require("discord.js");
const OWNERID = "760723665372971008";


module.exports = {
  name: "eval",
  category: "Owner",
  description: "Run a whole fuckin' code with this!",
  botPerms: ["EMBED_LINKS"],
  execute: async (message, args, client, prefix) => {
    //Eval Command(Not to be made public btw!)
    if (message.author.id != OWNERID) {
      let warning = new MessageEmbed()
      .setColor("RED")
      .setDescription("<:cross_warning:941601429783740456>・Only **Zakuro** can use this commands!")
      return message.reply({ embeds: [warning] });
    }
    try {
      const code = args.join(" ");
      if (!code) {
        return message.reply("What do you want to \`evaluate\`?");
      }
      let evaled = eval(code);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      let embed = new MessageEmbed()
        .setAuthor("Eval", message.author.avatarURL())
        .addField("Input", `\`\`\`${code}\`\`\``)
        .addField("Output", `\`\`\`${evaled}\`\`\``)
        .setColor("GREEN");

      message.reply({ embeds: [embed] });
    } catch (err) {
      message.reply(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
    }
  },
};