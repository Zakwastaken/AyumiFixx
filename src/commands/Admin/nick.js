const Discord = module.require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "nickname",
  category: "Admin",
  description: "Change the nickname of other users.",
  userPerms: ["MANAGE_NICKNAMES"],
  botPerms: ["MANAGE_NICKNAMES"],
  execute: async (message, args, client, prefix) => {
    if(!message.member.permissions.has("MANAGE_NICKNAMES")) {
      const warning = new MessageEmbed()
      .setColor("RED")
      .setDescription("<:cross_warning:941601429783740456>・You don't have permission to use this commands!")
      return message.reply({ embeds: [warning] });
    }
    let mentionMember = message.mentions.members.first();
    let newNickname = args.slice(1).join(" ");
    if (!mentionMember) {
      return message.reply("Mention the user you want to change the \`nickname\`!");
    }
    if (!newNickname) {
      return message.reply("Input the new \`nickname\` for the user you mentioned!");
    }
    try {
      mentionMember.setNickname(newNickname);
    } catch (error) {
      message.reply(
        "Can't change \`nickname\` of this user, does he have a higher role? Is the server creator? Have I got the permission to change his nickname?"
      );
    }
    message.reply(
      `Changed \`nickname\` of ${mentionMember} to **${newNickname}**!`
    );
  },
};