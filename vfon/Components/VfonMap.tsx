import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import mapStyle from '../MapSyle';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React, {useEffect, useState} from 'react';
import GetLocation, {Location} from 'react-native-get-location';
import { getUniqueId, getDeviceName } from 'react-native-device-info';

interface Dzik {
  ID: string;
  name: string;
  lat: number;
  lng: number;
  direction: number;
  speed: number;
  status: string;
  timestamp: string;
}

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

  const [dziki, setDziki] = useState<Dzik[]>();
  const deviceId = getUniqueId();
  let location: Location | undefined;

  const refresh = async () => {
    try {
      location = await getLocation();
      const dzik: Dzik = {
        ID: deviceId,
        direction: 0,
        lat: location?.latitude ?? 0,
        lng: location?.longitude ?? 0,
        name: await getDeviceName(),
        speed: 0,
        status: 'OK',
        timestamp: new Date().toISOString(),
      };

      let response = await fetch(
        'https://dzikboytest.azurewebsites.net/api/sync',
        {body: JSON.stringify(dzik), method: 'POST'},
      );
      let json = await response.json();
      setDziki(json);
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  // setInterval(refresh, 4000);

  useEffect(() => {
    refresh();
  }, []);

  return (
    <MapView
      customMapStyle={mapStyle}
      provider={PROVIDER_GOOGLE}
      style={{width: wp(100), height: hp(100)}}
      initialRegion={{
        latitude: location?.latitude ?? 0,
        longitude: location?.longitude ?? 0,
        latitudeDelta: 0.011,
        longitudeDelta: 0.011,
      }}>
      {dziki?.map(dzik => (
        <Marker
          // image={require('../assets/cap_icon.png')} // this scales better on Android
          // image={{uri: 'custom_pin'}}
          key={dzik.ID}
          title={dzik.name}
          coordinate={{
            latitude: dzik.lat,
            longitude: dzik.lng,
          }}
        />
      ))}
    </MapView>
  );
};

export default VfonMap;
