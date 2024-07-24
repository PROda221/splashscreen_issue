import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

type LoaderProps = {
  isLoading: boolean;
};

const Loader: React.FC<LoaderProps> = ({isLoading}) => {
  if (!isLoading) return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FFFFFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

export default Loader;
