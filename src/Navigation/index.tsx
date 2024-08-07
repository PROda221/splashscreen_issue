import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {AnimatedBootSplash} from '../Components/AnimatedSplashScreen';
import {View, Text} from 'react-native';
import {retrieveAccessToken} from '../Functions/EncryptedStorage';

const Navigation = (): JSX.Element => {
  const [isLogedIn, setLoggedIn] = useState(false);
  const [animationEnd, setAnimationEnd] = useState(false);

  useEffect(() => {
    const getAuth = async () => {
      const token = await retrieveAccessToken();
      if (token) {
        setLoggedIn(true);
      }
    };
    getAuth();
  }, []);

  return (
    <NavigationContainer>
      <View>
        <Text>Hello React</Text>
      </View>
      {!animationEnd && (
        <AnimatedBootSplash
          onAnimationEnd={() => {
            setAnimationEnd(true);
          }}
        />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
