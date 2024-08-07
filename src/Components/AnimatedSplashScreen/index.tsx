import React, {useState} from 'react';
import {Animated, Dimensions, Platform} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import {useTheme} from '../../useContexts/Theme/ThemeContext';

const useNativeDriver = Platform.OS !== 'web';

type Props = {
  onAnimationEnd: () => void;
};

export const AnimatedBootSplash = ({onAnimationEnd}: Props) => {
  const [opacity] = useState(() => new Animated.Value(1));
  const [translateY] = useState(() => new Animated.Value(0));

  const {colors} = useTheme();

  const {container, logo /*, brand */} = BootSplash.useHideAnimation({
    // ready: isLoggedIn,
    manifest: {
      background: colors.splashScreenBackground,
      logo: {
        width: 180,
        height: 180,
      },
    },

    logo: require('../../Assets/SplashScreen/HumanTouchCircle.png'),
    // darkLogo: require("../assets/bootsplash/dark-logo.png"),
    // brand: require("../assets/bootsplash/brand.png"),
    // darkBrand: require("../assets/bootsplash/dark-brand.png"),

    statusBarTranslucent: true,
    navigationBarTranslucent: false,

    animate: () => {
      const {height} = Dimensions.get('window');

      Animated.stagger(250, [
        Animated.spring(translateY, {
          useNativeDriver,
          toValue: -50,
        }),
        Animated.spring(translateY, {
          useNativeDriver,
          toValue: height,
        }),
      ]).start();

      Animated.timing(opacity, {
        useNativeDriver,
        toValue: 0,
        duration: 150,
        delay: 350,
      }).start(() => {
        onAnimationEnd();
      });
    },
  });

  return (
    <Animated.View {...container} style={[container.style, {opacity}]}>
      <Animated.Image
        {...logo}
        style={[logo.style, {transform: [{translateY}]}]}
      />

      {/* <Animated.Image {...brand} style={[brand.style, { opacity }]} /> */}
    </Animated.View>
  );
};
