/* eslint-disable no-restricted-syntax */
const { Expo } = require('expo-server-sdk');
const User = require('../models/userModel');

const sendNotifications = async (user, message) => {
  const expo = new Expo();

  const messages = [];
  const invalidTokens = [];

  try {
    user.pushTokens.forEach(pushToken => {
      if (!Expo.isExpoPushToken(pushToken)) {
        invalidTokens.push(pushToken);
      } else {
        messages.push({
          to: pushToken,
          sound: 'default',
          title: message.title,
          body: message.body,
          data: message.data,
        });
      }
    });

    const chunks = expo.chunkPushNotifications(messages);

    const ticketsChunksPromise = chunks.map(async chunk => {
      const result = await expo.sendPushNotificationsAsync(chunk);
      return result;
    });
    const ticketsChunks = await Promise.all(ticketsChunksPromise);
    const tickets = ticketsChunks.reduce(
      (accu, chunk) => [...accu, ...chunk],
      []
    );
    // console.log(tickets);
    // Possible tickets
    // [
    //   {
    //     id: 'ce166e66-d2a4-459a-8c58-6f6c4c497c0e',
    //     status: 'ok',
    //   },
    //   {
    //     id: '3af4ab7c-f3dc-4810-9831-fd10f95df2e2',
    //     status: 'error',
    //     message: 'The recipient device is not registered with FCM.',
    //     details: {
    //       error: 'DeviceNotRegistered',
    //       fault: 'developer',
    //     },
    //   },
    // ]

    tickets.forEach(
      (ticket, index) =>
        ticket.status !== 'ok' && invalidTokens.push(user.pushTokens[index])
    );

    // remove invalid tokens
    if (invalidTokens.length > 0) {
      const onlyValidTokens = user.pushTokens.filter(
        token => !invalidTokens.includes(token)
      );
      await User.findByIdAndUpdate(user._id, { pushTokens: onlyValidTokens });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendNotifications;
