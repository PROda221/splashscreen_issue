/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import messaging from '@react-native-firebase/messaging';
import {name as appName} from './app.json';
import {
  checkChatExists,
  addMessageToChat,
  createNewChat,
} from './src/DB/DBFunctions';
import notifee from '@notifee/react-native';

// Notifee.onBackgroundEvent(async ({detail, type}) => {
//   const {notification} = detail
//   console.log('notification in notifee :', detail.notification);
  
//   // Check if the user pressed the "Mark as read" action
//   if (type === EventType.ACTION_PRESS) {
//     console.log('inside')
//     // Update external API
//   }
// });

const displayNotification = async (notifeeData) => {
  await notifee.createChannel({
    id: 'test',
    name: 'test',
  });
  
  await notifee.displayNotification(notifeeData);
};

messaging().setBackgroundMessageHandler(async remoteMessage => {
  try {
    const {message, senderUsername, type, notifee} = remoteMessage.data;
    if (senderUsername && message && type) {
      displayNotification(JSON.parse(notifee));
      const chatExists = await checkChatExists(senderUsername);
      if (!chatExists) {
        await createNewChat(senderUsername, `${senderUsername}-.png`);
      }
      await addMessageToChat(senderUsername, message, true, type);
    }
  } catch (err) {
    throw new Error('local db error :', err);
  }
});

AppRegistry.registerComponent(appName, () => App);
