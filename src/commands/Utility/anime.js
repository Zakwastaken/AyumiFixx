const discord = require("discord.js")
const Kitsu = require('kitsu.js');
const kitsu = new Kitsu();
module.exports = {
  name: "anime",
  category: "Utility",
  aliases: ["searchanime", "animesearch"],
  description: "Get some anime information.",
  execute: async (message, args, client, prefix) => {
   var search = message.content.split(/\s+/g).slice(1).join(" ");
    if(!args[0]) return message.reply("Please specify the \`anime\` movie!")
    kitsu.searchAnime(search).then(async result => {
      if(result.length === 0) return message.reply("This is not a valid \`anime\` movie!")
      
      let anime = result[0]
      const embed = new discord.MessageEmbed()
      .setColor("#34eb95")
      .setAuthor(`${anime.titles.english ? anime.titles.english : search} | ${anime.showType}`, anime.posterImage.original)
      .setDescription(anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
      .addField('❯Information', `•**Japanese Name:** ${anime.titles.romaji}\n•**Age Rating:** ${anime.ageRating}\n\•**Is it NSFW:** ${anime.nsfw ? 'Yes' : 'No'}`, true)
      .addField('❯Stats', `•**Avg Rating:** ${anime.averageRating}\n\•**Rank by rating:** ${anime.ratingRank}\n\•**Rank by popularity:** ${anime.popularityRank}`, true)
      .addField('❯Status', `•**Episode Count:** ${anime.episodeCount ? anime.episodeCount : 'N/A'}\n`, true)
      .setThumbnail(anime.posterImage.original, 100, 200);
      return message.reply({ embeds: [embed] });
    }).catch(err => {
      console.log(err)
      return message.reply(`Couldn't find result for ${search}.`)
    })
    
  }
    }