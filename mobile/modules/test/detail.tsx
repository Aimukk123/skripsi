import React from 'react';
import { View, Text } from 'react-native';
import ComponentHeader from '../component/header'
import ComponentButton from '../component/button'


export default function TestDetail(props: any): any {

  const data = props.navigation.state.params.data

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ComponentHeader onPress={() => props.navigation.goBack()} />
      <View style={{ marginHorizontal: 20, paddingTop: 20 }}>
        <Text style={{ color: '#2c3e50', textAlign: 'center', fontSize: 18 }} >{data.test_name}</Text>
        <View style={{ backgroundColor: 'white', borderRadius: 10, elevation: 3, marginVertical: 20 }}>
          <Text style={{ textAlign: "justify", padding: 10, letterSpacing: 0.6, lineHeight: 20 }}>
            {data.description}
          </Text>
        </View>
        <ComponentButton label={"Kerjakan Test"} icon="play-circle-outline" onPress={() => props.navigation.navigate('question', { data: data })} />
        <ComponentButton label={"Baca Tentang " + data.test_name} icon="information-outline" onPress={() => { props.navigation.navigate('detail_test', { data: data }) }} />
      </View>
    </View>
  )
}