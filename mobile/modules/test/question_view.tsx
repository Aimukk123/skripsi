import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import useSafeState from '../../state'
import DbJawaban from './jawaban';
import ComponentButton from '../component/button';

interface TestQuestion_view {
  soal: any,
  onNext: () => void,
  nomorSoal: number,
  result: any
}

export default function TestQuestion_view(props: TestQuestion_view): any {
  const [dataSoal, setDataSoal] = useSafeState(props.soal.map((item: any) => ({ ...item })))
  const [jawaban, setJawaban] = useSafeState(0)

  function next() {
    if (jawaban) {
      props.onNext()
      new DbJawaban().save(jawaban)
    }
    else
      Alert.alert('Peringatan', 'Silakan Pilih Jawaban Terlebih Dahulu')
  }

  function pilihJawaban(id: number) {
    setJawaban(id)
  }

  return (
    <View style={{ flex: 1, marginTop: 20, marginHorizontal: 20, backgroundColor: '#fff' }} >
      <View style={{ backgroundColor: 'white', elevation: 2, padding: 10, borderRadius: 5 }}>
        <Text style={{ textAlign: 'center', fontSize: 18, marginBottom: 10 }}>Petunjuk Pengerjaan</Text>
        <Text style={{ fontSize: 14, marginBottom: 5, textAlign: 'justify' }} >{'Silahkan pilih salah satu opsi yang paling menggambarkan diri Anda di setiap barisnya.'}</Text>
        <Text style={{ fontSize: 14, marginBottom: 5, textAlign: 'justify' }}>{"Pastikan Anda berada di situasi yang tenang agar hasilnya dapat optimal."}</Text>
      </View>
      <Text style={{ fontSize: 18, marginVertical: 10 }} >{'Pernyataan ke - ' + props.nomorSoal}</Text>
      {
        props.result.id == "3" &&
        <Text style={{ fontSize: 18, marginVertical: 10 }} >{dataSoal[0].pernyataan}</Text>
      }
      {
        dataSoal.map((item: any, index: number) => (
          <View key={index} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }} >
            <TouchableOpacity onPress={() => { pilihJawaban(item.id_soal) }} style={{ flexDirection: 'row', padding: 10, backgroundColor: 'white', margin: 5, alignItems: 'center', justifyContent: 'center', borderRadius: 5, elevation: 2 }}>
              <View style={{ height: 22, width: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 11, borderColor: '#5E8FF5', borderWidth: 2 }} >
                {
                  item.id_soal == jawaban &&
                  <View style={{ height: 14, width: 14, borderRadius: 7, backgroundColor: '#5E8FF5' }} />
                }
              </View>
              {

              }
              < Text style={{ marginLeft: 10, flex: 1 }} >{props.result.id == "3" ? item.jawaban : item.pernyataan}</Text>
            </TouchableOpacity>
          </View>
        ))
      }
      <ComponentButton label="Selanjutnya" onPress={next} style={{ marginTop: 20 }} />
    </View >
  )
}