import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import useSafeState from '../../state'
import { userLoad } from '../../user';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import UserProfile from '../user/profile';
import TestHistory from '../test/history';
import HomeDashboard from './dashboard';
import * as Updates from 'expo-updates';

const AppJson = require('../../app.json')

export default function HomeIndex(props: any): any {
  const [activeTab, setActiveTab] = useSafeState(0)
  const [userData, setUserData] = useSafeState()

  useEffect(() => {
    userLoad().then((user) => {
      setUserData(user)
    })
    checkUpdates()
  }, [])

  function checkUpdates() {
    if (AppJson.expo.updates.enabled == true) {
      Updates.fetchUpdateAsync().then((v) => {
        if (v.isNew) {
          Alert.alert("Alert", "Berhasil Di Update", [{
            onPress: () => {
              Updates.reloadAsync()
            },
            text: 'Ok'
          }], { cancelable: false })
        }
      })
    }
  }

  function getTabView() {
    if (activeTab == 0) {
      return <HomeDashboard navigation={props.navigation} />
    }
    if (activeTab == 1) {
      return <TestHistory navigation={props.navigation} />
    }
    if (activeTab == 2) {
      return <UserProfile navigation={props.navigation} />
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {getTabView()}
      <View style={{ height: 47, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, backgroundColor: '#fbfbfb', borderTopColor: '#f1f1f1', borderTopWidth: 1 }}>
        <TouchableOpacity style={{ flex: 1, padding: 10 }} onPress={() => setActiveTab(0)}>
          <Icon size={18} name="home-outline" type='material-community' color={activeTab == 0 ? '#5E8FF5' : "grey"} />
          <Text style={{ fontSize: 12, textAlign: 'center', color: activeTab == 0 ? '#5E8FF5' : 'grey' }}>DASHBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, padding: 10 }} onPress={() => setActiveTab(1)}>
          <Icon size={18} name="history" color={activeTab == 1 ? '#5E8FF5' : "grey"} />
          <Text style={{ fontSize: 12, textAlign: 'center', color: activeTab == 1 ? '#5E8FF5' : 'grey' }}>HISTORY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, padding: 10 }} onPress={() => setActiveTab(2)}>
          <Icon size={18} name="account-outline" type='material-community' color={activeTab == 2 ? '#5E8FF5' : "grey"} />
          <Text style={{ fontSize: 12, textAlign: 'center', color: activeTab == 2 ? '#5E8FF5' : 'grey' }}>PROFILE</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}