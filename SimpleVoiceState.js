/**
 * This class adds simple functions to the Discord Voice State class
 * to easily read Guild name and ID, check if the voice state is
 * active, and more.
 */

const Discord = require('discord.js');

class SimpleVoiceState {
  constructor(voiceStateObj) {
    this.voiceState = voiceStateObj;
  }

  getGuild() {
    return {
      id: this.voiceState.guild.id,
      displayName: this.voiceState.guild.name,
    };
  }

  getChannel() {
    return {
      id: this.voiceState.channel.id,
      displayName: this.voiceState.channel.name,
    };
  }

  getMember() {
    return {
      id: this.voiceState.member.id,
      displayName: this.voiceState.member.displayName,
      tag: this.voiceState.member.user.tag,
      bot: this.voiceState.member.user.bot,
    };
  }

  getFullGuild() {
    return this.voiceState.guild;
  }

  isActive() {
    if (this.voiceState.channelID) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = SimpleVoiceState;
