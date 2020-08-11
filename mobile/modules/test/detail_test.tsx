import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import ComponentHeader from '../component/header';
import LibCurl from '../lib/curl';
import useSafeState from '../../state'
import { ScrollView } from 'react-native-gesture-handler';
import ComponentLoading from '../component/loading';
import Accordion from 'react-native-collapsible/Accordion';

interface TestDetail_test {
  navigation?: any
}

export default function TestDetail_test(props: TestDetail_test): any {
  const data = props.navigation.state.params.data
  const [result, setResult] = useSafeState()
  const [activeSections, setActiveSections] = useSafeState([0])

  useEffect(() => {
    getAll()
  }, [])

  function getAll() {
    LibCurl("detail.php?id_jenis=" + data.id, null, (out: any) => {
      if (out.message == 'success' && out.ok == 1) {
        setResult(out.result)
      } else {
        Alert.alert('Oops', out.message)
      }
    })
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ComponentHeader title={data.test_name} onPress={() => props.navigation.goBack()} />
      {
        !result ? <ComponentLoading /> :
          <ScrollView>
            <Text style={{ padding: 15 }}>{"Jenis Kepribadian pada " + data.test_name}</Text>
            <Accordion
              underlayColor={"#5E8FF5"}
              sections={result}
              activeSections={activeSections}
              renderHeader={
                (sections: any) => {
                  return (
                    <View style={{ paddingHorizontal: 15, padding: 10, backgroundColor: "white", elevation: 3 }}>
                      <Text>{sections.nama_kepribadian}</Text>
                    </View>
                  )
                }
              }
              renderContent={
                (sections: any) => {
                  return (
                    <View style={{ padding: 10 }}>
                      <View style={{ backgroundColor: "white", elevation: 3, padding: 10, borderRadius: 5, paddingHorizontal: 20 }} >
                        {
                          sections.detail && sections.detail.length > 0 && sections.detail.map((item: any, i: number) => (
                            <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start' }} >
                              <View style={{ backgroundColor: "#5E8FF5", width: 10, height: 10, borderRadius: 5, marginTop: 5 }} />
                              <Text style={{ paddingLeft: 10, lineHeight: 22 }} >{item}</Text>
                            </View>
                          ))
                        }
                      </View>
                      <View style={{ backgroundColor: "white", elevation: 3, padding: 10, borderRadius: 5, marginTop: 10, paddingHorizontal: 20 }} >
                        <Text>{"Saran Pengembangan:"}</Text>
                        {
                          sections.saran_pengembangan && sections.saran_pengembangan.length > 0 && sections.saran_pengembangan.map((item: any, i: number) => (
                            <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start' }} >
                              <View style={{ backgroundColor: "#5E8FF5", width: 10, height: 10, borderRadius: 5, marginTop: 5 }} />
                              <Text style={{ paddingLeft: 10, lineHeight: 22 }} >{item}</Text>
                            </View>
                          ))
                        }
                      </View>
                      <View style={{ backgroundColor: "white", elevation: 3, padding: 10, borderRadius: 5, marginTop: 10, paddingHorizontal: 20 }} >
                        <Text>{"Saran Profesi:"}</Text>
                        <Text style={{ lineHeight: 22 }} >{sections.saran_profesi}</Text>
                      </View>
                    </View>
                  )
                }
              }
              onChange={(a) => { setActiveSections(a) }}
            />

            {/* {
              result && result.length > 0 && result.map((item: any, i: number) => {
                return (
                  <View key={i}>
                    <Text>{item.nama_kepribadian}</Text>
                    {
                      item.detail.map((item1: any, i1: number) => (
                        <View key={i1} >
                          <Text>{item1}</Text>
                        </View>
                      ))
                    }
                  </View>
                )
              })
            } */}
          </ScrollView>
      }
    </View>
  )
}