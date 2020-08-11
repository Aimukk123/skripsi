import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import ComponentHeader from '../component/header'
import LibCurl from '../lib/curl';
import useSafeState from '../../state'
import ComponentLoading from '../component/loading';
import TestQuestion_view from './question_view';
import DbJawaban from './jawaban';
import { userLoad } from '../../user';
import ComponentLoading_small from '../component/loading_small';

export interface TestQuestion {
  navigation?: any
}

export default function TestQuestion(props: TestQuestion): any {
  const [user, setUser] = useSafeState()
  const [result, setResult] = useSafeState()
  const [nomorSoal, setNomorSoal] = useSafeState(1);
  const [showLoading, setShowLoading] = useSafeState(false);

  const data = props.navigation.state.params.data

  useEffect(() => {
    userLoad().then((us: any) => {
      setUser(us)
    })
    getSoal()
    new DbJawaban().delete()
  }, [])

  function getSoal() {
    LibCurl(data.url, null,
      (out: any) => {
        if (out.message == 'success' && out.ok == 1) {
          console.log(out.result.jenis_test);

          setResult(out.result)
        } else {
          Alert.alert('Mohon maaf', out.message)
        }

        // setSoal(out.result)
      })
  }

  function submit() {
    new DbJawaban().load().then((d: any) => {
      let ar_data = d.join('|')
      var post = {
        data: ar_data,
        email: user.email,
        id_jenis: data.id,
        id_user: user.id_user
      }

      console.log(post);
      setShowLoading(true)
      LibCurl(data.submit_url, post, (out: any) => {
        if (out.message == "success" && out.ok == 1) {
          setShowLoading(false)
          props.navigation.navigate('dashboard')
        } else {
          setShowLoading(false)
          Alert.alert('Mohon Maaf', out.message)
        }
        console.log(out);
      })
    })
  }


  function onNext() {
    let nextNomorSoal = nomorSoal + 1
    if (nextNomorSoal < 41) {
      setNomorSoal(nextNomorSoal)
    }
    if (nextNomorSoal == 41) {
      Alert.alert('Terimakasih', 'Jawaban anda akan di proses', [{
        text: 'oke', onPress: () => {
          submit()
        }
      }])

    }
  }


  if (!result) {
    return <ComponentLoading />
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ComponentHeader title={data.test_name} onPress={() => props.navigation.goBack()} />
      {
        showLoading ? <ComponentLoading_small /> : null
      }
      {
        result && result.list.length > 0 &&
        <TestQuestion_view
          key={nomorSoal}
          soal={result.list.filter((item: any) => item.no_soal == nomorSoal)}
          onNext={() => onNext()}
          nomorSoal={nomorSoal}
          result={result}
        />
      }
    </View>
  )
}