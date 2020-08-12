import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native';
import moment from 'moment/min/moment-with-locales'
import useSafeState from '../../state'
import ComponentLoading from '../component/loading';
import ComponentHeader from '../component/header';
import LibCurl from '../lib/curl';
import { userLoad } from '../../user';
import ComponentScroll_refresh from '../component/scroll_refresh';

moment.locale('id')

export default function TestHistory(props: any): any {

  const [result, setResult] = useSafeState()
  const [id, setId] = useSafeState(0)
  const height = Dimensions.get("screen").height

  useEffect(() => {
    userLoad().then((us: any) => {
      getData(us.id_user)
      setId(us.id_user)
    })
  }, [])

  function getData(id_user: string) {
    LibCurl('result.php?id_user=' + id_user, null,
      (out: any) => {
        if (out.message == "success" && out.ok == 1) {
          setResult(out.result)
        } else {
          // Alert.alert('Mohon maaf', out.message)
          setResult(out.result)
        }
      })
  }


  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ComponentHeader title="Riwayat Test Anda" />
      {
        !result ? <ComponentLoading /> :
          <ComponentScroll_refresh onRefresh={() => getData(id)} >
            <View style={{ marginTop: 20 }}>
              {
                result && result.length > 0 && result.map((item: any, i: number) => (
                  <View key={i} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginHorizontal: 20, marginBottom: 20 }}>
                    <View style={{ alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 18, backgroundColor: "#5E8FF5", borderStyle: "solid", borderWidth: 2, borderColor: "white", elevation: 3 }}>
                      <Text style={{ fontSize: 18, textAlign: "center", textAlignVertical: "center", color: "white" }}>{i + 1}</Text>
                    </View>
                    <TouchableOpacity onPress={() => props.navigation.navigate('history_detail', { result: item })} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "white", marginLeft: 15, padding: 10, width: 260, height: 80, borderRightColor: "#5E8FF5", borderRightWidth: 5, borderStyle: "solid", borderRadius: 10, elevation: 2 }}>
                      <View>
                        <Text style={{ fontSize: 12, fontStyle: "normal", lineHeight: 12, letterSpacing: 0, textAlign: "left", color: "#757575" }}>{item.jenis_test}</Text>
                        <Text style={{ fontSize: 14, fontStyle: "normal", lineHeight: 17, letterSpacing: 0, textAlign: "left", color: "#303030", paddingTop: 5 }}>{'Berikut adalah hasil untuk ' + item.jenis_test + ' anda.'}</Text>
                        <Text style={{ fontSize: 10, fontStyle: "normal", lineHeight: 12, letterSpacing: 0, textAlign: "left", color: "#757575", paddingTop: 5 }}>{moment(item.tanggal).format('LLLL')}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))
              }
              {
                result.length < 1 &&
                < View style={{ marginHorizontal: 20, alignItems: 'center', justifyContent: 'center', marginTop: height * 0.3 }}>
                  <Text style={{ marginBottom: 10, fontSize: 14, fontStyle: 'normal', textAlign: 'center', color: '#757575' }} >Riwayat Test Anda Akan Ditampilkan Disini</Text>
                  <Text style={{ fontSize: 14, fontStyle: 'normal', textAlign: 'center', color: '#757575' }} >Saat ini Anda Belum Melakukan Test</Text>
                </View>
              }
            </View>
          </ComponentScroll_refresh>
      }
    </View >
  )
}