import React, { useRef } from 'react';
import { View, Text, Alert, StatusBar, KeyboardAvoidingView, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import useSafeState from '../../state'
import ComponentLoading_small from '../component/loading_small';
import { Icon } from 'react-native-elements';
import LibCurl from '../lib/curl';
import { userSave } from '../../user';

export default function UserLogin(props: any): any {
  let inputEmail = useRef<TextInput>(null)
  let inputPassword = useRef<TextInput>(null)

  const [inputanEmail, setIputanEmail] = useSafeState('')
  const [inputanPassword, setIputanPassword] = useSafeState('')
  const [showPassword, setShowPassword] = useSafeState(false)
  const [showLoading, setShowLoading] = useSafeState(false)

  function cekInput() {
    if (inputanEmail == '') {
      Alert.alert('Peringatan', 'Silahkan masukkan email Anda')
      inputEmail.current!.focus()
      return
    }
    if (inputanPassword == '') {
      Alert.alert('Peringatan', 'Silahkan masukkan password Anda')
      inputPassword.current!.focus()
      return
    }
    login(inputanEmail, inputanPassword)
  }

  function login(email: string, password: string) {
    var post = {
      email: email,
      password: password
    }
    setTimeout(() => {
      setShowLoading(true)
      LibCurl("user_login.php", post, (out: any) => {
        console.log(out);

        if (out && out.message == 'success' && out.ok == 1) {
          userSave(out.result.user)
          setShowLoading(false)
        } else {
          setShowLoading(false)
          Alert.alert('Mohon maaf.', out.message)
        }
      })
    }, 1000);
  }

  return (
    <KeyboardAvoidingView behavior='padding' enabled style={{ flex: 1, height: "100%" }}>
      <View style={{ flex: 1, backgroundColor: '#5E8FF5', paddingTop: StatusBar.currentHeight }}>
        {
          showLoading ? <ComponentLoading_small /> : null
        }
        <ScrollView removeClippedSubviews={false}>
          <View style={{ backgroundColor: "white", marginHorizontal: 20, marginTop: 100, borderRadius: 10 }}>
            <Image source={require('../../assets/login.png')} style={{ width: 100, height: 100, alignSelf: 'center', marginTop: -50 }} />
            <Text style={{ paddingTop: 30, fontSize: 16, fontWeight: "normal", fontStyle: "normal", letterSpacing: 0, textAlign: "center", color: "#706f74" }}>LOGIN</Text>
            <Text style={{ paddingTop: 5, fontSize: 14, fontWeight: "normal", fontStyle: "normal", letterSpacing: 0, textAlign: "center", color: "#706f74" }}>Selamat Datang Di Aplikasi Test Kepribadian</Text>
            <TextInput
              ref={inputEmail}
              autoCompleteType={"off"}
              placeholder="Email"
              onChangeText={(text) => { setIputanEmail(text) }}
              returnKeyType='next'
              onSubmitEditing={() => inputPassword.current!.focus()}
              style={{ marginTop: 15, marginHorizontal: 20, paddingHorizontal: 20, color: '#5E8FF5', backgroundColor: '#E7EFFE', height: 40, borderRadius: 20 }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 15, marginHorizontal: 20, paddingHorizontal: 20,/*  color: '#5E8FF5', */ backgroundColor: '#E7EFFE', height: 40, borderRadius: 20 }}>
              <TextInput
                ref={inputPassword}
                autoCompleteType={"off"}
                returnKeyType={"go"}
                placeholder="Password"
                secureTextEntry={!showPassword}
                onChangeText={(text) => { setIputanPassword(text) }}
                onSubmitEditing={() => cekInput()}
                style={{ flex: 1, color: '#5E8FF5', backgroundColor: '#E7EFFE' }}
              />
              <TouchableOpacity onPress={() => { setShowPassword(!showPassword) }}>
                <Icon
                  name={showPassword == true ? "eye-outline" : "eye-off-outline"}
                  color="#5E8FF5"
                  size={20}
                  type='material-community'
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => cekInput()} style={{ marginTop: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: "#5E8FF5", marginHorizontal: 20, height: 40, borderRadius: 20, marginBottom: 20 }}>
              <Text style={{ fontSize: 14, fontWeight: "normal", fontStyle: "normal", letterSpacing: 0, textAlign: "center", color: "white" }}>LOGIN</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ textAlign: 'center', fontSize: 14, paddingVertical: 20 }}>Belum punya akun? </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('register')} style={{ marginTop: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: "#EC7F6C", marginHorizontal: 40, height: 40, borderRadius: 20, marginBottom: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: "normal", fontStyle: "normal", letterSpacing: 0, textAlign: "center", color: "white" }}>REGISTER</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}