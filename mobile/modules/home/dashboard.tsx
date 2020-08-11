import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import ComponentHeader from '../component/header';
import ComponentButton from '../component/button';
import LibCurl from '../lib/curl';
import useSafeState from '../../state'
import ComponentLoading from '../component/loading';
import ComponentScroll_refresh from '../component/scroll_refresh';
import { baseUrl } from '../../config';


export default function HomeDashboard(props: any): any {
  const [result, setResult] = useSafeState()

  useEffect(() => {
    getAll()
  }, [])

  function getAll() {
    LibCurl("index.php", null, (out: any) => {
      if (out && out.message == 'success' && out.ok == 1) {
        setResult(out.result)
      } else {
        Alert.alert('Mohon maaf.', out.message)
      }
    })
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ComponentHeader title="Aplikasi Test Kepribadian" />
      {
        !result ? <ComponentLoading /> :
          <ComponentScroll_refresh onRefresh={getAll} >
            <View style={{ alignItems: 'center' }}>
              <View style={{ backgroundColor: 'white', marginHorizontal: 15, elevation: 2, padding: 15, borderRadius: 10, marginTop: 15 }}>
                <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 15 }} >{result.title}</Text>
                <Text style={{ textAlign: 'justify', paddingBottom: 5, letterSpacing: 0.3, lineHeight: 18 }}> {result.description} </Text>
              </View>
              <Text style={{ paddingVertical: 15 }}>Berikut adalah test yang dapat dilaksanakan.</Text>
              {
                result && result.list && result.list.length > 0 && result.list.map((item: any, i: number) => (
                  <ComponentButton key={i} label={item.test_name} onPress={() => props.navigation.navigate('detail', { data: item })} />
                ))
              }
            </View>
          </ComponentScroll_refresh>
      }
    </View >
  )
}