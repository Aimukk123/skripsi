import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';


export default function ComponentLoading(props: any): any {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
      <Text>Halaman Sedang Dimuat</Text>
      <ActivityIndicator size="large" color="#5E8FF5" />
    </View>
  )
}