const { Message, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')


module.exports = {
    name: 'nuke',
    category: 'Moderation',
    description: 'Nukes a channel.',
    execute: async (message, args, client, prefix) => {
         const reas = new MessageEmbed()
        .setDescription(`<:cross_warning:941601429783740456>・To use this commands, You need to have the **MANAGE_MESSAGES** permission.`)
        .setColor('RED')

          const rea = new MessageEmbed()
        .setDescription(`<:cross_warning:941601429783740456>・This channel cannot be nuked!.`)
        .setColor('RED')


       if(!message.member.permissions.has('MANAGE_MESSAGES')) 
       return message.channel.send({embeds:[reas]})
     
        let reason = args.join(" ") || "No Reason"
        if(!message.channel.deletable) { 
            return message.reply({embeds:[rea]})
        }
      

        let a = new MessageButton()
        .setCustomId('accept')
        .setStyle('SUCCESS')
          .setEmoji('<:check_green:941607407027625994>')

        let b = new MessageButton()
        .setCustomId('decline')
        .setStyle('DANGER')
      .setEmoji('<:cross_warning:941601429783740456>')
  
        let row = new MessageActionRow().addComponents(a, b)
        const collector = message.channel.createMessageComponentCollector({componentType: 'BUTTON', time: 30000})
      const mssg= await message.reply({embeds: [new MessageEmbed().setDescription(`**› Are you sure u want to nuke this channel?** \n **› All message data will be lost if nuked.** \n\n<:check_green:941607407027625994>・To Confirm.\n<:cross_warning:941601429783740456>・To Cancel.`)
        .setColor('GREEN')], components: [row]})

        collector.on('collect', async (m) => {
            if (m.customId === 'accept') {
               
                 let newchannel = await message.channel.clone()
        await message.channel.delete()
        let embed = new MessageEmbed()
        .setAuthor(`Channel Nuked!`, client.user.displayAvatarURL({dynamic: true, size: 1024}))
        .setDescription(`\`\`\`asciidoc\n${reason}\`\`\``)
        .setColor('GREEN')
        .setTimestamp()
        .setImage('https://c.tenor.com/Rl84jpphg7IAAAAC/explosion-space.gif')
        .setFooter(`Executed by ${message.author.tag}`);
     
      
        await newchannel.send({embeds:[embed]})
            }
                     if (m.customId === 'decline') {
                         message.react("✅") 
                       collector.stop('success')
                  mssg.delete()
                       
        let embed = new MessageEmbed()
      
        .setDescription(`<:cross_warning:941601429783740456>・The process has been cancelled!`)
           .setColor('RED')
     
     
      
        await message.channel.send({embeds:[embed]})
            }
          
        })
    }
}