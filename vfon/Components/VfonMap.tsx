import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import mapStyle from '../MapSyle';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React from 'react';
import GetLocation, {Location} from 'react-native-get-location';

const VfonMap: React.FC = () => {
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

export default VfonMap;
