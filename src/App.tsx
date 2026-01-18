import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ProductListScreen } from './screens';
import { background } from './theme';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={background} />
      <ProductListScreen />
    </SafeAreaProvider>
  );
};

export default App;
