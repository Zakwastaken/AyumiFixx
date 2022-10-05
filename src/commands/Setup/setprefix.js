const { MessageEmbed } = require("discord.js");
const db = require("../../../models/prefix");
module.exports = {
    name: "setprefix",
    category: "Setup",
    description: "Set Custom Prefix",
    args: false,
    usage: "",
    aliases: ["prefix"],
    permission: [],
    owner: false,
  execute: async (message, args, client, prefix) => {
    
    const data = await db.findOne({ Guild: message.guildId});
    const pre = await args.join(" ")
    if (!message.member.permissions.has('MANAGE_GUILD')) {
      const warning = new MessageEmbed()
      .setColor("RED")
      .setDescription("<:cross_warning:941601429783740456>・You don't have permission to use this commands!")
      return message.reply({ embeds: [warning] });
    }
    if (!pre[0]) {
    const embed = new MessageEmbed()
        .setDescription("\`\`\`Please give the prefix that you want to set!\`\`\`")
        .setColor("RED")
      return message.reply({ embeds: [embed] });
    }
    if (pre[0].length > 3) {
       const embed = new MessageEmbed()
        .setDescription("\`\`\`You can't send prefix more than 3 characters!\`\`\`")
        .setColor("RED")
      return message.reply({ embeds: [embed] });
    }
     if(data) {
       data.oldPrefix = prefix;
       data.Prefix = pre;
       await data.save()
     const update = new MessageEmbed()
     .setDescription(`\`\`\`Server prefix has been updated to ${pre}\`\`\``)
     .setColor("#34eb95")
     return message.reply({embeds: [update]});
    } else {
     const newData = new db({
        Guild : message.guildId,
        Prefix : pre,
        oldPrefix: prefix
       });
       await newData.save()
     const embed = new MessageEmbed()
     .setDescription(`\`\`\`Custom prefix in this server is now set to ${pre}\`\`\``)
     .setColor("#34eb95")
     return message.reply({embeds: [embed]});

    }
  }
};
