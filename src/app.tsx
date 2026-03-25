import { Toast } from '@/components/toast/toast';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { queryClient } from './config/query-client';
import { RootNavigator } from './navigation/root-navigation';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SafeAreaProvider>
      <StatusBar />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <Toast />
    </SafeAreaProvider>
  </QueryClientProvider>
);

export default App;
