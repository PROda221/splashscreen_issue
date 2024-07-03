import React from 'react';
import {TouchableOpacity, Image, View} from 'react-native';
import {useTheme} from '../../useContexts/Theme/ThemeContext';
import {getUserCardStyles} from './styles';
import {Typography} from '../Typography';
import {FlashList} from 'react-native-actions-sheet/dist/src/views/FlashList';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../Functions/StyleScale';
import {useNavigation} from '@react-navigation/native';
import {SheetManager} from 'react-native-actions-sheet';
import {getProfilePic} from '../../Functions/GetProfilePic';

type Props = {
  username: string;
  skills: string[];
  status: string;
  image: string;
};

export const UserCard = ({username, skills, status, image}: Props) => {
  const {colors} = useTheme();
  const styles = getUserCardStyles(colors);

  const navigation = useNavigation();

  const onCardPress = () => {
    SheetManager.hide('SearchFeature-sheet');
    navigation.navigate('ChatScreen', {
      username,
      status,
      skills,
      image,
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onCardPress}>
      <View style={styles.imageContainer}>
        <Image source={{uri: getProfilePic(image)}} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Typography
          bgColor="white"
          fontWeight="400"
          textStyle={styles.username}>
          {username}
        </Typography>
        <Typography bgColor="white" fontWeight="400" textStyle={styles.status}>
          {status}
        </Typography>
        <FlashList
          estimatedItemSize={80}
          data={skills}
          renderItem={({item}) => (
            <Typography
              bgColor={colors.textPrimaryColor}
              fontWeight="300"
              textStyle={styles.skill}>
              {item}
            </Typography>
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <AntDesign
        name="arrowright"
        color={'white'}
        size={moderateScale(20)}
        style={{height: verticalScale(20), paddingRight: horizontalScale(5)}}
      />
    </TouchableOpacity>
  );
};
