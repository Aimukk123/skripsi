import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { userLoad, userLogout } from '../../user';
import useSafeState from '../../state'
import ComponentButton from '../component/button';
import ComponentLoading_small from '../component/loading_small';

export default function UserProfile(props): any {

  const [data, setData] = useSafeState()
  
  useEffect(() => {
    userLoad().then((user: any) => {
      console.log(user);
      setData(user)
    })
  }, [])

  // const avatar = data && data.jenis_kelamin == 'Laki-Laki' ? '../../assets/male.png' : '../../assets/woman.png'

  if (!data) {
    <ComponentLoading_small />
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#5E8FF5', paddingTop: StatusBar.currentHeight, height: 150 }} />
      <Image style={{ width: 120, height: 120, borderRadius: 60, borderColor: 'white', borderWidth: 3, marginTop: -60, alignSelf: 'center' }} source={require('../../assets/male.png')} />
      <Text style={{ fontSize: 16, textAlign: 'center' }}>{data && data.nama_lengkap}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
        <Text style={{ fontSize: 12 }}>{data && data.username}</Text>
        <Text style={{ fontSize: 18 }} >{' | '}</Text>
        <Text style={{ fontSize: 12, textAlign: 'center' }}>{data && data.email}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 30 }}>
        <ComponentButton label="LOGOUT" onPress={userLogout} />
      </View>
    </View>
  )
}