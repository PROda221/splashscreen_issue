import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';
import styled from 'styled-components';
// Import {type StackParamList} from '../../../Navigation/types';
// import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {colors} from '../../../DesignTokens/Colors';
import {moderateScale, verticalScale} from '../../../Functions/StyleScale';
import {Typography} from '../../../Components';
// Type Props = {
//   navigation: NativeStackNavigationProp<StackParamList, 'HomePage'>;
// };



const HomeScreen = (): JSX.Element => {
  const temp = 'asfsaf';
  const Scroll = styled(ScrollView)`
  flex-grow: 1;
  padding: 0 8px 0 8px;
`;
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <Scroll>
          <View style={styles.container}>
            <View style={styles.textBox2}>
              <View style={styles.leftContainer}>
                <Typography
                  bgColor={'black'}
                  size={'medium'}
                  fontWeight={'700'}
                  textStyle={styles.textContentStyle}>
                  {temp}
                </Typography>
              </View>
              <View style={styles.rightContainer}>
                <Typography
                  bgColor={'black'}
                  size={'medium'}
                  fontWeight={'500'}
                  textStyle={styles.textContentStyle}>
                  {': Sachin asfafafaewfawfawffafwfafwfvbzregzrg'}
                </Typography>
              </View>
            </View>
           
          </View>
        </Scroll>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderColor: colors.lightGrey,
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    marginTop: moderateScale(10),
  },
  leftContainer: {width: '40%'},
  rightContainer: {width: '60%'},

  safeAreaContainer: {
    backgroundColor: colors.white,
    flex: 1,
  },
  textBox2: {
    backgroundColor: colors.studentCard,
    borderColor: colors.lightGrey,
    borderTopWidth: moderateScale(1),
    flexDirection: 'row',
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(16),
  },
  textContentStyle: {textAlign: 'left'},
});

export default HomeScreen;
