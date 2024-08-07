import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React from 'react';
import Navigation from './Navigation';
import {PaperProvider} from 'react-native-paper';

const App = (): JSX.Element => {
  return (
    <PaperProvider>
      <Navigation />
    </PaperProvider>
  );
};

export default App;
