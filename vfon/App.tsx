/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import GetLocation, {Location} from 'react-native-get-location';
import mapStyle from './MapSyle';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getLocation = async (): Promise<Location | undefined> => {
    try {
      const loc = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 5000, //it can take 5s on emulator
      });
      console.log(loc);
      return loc;
    } catch (error) {
      const {code, message} = error;
      console.warn(code, message);
      return undefined;
    }
  };

  return (
    <MapView
      customMapStyle={mapStyle}
      provider={PROVIDER_GOOGLE}
      style={{width: wp(100), height: hp(100)}}
      initialRegion={{
        latitude: 51.117,
        longitude: 0.192,
        latitudeDelta: 0.011,
        longitudeDelta: 0.011,
      }}>
      <Marker
        // image={require('../assets/cap_icon.png')} // this scales better on Android
        // image={{uri: 'custom_pin'}}
        coordinate={{
          latitude: 51.117,
          longitude: 0.192,
        }}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
