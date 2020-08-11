import React from 'react';
import { View, ActivityIndicator, Dimensions, Text } from 'react-native';


export default function ComponentLoading_small(props: any): any {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(52, 52, 52, 0.8)', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 10 }}>
      <View style={{ backgroundColor: 'white', width: Dimensions.get('screen').width - 60, height: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
        <ActivityIndicator size="large" color="#5E8FF5" />
        <Text>{"Mohon tunggu beberapa saat"}</Text>
      </View>
    </View>
  )
}