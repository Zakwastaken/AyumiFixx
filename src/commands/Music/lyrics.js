const fetch = require("node-fetch")
const {MessageEmbed} = require("discord.js")
module.exports = {
    name: 'lyrics',
    aliases: ["ly"],
    category: 'Music',
    description: 'Lyrics of a song.',
     /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
      execute: async (message, args, client, prefix) => {
        try{
        const song = args.join(' ')
        if (!song) return message.reply("<:cross_warning:941601429783740456>・Please provide a song to search for!")
        const json = await fetch(`https://api.popcat.xyz/lyrics?song=${encodeURIComponent(song)}`).then(r => r.json())
        if (json.error) return message.reply("<:cross_warning:941601429783740456>・Song not found!")
        const url = `${song.replace(" ", "+")}`
        let lyrics = json.lyrics;
        if (lyrics.length > 4096) lyrics = `Too long to show, visit **[https://popcat.xyz/lyrics/${url}](https://popcat.xyz/lyrics/${url})** for full lyrics!`
        const embed = new MessageEmbed()
            .addField("> › Song Title :",`_\`\`\`asciidoc\n${json.full_title === "none" ? json.title : json.full_title}.\`\`\`_`)
            .setThumbnail(json.image)
            .addField("> › Artist :", `\`\`\`asciidoc\n${json.artist}\`\`\``)
            .setDescription("> **› Lyrics :**\n" + `_\`\`\`asciidoc\n${lyrics}\`\`\`_`)
            .setTimestamp()
            .setFooter("© Zakuro Development 2022")
            .setColor("#34eb95")
        message.reply({embeds: [embed]})
        }catch(e) {
            return console.log(e)
        }
    }
}