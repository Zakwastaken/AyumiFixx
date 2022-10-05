const discord = require("discord.js");
const translate = require('@iamtraction/google-translate');

module.exports = {
  name: "translate",
  category: "Utility",
  description: "Translates the given message.",
  execute: async (message, args, client, prefix) => {
        const txt = args.slice(1).join(" ")
        const lang = args[0]
        if(!lang) return message.reply("Provide the \`ISO\` code of the language!")
        if(!txt) return message.reply("Provide a text to \`translate\`!")
        translate(txt, { to: lang }).then(res => {
          const embed = new discord.MessageEmbed()
          .setTitle("Translate Languange!")
          .setThumbnail("https://cdn.discordapp.com/attachments/933327921899262013/938698295843377193/Google_Translate_Icon.png")
          .setDescription(`\`\`\`${res.text}\`\`\``)
          .setTimestamp()
          .setColor("#34eb95")
          message.reply({ embeds: [embed] });
    }).catch(err => {
      message.reply("Please provide a valid \`ISO\` language code!")
    });
  },
};