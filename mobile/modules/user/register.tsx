import React, { useRef } from 'react';
import { View, TouchableOpacity, TextInput, Text, KeyboardAvoidingView, ScrollView, StatusBar, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon } from 'react-native-elements';
import useSafeState from '../../state'
import LibCurl from '../lib/curl';
import { userSave } from '../../user';
import moment from 'moment/min/moment-with-locales'
import ComponentLoading_small from '../component/loading_small';

export default function UserRegister(props: any): any {
  moment.locale('id')

  const [showPassword, setShowPassword] = useSafeState(false)

  const [inputanNama, setIputanNama] = useSafeState('')
  const [inputanEmail, setIputanEmail] = useSafeState('')
  const [inputanUsername, setIputanUsername] = useSafeState('')
  const [inputanPassword, setIputanPassword] = useSafeState('')
  const [showLoading, setShowLoading] = useSafeState(false)
  const [date, setDate] = useSafeState('')
  const [currentDate, setCurrentDate] = useSafeState(new Date())
  const [show, setShow] = useSafeState(false)
  const [jekel, setJekel] = useSafeState('')
  const jekell = ['Laki-Laki', 'Perempuan']

  const inputName = useRef<TextInput>(null)
  const inputEmail = useRef<TextInput>(null)
  const inputUsername = useRef<TextInput>(null)
  const inputPassword = useRef<TextInput>(null)

  function cekInputan() {
    if (inputanNama == '') {
      Alert.alert('Peringatan', 'Nama Harus Diisi')
      inputName.current!.focus()
      return
    }
    if (inputanEmail == '') {
      Alert.alert('Peringatan', 'Email Harus Diisi')
      inputEmail.current!.focus()
      return
    }
    if (inputanUsername == '') {
      Alert.alert('Peringatan', 'Username Harus Diisi')
      inputUsername.current!.focus()
      return
    }
    if (inputanPassword == '') {
      Alert.alert('Peringatan', 'Password Harus Diisi')
      inputPassword.current!.focus()
      return
    }
    if (jekel == '') {
      Alert.alert('Peringatan', 'Jenis Kelamin Harus Dipilih')
      return
    }
    if (date == '') {
      Alert.alert('Peringatan', 'Tanggal Lahir Harus Diisi')
      return
    }
    register(inputanNama, inputanEmail, inputanUsername, inputanPassword, jekel, date)
  }

  function register(namaLengkap: string, email: string, username: string, password: string, jekel: string, tglLahir: string) {
    var post = {
      nama_lengkap: namaLengkap,
      email: email,
      username: username,
      password: password,
      jekel: jekel,
      tanggal_lahir: tglLahir
    }
    setShowLoading(true)
    LibCurl("user_register.php", post, function (out: any) {
      console.log(out)
      if (out && out.message == "success" && out.ok == 1) {
        userSave(out.result.user)
        setShowLoading(false)
      } else {
        setShowLoading(false)
        Alert.alert('Mohon Maaf ', out.message)
      }
    })
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#5E8FF5', paddingTop: StatusBar.currentHeight }}>
      {
        showLoading ? <ComponentLoading_small /> : null
      }
      <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
        <ScrollView removeClippedSubviews={false}>
          <View style={{ backgroundColor: "white", marginHorizontal: 20, marginTop: 100, borderRadius: 10 }}>
            <Text style={{ paddingTop: 30, fontSize: 16, fontWeight: "normal", fontStyle: "normal", letterSpacing: 0, textAlign: "center", color: "#706f74" }}>REGISTRASI</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 15, marginHorizontal: 20, paddingHorizontal: 10/* , color: '#5E8FF5' */, backgroundColor: '#E7EFFE', height: 40, borderRadius: 20 }}>
              <Icon name={"account-outline"} color="#5E8FF5" type='material-community' size={20} />
              <TextInput
                ref={inputName}
                autoCompleteType={"off"}
                placeholder="Nama Lengkap"
                keyboardType="default"
                autoCapitalize={'words'}
                returnKeyType="next"
                onSubmitEditing={() => { inputPassword.current!.focus() }}
                onChangeText={(text) => { setIputanNama(text) }}
                style={{ flex: 1, paddingLeft: 7, color: '#706f74' }}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 15, marginHorizontal: 20, paddingHorizontal: 10/* , color: '#5E8FF5' */, backgroundColor: '#E7EFFE', height: 40, borderRadius: 20 }}>
              <Icon name={"email-outline"} color="#5E8FF5" type='material-community' size={20} />
              <TextInput
                ref={inputEmail}
                autoCompleteType={"off"}
                placeholder="Email"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => { inputUsername.current!.focus() }}
                onChangeText={(text) => { setIputanEmail(text) }}
                style={{ flex: 1, paddingLeft: 7, color: '#706f74' }}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 15, marginHorizontal: 20, paddingHorizontal: 10/* , color: '#5E8FF5' */, backgroundColor: '#E7EFFE', height: 40, borderRadius: 20 }}>
              <Icon name={"account-outline"} color="#5E8FF5" type='material-community' size={20} />
              <TextInput
                ref={inputUsername}
                autoCompleteType={"off"}
                placeholder="Username"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => { inputPassword.current!.focus() }}
                onChangeText={(text) => { setIputanUsername(text) }}
                style={{ flex: 1, paddingLeft: 7, color: '#706f74' }}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 15, marginHorizontal: 20, paddingHorizontal: 10/* , color: '#5E8FF5' */, backgroundColor: '#E7EFFE', height: 40, borderRadius: 20 }}>
              <Icon name={"lock-outline"} color="#5E8FF5" type='material-community' size={20} />
              <TextInput
                ref={inputPassword}
                autoCompleteType={"off"}
                placeholder="Password"
                autoCapitalize="none"
                secureTextEntry={!showPassword}
                returnKeyType="next"
                onSubmitEditing={() => { inputPassword.current!.blur() }}
                onChangeText={(text) => { setIputanPassword(text) }}
                style={{ flex: 1, paddingLeft: 7, color: '#706f74' }}
              />
              <TouchableOpacity onPress={() => { setShowPassword(!showPassword) }}>
                <Icon name={showPassword == true ? "eye-outline" : "eye-off-outline"} color="#5E8FF5" size={20} type='material-community' />
              </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 20 }}>
              <Text style={{ paddingLeft: 10, paddingVertical: 10, fontSize: 12, fontWeight: "normal", fontStyle: "normal", letterSpacing: 0, color: "#706f74" }}>Jenis Kelamin</Text>
              <View style={{ flexDirection: 'row' }}>

                {
                  jekell.map((item, index) => (
                    <TouchableOpacity onPress={() => setJekel(item)} style={{ marginHorizontal: 20, paddingBottom: 10, paddingTop: 5 }} key={index}>
                      <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#e8e8e8', alignItems: 'center', justifyContent: 'center' }}>
                          {
                            jekel == item &&
                            <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#5e92f8" }} />
                          }
                        </View>
                        <Text style={{ paddingLeft: 15, fontSize: 14, fontWeight: "normal", fontStyle: "normal", letterSpacing: 0, color: "#706f74" }}>{item}</Text>
                      </View>
                    </TouchableOpacity>
                  ))
                }
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 15, marginHorizontal: 20, paddingHorizontal: 10/* , color: '#5E8FF5' */, backgroundColor: '#E7EFFE', height: 40, borderRadius: 20 }}>
              <Icon name={"calendar-blank-outline"} color="#5E8FF5" type='material-community' size={20} />
              <TouchableOpacity style={{ flex: 1 }} onPress={() => setShow(!show)}>
                <TextInput
                  autoCompleteType={"off"}
                  editable={false}
                  value={date}
                  placeholder={"Tanggal Lahir"}
                  style={{ flex: 1, paddingLeft: 7, color: '#706f74' }}
                />
              </TouchableOpacity>
              {
                show &&
                <DateTimePicker
                  testID="dateTimePicker"
                  timeZoneOffsetInMinutes={0}
                  value={currentDate}
                  mode={'date'}
                  is24Hour={true}
                  display="default"
                  onChange={(event, selectedDate) => {
                    const d = selectedDate || currentDate;
                    setShow(!show);
                    setCurrentDate(d);
                    if (event.type == "set") {
                      const t = moment(selectedDate).format("YYYY/MM/DD")
                      setDate(t)
                    }

                  }}
                />
              }

            </View>
            <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
              <TouchableOpacity onPress={() => props.navigation.navigate('login')} style={{ flex: 1, marginTop: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: "#EC7F6C", height: 35, borderRadius: 17.5, marginBottom: 20 }}>
                <Text style={{ fontSize: 14, fontWeight: "normal", fontStyle: "normal", letterSpacing: 0, textAlign: "center", color: "white" }}>BATAL</Text>
              </TouchableOpacity>
              <View style={{ width: 20 }} />
              <TouchableOpacity onPress={cekInputan} style={{ flex: 1, marginTop: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: "#53BFA0", height: 35, borderRadius: 17.5, marginBottom: 20 }}>
                <Text style={{ fontSize: 14, fontWeight: "normal", fontStyle: "normal", letterSpacing: 0, textAlign: "center", color: "white" }}>REGISTER</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}