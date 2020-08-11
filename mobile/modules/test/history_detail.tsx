import React, { useEffect, useRef } from 'react';
import { View, Dimensions, Text, ScrollView, Alert } from 'react-native';
import ComponentHeader from '../component/header';
import ComponentLoading from '../component/loading';
import { LineChart } from "react-native-chart-kit";
import ComponentButton from '../component/button';
import LibCurl from '../lib/curl';
import useSafeState from '../../state'
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import ViewShot from "react-native-view-shot";
import ComponentScroll_refresh from '../component/scroll_refresh';
import { userLoad } from '../../user';

export default function TestHistory_detail(props: any): any {
  const result = props.navigation.state.params.result
  const labeling = result && result.detail && result.detail.map((item: any) => item.x)
  const values = result && result.detail && result.detail.map((item: any) => item.y)
  const dataGraph = {
    labels: labeling,
    datasets: [{
      data: values,
    },
    ],
  };
  const chartLarge = Dimensions.get("screen").width + 100
  const chartSmall = Dimensions.get("screen").width - 20
  const chartWidth = result && result.detail.length > 4 ? chartLarge : chartSmall
  const [data, setData] = useSafeState()
  const [user, setUser] = useSafeState()

  const imageView = useRef<ViewShot>(null)

  useEffect(() => {
    userLoad().then((user: any) => {
      console.log(user);
      
      setUser(user)
      getDetail()
    })
  }, [])



  function save() {
    MediaLibrary.requestPermissionsAsync()
    imageView.current!.capture().then((images: string) => {
      let img = '<img src = "' + images + '" >'
      let name = '<p>Nama : '+user.nama_lengkap+'</p>'
      let jekel = '<p>Jenis Kelamin : '+user.jenis_kelamin+'</p>'
      let email = '<p>Email : '+user.email+'</p>'
      console.log(name);
      
      Print.printAsync({ html: name + jekel + email + img + data.html })
    })
  }

  function getDetail() {
    LibCurl('detail.php?nama_kepribadian=' + result.jenis_kepribadian, null,
      (out: any) => {
        if (out.message == "success" && out.ok == 1) {
          setData(out.result)
        } else {
          Alert.alert('Oops.!', out.message)
          props.navigation.goBack()
        }
      }
    )
  }

  const detail = '<div style="background:#eeeeee; border:1px solid #cccccc; padding:5px 10px"><strong>Hasil Dari Tes Anda</strong></div><p><strong>Kepribadian Anda :</strong> <strong>Dominan.</strong></p><ol><li>Selalu mencoba untuk mengubah, membenarkan, dan mengontrol sesuatu.</li><li>Berkemauan keras dan percaya diri.</li><li>Cepat dalam mengambil keputusan dan senang menerima tantangan.</li><li>Skeptis, dan kurang peduli terhadap orang lain.</li><li>Selalu termotivasi dengan adanya tujuan yang nyata.</li><li>Takut akan kegagalan, terlihat rentan, atau merasa dimanfaatkan oleh yang lain.</li></ol><p><strong>Saran Pengembangan Kepribadian :</strong></p><ol><li>Cobalah menjadi pendengar yang aktif.</li><li>Kurangi sifat untuk mendominasi.</li><li>Kembangkan kepekaan untuk memahami perasaan orang lain.</li></ol><p><strong>Saran Profesi :</strong></p><p>Enterpreneur, penyiar, pemandu wisata, wirausaham agen real estate dan lobbyist.</p>'


  return (
    <View style={{ flex: 1 }}>
      <ComponentHeader title="Report" onPress={() => { props.navigation.goBack() }} />
      {
        !data ? <ComponentLoading /> :
          <>
            <ScrollView>
              <View style={{ paddingHorizontal: 20, paddingBottom: 50 }}>
                <Text style={{ textAlign: 'center', fontSize: 16, paddingVertical: 10 }} >{result.jenis_test}</Text>
                <Text>Berikut Grafik Hasil Tes Anda :</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 15 }} >
                  <ViewShot ref={imageView} options={{ format: "png", quality: 1 }}>
                    <LineChart
                      data={dataGraph}
                      width={chartWidth}
                      height={200}
                      chartConfig={{
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        backgroundColor: '#5E8FF5',
                        backgroundGradientFrom: '#5E8FF5',
                        backgroundGradientTo: '#5E8FF5',
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        decimalPlaces: 0,
                      }}
                      bezier
                      style={{
                        // padding: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        // marginVertical: 8,
                        borderRadius: 5
                      }}
                    />
                  </ViewShot>

                </ScrollView>
                <Text style={{ fontSize: 16 }} >{'Jenis Kepribadian anda adalah : ' + result.jenis_kepribadian}</Text>
                <View style={{ backgroundColor: 'white', borderRadius: 5, padding: 10, marginTop: 10, elevation: 3 }} >
                  <Text style={{}} >{"Detail mengenai kepribadian anda : "}</Text>
                  {
                    data && data.detail && data.detail.length > 0 && data.detail.map((item: any, i: number) => {
                      return (
                        <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start', padding: 5 }} >
                          <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'grey', marginTop: 5 }} />
                          <Text style={{ paddingLeft: 10, fontSize: 14 }} >{item}</Text>
                        </View>
                      )
                    })
                  }
                </View>
                <View style={{ backgroundColor: 'white', borderRadius: 5, padding: 10, marginTop: 10, elevation: 3 }} >
                  <Text>{"Pengembangan yang tepat sesuai dengan kepribadian anda:"}</Text>
                  {
                    data && data.detail && data.saran_pengembangan.length > 0 && data.saran_pengembangan.map((item: any, i: number) => {
                      return (
                        <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start', padding: 5 }} >
                          <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'grey', marginTop: 5 }} />
                          <Text style={{ paddingLeft: 10, fontSize: 14 }} >{item}</Text>
                        </View>
                      )
                    })
                  }
                </View>
                <View style={{ backgroundColor: 'white', borderRadius: 5, padding: 10, marginTop: 10, elevation: 3 }} >
                  <Text>{"Saran profesi untuk kepribadian anda:"}</Text>
                  <Text>{data.saran_profesi}</Text>
                </View>
              </View>
            </ScrollView>
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} >
              <ComponentButton label="Simpan PDF" onPress={() => {
                save()
              }} icon="content-save" />
            </View>
          </>
      }
    </View>
  )
}