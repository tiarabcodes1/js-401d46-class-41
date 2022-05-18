import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import TeesTunes from './components/TeesTunes';
import {
  NativeBaseProvider,
  Box
} from 'native-base'
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  console.log("App Executed")

  return (
    <View style={styles.container}>
      <TeesTunes />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#581845',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
