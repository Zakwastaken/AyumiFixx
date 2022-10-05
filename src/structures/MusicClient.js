const { Client, Intents, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");
const { LavasfyClient } = require("lavasfy");
const { Manager } = require("erela.js");

const fs = require("fs");
const AFKS = require("../../models/schema")
const antilinkData = require("../../models/antilink");
const welcomeData = require("../../models/welcome");
const byeData = require("../../models/goodbye");
const byemsg = require("../../models/leavemsg");
const welcomemsg = require("../../models/joinmsg");
const Schema = require('../../models/welcomechannel');
const { prefix } = require("../config");
const antiwordsData = require('../../models/antiwords')
const messageData = require("../../models/modlog")
const timerSchema = require("../../models/reminder");
const { readdirSync } = require("fs");
const { path } = require("path");
const { fetch } = require('node-fetch');
const db = require("quick.db");
const ms = require("ms");
const deezer = require("erela.js-deezer");
const apple = require("erela.js-apple");
const facebook = require("erela.js-facebook");
const mongoose = require('mongoose');
const { channel } = require("diagnostics_channel");
require("./PlayerBase"); 
class MusicBot extends Client {
	 constructor() {
        super({
            shards: "auto",
            allowedMentions: {
                parse: ["roles", "users", "everyone"],
                repliedUser: false
            },
            intents: [
              Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_PRESENCES,
            ]
        });
        this.on("interactionCreate", async (interaction) => {

          await interaction.deferUpdate();
          if (interaction.isButton()) {
              if (interaction.customId === 'tic') {
        
                  const thread = await interaction.channel.threads.create({
                      name: `${interaction.user.tag}`,
                      autoArchiveDuration: 1440, // this is 24hrs 60 will make it 1 hr
                      //type: 'private_thread', // for private tickets u need server boosted to lvl 1 or 2 ok u need lvl 2, since mine is not boosted i will remove this LINE ONLY!
                  });
                  await thread.setLocked(true)
                  const embed = new MessageEmbed()
                      .setTitle('Ticket')
                      .setDescription('Hello there, \n The staff will be here as soon as possible mean while tell us about your issue!\nThank You!')
                      .setColor("#2f3136")
                      .setTimestamp()
                      .setAuthor(interaction.guild.name, interaction.guild.iconURL({
                          dynamic: true
                      }));
        
                  const del = new MessageActionRow()
                      .addComponents(
                          new MessageButton()
                          .setCustomId('del')
                          .setLabel('🗑️ Delete Ticket!')
                          .setStyle('DANGER'),
                      );
                  interaction.user.send('Your \`ticket\` has been opened!');
                  thread.send({
                      content: `Welcome <@${interaction.user.id}>`,
                      embeds: [embed],
                      components: [del]
                  }).then(interaction.followUp({
                      content: 'Created Ticket!',
                      ephemeral: true
                  }))
                  console.log(`Created thread: ${thread.name}`);
                  setTimeout(() => {
                      interaction.channel.bulkDelete(1)
                  }, 5000)
              } else if (interaction.customId === 'del') {
        
                  const thread = interaction.channel
                  thread.delete();
        
              }
          }
        });
    this.on('message', async message => {
      let data2;
      try {
        data2 = await AFKS.findOne({
          userId: message.author.id,
          guildId: message.guild.id
        })
        if (!data2) {
          data2 = await AFKS.create({
            userId: message.author.id,
            guildId: message.guild.id
          })
        }
      } catch (error) {
        console.log(error)
      }
    
      if (data2.AFK === true) {
        data2.AFK_Reason = null
        data2.AFK = false
        message.channel.send(`Welcome again **${message.member.user.username}**, I removed your **AFK** status!`)
        await message.member.setNickname(`${message.member.user.username}`).catch(err => console.log(err));
        await data2.save()
      }
      if (message.mentions.members.first()) {
        let data3;
        try {
          data3 = await AFKS.findOne({
            userId: message.mentions.members.first().id,
            guildId: message.guild.id
          })
          if (!data3) {
            data3 = await AFKS.create({
              userId: message.mentions.members.first().id,
              guildId: message.guild.id
            })
          }
        } catch (error) {
          console.log(error)
        }
    
        if (data3.AFK == true) {
          message.channel.send(`<:check_green:941607407027625994>・**${message.mentions.members.first().user.tag}** is currently **AFK** for reason \`${data3.AFK_Reason || "No Reason"}\``)
        }
      }
    });
    this.on("ready", () => {
      setInterval(async () => {
        let timer = await timerSchema.findOne({
          endsAt: Math.floor(new Date().getTime() / 1000.0),
        });
        if (!timer) return;
        if (timer.location == "dm") {
          let user = this.users.cache.get(timer.user);
          let embed = new MessageEmbed()
            .setTitle(`Notification!`)
            .setDescription(`\`\`\`${timer.reason}\`\`\``)
            .setFooter(`Set ${ms(timer.duration * 1000, { long: true })} ago!`)
            // .setThumbnail(user.displayAvatarURL({dynamic: true}))
            .setColor("#34eb95");
          user.send({ embeds: [embed] });
    
          await timerSchema.deleteOne({
            endsAt: Math.floor(new Date().getTime() / 1000.0),
          });
        } else if (timer.location == "channel") {
          let user = this.users.cache.get(timer.user);
          let channel = this.channels.cache.get(timer.channel);
          let embed = new MessageEmbed()
            .setTitle(`Notification!`)
            .setDescription(`\`\`\`${timer.reason}\`\`\``)
            .setFooter(`Set ${ms(timer.duration * 1000, { long: true })} ago!`)
            // .setThumbnail(user.displayAvatarURL({dynamic: true}))
            .setColor("#34eb95");
          channel.send({ content: `<@!${timer.user}>`, embeds: [embed] });
    
          await timerSchema.deleteOne({
            endsAt: Math.floor(new Date().getTime() / 1000.0),
          });
        }
      }, 1000);
    });
    this.on('guildMemberAdd', async (member) => {
      const channel = member.guild.channels.cache.get('839153555490603039')
      if (!channel) return;
      channel.send(`Heyy ${member} 💚\nWelcome to **${member.guild.name}**`);    
    });
    this.on('guildMemberAdd', async (member) => {
      const roleColor =
      member.guild.me.displayHexColor === "#000000"
        ? "#000000"
        : member.guild.me.displayHexColor;
      const userAvatar = member.user.displayAvatarURL({
        dynamic: true,
        size: 512,
      });
      const data = await welcomeData.findOne({
        GuildID: member.guild.id,
      });
      if (data) {
        const data2 = await welcomemsg.findOne({
          GuildID: member.guild.id,
        });
        if (data2) {
          var joinmessage = data2.JoinMsg;
     
          joinmessage = joinmessage.replace("{user.mention}", `${member}`);
          joinmessage = joinmessage.replace("{user.name}", `${member.user.tag}`);
          joinmessage = joinmessage.replace("{server}", `${member.guild.name}`);
          joinmessage = joinmessage.replace(
            "{membercount}",
            `${member.guild.memberCount}`
          );
     
          let embed = new MessageEmbed()
            .setDescription(joinmessage)
            .setThumbnail(userAvatar)
            .setColor(roleColor);
     
          let channel = data.Welcome;
     
          member.guild.channels.cache.get(channel).send({embeds: [embed]});
          
        } else if (!data2) {
          let embed2 = new MessageEmbed()
          .setAuthor(`Welcome New Member!`, member.guild.iconURL())
          .setThumbnail(userAvatar)
          .setDescription(
            `Heyy <@${member.user.id}>, Welcome To **${member.guild.name}** Server!`
          )
          .setImage("https://cdn.discordapp.com/attachments/932792709805142036/938989718782238797/Welcome_SkyCafe.png")
          .addField("⏰ __**Age Of Accounts**__ :",`\`\`\`${member.user.createdAt}.\`\`\``)
          .setFooter(`We Now Have ${member.guild.memberCount} Members!`)
          .setColor(roleColor)
          .setTimestamp()
          
          let channel = data.Welcome
     
         member.guild.channels.cache.get(channel).send({ embeds: [embed2] });
          }}})
          this.on('guildMemberRemove', async (member) => {
            const roleColor =
             member.guild.me.displayHexColor === "#000000"
             ? "#000000"
             : member.guild.me.displayHexColor;
            const userAvatar = member.user.displayAvatarURL({
              dynamic: true,
              size: 512,
            });
            const data = await byeData.findOne({
              GuildID: member.guild.id,
            });
            if (data) {
              const data2 = await byemsg.findOne({
                GuildID: member.guild.id,
              });
              if (data2) {
                var leavemessage = data2.ByeMsg;
           
                leavemessage = leavemessage.replace("{user.mention}", `${member}`);
                leavemessage = leavemessage.replace("{user.name}", `${member.user.tag}`);
                leavemessage = leavemessage.replace("{server}", `${member.guild.name}`);
                leavemessage = leavemessage.replace(
                  "{membercount}",
                  `${member.guild.memberCount}`
                );
           
                let embed = new MessageEmbed()
                  .setDescription(`${leavemessage}`)
                  .setThumbnail(userAvatar)
                  .setColor(roleColor);
           
                let channel = data.Bye;
           
                member.guild.channels.cache.get(channel).send({embeds: [embed]});
              } else if (!data2) {
                let embed2 = new MessageEmbed()
                .setAuthor(`Sayonaraa!`, member.guild.iconURL())
                  .setThumbnail(member.user.avatarURL())
                  .setDescription(
                   `Sayonaraa <@${member.user.id}>, Goodbye from **${member.guild.name}** Server!`
                 )
                 .setImage("https://cdn.discordapp.com/attachments/932792709805142036/938989758837837854/Goodbye_SkyCafe.png")
                 .addField("⏰ __**Age Of Accounts**__ :",`\`\`\`${member.user.createdAt}.\`\`\``)
                 .setFooter(`We Now Have ${member.guild.memberCount} Members!`)
                  .setColor(roleColor);
           
                let byechannel = data.Bye;
           
                member.guild.channels.cache.get(byechannel).send({embeds: [embed2]});
              }}})
    this.on('message', async message => {
      const antilink = await antilinkData.findOne({
        GuildID: message.guild.id,
      });
      if (antilink) {
        if (
          message.content.match("https://") ||
          message.content.match("discord.gg") ||
          message.content.match("www.")
        ) {
          message.delete();
          let msg = message.channel.send("No **Links** allowed while **anti-link** is active!").then((msg) => {
              let time = "5s";
              setTimeout(function () {
                msg.delete();
              }, ms(time));
            });
        }
      }
    });
    this.on('messageUpdate', async(oldMessage, newMessage) => {
      messageData.findOne({ Guild: oldMessage.guild.id }, async (err, data) => {
        if (!data) return;
        if (oldMessage.author.bot) return;
        const channel = oldMessage.guild.channels.cache.get(data.Channel);
        try {
          channel.send({
            embeds: [
              new MessageEmbed()
              .setTitle("Message Edit!")
              .setThumbnail(oldMessage.author.avatarURL())
              .setColor("GREEN")
              .setDescription(`**Edited in** ${oldMessage.channel}
              **Message By** ${oldMessage.author.tag}
              **Old Message:** ${oldMessage}
              **New Message:** ${newMessage}`)
              .setTimestamp()
              .setFooter(oldMessage.guild.name, oldMessage.guild.iconURL())
            ],
          });
        } catch (err) {
          console.log(err);
        }
      })}); 
      this.on('messageDelete', async(message) => {
        messageData.findOne({ Guild: message.guild.id }, async (err, data) => {
          if (!data) return;
          if (message.author.bot) return;
          const channel = message.guild.channels.cache.get(data.Channel);
          try {
            channel.send({
              embeds: [
                new MessageEmbed()
                .setTitle("Message Delete!")
                .setColor("RED")
                .setThumbnail(message.author.avatarURL())
                .setDescription(`**Message:** ${message.content}
                **Deleted in** ${message.channel}
                **Message By** ${message.author.tag}`)
                .setTimestamp()
                .setFooter(message.guild.name, message.guild.iconURL())
              ],
            });
          } catch (err) {
            console.log(err);
          }
        })});
        this.on('channelCreate', async(channel) => {
          messageData.findOne({ Guild: channel.guild.id }, async (err, data) => {
            if (!data) return;
            const chan = channel.guild.channels.cache.get(data.Channel);
            try {
              chan.send({
                embeds: [
                  new MessageEmbed()
                  .setTitle("Channel Created!")
                  .setDescription(`**Channel Name:** \`${channel.name}\`\n**Channel ID:** \`${channel.id}\`\n**Channel Type:** \`${channel.type}\``)
                  .setColor("GREEN")
                  .setTimestamp()
                  .setFooter(channel.guild.name, channel.guild.iconURL())
                ],
              });
            } catch (err) {
              console.log(err);
            }
          })});
          this.on("guildCreate", async(guild) => {
            const invite = new MessageButton()
                .setLabel('Bot Invite')
                .setStyle('LINK')
                .setURL(`https://discord.com/oauth2/authorize?client_id=788610042193772625&scope=bot&permissions=564787677119`)
    
            const server = new MessageButton()
                .setLabel('Support Server')
                .setStyle('LINK')
                .setURL("https://bit.ly/3IiX5wS")
    
            const row = new MessageActionRow()
                .addComponents(invite, server)
            const channeltosend = guild.channels.cache.find(ch => ch.type === "GUILD_TEXT" && ch.permissionsFor(client.user.id).has(["SEND_MESSAGES", "EMBED_LINKS"]))
            if(!channeltosend) return
            channeltosend.send({ embeds: [new MessageEmbed().setThumbnail(client.user.displayAvatarURL({dynamic: true, size: 1024})).setDescription(`<:check_green:941607407027625994>・**Thanks for adding me to your server!**\n*My prefix is:* \`${prefix}\`\n*To get started type* \`${prefix}help\` *to see my category commands*\n*If you have any questions or need help make sure to join the support server*`).setTimestamp().setFooter("© Zakuro Development 2022").setColor("GREEN")], components: [row] })
        })
          this.on('channelDelete', async(channel) => {
            messageData.findOne({ Guild: channel.guild.id }, async (err, data) => {
              if (!data) return;
              const chan = channel.guild.channels.cache.get(data.Channel);
              try {
                chan.send({
                  embeds: [
                    new MessageEmbed()
                    .setTitle("Channel Deleted!")
                    .setDescription(`**Channel Name:** \`${channel.name}\`\n**Channel ID:** \`${channel.id}\`\n**Channel Type:** \`${channel.type}\``)
                    .setColor("RED")
                    .setTimestamp() 
                    .setFooter(channel.guild.name, channel.guild.iconURL())             
                  ],
                });
              } catch (err) {
                console.log(err);
              }
            })});
            this.on('roleCreate', async(role) => {
              messageData.findOne({ Guild: role.guild.id }, async (err, data) => {
                if (!data) return;
                const chan = role.guild.channels.cache.get(data.Channel);
                try {
                  chan.send({
                    embeds: [
                      new MessageEmbed()
                      .setTitle("Role Created!")
                      .setDescription(`**Role Name:** \`${role.name}\`\n**Role ID:** \`${role.id}\`\n**Hoisted:** \`${role.hoisted ? "Yes" : "No"}\`\n**Mentionable:** \`${role.mentionable ? "Yes" : "No"}\``)
                      .setColor("GREEN")
                      .setTimestamp()
                      .setFooter(role.guild.name, role.guild.iconURL())  
                    ],
                  });
                } catch (err) {
                  console.log(err);
                }
              })});
              this.on('roleDelete', async(role) => {
                messageData.findOne({ Guild: role.guild.id }, async (err, data) => {
                  if (!data) return;
                  const chan = role.guild.channels.cache.get(data.Channel);
                  try {
                    chan.send({
                      embeds: [
                        new MessageEmbed()
                        .setTitle("Role Deleted!")
                        .setDescription(`**Role Name:** \`${role.name}\`\n**Role ID:** \`${role.id}\`\n**Hoisted:** \`${role.hoisted ? "Yes" : "No"}\`\n**Mentionable:** \`${role.mentionable ? "Yes" : "No"}\``)
                        .setColor("RED")
                        .setTimestamp()
                        .setFooter(role.guild.name, role.guild.iconURL())  
                      ],
                    });
                  } catch (err) {
                    console.log(err);
                  }
                })});
                this.on('guildMemberAdd', async(member) => {
                  messageData.findOne({ Guild: member.guild.id }, async (err, data) => {
                    if (!data) return;
                    const chan = member.guild.channels.cache.get(data.Channel);
                    const userAvatar = member.user.displayAvatarURL({
                      dynamic: true,
                      size: 512,
                    });
                    try {
                      chan.send({
                        embeds: [
                          new MessageEmbed()
                          .setTitle('New User Joined!')
                          .setDescription(`**User:** ${member}\n**User ID:** \`${member.id}\`\n**Acc. Created:** \`${member.user.createdAt}\`\n**Server User Count:** \`${member.guild.memberCount}\``)
                          .setColor("GREEN")
                          .setTimestamp()
                          .setThumbnail(userAvatar)
                          .setFooter(member.guild.name, member.guild.iconURL())  
                        ],
                      });
                    } catch (err) {
                      console.log(err);
                    }
                  })});        
                  this.on('guildMemberRemove', async(member) => {
                    messageData.findOne({ Guild: member.guild.id }, async (err, data) => {
                      if (!data) return;
                      const chan = member.guild.channels.cache.get(data.Channel);
                      const userAvatar = member.user.displayAvatarURL({
                        dynamic: true,
                        size: 512,
                      });
                      try {
                        chan.send({
                          embeds: [
                            new MessageEmbed()
                            .setTitle('Old User Left!')
                            .setDescription(`**User:** ${member}\n**User ID:** \`${member.id}\`\n**Acc. Created:** \`${member.user.createdAt}\`\n**Server User Count:** \`${member.guild.memberCount}\``)
                            .setColor("RED")
                            .setTimestamp()
                            .setThumbnail(userAvatar)
                            .setFooter(member.guild.name, member.guild.iconURL())  
                          ],
                        });
                      } catch (err) {
                        console.log(err);
                      }
                    })});
                    this.on('guildBanAdd', async(member) => {
                      messageData.findOne({ Guild: member.guild.id }, async (err, data) => {
                        if (!data) return;
                        const chan = member.guild.channels.cache.get(data.Channel);
                        const userAvatar = member.user.displayAvatarURL({
                          dynamic: true,
                          size: 512,
                        });
                        try {
                          chan.send({
                            embeds: [
                              new MessageEmbed()
                              .setTitle('User Banned!')
                              .setDescription(`**User:** \`\`\`${member.user.tag}\`\`\`\n**User ID:** \`\`\`${member.user.id}\`\`\`\n**Acc Created On:** \`\`\`${member.user.createdAt}\`\`\``)
                              .setColor("RED")
                              .setTimestamp()
                              .setThumbnail(userAvatar)
                              .setFooter(member.guild.name, member.guild.iconURL())  
                            ],
                          });
                        } catch (err) {
                          console.log(err);
                        }
                      })});
                      this.on('guildBanRemove', async(member) => {
                        messageData.findOne({ Guild: member.guild.id }, async (err, data) => {
                          if (!data) return;
                          const chan = member.guild.channels.cache.get(data.Channel);
                          const userAvatar = member.user.displayAvatarURL({
                            dynamic: true,
                            size: 512,
                          });
                          try {
                            chan.send({
                              embeds: [
                                new MessageEmbed()
                                .setTitle('Member Unbanned!')
                                 .setDescription(`**User:** \`\`\`${member.user.tag}\`\`\`\n**User ID:** \`\`\`${member.user.id}\`\`\`\n**Acc Created On:** \`\`\`${member.user.createdAt}\`\`\``)
                                 .setColor("GREEN")
                                .setTimestamp()
                                .setThumbnail(userAvatar)
                                .setFooter(member.guild.name, member.guild.iconURL())  
                              ],
                            });
                          } catch (err) {
                            console.log(err);
                          }
                        })});
                    this.esnipes = new Collection();
                    this.on("messageUpdate", async (oldMsg, newMsg) => {
                      let esnipes = this.esnipes.get(oldMsg.channel.id) || [];
                      if (esnipes.length > 5) esnipes = esnipes.slice(0, 4);
                      esnipes.unshift({
                        msg: oldMsg,
                        newc: newMsg,
                        author: oldMsg.author,
                      });
                      this.esnipes.set(oldMsg.channel.id, esnipes);
                    });
    this.snipes = new Map()
    this.on('messageDelete', function(message, channel){
  
  this.snipes.set(message.channel.id, {
    content:message.content,
    profilephoto: message.author.displayAvatarURL({ dynamic : true }),
    author:message.author.tag,
    image:message.attachments.first() ? message.attachments.first().proxyURL : null
  })
})
const loadFeatures = require("../features/load-features");
loadFeatures(this)
		 this.commands = new Collection();
     this.config = require("../config");
     this.owner = this.config.ownerID;
     this.prefix = this.config.prefix;
     this.embedColor = this.config.embedColor;
     this.aliases = new Collection();
     this.commands = new Collection();
     this.logger = require("../utils/logger.js");
     this.emoji = require("../utils/emoji.json");
     if(!this.token) this.token = this.config.token;
   /**
    *  Mongose for data base
    */
		 const dbOptions = {
        useNewUrlParser: true,
        autoIndex: false,
        connectTimeoutMS: 10000,
        family: 4,
        useUnifiedTopology: true,
      };
        mongoose.connect(this.config.mongourl, dbOptions);
        mongoose.Promise = global.Promise;
        mongoose.connection.on('connected', () => {
              this.logger.log('[DB] DATABASE CONNECTED', "ready");
              });
        mongoose.connection.on('err', (err) => {
                  console.log(`Mongoose connection error: \n ${err.stack}`, "error");
              });
        mongoose.connection.on('disconnected', () => {
                  console.log('Mongoose disconnected');
              });
        
    /**
     * Error Handler
     */
    this.on("disconnect", () => console.log("Bot is disconnecting..."))
    this.on("reconnecting", () => console.log("Bot reconnecting..."))
    this.on('warn', error => console.log(error));
    this.on('error', error => console.log(error));
    process.on('unhandledRejection', error => console.log(error));
    process.on('uncaughtException', error => console.log(error));
		    const client = this;

		   this.Lavasfy = new LavasfyClient(
      {
        clientID: this.config.SpotifyID,
        clientSecret: this.config.SpotifySecret,
        playlistPageLoadLimit: 4,
        filterAudioOnlyResult: true,
        autoResolve: true,
        useSpotifyMetadata: true,
      },
      [
        {
          id: this.config.nodes.id,
          host: this.config.nodes.host,
          port: this.config.nodes.port,
          password: this.config.nodes.password,
          secure: this.config.nodes.secure,
        },
      ]
    );

    this.manager = new Manager({
      plugins: [
        new deezer(),
        new apple(),
        new facebook(),
      ],
      nodes: [
        {
          identifier: this.config.nodes.id,
          host: this.config.nodes.host,
          port: this.config.nodes.port,
          password: this.config.nodes.password,
          secure: this.config.nodes.secure,
        },
      ],
      send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
      },
    })
		  
/**
 * Client Events
 */
	readdirSync("./src/events/Client/").forEach(file => {
    const event = require(`../events/Client/${file}`);
    let eventName = file.split(".")[0];
    this.logger.log(`Loading Events Client ${eventName}`, "event");
    this.on(eventName, event.bind(null, this));
});
/**
 * Erela Manager Events
 */ 
  readdirSync("./src/events/Lavalink/").forEach(file => {
    const event = require(`../events/Lavalink/${file}`);
    let eventName = file.split(".")[0];
    client.logger.log(`Loading Events Lavalink ${eventName}`, "event");
    client.manager.on(eventName, event.bind(null, client));
});
/**
 * Import all commands
 */
  readdirSync("./src/commands/").forEach(dir => {
    const commandFiles = readdirSync(`./src/commands/${dir}/`).filter(f => f.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`../commands/${dir}/${file}`);
        this.logger.log(`Loading ${command.category} commands ${command.name}`, "cmd");
        this.commands.set(command.name, command);
    }
})
	 }
		 connect() {
        return super.login(this.token);
    };
};
module.exports = MusicBot;