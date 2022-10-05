const Discord = require("discord.js");

let {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
} = require("discord.js");

const Color = `#ffcc00`;
let timerSchema = require("../../../models/reminder");

let ms = require("ms");

module.exports = {
  name: "reminder",
  category: "Utility",
  description: "Reminder commands.",
  usage: "usage",
  aliases: ["reminder"],
  timeout: 0,
  boostersOnly: false,
  execute: async (message, args, client, prefix) => {
    if (!args[0] || !["set", "delete", "list"].includes(args[0])) {
      let command = message.content.split(" ")[0].toLowerCase();
      let infoEmbed = new MessageEmbed()
        .setTitle(`Timer Sub Commands.`)
        .addField(`Setting Reminder`, `\`\`\`Usage: ${command} set <duration> <reason>\`\`\``)
        .addField(`Delete Reminder`, `\`\`\`Usage: ${command} delete <timer id>\`\`\``)
        .addField(`Reminder List`, `\`\`\`Usage: ${command} list\`\`\``)
        .setColor("#34eb95");
      return message.reply({ embeds: [infoEmbed] });
    }

    let subcmd = args[0].toLowerCase();

    let dmbtn = new MessageButton()
      .setCustomId("LOCATION_DM")
      .setLabel(`Dm`)
      .setStyle(`PRIMARY`)
      .setEmoji("🔔");

    let chbtn = new MessageButton()
      .setCustomId("LOCATION_CHANNEL")
      .setLabel(`Channel`)
      .setStyle(`PRIMARY`)
      .setEmoji("🔔");

    let locationRow = new MessageActionRow().addComponents(dmbtn, chbtn);

    if (subcmd == "set") {
      if (!args[1]) return message.reply(`You didn't specify the **duration!**`);

      let duration = Math.floor(ms(args[1]) / 1000.0);

      if (!args[2]) return message.reply(`You didn't specify the **reason!**`);

      let reason = args.slice(2).join(" ");

      let params = {
        user: message.author.id,
        guild: message.guild.id,
        endsAt: Math.floor(new Date().getTime() / 1000.0) + duration,
        channel: message.channel.id,
        reason,
        duration,
      };

      let sentMsg = await message.reply({
        content: "Where should i \`notify\` you?",
        components: [locationRow],
      });

      let clctor = sentMsg.createMessageComponentCollector({
        time: 60000,
      });

      let disabledRow = new MessageActionRow().addComponents(
        dmbtn.setDisabled(true).setStyle(`SECONDARY`),
        chbtn.setDisabled(true).setStyle(`SECONDARY`)
      );

      clctor.on("collect", (i) => {
        const id = i.customId;

        if (i.user.id !== message.author.id)
          return i.reply({
            content: "This is not for you ...",
            ephemeral: true,
          });

        if (id == "LOCATION_DM") {
          clctor.stop("dm");
        } else if (id == "LOCATION_CHANNEL") {
          clctor.stop("channel");
        }
      });

      clctor.on("end", async (i, reason) => {
        if (reason == "time") {
          sentMsg.edit({ components: [disabledRow] });
        } else {
          params.location = reason;
          let create = await timerSchema.create(params);
          let embed = new MessageEmbed()
            .setTitle(`Reminder Set!`)
            .setDescription(
              `I will \`remind\` you in ${
                reason == "dm" ? "your **Direct Message**" : "this **Channel**"
              } for \`${params.reason}\` in **${ms(duration * 1000, {
                long: true,
              })}**!`
            )
            .setColor("#34eb95")
            .setFooter(`Your Timer ID: ${create._id}`);
          if (create)
            return sentMsg.edit({
              components: [],
              embeds: [embed],
              content: "\`This is your reminder!\`",
            });
        }
      });
    }

    if (subcmd == "delete") {
      if (!args[1])
        return message.channel.send(
          `Please specify a \`timer id\` to delete!`
        );
      let timerID;
      try {
        timerID = await timerSchema.findOne({
          _id: args[1],
        });
      } catch (e) {
        return message.channel.send(`That \`timer id\` doesn't exist!`);
      }

      if (
        timerID &&
        timerID.user !== message.author.id &&
        !message.member.permissions.has("ADMINISTRATOR")
      )
        return message.channel.send(`This **timer** isn't yours!`);

      let deleted = await timerSchema.findOneAndDelete({
        _id: args[1],
      });
      if (deleted) return message.channel.send(`Timer deleted!`);
    }

    if (subcmd == "list") {
      let found = await timerSchema.find({
        user: message.author.id,
      });

      if (!found || found.length == 0)
        return message.channel.send(`You have no \`active\` timer!`);
      let desc = found.map((v, i) => {
        return `\`(#${i + 1})\` - **${v.reason}** (<t:${
          v.endsAt
        }:R>)\n**ID:** ${v._id}`;
      });
      let embed = new MessageEmbed()
        .setTitle(`Reminder List!`)
        .setColor("#34eb95")
        .setDescription(`${desc.join("\n\n")}`);
      message.channel.send({ embeds: [embed] });
    }
  },
};
