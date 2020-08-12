import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

interface ComponentButton {
  onPress: () => void,
  icon?: string,
  label: string,
  style?: any
}

export default function ComponentButton(props: ComponentButton): any {
  return (
    <TouchableOpacity style={{ alignSelf: 'center', height: 42, elevation: 3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 7, width: 200, borderRadius: 20, backgroundColor: "#5E8FF5", ...props.style }}
      onPress={() => props.onPress()}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent:"center", marginHorizontal: 20 }}>
        {
          props && props.icon &&
          <Icon name={props.icon} color="white" type='material-community' />
        }
        <Text ellipsizeMode="middle" style={{ marginLeft: 5, fontSize: 14, color: "white", textAlign: 'center', textAlignVertical: 'center' }}>{props.label}</Text>
      </View>
    </TouchableOpacity>
  )
}