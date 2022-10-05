const Discord = require("discord.js");
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");
const Color = `#ffffff`;

module.exports = {
  name: "enlargemoji",
  category: "Utility",
  description: "Converting Server emoji to PNG/GIF!",
  botPerms: ["EMBED_LINKS"],
  execute: async (message, args, client, prefix) => {
    const authoravatar = message.author.avatarURL();
    const emoji = args[0];
    if (!emoji) return message.reply(`<:cross_warning:941601429783740456>・***Please give me a Emoji!***`);

    let customemoji = Discord.Util.parseEmoji(emoji);

    if (customemoji.id) {
      const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
        customemoji.animated ? "gif" : "png"
      }`;

      const Added = new MessageEmbed()
        .setAuthor(`Enlarged Emoji!`, authoravatar)
        .setColor("#34eb95")
        .setDescription(`\`${customemoji.name}\` \`${customemoji.id}\``)
        .setImage(Link);
      return message.reply({ embeds: [Added] });
    } else {
      let CheckEmoji = parse(emoji, { assetType: "png" });
      if (!CheckEmoji[0])
        return message.reply(`Please give me a valid \`Emoji\`!`);
      message.reply(
        `You can use normal emoji without adding in server!`
      );
    }
  },
};