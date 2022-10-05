const {
  Client,
  Message,
  MessageEmbed,
  MessageButton,
  MessageActionRow
} = require('discord.js')
const config = require('../../config');
const ms = require('ms');

module.exports = {

  name: "help",
  aliases: ["h", "assist", "cmd", "commands"],
  category: "Information",
  description: "Shows all the commands present in me.",

  execute: async (message, args, client, prefix) => {
    const Games = message.client.commands.filter(x => x.category == 'Games').map((x) => x.name ).join(', ');
      const Funny = message.client.commands.filter(x => x.category == 'Funny').map((x) => x.name ).join(', ');
      const Admin = message.client.commands.filter(x => x.category == 'Admin').map((x) => x.name ).join(', ');
      const Information = message.client.commands.filter(x => x.category == 'Information').map((x) => x.name ).join(', ');
      const Moderation = message.client.commands.filter(x => x.category == 'Moderation').map((x) => x.name ).join(', ');
      const Utility = message.client.commands.filter(x => x.category == 'Utility').map((x) => x.name ).join(', ');
      const Roleplay = message.client.commands.filter(x => x.category == 'Roleplay').map((x) => x.name ).join(', ');
      const Music = message.client.commands.filter(x => x.category == 'Music').map((x) => x.name ).join(', ');
      const Setup = message.client.commands.filter(x => x.category == 'Setup').map((x) => x.name ).join(', ');

      let a = new MessageButton()
      .setCustomId('admin')
      .setStyle('SECONDARY')
        .setEmoji('<:ayumi_admin:948427932081192980>')

        let b = new MessageButton()
        .setCustomId('info')
        .setStyle('SECONDARY')
        .setEmoji('<:info:948430621519282216>')

        let c = new MessageButton()
        .setCustomId('mod')
        .setStyle('SECONDARY')
        .setEmoji('<:ayumi_mod:943816725386891288>')

        let d = new MessageButton()
        .setCustomId('utility')
        .setStyle('SECONDARY')
        .setEmoji('<:utility:948430728465645619>')

        let e = new MessageButton()
        .setCustomId('funny')
        .setStyle('SECONDARY')
        .setEmoji('<:funny:948434233519665183>')
        
        let f = new MessageButton()
        .setCustomId('reaction')
        .setStyle('SECONDARY')
        .setEmoji('🎭')

        let g = new MessageButton()
        .setCustomId('music')
        .setStyle('SECONDARY')
        .setEmoji('<:music:948435113937608714>')
        .setDisabled(true)

        let h = new MessageButton()
        .setCustomId('setup')
        .setStyle('SECONDARY')
        .setEmoji('<:ayumi_conf:943821919088705566>')

        let i = new MessageButton()
        .setCustomId('games')
        .setStyle('SECONDARY')
        .setEmoji('<:ayumi_games:943822474817179668>')

        let j = new MessageButton()
        .setCustomId('home')
        .setStyle('SUCCESS')
        .setEmoji('🏠')

        const EndEmbed = new MessageEmbed()
        .setColor("RED")
        .setDescription(`<:cross:947446953023766568>・This message is now inactive! Please type **\`${prefix}help\`** again.`)

      const row = new MessageActionRow().addComponents(j, a, b, c, d)
      const rew = new MessageActionRow().addComponents(e, f, g, h, i)
      const intro = new MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL({dynamic: true, size: 1024}))
      .setAuthor(`Ayumi Chan | Help Panel`, message.guild.iconURL())
      .setImage("https://cdn.discordapp.com/attachments/933327921899262013/939040869829443624/IMG_20220204_131025.jpg")
      .setDescription(`**›** Hey there I'm **${client.user.username}**, my **Global Prefix** is **\`y.\`**\n**›** My **Prefix** in this server is \`${prefix}\``)
      .addField('> Command Categories', `<:ayumi_admin:948427932081192980>・\`Admin\`\n<:info:948430621519282216>・\`Information\`\n<:ayumi_mod:943816725386891288>・\`Moderation\`\n<:utility:948430728465645619>・\`Utility\`\n<:funny:948434233519665183>・\`Funny\`\n:performing_arts:・\`Reaction\`\n<:music:948435113937608714>・\`Music\`\n<:ayumi_conf:943821919088705566>・\`Setup\`\n<:ayumi_games:943822474817179668>・\`Games\``)
      .addField('> Information', `_\`\`\`asciidoc\n› To get help on a specific commands type ${prefix}helpinfo <command>!\n› To see a list of available commands, please press the following button that corresponds to the emoji category.\`\`\`_`)
      .setFooter("© Zakuro Development 2022・Page 1/10")
      .setColor("#34eb95")
      .setTimestamp()

      const helpPage = await message.reply({ embeds: [intro], components: [row, rew] })

      const collector = await helpPage.createMessageComponentCollector({
          componentType: "BUTTON",
          time: ms('60s'),
      })

      collector.on('collect', m => {
          if (m.customId === 'admin') {
              const admin = new MessageEmbed()
              .setThumbnail(client.user.displayAvatarURL({dynamic: true, size: 1024}))
              .setAuthor(`Ayumi Chan | Admin Categories`, message.guild.iconURL())
              .setImage("https://cdn.discordapp.com/attachments/933327921899262013/939040869829443624/IMG_20220204_131025.jpg")
              .addField('> Commands', `_\`\`\`asciidoc\n${Admin}\`\`\`_`)
              .addField('> Information', `_\`\`\`asciidoc\n› To get help on a specific commands type ${prefix}helpinfo <command>!\`\`\`_`)
              .setFooter("© Zakuro Development 2022・Page 2/10")
              .setColor("#34eb95")
              .setTimestamp()
              helpPage.edit({ embeds: [admin] });
          }
          if (m.customId === 'info') {
              const info = new MessageEmbed()
              .setThumbnail(client.user.displayAvatarURL({dynamic: true, size: 1024}))
              .setAuthor(`Ayumi Chan | Information Categories`, message.guild.iconURL())
              .setImage("https://cdn.discordapp.com/attachments/933327921899262013/939040869829443624/IMG_20220204_131025.jpg")
              .addField('> Commands',`_\`\`\`asciidoc\n${Information}\`\`\`_`)
              .addField('> Information', `_\`\`\`asciidoc\n› To get help on a specific commands type ${prefix}helpinfo <command>!\`\`\`_`)
              .setFooter("© Zakuro Development 2022・Page 3/10")
              .setColor("#34eb95")
              .setTimestamp()
              helpPage.edit({ embeds: [info] });
          }
          if (m.customId === 'mod') {
              const mod = new MessageEmbed()
              .setThumbnail(client.user.displayAvatarURL({dynamic: true, size: 1024}))
              .setAuthor(`Ayumi Chan | Moderation Categories`, message.guild.iconURL())
              .setImage("https://cdn.discordapp.com/attachments/933327921899262013/939040869829443624/IMG_20220204_131025.jpg")
              .addField('> Commands',`_\`\`\`asciidoc\n${Moderation}\`\`\`_`)
              .addField('> Information', `_\`\`\`asciidoc\n› To get help on a specific commands type ${prefix}helpinfo <command>!\`\`\`_`)
              .setFooter("© Zakuro Development 2022・Page 4/10")
              .setColor("#34eb95")
              .setTimestamp()
              helpPage.edit({ embeds: [mod] });
          }
          if (m.customId === 'utility') {
              const utility = new MessageEmbed()
              .setThumbnail(client.user.displayAvatarURL({dynamic: true, size: 1024}))
              .setAuthor(`Ayumi Chan | Utility Categories`, message.guild.iconURL())
              .addField('> Commands',`_\`\`\`asciidoc\n${Utility}\`\`\`_`)
              .setImage("https://cdn.discordapp.com/attachments/933327921899262013/939040869829443624/IMG_20220204_131025.jpg")
              .addField('> Information', `_\`\`\`asciidoc\n› To get help on a specific commands type ${prefix}helpinfo <command>!\`\`\`_`)
              .setFooter("© Zakuro Development 2022・Page 5/10")
              .setColor("#34eb95")
              .setTimestamp()
              helpPage.edit({ embeds: [utility] });
          }
          if (m.customId === 'funny') {
              const fun = new MessageEmbed()
              .setThumbnail(client.user.displayAvatarURL({dynamic: true, size: 1024}))
              .setAuthor(`Ayumi Chan | Funny Categories`, message.guild.iconURL())
              .setImage("https://cdn.discordapp.com/attachments/933327921899262013/939040869829443624/IMG_20220204_131025.jpg")
              .addField('> Commands', `_\`\`\`asciidoc\n${Funny}\`\`\`_`)
              .addField('> Information', `_\`\`\`asciidoc\n› To get help on a specific commands type ${prefix}helpinfo <command>!\`\`\`_`)
              .setFooter("© Zakuro Development 2022・Page 6/10")
              .setColor("#34eb95")
              .setTimestamp()
              helpPage.edit({ embeds: [fun] });
          }
          if (m.customId === 'reaction') {
              const image = new MessageEmbed()
              .setThumbnail(client.user.displayAvatarURL({dynamic: true, size: 1024}))
              .setAuthor(`Ayumi Chan | Reaction Categories`, message.guild.iconURL())
              .addField('> Commands',`_\`\`\`asciidoc\n${Roleplay}\`\`\`_`)
              .setImage("https://cdn.discordapp.com/attachments/933327921899262013/939040869829443624/IMG_20220204_131025.jpg")
              .addField('> Information', `_\`\`\`asciidoc\n› To get help on a specific commands type ${prefix}helpinfo <command>!\`\`\`_`)
              .setFooter("© Zakuro Development 2022・Page 7/10")
              .setColor("#34eb95")
              .setTimestamp()
              helpPage.edit({ embeds: [image] });
          }
          if (m.customId === 'music') {
              const animals = new MessageEmbed()
              .setThumbnail(client.user.displayAvatarURL({dynamic: true, size: 1024}))
              .setAuthor(`Ayumi Chan | Music Categories`, message.guild.iconURL())
              .addField('> Commands',`_\`\`\`asciidoc\n${Music}\`\`\`_`)
              .setImage("https://cdn.discordapp.com/attachments/933327921899262013/939040869829443624/IMG_20220204_131025.jpg")
              .addField('> Information', `_\`\`\`asciidoc\n› To get help on a specific commands type ${prefix}helpinfo <command>!\`\`\`_`)
              .setFooter("© Zakuro Development 2022・Page 8/10")
              .setColor("#34eb95")
              .setTimestamp()
              helpPage.edit({ embeds: [animals] });
          }
          if (m.customId === 'setup') {
              const other = new MessageEmbed()
              .setThumbnail(client.user.displayAvatarURL({dynamic: true, size: 1024}))
              .setImage("https://cdn.discordapp.com/attachments/933327921899262013/939040869829443624/IMG_20220204_131025.jpg")
              .setAuthor(`Ayumi Chan | Setup Categories`, message.guild.iconURL())
              .addField('> Commands',`_\`\`\`asciidoc\n${Setup}\`\`\`_`)
              .addField('> Information', `_\`\`\`asciidoc\n› To get help on a specific commands type ${prefix}helpinfo <command>!\`\`\`_`)
              .setFooter("© Zakuro Development 2022・Page 9/10")
              .setColor("#34eb95")
              .setTimestamp()
              helpPage.edit({ embeds: [other] });
          }
          if (m.customId === 'games') {
              const gm = new MessageEmbed()
              .setThumbnail(client.user.displayAvatarURL({dynamic: true, size: 1024}))
              .setAuthor(`Ayumi Chan | Games Categories`, message.guild.iconURL())
              .addField('> Commands',`_\`\`\`asciidoc\n${Games}\`\`\`_`)
              .setImage("https://cdn.discordapp.com/attachments/933327921899262013/939040869829443624/IMG_20220204_131025.jpg")
              .addField('> Information', `_\`\`\`asciidoc\n› To get help on a specific commands type ${prefix}helpinfo <command>!\`\`\`_`)
              .setFooter("© Zakuro Development 2022・Page 10/10")
              .setColor("#34eb95")
              .setTimestamp()
              helpPage.edit({ embeds: [gm] });
          }
          if (m.customId === 'home') {
             helpPage.edit({ embeds: [intro] });
          }       
         collector.on('end', () => {
          helpPage.edit({ embeds: [EndEmbed], components: [] })             
             }
          );
  })}}