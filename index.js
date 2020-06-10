const fs = require('fs');
const config = require('config');
const Discord = require('discord.js');
const SimpleVoiceState = require('./SimpleVoiceState');

const DEFAULT_NOTIFICATION_CHANNEL = 'Voice Notifications';

const botToken = config.get('botToken');
const client = new Discord.Client();

// each key is a guild, each guild is an object with channel IDs as keys,
// and each channel has an array of member IDs
let guildVoiceData = {};

// data matching IDs and display names of Guilds, Channels, and Members
let guildDisplayNames = {};
let channelDisplayNames = {};
let memberDisplayNames = {};

// notification text channel for each guild
let guildNotificationChannels = {};

// list of notified users for each guild
let guildNotifiedUsers = {};

client.on('ready', () => {
  console.log(`Logged in as '${client.user.tag}'.`);
});

client.on('voiceStateUpdate', (oldState, newState) => {
  oldState = new SimpleVoiceState(oldState);
  newState = new SimpleVoiceState(newState);

  if (newState.isActive()) {
    const guildID = newState.getGuild().id;

    updateNameData(newState);

    addMemberToChannel(guildID, newState.getChannel().id, newState.getMember().id);

    return;
    // const guildChannels = newState.getFullGuild().channels;
    // console.log(guildChannels.cache);

    const guild = newState.getFullGuild();

    let notificationChannel = getNotificationChannel(guild, guildID);

    if (notificationChannel === null) {
      notificationChannel = createAndGetNotificationChannel(guild, guildID);
    }

    //  let message =

    //    if(guildNotifiedUsers)
  } else {
    removeMemberFromChannel(oldState.getGuild().id, oldState.getChannel().id, oldState.getMember().id);
  }
});

client.on('message', (msg) => {
  const msgContent = msg.content;

  const flag = '!whoison';

  if (msgContent.startsWith(flag)) {
    let text = '';
    Object.keys(guildVoiceData).forEach((key) => {
      const val = guildVoiceData[key];
      Object.keys(val).forEach((channelKey) => {
        const channelVal = val[channelKey];
        text += `Channel '${channelDisplayNames[channelKey]}' on Server '${guildDisplayNames[key]}' has: ${channelVal
          .map((e) => memberDisplayNames[e])
          .join(', ')}`;
        text += '\n\n';
      });
    });
    msg.reply(text);
  }
});

const addMemberToChannel = (guildID, channelID, memberID) => {
  // if member is being added to a channel, they can't be in any other channels as well
  // As of 2020/06/09, Discord prohibits users from joining multiple voice channels at once
  removeMemberFromAllChannelsInGuild(guildID, memberID);

  targetChannel = getChannelInVoiceData(guildID, channelID);

  if (!targetChannel.contains(memberID)) {
    targetChannel.push(memberID);
  }
};

const removeMemberFromChannel = (guildID, channelID, memberID) => {
  targetChannel = getChannelInVoiceData(guildID, channelID);

  if (targetChannel.contains(memberID)) {
    targetChannel.splice(targetChannel.indexOf(memberID), 1);
  }
};

const removeMemberFromAllChannelsInGuild = (guildID, memberID) => {
  const targetGuild = guildVoiceData[guildID];
  if (targetGuild) {
    const targetGuild = guildVoiceData[guildID];
    Object.keys(targetGuild).forEach((channelID) => {
      const channelMembers = targetGuild[channelID];

      // remove all occurrences of member in channel
      let memberInChannel = true;
      while (memberInChannel) {
        const memberIdxInChannel = channelMembers.indexOf(memberID);
        if (memberIdxInChannel > -1) {
          memberInChannel = true;
          channelMembers.splice(memberIdxInChannel, 1);
        } else {
          memberInChannel = false;
        }
      }
    });
  }
};

const getChannelInVoiceData = (guildID, channelID) => {
  let targetGuild = guildVoiceData[guildID];

  if (!targetGuild) {
    guildVoiceData[guildID] = {};
  }

  let targetChannel = guildVoiceData[guildID][channelID];

  if (!targetChannel) {
    guildVoiceData[guildID][channelID] = [];
  }

  return guildVoiceData[guildID][channelID];
};

const updateNameData = (simpleVoiceStateObj) => {
  guild = simpleVoiceStateObj.getGuild();
  channel = simpleVoiceStateObj.getChannel();
  member = simpleVoiceStateObj.getMember();

  updateGuildDisplayName(guild.id, guild.displayName);
  updateChannelDisplayName(channel.id, channel.displayName);
  updateMemberDisplayName(member.id, member.displayName);
};

const updateGuildDisplayName = (guildID, guildDisplayName) => {
  guildDisplayNames[guildID] = guildDisplayName;
};
const updateChannelDisplayName = (channelID, channelDisplayName) => {
  channelDisplayNames[channelID] = channelDisplayName;
};
const updateMemberDisplayName = (memberID, memberDisplayName) => {
  memberDisplayNames[memberID] = memberDisplayName;
};

Array.prototype.contains = function (elm) {
  return this.indexOf(elm) > -1;
};

client.login(botToken);
