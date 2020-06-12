module.exports = {
  DEFAULT_NOTIFICATION_CHANNEL_NAME: '🎧 VC Notifications',
  DEFAULT_NOTIFICATION_CHANNEL_CREATION_DESCRIPTION: 'VC Notifications will appear here. Auto-generated by VC Notifier bot.',
  NOTIFICATION_CHANNEL_CREATION_MESSAGES: [
    '\nVC Notifications will appear here.',
    'This channel has been auto-generated by VC Notifier bot. If deleted, this channel will be re-created by VC Notifier bot.',
    'Feel free to change the name of this channel to whatever you wish.',
    'To receive VC notifications, send a message with **!notifyme** on any channel.',
    `To stop receiving VC notifications, send a message with **!dontnotifyme** on any channel.\n~~                                                                ~~`,
  ],
  CHANNEL_MESSAGES: {
    flags: {
      notificationSubscribe: '!notifyme',
      notificationUnsubscribe: '!dontnotifyme',
    },

    textMessages: {
      alreadySubscribed: 'you are already subscribed to voice chat notifications.',
      successfullySubscribed: 'you have been subscribed to voice chat notifications.',
      alreadyUnsubscribed: 'you are already not subscribed to voice chat notifications.',
      successfullyUnsubscribed: 'you have been unsubscribed from voice chat notifications.',
    },
  },
};