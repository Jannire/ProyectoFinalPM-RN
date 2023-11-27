import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { NativeBaseProvider } from "native-base";
import AppNavigator from './components/Navigator';

export default function App() {
  console.log("Hello, World!");
  return (
    <NativeBaseProvider>
      <StatusBar
        animated={true}
        backgroundColor="orange"
      />
      <AppNavigator />
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
