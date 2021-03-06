import * as React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, SafeAreaView, Switch, Alert, Vibration, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import tunes from '../assets/music-data/data'
import { LinearGradient } from 'expo-linear-gradient';
import { EventRegister } from 'react-native-event-listeners';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ColorModeContext from '../assets/config/ColorModeContext.js';

export default function TeesTunes({ navigation }) {

 const colorMode = React.useContext(ColorModeContext)

  //Contains the state of the music for user interaction
  const [sound, setSound] = React.useState();
  const [showContent, setShow] = React.useState(false);
  const [likedSongs, setLikedSongs] = React.useState({artist: '', title: ''});
  const [mode, setMode] = React.useState(false);

  async function playMusic() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/Ectoplasm.mp3'),
      );
      setSound(sound);
      await sound.playAsync();
      setShow(true)
  }

  //TODO: Convert to a pause function
  async function stopMusic() {
    await sound.pauseAsync();
    setShow(false)
  }
 

  const handleLikeAlert = (songTitle, artistName) => {
    //.alert() takes title, message, buttons options, etc
    Alert.alert(
      "You must really like this tune!",
      "This has been added to your saved songs",
      [
        {
          text: `${artistName}: ${songTitle}`,
          onPress: () => Alert.alert("Song Liked"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        //(property)Callback function fired when alert has been dismissed.
        onDismiss: () =>
        Alert.alert(
          "This alert was dismissed by tapping outside of the alert dialog."
        ),

      }
    );
    setLikedSongs({title: `${songTitle}`, artist: `${artistName}`})
    Vibration.vibrate()
  };
  //TODO: Create background play functionality

  // React. accesses the global scope of react to access useEffect
  React.useEffect(() => {
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  const config = {
    dependencies: {
      "linear-gradient": LinearGradient
    }
  };

  
  return (

   
        <SafeAreaView style={[ styles.container, {backgroundColor: colorMode.background}]}>
              <Switch value={mode} 
              onValueChange = {(value) =>{
              setMode(value);
              EventRegister.emit("changeTheme", value)
              }}/>
          <View >
            <Ionicons name="radio" size={50} color='#FFC300' />
            <Text style={[ {fontSize: 30},{color: colorMode.color},{backgroundColor: colorMode.background}]}>Tee's Tunes</Text>
          </View>
          <View >

            <TouchableOpacity onPress={playMusic}>
              <Text style={{ fontSize: 30, color: '#FFC300' }}>Play Music</Text>
            </TouchableOpacity>

            {showContent == true ?
              <Text style={[ {fontSize: 20},{color: colorMode.color},{backgroundColor: colorMode.background}]}> You are Jamming to {tunes.data.title}</Text>
              : null}
            {/* onPress handles user tap on content */}
            <TouchableOpacity onPress={stopMusic}>
              <Text style={{ fontSize: 30, color: '#FFC300' }}>Stop Music</Text>
            </TouchableOpacity>
          </View>
            <View >
            <FontAwesome.Button name="heart" onPress={() => handleLikeAlert(tunes.data.title, tunes.data.artist)} />
            {/* navigation is passed to every screen pushes a new route to the native stack navigator if it's not already in the stack, otherwise it jumps to that screen */}
            <FontAwesome.Button 
            name="thumbs-up" 
            onPress={() => {
              navigation.navigate('Likes',{
                songInfo: `${likedSongs.title}`,
                artistName: `${likedSongs.artist}`
              });
            }} />
            {showContent == false ?
              <Text style={[ {fontSize: 20},{color: colorMode.color},{backgroundColor: colorMode.background}]} >Go Checkout the songs you liked!</Text>
              : null}
            </View>
          <View />
        </SafeAreaView>


  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#581845',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    paddingTop: 300,
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  }
});