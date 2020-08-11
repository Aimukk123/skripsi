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
    <TouchableOpacity style={{ alignSelf: 'center', height: 35, elevation: 3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 7, width: 200, borderRadius: 17.5, backgroundColor: "#5E8FF5", ...props.style }}
      onPress={() => props.onPress()}>
      <View style={{ flexDirection: "row", padding: 10, alignItems: "center" }}>
        {
          props && props.icon &&
          <Icon name={props.icon} color="white" type='material-community' />
        }
        <Text style={{ marginLeft: 10, fontSize: 14, color: "white", textAlign: 'center', textAlignVertical: 'center' }}>{props.label}</Text>
      </View>
    </TouchableOpacity>
  )
}