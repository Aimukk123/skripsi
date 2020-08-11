import React from 'react';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

interface ComponentHeader {
  onPress?: () => void,
  title?: string
}

export default function ComponentHeader(props: ComponentHeader): any {

  const text = props.title || "Aplikasi Test Kepribadian"

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#5E8FF5', paddingTop: StatusBar.currentHeight, }}>
      {
        props && props.onPress &&
        <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => props.onPress()}>
          <Icon name="chevron-left" color="white" type='material-community' />
        </TouchableOpacity>
      }
      <Text style={{ paddingVertical: 15, paddingHorizontal: 15, color: 'white', fontSize: 16 }}>{text}</Text>
    </View>
  )
}